import React, {Component} from 'react';
import './index.scss'
import {Link} from 'react-router-dom'

export default class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }

    render() {
        return (
            <div className='header-wrap'>
                <div className='user-info'>
                    <div className="user-detail">
                        欢迎：<span className="username">大魔王</span>
                    </div>
                    <div className='loginOut'>
                        <Link to='/login' className="outClick">
                            退出
                        </Link>
                    </div>
                </div>
                <div>

                </div>
            </div>
        )
    }
}