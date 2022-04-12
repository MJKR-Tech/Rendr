import axios from "axios";
import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import CheckForm from "./CheckForm";
import getBaseURL from './Configurations';

function Upload({ children }) {
  
  const [dataArr, setData] = useState(false);
  const baseSite = getBaseURL();
  const apiPath = "/api/v1";
  const generatePath = "/uploadTemplate";
  const generateURL = baseSite + apiPath + generatePath;
  const history = useHistory();

  const updateData = async (files) => {
    let dataArr = files;
    if (Object.keys(dataArr).length === 0) {
      throw new Error("Data fed is empty."); 
    }
    return dataArr;
  };

  const uploadFiles = async (event) => {
    setData({});

    try {
      let dataArr = await updateData(event.target.files);
      console.log(dataArr);
      setData(dataArr);

    } catch (error) {
      console.error(error);
      setData({}); // reset back
    }
  };

  const uploadTemplates = async (event) => {
    let template = await event.target.files[0];
    const formData = new FormData();
    formData.append('file', template, template.name);

    axios.post(generateURL, formData, {
      method: "POST",
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    })
      .then((res => {
        console.log('success');
        history.go(0);
      }))
      .catch((err) => {console.log(err)});
  };

  return (
    <div className="wrapper">
      <div className="outer-container">
            <div style={{display:'block'}}>
              <div className="container">
                <div className="template-upload">
                  <input type="file" onChange={uploadTemplates} accept=".xls,.xlsx" />
                  <p style={{margin:"auto"}}>Upload new templates</p>
                </div>
              </div>
              <div className="container">
                <div className="file-upload">
                  <input type="file" multiple onChange={uploadFiles} accept=".json" />
                  <p style={{margin:"auto"}}>Upload your JSON files</p>
                </div>
              </div>
            </div>
            <div className="container">
              <CheckForm dataArr={dataArr} />
            </div>
      </div>
    </div>
  );
};

export default Upload;
