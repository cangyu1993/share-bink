import {Route, Switch} from "react-router-dom";
import Mapbaidu from "./src/views/map";
import Admin from "./src/views/admin";
import Home from "./src/views/home";
import secondPage from "./src/views/secondPage";
import Barchart from "./src/views/barchart";
import Piechart from "./src/views/piechart";
import Text from "./src/views/newMap";
import DDDD from "./src/views/newMap/map";
import notMatch from "./src/views/notMatch";
import Firstpage from "./src/views/Firstpage";
import React from "react";

<div>
    {/*<Redirect from={'/'} exact to={'/admin/home'} />*/}
    <Switch>
        <Route path='/common/order/detail/:id' component={Mapbaidu}></Route>
        <Route path='/admin'  render={() =>
            <Admin>
                <Switch>
                    <Route path='/admin/home'  component={Home}></Route>
                    <Route path='/admin/secondPage' component={secondPage}></Route>
                    <Route path='/admin/barchart' component={Barchart}></Route>
                    <Route path='/admin/piechart' component={Piechart}></Route>
                    <Route path='/admin/map' component={Text}></Route>
                    <Route path='/admin/map002' component={DDDD}></Route>
                    {/*<Route path='/admin/map003' component={goodleMap}></Route>*/}
                    <Route component={notMatch}></Route>
                </Switch>
            </Admin>
        }
        >
        </Route>
        <Route path='/' component={Firstpage}></Route>
        <Route component={notMatch}></Route>

    </Switch>
</div>
