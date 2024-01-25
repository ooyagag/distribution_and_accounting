import { instance, responseBody } from './axiosInstance'

const Requests = {
    worker : async (url : string, body : {}) => await instance.post(url,body).then(responseBody),
    getworker : async (url : string) => await instance.get(url).then(responseBody),
    
}

export const WorkersRequest =
{
    worker : async (body : any) => await Requests.worker('Workers/Register',body),
    getworker : async (id : number) => await Requests.getworker(`Workers/Get/${id}`),
}