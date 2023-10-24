import React from 'react';
import taskApi from '../connexion/tasks';

const DeleteTask = (props:{id:number,load:() => void}) => {
    const deleteTask = () =>
    {
        taskApi.delete(props.id).then(() =>props.load());
    }
    return (
        <button onClick={() => deleteTask()}  type="button" className="btn btn-danger">
            Delete
        </button>
    )
}
export default DeleteTask;