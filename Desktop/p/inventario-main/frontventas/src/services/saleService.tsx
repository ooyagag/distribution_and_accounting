import { instance, responseBody } from './axiosInstance'

const Requests = {
    Sale : async (url : string, body : {}) => await instance.post(url,body).then(responseBody),
    getSale : async (url : string) => await instance.get(url).then(responseBody),
    
}

export const saleRequest =
{
    sale : async (body : any) => await Requests.Sale('Orders/save',body),
    getsale : async (id : number) => await Requests.getSale(`Orders/Get/${id}`),
}