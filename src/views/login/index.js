import React, {Component} from 'react';
import createBrowserHistory from 'history/createBrowserHistory'
import { Button } from 'antd';
const history = createBrowserHistory({
    forceRefresh: true
})


export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }
    handleClick(){
        console.log("dsa")
        // history.push('/admin/home');
    }
    render() {
        return (
            <div>
                <h1>
                    我是登陆页
                </h1>
                <Button type="primary" onClick={this.handleClick}>Primary</Button>
            </div>
        )
    }
}
