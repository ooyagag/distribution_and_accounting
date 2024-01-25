import { instance, responseBody } from './axiosInstance'
import { IAuth } from "../models/IAuth";
import { IUser } from "../models/IUser";

const Requests = {
    auth : async (url : string, body : {}) => await instance.post(url,body).then(responseBody),
    register : async (url : string, body : {}) => await instance.post(url,body)
}

export const AuthRequest =
{
    auth : async (body : IAuth) => await Requests.auth('Accounts/Login',body),
    register : async (body : IUser) => await Requests.register('Accounts/Register',body),
}

/*

 "email": "user@example.com",
  "password": "string"

*/