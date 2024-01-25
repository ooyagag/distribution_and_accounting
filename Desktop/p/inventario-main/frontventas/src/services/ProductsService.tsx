import { instance, responseBody } from './axiosInstance'

const Requests = {
    product : async (url : string, body : {}) => await instance.post(url,body).then(responseBody),
    getproducts : async (url : string) => await instance.get(url).then(responseBody),
    
}

export const ProductsRequest =
{
    product : async (body : any) => await Requests.product('Products/save',body),
    getproducts : async (id : number) => await Requests.getproducts(`Products/Get/${id}`),
}