import * as actionsType from "../actionstype/Auth.ActionsType";

export function Store(data : number)
{
    return {
        type : actionsType.STOREID,
        payload : data
    }
}


export function Token(data : string)
{
    return {
        type : actionsType.TOKEN,
        payload : data
    }
}

export function Loading(data : boolean)
{
    return {
        type : actionsType.LOADING,
        payload : data
    }
}

export function Rehydrate()
{
    return {
        type : actionsType.REHYDARATE,
    }
}