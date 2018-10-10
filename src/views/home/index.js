import React, {Component} from 'react';

import './index.scss'
export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }

    render() {
        return (
            <div className='home'>
                我是主页
            </div>
        )
    }
}