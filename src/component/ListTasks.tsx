import React, { useEffect, useState } from 'react';
import AddTask from './AddTasks';
import TaskLine from './TaskLine';
import taskApi from '../connexion/tasks';

type ListTasksState ={
    data:Array<any>
}
const ListTasks = (props:any) => {
    const [state,setState] = useState<ListTasksState>({
        data:[]
    })
    const load = () => {
        taskApi.list({}).then((response:any) => {
            console.log(response.data.data.data)
            setState({...state,'data':response.data.data.data})
        })
    } 
    useEffect(() =>{
        load()
    } ,[])
    return (
        <div className='row'>
            
            <div className='mx-auto mt-3 col-6'>
                <AddTask load ={() => load()} />
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Echéance</th>
                            <th scope="col">Status</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state?.data.map((data:any) =><TaskLine
                                id={data?.id}
                                title={data?.title}
                                description={data?.description}
                                status={data?.status } 
                                echeance = {data?.echeance }
                                load ={() => load()}
                        />)}
                    </tbody>
                </table>
            </div>

        </div>
        
    )
}

export default ListTasks;