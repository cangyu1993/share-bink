import React, {Component} from 'react';
import {Layout, Dialog, Button, Input} from "element-react";

import Header from '../../components/header'
import NavLeft from '../../components/navLeft'
import Footer from '../../components/footer'
import './index.scss'

export default class Admin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShow: false
        };
    }

    handleClick() {
        this.setState({
            isShow: true
        })
        console.log(this.state.isShow)
    }

    render() {
        return (
            <div className='admin'>
                <Layout.Row>
                    <Layout.Col span="4">
                        <NavLeft/>
                    </Layout.Col>
                    <Layout.Col span="20">
                        <Header handleClick={this.handleClick.bind(this)}/>
                        <div className='content-wrap'>
                            <div className="content">
                                {this.props.children}
                            </div>
                        </div>
                        <Footer/>
                    </Layout.Col>
                </Layout.Row>
                <div>
                    <Dialog
                        title="登陆"
                        size="small"
                        visible={this.state.isShow}
                        onCancel={() => this.setState({isShow: false})}
                        lockScroll={false}
                    >
                        <Dialog.Body>
                            <div className='inputTo'>
                                <span className='inputMsg'>邮 箱:</span>
                                <Input placeholder="请输入邮箱" className='setWidth'/>
                            </div>
                            <div className='inputTo'>
                                <span className='inputMsg'>密码:</span><
                                Input placeholder="请输入密码" type='password' className='setWidth'/>
                            </div>
                        </Dialog.Body>
                        <Dialog.Footer className="dialog-footer">
                            <Button onClick={() => this.setState({isShow: false})}>取消</Button>
                            <Button type="primary" onClick={() => this.setState({isShow: false})}>登陆</Button>
                        </Dialog.Footer>
                    </Dialog>
                </div>
            </div>
        )
    }
}