import axios from "axios"
// import { TaskState } from "../component/AddTasks"

const prefixUrl =  'http://localhost:8000' // inside .env variable normaly
const taskApi = {
    create: (params:any) =>  axios.post(prefixUrl+'/tasks',params),
    read: (id:number) => axios.get(prefixUrl+`/tasks/${id}`),
    update: (id:number,params:any) => axios.put(prefixUrl+`/tasks/${id}`,params),
    delete: (id:number) => axios.delete(prefixUrl+`/tasks/${id}`),
    list: (params:any) => axios.get(prefixUrl+`/tasks`, params)
}

export default taskApi