import * as AuthActions from '../actionstype/Auth.ActionsType'


export function AuthReducer(state = {
    loading: false,
    token: null,
    success : false,
    store : 0
}, actions: any) {
    switch (actions.type) {
        case AuthActions.LOADING:
            return Object.assign({}, state, {
                loading: actions.payload
            })

        case AuthActions.TOKEN:
            localStorage.setItem('token', actions.payload)
            return Object.assign({}, state, {
                token: actions.payload,
                success : true
            })

        case AuthActions.STOREID :
            return Object.assign({}, state, {
                store : actions.payload
            })

            case AuthActions.REHYDARATE :
            return Object.assign({}, state, {
                loading : false,
                token   :  localStorage.getItem('token'),
                success : true
            })
        default: return { ...state }
    }
}

