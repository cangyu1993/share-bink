import React, {Component} from 'react';
import axios from '../../until/axios'
import './index.scss'

import {Card, Button, Form, Select, DatePicker} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const {MonthPicker, RangePicker, WeekPicker} = DatePicker;


 class Home extends Component {
    constructor(props) {
        super(props)
    }

    state = {};
    //城市
    cityOptions = [
        {
            label: '北京',
            value: '0'
        },
        {
            label: '上海',
            value: '1'
        },
        {
            label: '广州',
            value: '2'
        },
        {
            label: '深圳',
            value: '3'
        },
    ]
    //状态
    orderForm=[
        {
            label: '正在进行',
            value: '0'
        },
        {
            label: '已结束',
            value: '1'
        }
    ]
    //获取用户列表
    getData=()=>{
        axios.get('/user/list').then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
    }

    componentWillMount(){
        this.getData()
    }
    componentDidMount(){

    }
     //获取一组表单的值
     inquireData=()=>{
        console.log(this.props.form.getFieldsValue())
     }
    render() {
        //时间改变事件
        let onChange = (date, dateString) => {
            console.log(date, dateString);
        }
        const { getFieldDecorator } = this.props.form;

        return (
            <div className='home-view'>
                <Card>
                    <Form layout="inline" className='totalForm'>
                        <FormItem>
                            <span>城市：</span>
                            {
                                getFieldDecorator('city',{
                                })(
                                    <Select  style={{width: 160}}>
                                        {this.cityOptions.map((item,index)=>{
                                            return <Option value={item.label} key={index}>{item.label}</Option>
                                        })}
                                    </Select>
                                )
                            }
                        </FormItem>

                        <FormItem>
                            <span>订单时间：</span>
                            <RangePicker onChange={onChange}/>
                        </FormItem>

                        <FormItem>
                            <span>订单状态：</span>
                            {
                                getFieldDecorator('status',{
                                })(
                                    <Select  style={{width: 160}}>
                                        {this.orderForm.map((item,index)=>{
                                            return  <Option value={item.label} key={index}>{item.label}</Option>
                                        })}
                                    </Select>
                                )
                            }
                        </FormItem>
                    </Form>

                    <div className='twoBtn'>
                        <Button type='primary' onClick={this.inquireData}>查询</Button>
                        <Button style={{marginLeft: "10px"}}>重置</Button>
                    </div>
                </Card>
                <Card>
                    <div style={{marginLeft: "50px"}}>
                        <Button type='primary'>查询</Button>
                        <Button style={{marginLeft: "10px"}}>重置</Button>
                    </div>
                </Card>
            </div>
        )
    }
}

export default Form.create()(Home)