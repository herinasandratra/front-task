import React from 'react';
import EditTask from './EditTask';
import DeleteTask from './DeleteTask';

const TaskLine = (props:{
    id:number,
    title?:string,
    description?:string,
    echeance?:string,
    status?:string,
    load: () =>void,
}) =>
{
    return (
        <tr>
            <th scope="row">{props.title}</th>
            <td>{props.description}</td>
            <td>{props.echeance}</td>
            <td>{props.status}</td>
            <td><EditTask 
                id={props.id} 
                load={props.load}
                title={props?.title}
                description={props?.description}
                status={props?.status } 
                echeance = {props?.echeance }
            /></td>
            <td><DeleteTask 
                    id={props.id} 
                    load={props.load}
            /></td>
        </tr>)
}

export default TaskLine