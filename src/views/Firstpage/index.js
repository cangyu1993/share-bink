import React, {Component} from 'react';
import DocumentTitle from 'react-document-title'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import createBrowserHistory from 'history/createBrowserHistory'
import {browserHistory} from 'react-router-dom'
import './index.scss'

const FormItem = Form.Item;
const history = createBrowserHistory({
    forceRefresh:true
})


class Index extends Component {
    constructor(props) {
        super(props)
    }

    state = {};
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.history.push({pathname:'/admin/home/'+'1024'})
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <DocumentTitle title='用户登录'>
                <div className='contaner'>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item >
                          <div className='login-form-item'>
                              {getFieldDecorator('remember', {
                                  valuePropName: 'checked',
                                  initialValue: true,
                              })(<Checkbox className='RememberMe'>记住密码</Checkbox>)}

                              <Button type="primary" htmlType="submit" className="login-form-button">
                                  登录
                              </Button>
                          </div>
                        </Form.Item>
                    </Form>
                </div>
            </DocumentTitle>
        )
    }
}

export default Form.create()(Index)
