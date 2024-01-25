import { instance, responseBody } from './axiosInstance'

const Requests = {
    OrdersItems : async (url : string, body : {}) => await instance.post(url,body).then(responseBody),
    getOrdersItems : async (url : string) => await instance.get(url).then(responseBody),
    
}

export const OrdersItemsRequest =
{
    OrdersItems : async (body : any) => await Requests.OrdersItems('OrderItems/save',body),
    getOrdersItems : async (id : number) => await Requests.getOrdersItems(`OrderItems/Get/${id}`),
}