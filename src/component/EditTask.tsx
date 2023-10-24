import React, { useEffect, useState } from 'react';
import taskApi from '../connexion/tasks';

export type TaskState = {
    title: string;
    description:string;
    echeance:string|null,
    status:Status | string

}
enum Slug {
    TITLE = 'title', DESCRIPTION = 'description',DATE = 'echeance', STATUS='status'
}
enum Status {
    VALIDATED = 'validated', TESTED  = 'tested', NO_STATUS = ''
}
const EditTask = (props:{
    id:number,
    title?:string,
    description?:string,
    echeance?:string,
    status?:string,
    load:() =>void
}) =>{
    const [state,setState] = useState<TaskState>({
        title:props?.title ?? '',
        description:props.description ?? '',
        echeance:props.echeance?? null,
        status: props.status ?? Status.NO_STATUS,
    })
    const handleOnchage = (value:string, slug: Slug) => {
        setState((current:any) => ({...current,[slug] :value}))
    }

    const handleUpdate =() =>
    {
        taskApi.update(props.id,state)
            .then(() =>{
                props.load()
                setState({
                    title:'',
                    description:'',
                    echeance: null,
                    status: Status.NO_STATUS,
                })
            }).catch((erro:any) => console.error(erro));
    }
    const currentDate = new Date().toISOString().split('T')[0];

    useEffect(() => {
        setState({
            title:props?.title ?? '',
            description:props.description ?? '',
            echeance:props.echeance?? null,
            status: props.status ?? Status.NO_STATUS,
        })
    },[props])
    return (
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={"#staticBackdrop"+props.id}>
            Edit Tasks
            </button>

            <div className="modal fade" id={"staticBackdrop"+props.id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Task</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">
                            Title
                        </label>
                        <input
                            type="text"
                            value={state.title}
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder="Title"
                            onChange={(e:any) => handleOnchage(e.target.value,Slug.TITLE)}
                        />
                    </div>
                    <div>
                        <label htmlFor="exampleFormControlInput1" className="form-label">
                            Description
                        </label>
                        <textarea
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder="Description"
                            value={state.description}
                            onChange={(e:any) => handleOnchage(e.target.value,Slug.DESCRIPTION)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">
                            Title
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder="Echéance"
                            min={currentDate}
                            value={state.echeance ?? ''}
                            onChange={(e:any) => handleOnchage(e.target.value,Slug.DATE)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="select" className="form-label">
                            Title
                        </label>
                        <select value={state?.status}  onChange={(e:any) => handleOnchage(e.target.value,Slug.STATUS)} className="form-select form-select-lg mb-3" aria-label="Large select example">
                            <option value={Status.NO_STATUS}>Created</option>
                            <option value={Status.TESTED}>Tested</option>
                            <option value={Status.VALIDATED}>Validated</option>
                        </select>
                    </div>
                    
                </div>
                <div className="modal-footer">
                    <button onClick={() => handleUpdate()} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Update</button>
                    <button type="button" className="btn btn-primary">Cancel</button>
                </div>
                </div>
            </div>
            </div>
        </>
    );
}

export default EditTask