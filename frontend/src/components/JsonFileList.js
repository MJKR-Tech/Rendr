import React from 'react'
import { CardBody } from 'reactstrap';

export default function JsonFileList(props) {

    function JsonNames(data) {
        var names = [];
        for (let i = 0; i < data.data.length; ++i) {
            let fileName = data.data[i].name
            names.push(
                <li key={fileName} style={{fontSize: '15px'}}>{fileName}</li>
            );
        }
        return names;
    }

    return (
        <CardBody>
            <ul>
                <JsonNames data={props.dataArr} />
            </ul>
        </CardBody>
    )
}
