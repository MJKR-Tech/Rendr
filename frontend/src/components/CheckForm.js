import React, { useState, useEffect } from 'react';
import {Redirect} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Form } from 'reactstrap';
import axios from 'axios';
import TemplateForm from './TemplateForm';
import FormFileNameInput from './FormFileNameInput';
import JsonFileList from './JsonFileList';
import getBaseURL from './Configurations';

function CheckForm(props) {
    const [submitted, setSubmitted] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [templates, setTemplates] = useState([]);
    
    const baseSite = getBaseURL();
    const apiPath = "/api/v1";
    const generatePath = "/generateData";
    const generateURL = baseSite + apiPath + generatePath;
    useEffect(() => {
        const getTemplates = async () => {
            let getURL = baseSite + apiPath + "/getTemplates";
            await axios.get(getURL)
            .then((res) => {
                var newTemplates = [];
                newTemplates.push(res.data);
                setTemplates(newTemplates);
            }).catch((err) => {
                console.log(err);
            });
        };

        getTemplates();
    }, []);

    const submitForm = (json, outputFilename) => {
        console.log(JSON.stringify(json))
        axios.post(generateURL, json, {
            method: 'POST',
            headers: {
                'Accept': 'application/octet-stream',
                'Content-Type': 'application/json'
            },
            responseType: 'blob', // important

        }).then((response) => {
            let url = window.URL.createObjectURL(new Blob([response.data]));
            let link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${outputFilename}.xlsx`);
            document.body.appendChild(link);
            link.click();
        });
    };

    const generateDatum = (result) => {
        let jsonBody = JSON.parse(result).body;
        let jsonName = Object.getOwnPropertyNames(jsonBody)[0];
        let jsonData = jsonBody[jsonName];
        
        return {
          "name": jsonName,
          "data": {
            "headers": jsonData.columns,
            "rows": jsonData.rows
        }};
    };
    
    const readUploadedFileAsText = (inputFile) => {
        const temporaryFileReader = new FileReader();
      
        return new Promise((resolve, reject) => {
          temporaryFileReader.onerror = () => {
            temporaryFileReader.abort();
            reject(new DOMException("Problem parsing input file."));
          };
      
          temporaryFileReader.onload = () => {
            resolve(temporaryFileReader.result);
          };
          temporaryFileReader.readAsText(inputFile);
        });
    };
    
    const generateDataArr = async (files) => {
        var dataArr = {};
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          var readData = await readUploadedFileAsText(file);
          var datum = generateDatum(readData);
          dataArr[datum.name] = datum.data;
        };
        return dataArr;
    };

    const onSubmit = async (formData) => {
        console.log(formData.template);
        if (formData.template !== undefined) {
            try {
                let dataArr = await generateDataArr(props.dataArr);
                let jsonFile = {
                    templateId: 0,
                    jsonObjects: [],
                    fileName: ""
                }
                jsonFile.templateId = parseInt(formData.template);
                jsonFile.jsonObjects = dataArr;
                jsonFile.fileName = formData.fileName;
                console.log(jsonFile);
                submitForm(jsonFile, formData.fileName);
                setSubmitted(true);
            } catch(error) {
                console.log(error);
            }
        }
    };


    if (props.dataArr) {
        return (
            <>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <TemplateForm templates={templates} register={register} errors={errors} />
                    <div className="card round-borders white-border">
                        <p className="card-header rounded-top-corners" style={{fontSize:"20px"}}>Here are the files you have submitted:</p>
                        <JsonFileList dataArr={props.dataArr} />
                    </div>
                    <FormFileNameInput register={register} errors={errors} />
                    <button className="green-submit" type='submit'>Submit</button>
                </Form>
                {submitted ? <Redirect to="/form-submitted" /> : <div />}
            </>
        );
    } else {
        return (
            <>
                <TemplateForm templates={templates} register={register} errors={errors} />
            </>

        );
    }
};

export default CheckForm;
