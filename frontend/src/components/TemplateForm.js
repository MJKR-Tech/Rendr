import React, { useState } from 'react'
import { Form } from 'reactstrap';
import EditTemplateForm from './EditTemplateForm'
import SelectTemplateForm from './SelectTemplateForm'

export default function TemplateForm(props) {

    const [editTemplates, setEditTemplates] = useState(false);
    const toggle = () => { setEditTemplates(!editTemplates) }

    if (!editTemplates) {
        return (
            <div className="card round-borders white-border ">
                <Form>
                    <div className="card-header rounded-top-corners blue-header">
                        <p style={{fontSize:"20px", display:"inline-block", marginBottom:"5px"}}>Select your template:</p>
                        <button type="button" style={{float: "right"}} className="btn btn-sm edit-btn white" onClick={toggle}>
                            Edit &nbsp;
                            <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                    </div>
                    <SelectTemplateForm templates={props.templates} register={props.register} errors={props.errors} />
                    {console.log(props.errors)}
                </Form>
            </div>
        )
    } else {
        return (
            <div className="card round-borders white-border">
                <div className="card-header rounded-top-corners">
                    <p style={{fontSize:"20px", display:"inline-block", marginBottom:"5px"}}>Edit Templates:</p>
                    <button type="button" style={{float: "right"}} className="btn btn-sm edit-btn" onClick={toggle}>
                        Back &nbsp;
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                </div>
                <EditTemplateForm templates={props.templates} />
            </div>
        )
    }
}
