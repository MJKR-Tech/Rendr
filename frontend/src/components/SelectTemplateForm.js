import React from 'react'
import { FormGroup, CardBody } from 'reactstrap';

export default function SelectTemplateForm(props) {

    const SelectTemplateForm = () => {
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
                                    <input style={{fontSize: '15px'}} {...props.register("template", {required: true})} 
                                            type="radio" value={tempId} />
                                    <p className='template-name'>{temp.templateName}</p>
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
        <CardBody>
            <FormGroup>
                <SelectTemplateForm />
                {props.errors.template && <div className="invalid-feedback" style={{marginLeft:'10px'}}>
                    Please select a template for your report
                </div>}
            </FormGroup>
        </CardBody>
    )
}
