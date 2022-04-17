package com.mjkrt.rendr.service;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.JsonNode;

import org.apache.commons.io.IOUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.mjkrt.rendr.entity.DataCell;
import com.mjkrt.rendr.entity.DataTemplate;
import com.mjkrt.rendr.entity.helper.ColumnHeader;
import com.mjkrt.rendr.entity.helper.TableHolder;
import com.mjkrt.rendr.entity.helper.TemplateIdHolder;
import com.mjkrt.rendr.service.mapper.DataMapperService;
import com.mjkrt.rendr.service.mapper.JsonService;
import com.mjkrt.rendr.service.template.DataTemplateService;
import com.mjkrt.rendr.service.template.TemplateExtractorService;
import com.mjkrt.rendr.service.writer.DataWriterService;
import com.mjkrt.rendr.utils.LogsCenter;

@Transactional
@Service
public class ExcelServiceImpl implements ExcelService {

    private static final Logger LOG = LogsCenter.getLogger(ExcelServiceImpl.class);
    
    @Autowired
    private DataTemplateService dataTemplateService;

    @Autowired
    private TemplateExtractorService templateExtractorService;

    @Autowired
    private DataMapperService dataMapperService;

    @Autowired
    private DataWriterService dataWriterService;
    
    @Autowired
    private JsonService jsonService;

    /**
     * @inheritDoc
     */
    @Override
    public List<DataTemplate> getTemplates() {
        LOG.info("Getting all templates");
        
        List<DataTemplate> templates = dataTemplateService.listAll();
        LOG.info(templates.size() + " templates found: " + templates);
        return templates;
    }

    /**
     * @inheritDoc
     */
    @Override
    public TemplateIdHolder uploadTemplateFromFile(MultipartFile file) {
        LOG.info("Uploading file " + file.getOriginalFilename() + " as dataTemplate");
        Optional<DataTemplate> optionalTemplate = Optional.ofNullable(readAsWorkBook(file))
                .map(workbook -> templateExtractorService.extract(workbook, file.getOriginalFilename()))
                .map(template -> setFileToTemplate(template, file))
                .map(this::saveTemplate);

        long templateId = optionalTemplate.map(DataTemplate::getTemplateId).orElseThrow();
        return new TemplateIdHolder(templateId);
    }
    
    private Workbook readAsWorkBook(MultipartFile file) {
        LOG.info("Reading file " + file.getOriginalFilename() + " as " + file.getOriginalFilename());
        LOG.info("File content type: " + file.getContentType());
        List<String> excelTypes = List.of(
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // xlsx
                "application/vnd.ms-excel" // xls
        );
        if (file.getContentType() == null || !excelTypes.contains(file.getContentType())) {
            LOG.warning("Invalid file type fed");
            return null;
        }
        try {
            return (excelTypes.get(0).equals(file.getContentType()))
                    ? new XSSFWorkbook(file.getInputStream())
                    : new HSSFWorkbook(file.getInputStream());
        } catch (IOException io) {
            LOG.warning("Unable to read excel");
            return null;
        }
    }

    private DataTemplate setFileToTemplate(DataTemplate template, MultipartFile file) {
        LOG.info("Setting file " + file.getOriginalFilename() + " into DataTemplate " + template.getTemplateName());
        try {
            template.setMultipartExcelFile(file);
            return template;
        } catch (IOException io) {
            LOG.warning("File could not be saved in instance DataTemplate");
            return null;
        }
    }

    private DataTemplate saveTemplate(DataTemplate template) {
        LOG.info("Saving template " + template);
        return dataTemplateService.save(template);
    }

    /**
     * @inheritDoc
     */
    @Override
    public boolean deleteTemplate(List<Long> templateIds) {
        LOG.info("Deleting DataTemplates " + templateIds);
        templateIds.forEach(templateId -> dataTemplateService.deleteById(templateId));
        return true;
    }

    /**
     * @inheritDoc
     */
    @Override
    public String getFileNameForTemplate(long templateId) {
        LOG.info("Getting filename for template id " + templateId);
        DataTemplate template = dataTemplateService.findById(templateId);
        return template.getTemplateName();
    }

    /**
     * @inheritDoc
     */
    @Override
    public ByteArrayInputStream getTemplate(long templateId) {
        LOG.info("Obtaining template with ID "+ templateId);
        if (!dataTemplateService.isPresent(templateId)) {
            throw new IllegalArgumentException("Template with given ID is not present");
        }
        return dataTemplateService.findById(templateId).getExcelFileAsStream();
    }

    /**
     * @inheritDoc
     */
    @Override
    public ByteArrayInputStream generateExcel(JsonNode dataNode) throws IOException {
        long templateId = dataNode.get("templateId").longValue();
        LOG.info("Generating excel for template ID " + templateId);
        
        Workbook workbook = loadTemplateResourceFromId(templateId);
        
        List<ColumnHeader> columnHeaders = jsonService.getHeaders(dataNode.get("jsonObjects"));
        List<JsonNode> rows = jsonService.getRows(dataNode.get("jsonObjects"));
        List<DataCell> dataCells = dataTemplateService.findDataCellsWithTemplateId(templateId);
        List<TableHolder> linkedTables = dataMapperService.generateLinkedTableHolders(templateId,
                columnHeaders,
                rows);
        
        Map<Long, TableHolder> tableHolders = dataMapperService.generateTableMapping(templateId,
                columnHeaders,
                linkedTables);
        Map<Long, String> substitutionMap = dataMapperService.generateCellMapping(dataCells,
                linkedTables);
        
        dataWriterService.mapDataToWorkbook(tableHolders, substitutionMap, workbook, templateId);
        return dataWriterService.writeToStream(workbook);
    }
    
    private Workbook loadTemplateResourceFromId(long templateId) throws IOException {
        LOG.info("Loading template resource from id " + templateId);
        if (!dataTemplateService.isPresent(templateId)) {
            throw new IllegalArgumentException("Template with given ID is not present");
        }
        InputStream inputStream = dataTemplateService.findById(templateId).getExcelFileAsStream();
        return new XSSFWorkbook(inputStream);
    }

    /**
     * @inheritDoc
     */
    @Override
    public void copyByteStreamToResponse(HttpServletResponse response,
            ByteArrayInputStream stream,
            String fileName) throws IOException {

        String formattedFileName = fileName.replaceAll("\\s+", "-"); // replace whitespaces
        if (formattedFileName.contains(".")) {
            formattedFileName = formattedFileName.substring(0, formattedFileName.lastIndexOf('.')); // remove ext
        }
        LOG.info("Copying input stream to " + formattedFileName + EXCEL_EXT);

        response.setContentType("application/octet-stream");
        response.setHeader("Content-Disposition", "attachment; filename=" + formattedFileName + EXCEL_EXT);
        IOUtils.copy(stream, response.getOutputStream());
        LOG.info("Excel '" + formattedFileName + ".xlsx" + "' generated");
    }
}
