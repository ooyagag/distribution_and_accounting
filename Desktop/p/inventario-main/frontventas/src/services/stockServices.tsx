import { instance, responseBody } from './axiosInstance'

const Requests = {
    Stock : async (url : string, body : {}) => await instance.post(url,body).then(responseBody),
    getStock : async (url : string) => await instance.get(url).then(responseBody),
    
}

export const StockRequest =
{
    Stock : async (body : any) => await Requests.Stock('Stocks/save',body),
    getStock : async (id : number) => await Requests.getStock(`Stocks/Get/${id}`),
}