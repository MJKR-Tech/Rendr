import React from 'react'
import { Form, FormGroup, CardBody } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import getBaseURL from './Configurations';

export default function EditTemplateForm(props) {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const history = useHistory();
    const baseSite = getBaseURL();
    const apiPath = "/api/v1";
    const generateURL = baseSite + apiPath;

    const getTemplate = (temp) => {
        axios.post(generateURL + "/downloadTemplate", 
                {"templateId": temp.templateId},
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/octet-stream',
                        'Content-Type': 'application/json'
                    },
                    responseType: 'blob', // important
                })
        .then((response) => {
            let url = window.URL.createObjectURL(new Blob([response.data]));
            let link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${temp.templateName}.xlsx`);
            document.body.appendChild(link);
            link.click();
        })
    }

    const onSubmit = (formData) => {
        console.log(formData);
        axios.delete(generateURL + "/deleteTemplate/" + formData.templates)
            .then((response) => {
                history.go(0);
            });
    }

    const EditTemplateForm = () => {
        return (
            <>
                {props.templates.map(templ => {
                    let temps = [];
                    for (let i = 0; i < templ.length; ++i) {
                        let temp = templ[i];
                        let tempId = temp.templateId
                        temps.push(
                            <div key={temp.templateId}>
                                <div style={{marginLeft: '10px'}} check="false">
                                    <input style={{fontSize: '15px'}} {...register("templates", {required: true})} 
                                            type="checkbox" id="templates" value={tempId} />
                                    <a className="template-name clickable" href="#" id={tempId}
                                            onClick={((e) => getTemplate(temp))}>{temp.templateName}
                                    </a>
                                </div>
                            </div>
                        );
                    };
                    return (
                        temps
                    );
                })}
            </>
        )
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <CardBody>
                <FormGroup>
                    <EditTemplateForm />
                    {errors.templates && <div className="invalid-feedback" style={{marginLeft:'10px'}}>
                        Please select at least one template for deletion
                    </div>}
                    <button type="submit" style={{float: "right", margin: "7px 5px 10px 0px"}} 
                            className="btn btn-danger btn-sm">Delete</button>
                </FormGroup>
            </CardBody>
        </Form>
    )
}
