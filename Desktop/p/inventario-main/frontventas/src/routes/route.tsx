
import { Route, Switch, Redirect, useRouteMatch} from 'react-router-dom';
import { useSelector } from 'react-redux'
import App from "../App";
import { Dashboard } from "../templates/dashboard";
import { Register } from "../templates/register";


import { Main } from "../templates/dashboard/main";
import { Workers } from "../templates/workers";
import { Products } from "../templates/products";
import { Stores } from "../templates/stores";
import { Stocks } from '../templates/stocks'
import { Orders } from "../templates/orders";
import { Sales } from "../templates/sales";


const ProtectedRoute = ({ component: Component, ...rest } : any) => {

    const login = useSelector((state : any)  => state.AuthReducer.success);

    return (
        <Route
          { ...rest }
          render={
              (props) => {
                  return login ? <Component { ...props } /> : <Redirect to={
                      {
                          pathname : "/",
                          state : {
                              from : props.location
                          }
                      }
                  }/>
              }
          }
         />
    )
}

export const AppRoute = () => {
    return (
        <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/register" component={Register} />
            <ProtectedRoute path="/dashboard" component={Dashboard} />
            <Route path="*" component={()=>{ return(<div>Page 404</div>) }}/>
        </Switch>
    )
}

export const DashboardRoute = () => {

    let { path } = useRouteMatch();
    const Storeid = useSelector((state: any) => state.AuthReducer.store);
    
    return (
        <Switch>
            <ProtectedRoute exact path={`${path}/`} component={() => <Main Storeid={Storeid} />} />
            <ProtectedRoute path={`${path}/workers`} component={Workers} />
            <ProtectedRoute path={`${path}/products`} component={Products} />
            <ProtectedRoute path={`${path}/stores`} component={Stores} />
            <ProtectedRoute path={`${path}/stock`} component={Stocks} />
            <ProtectedRoute path={`${path}/orders`} component={Orders} />
            <ProtectedRoute path={`${path}/sales`} component={Sales} />
            <Route path="dashboard/*" component={()=>{ return(<div>Page 404</div>) }}/>
        </Switch>
    )
}