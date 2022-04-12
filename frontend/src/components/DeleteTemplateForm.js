import React, { useState } from 'react'
import { Modal } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

export default function DeleteTemplateForm(props) {

    const [modal, setModal] = useState(false);
    const history = useHistory();
    const toggle = () => { setModal(!modal) }
    const { register, handleSubmit, formState: { errors } } = useForm();

    const CreateForm = () => {
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
                                    <input style={{fontSize: '15px'}} {...register("template")} type="checkbox" value={tempId} required />
                                    {"\xa0\xa0\xa0\xa0" + temp.templateName}
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
        <>
            <button type="button" style={{float: "right"}} className="btn btn-sm edit-btn" onClick={toggle}>
                Edit &nbsp;
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <Modal isOpen={modal} toggle={toggle} modalTransition={{ timeout:2000 }}>
                <div className="modal-dialog-centered">
                    <div className="modal-content round-borders">
                        <div className="modal-header blue-background">
                            <h5 className="modal-title" id="delete-template-modal">Select Templates to Delete</h5>
                            <button type="button" className="btn-close" onClick={toggle}></button>
                        </div>
                        <div className="modal-body">
                            <CreateForm />
                            <button type="button" style={{float: "right", marginTop: "5px"}} className="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </div>
            </Modal>
            <></>
        </>
    )
}
