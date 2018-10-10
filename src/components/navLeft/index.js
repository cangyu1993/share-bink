import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {Menu} from "element-react";
import './index.scss'

export default class NavLeft extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }

    render() {
        return (
            <div className='nav-left'>

                <Menu defaultActive="2" className="el-menu-vertical-demo"
                      theme='dark'
                      >
                    <Menu.SubMenu index="1" title={<span><i className="el-icon-menu"></i>导航一</span>}>
                        <Menu.ItemGroup title="分组一">
                            <Menu.Item index="1-1" > <Link to='/admin/home' replace className='secondTitle'>
                                首页
                            </Link>
                            </Menu.Item>
                        </Menu.ItemGroup>
                    </Menu.SubMenu>

                    <Menu.SubMenu index="2" title={<span><i className="el-icon-menu"></i>导航二</span>}>
                        <Menu.ItemGroup title="分组一">
                            <Menu.Item index="2-1" > <Link to='/admin/secondPage' replace className='secondTitle'>
                                第二页
                            </Link>
                            </Menu.Item>
                        </Menu.ItemGroup>
                    </Menu.SubMenu>
                </Menu>

            </div>
        )
    }
}