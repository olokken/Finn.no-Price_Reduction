import React from 'react';
import { Route, Switch } from 'react-router';  
import Login from './containers/Login';
import NewUser from './containers/NewUser';

export default (
    <Switch>
        <Route exact path = "/" component={Login}/>
        <Route exact path = "/newUser" component={NewUser}/>
    </Switch>
); 