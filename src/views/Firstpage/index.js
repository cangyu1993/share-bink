import React, {Component} from 'react';
import createBrowserHistory from 'history/createBrowserHistory'
const history = createBrowserHistory({
    forceRefresh:true
})

class Index extends Component {
    constructor(props) {
        super(props)
    }

    state = {};
    handleClick=()=>{
        // window.open(`/#/admin`, '_blank')
        history.push('/admin/home')
    }
    render() {
        return (
            <div>
                未编写首页
                <button onClick={this.handleClick}>登陆</button>
            </div>
        )
    }
}

export default Index
