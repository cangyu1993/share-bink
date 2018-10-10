import React, {Component} from 'react';

import './index.scss'
export default class notMatch extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }

    render() {
        return (
            <div >
                <h1 className="404">404没有找到你要的页面</h1>
            </div>
        )
    }
}