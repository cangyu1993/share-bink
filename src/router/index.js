import React, {Component} from 'react';

import {HashRouter, Route, Switch,Redirect} from 'react-router-dom'

import Admin from '../views/admin'
import notMatch from '../views/notMatch'
import Home from '../views/home'
import secondPage from '../views/secondPage'
import Login from '../views/login'


export default class Router extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <HashRouter>
                <div>
                    <Switch>
                        <Route path='/'  render={()=>
                            <Admin>
                                <Route path='/admin/home' component={Home}></Route>
                                <Route path='/admin/secondPage' component={secondPage}></Route>
                                <Route path='login' component={Login}></Route>
                            </Admin>
                        }
                        >
                        </Route>
                        <Route   component={notMatch}></Route>
                    </Switch>
                </div>
            </HashRouter>
        )
    }
}