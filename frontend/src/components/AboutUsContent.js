import React from 'react';
import '../App.css';
import './FunctionSection.css';

function FunctionSection() {
  return (
    <div className='background-image'>

      <div className='function-container'>
          <div className='title'>
            <h1>User Guide</h1>
          </div>
          <div className='content'>
            <h5>
              RENDR is an utility application built to perform data compliation and to populate financial reports. 
              In general, the application works by using an excel template to serve as a base format of the report, then populates the relevant fields with Jackson data uploaded by the user.
            </h5>
          </div>
          <div className='content'>
            <h5>
              1. Before a user upload a template file, the following format should be followed for the ease of data population:
            </h5>
          </div>
          <div className='subContentL'>
            <div>
              <h5>
                Single Cell Content
              </h5>
              <p>
                For single cell content, the root data cell should contain the flag "<code>## </code>" before the name of the json field.
              </p>
              <ul>
                <li>As shown in the diagram on the right, each data cell with "<code>## </code>" will be mapped to one data field in the json data file.</li>
              </ul>
            </div>
            <img className='imageR' src='/images/ExcelTemplate.png' alt='Excel Single Cell Flag' width="500"/>
          </div>
          <div className='subContentR'>
            <img className='imageL' src='/images/ExcelTemplateRow.png' alt='Excel Row Flag' width="500"/>
            <div>
              <h5>
                Dynamic Row Content
              </h5>
              <p>
                For dynamic row content, the root data cell should contain the flag "<code>!!> </code>" before the name of the json field.
              </p>
              <ul>
                <li>As shown in the diagram on the left, each data cell with "<code>!!> </code>" will be mapped to one data field in the json data file.</li>
              </ul>
            </div>
          </div>
          <div className='subContentL'>
            <div>
              <h5>
                Dynamic Column Content
              </h5>
              <p>
                For dynamic column content, the root data cell should contain the flag "<code>!!v </code>" before the name of the json field.
              </p>
              <ul>
                <li>As shown in the diagram on the right, each data cell with "<code>!!v </code>" will be mapped to one data field in the json data file.</li>
                <li>To populate data for a specific column in ascending order, the root data cell should be changed to the flag "<code>!!v ++ </code>"</li>
                <li>To populate data for a specific column in descending order, the root data cell should be changed to the flag "<code>!!v -- </code>"</li>
              </ul>
            </div>
            <img className='imageR' src='/images/ExcelTemplateCol.png' alt='Excel Column Flag' width="500"/>
          </div>
          <div className='subContentR'>
            <img className='imageL' src='/images/ExcelTemplateRow.png' alt='Excel Row Flag' width="500"/>
            <div>
              <h5>
                User Template Format
              </h5>
              <p>
                <ul>
                  <li>For cell content, the users would have to specify the cell format for the repestive rows and columns in the excel template file to perform precise date population.</li>
                </ul>
              </p>
            </div>
          </div>
          <div className='content'>
            <h5>
              2. Once the template file is prepared, the user can upload the template file to RENDR to prepare for data population.
            </h5>
          </div>
          <div className='subContent'>
            <img className='imageR' src='/images/uploadTemplate.png' alt='Upload Template' width="500"/>
            <img className='imageC' src='/images/arrow.png' alt='arrow' width="60"/>
            <img className='imageL' src='/images/uploadTemplate2.png' alt='Upload Template 2' width="500"/>
          </div>
          <div className='content'>
            <div>
              <h5>
                3. Next the user can upload the json data file(s) to RENDR for data population. User is allowed to select multiple json files at a time.
              </h5>
              <ul>
                <li>
                  Note: The json data file(s) should contain the header names that correspond to the header names used in the template file. 
                </li>
                <li>
                  For <code>date</code> data type, the format to specify in json file should be "DD/MM/YYYY".
                </li>
              </ul>
            </div>
          </div>
          <div className='subContent'>
            <img className='imageR' src='/images/uploadJson.png' alt='Upload Template' width="500"/>
            <img className='imageC' src='/images/arrow.png' alt='arrow' width="60"/>
            <img className='imageL' src='/images/uploadJson2.png' alt='Upload Template 2' width="500"/>
          </div>
          <div className='content'>
            <h5>
              4. Lastly, the user is able to download the populated excel file by pressing the <code>Submit</code> button.
            </h5>
          </div>
          <div className='subContent'>
            <img className='imageR' src='/images/submitDownload.png' alt='Upload Template' width="500"/>
            <img className='imageC' src='/images/arrow.png' alt='arrow' width="60"/>
            <img className='imageL' src='/images/final.png' alt='Upload Template 2' width="500"/>
          </div>
      </div>
    </div>
    
  )
}

export default FunctionSection