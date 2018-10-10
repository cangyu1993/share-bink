import React, {Component} from 'react';
import {Layout} from "element-react";

import Header from '../../components/header'
import NavLeft from '../../components/navLeft'
import Footer from '../../components/footer'
import './index.scss'
export default class Admin extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }

    render() {
        return (
            <div className='admin'>
                <Layout.Row>
                    <Layout.Col span="4">
                        <NavLeft/>
                    </Layout.Col>
                    <Layout.Col span="20">
                        <Header/>
                        <div className='content-wrap'>
                            <div className="content">
                                {this.props.children}
                            </div>
                        </div>
                        <Footer/>
                    </Layout.Col>
                </Layout.Row>
            </div>
        )
    }
}