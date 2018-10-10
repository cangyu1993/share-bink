import React, {Component} from 'react';


export default class secondPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            size: 'large',
        };
    }

    render() {
        const size = this.state.size;
        return (
            <div>
                <h1>我是第二页</h1>
            </div>
        )
    }
}