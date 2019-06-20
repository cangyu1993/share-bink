import React, {Component} from 'react';

import { Route, Switch, Redirect} from 'react-router-dom'

import Admin from '../views/admin'
import notMatch from '../views/notMatch'
import Home from '../views/home'
import secondPage from '../views/secondPage'
import Barchart from '../views/barchart'
import Piechart from '../views/piechart'
import Text from '../views/newMap'
import DDDD from '../views/newMap/map'
import Firstpage from '../views/Firstpage'
import Mapbaidu from "../views/map";


export default class Router extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
           <div>
               <Switch>
                   <Route path='/' exact component={Firstpage}/>
                   <Route path='/common/order/detail/:id' component={Mapbaidu}></Route>
                   <Route path='/admin'  render={() =>
                       <Admin>
                           <Switch>
                               <Route path='/admin/home/:id'  component={Home} ></Route>
                               <Route path='/admin/secondPage' component={secondPage}></Route>
                               <Route path='/admin/barchart' component={Barchart}></Route>
                               <Route path='/admin/piechart' component={Piechart}></Route>
                               <Route path='/admin/map' component={Text}></Route>
                               <Route path='/admin/map002' component={DDDD}></Route>
                               <Route component={notMatch}></Route>
                           </Switch>
                       </Admin>
                       }>
                   </Route>
                   <Route component={notMatch}></Route>
               </Switch>
           </div>
        )
    }
}
