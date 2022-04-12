import React from 'react'

export default function FormFileNameInput(props) {

    const required = "This field is required";
    const maxLength = "Your input exceed maximum length of 255 characters";
    const pattern = "Your file name should only use alphanumeric characters, \xa0\xa0'\xa0-\xa0'\xa0\xa0 , \xa0\xa0'\xa0_\xa0'\xa0\xa0 , \xa0\xa0'\xa0.\xa0'\xa0\xa0 and space"
    const errorMessage = error => {
        return <div className="invalid-feedback">{error}</div>;
    }

    return (
        <div className="file-name-input">
            <input type='text' className="form-control" placeholder='Name Your File e.g. Report 1' name="fileName"
            {...props.register("fileName", {required:true, pattern: /^[0-9a-zA-Z_\-. ]+$/, maxLength:255})} />
            {props.errors.fileName && props.errors.fileName.type === "required" && errorMessage(required)}
            {props.errors.fileName && props.errors.fileName.type === "maxLength" && errorMessage(maxLength)}
            {props.errors.fileName && props.errors.fileName.type === "pattern" && errorMessage(pattern)}
        </div>
    )
}
