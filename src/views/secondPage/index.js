import React, {Component} from 'react';
import './index.scss'

export default class secondPage extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }

    render() {
        return (
            <div className='home'>
                <h1>我是第二页</h1>
            </div>
        )
    }
}