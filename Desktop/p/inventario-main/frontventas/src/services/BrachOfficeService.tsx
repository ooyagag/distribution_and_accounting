import { instance, responseBody } from './axiosInstance'

const Requests = {
    brach : async (url : string, body : {}) => await instance.post(url,body).then(responseBody),
    getbrach : async (url : string) => await instance.get(url).then(responseBody),
    
}

export const brachRequest =
{
    brach : async (body : any) => await Requests.brach('BrachOffice/save',body),
    getbrach : async (id : number) => await Requests.getbrach(`BrachOffice/Get/${id}`),
}