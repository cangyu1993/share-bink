import React, {Component} from 'react';

import {HashRouter, Route, Switch, Redirect} from 'react-router-dom'

import Admin from '../views/admin'
import notMatch from '../views/notMatch'
import Home from '../views/home'
import secondPage from '../views/secondPage'
import Login from '../views/login'

import Barchart from '../views/barchart'
import Piechart from '../views/piechart'
import Mapbaidu from '../views/map'


export default class Router extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <HashRouter>
                <div>
                    <Switch>
                        <Route path='/common/order/detail/:id' component={Mapbaidu}></Route>
                        <Route path='/'  render={() =>
                            <Admin>
                                <Switch>
                                    <Route path='/admin/home' component={Home}></Route>
                                    <Route path='/admin/secondPage' component={secondPage}></Route>
                                    <Route path='/admin/barchart' component={Barchart}></Route>
                                    <Route path='/admin/piechart' component={Piechart}></Route>
                                    <Route component={notMatch}></Route>
                                </Switch>
                            </Admin>
                        }
                        >
                        </Route>

                        <Route component={notMatch}></Route>

                    </Switch>
                </div>
            </HashRouter>
        )
    }
}