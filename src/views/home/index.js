import React, {Component} from 'react';
import axios from '../../until/axios'
import './index.scss'

import {
    Card, Button, Form,
    Select, DatePicker, Pagination,
    Table, Spin, Icon, message,Modal
} from 'antd';

const {RangePicker} = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;


class Home extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        spinning: false,
        searchData: {},
        orderList: [],
        pageNums: 1,
        pageNum: 1,
        selectedRows: {},
        selectedRowKeys:0,
        visible:false,
    };


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
    orderForm = [
        {
            label: '正在进行',
            value: '0'
        },
        {
            label: '已结束',
            value: '1'
        }
    ]
    //获取订单列表
    getData = () => {
        this.setState({
            spinning: true
        })
        axios.get('/order/list', {page: this.state.pageNum, page_size: 10}).then(res => {
            // console.log(res)
            const result = res.data.result
            // console.log(result)
            this.setState({
                pageNums: result.total_count,
                orderList: result.item_list.map((item, index) => {
                    item.key = index
                    return item
                }),
                spinning: false
            })
            // console.log(this.state.orderList)
            // console.log(this.state.pageNums)
        }).catch(err => {
            console.log(err)
            this.setState({
                spinning: true
            })
        })
    }

    componentWillMount() {
        this.getData()
    }

    componentDidMount() {

    }

    //获取一组表单的值转化时间
    inquireData = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }
            const rangeValue = fieldsValue['searchTime'];
            const values = {
                ...fieldsValue,
                'searchTime': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
            };
            this.setState({
                searchData: values
            })
            console.log(values, this.state.searchData);
        });
    }
    //重置表单
    resetData = () => {
        this.props.form.resetFields()
    }
    //分页
    changePageNum = (page) => {
        this.setState({
            pageNum: page
        })
        this.getData()
    }
    //获得订单详情
    orderDetail = () => {
        console.log(this.state.selectedRows)
        if (this.state.selectedRows.id) {
            const dataMsg = this.state.selectedRows
            const id = this.state.selectedRows.id
                    Modal.info({
                        title: '订单详情',
                        okText:'明细查询',
                        content: (
                            <div>
                                <p>用户：{dataMsg.user_name}</p>
                                <p>联系方式：{dataMsg.mobile}</p>
                                <p>骑行距离：{dataMsg.distance+'米'}</p>
                                <p>支付金额：{dataMsg.user_pay+'元'}</p>
                                <p>联系方式：{dataMsg.mobile}</p>
                            </div>
                        ),
                        onOk(){
                            window.open(`/#/common/order/detail/${id}`, '_blank')
                        },
                    });
        } else {
            message.error('请选择一项订单！');
        }
    }
    //结束订单
    endOrder=()=>{
        if (this.state.selectedRows.id) {
            let id = this.state.selectedRows.id
            const dataMsg = this.state.selectedRows
            axios.get('/order/ebike_info',{id:id}).then(res=>{
                const bikeDataGet = res.data.result
                // console.log(bikeDataGet)
                Modal.info({
                    title: '订单详情',
                    okText:'取消订单',
                    okType:'danger',
                    content: (
                        <div>
                            <p>用户：{dataMsg.user_name}</p>
                            <p>联系方式：{dataMsg.mobile}</p>
                            <p>车辆编号：{dataMsg.bike_sn}</p>
                            <p>开始时间：{dataMsg.start_time}</p>
                            <p>结束时间：{dataMsg.end_time}</p>
                            <p>骑行距离：{dataMsg.distance+'米'}</p>
                            <p>剩余电量：{bikeDataGet.battery+'%'}</p>
                            <p>结束地点：{bikeDataGet.location}</p>
                            <p>支付金额：{dataMsg.user_pay+'元'}</p>
                            <p>联系方式：{dataMsg.mobile}</p>
                        </div>
                    ),
                    onCancel(){},
                    onOk(){
                        axios.get(`/order/finish_order`).then(res=>{
                            // console.log(res)
                            if (res.data.code == 0){
                                message.success('取消订单成功！');
                                // this.setState({
                                //     orderList: this.state.orderList.splice(this.state.selectedRowKeys,1)
                                // })
                            }
                        }).catch(err=>{
                            // console.log(err)
                            message.error('订单异常！');
                        })
                    },
                });
            }).then(err=>{console.log(err)})
        }else {
            message.error('请选择一项订单！');
        }
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        const rangeConfig = {
            rules: [{type: 'array', required: true, message: '请选择时间区间!'}],
        };
        const antIcon = <Icon type="loading" style={{fontSize: 90,color:'skyblue'}} spin/>;
        const tableColumns = [
            {
                title: '订单编号',
                dataIndex: 'order_sn',
                key: 'order_sn'
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_sn',
                key: 'bike_sn'
            },
            {
                title: '用户名',
                dataIndex: 'user_name',
                key: 'user_name'
            },
            {
                title: '手机号',
                dataIndex: 'mobile',
                key: 'mobile'
            },
            {
                title: '里程',
                dataIndex: 'distance',
                render(distance) {
                    return distance / 1000 + 'Km';
                },
                key: 'distance'
            },
            {
                title: '行驶时长',
                dataIndex: 'total_time',
                key: 'total_time'
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status'
            },
            {
                title: '开始时间',
                dataIndex: 'start_time',
                key: 'start_time'
            },
            {
                title: '结束时间',
                dataIndex: 'end_time',
                key: 'end_time'
            },
            {
                title: '订单金额',
                dataIndex: 'total_fee',
                key: 'total_fee'
            },
            {
                title: '实付金额',
                dataIndex: 'user_pay',
                key: 'user_pay'
            }
        ]
        const rowSelection = {
            type: 'radio',
            onChange: (selectedRowKeys, selectedRows) => {
                console.log('selectedRowKeys=>',selectedRowKeys)
                // console.log('selectedRows=>',selectedRows)
                this.setState({
                    selectedRows: selectedRows[0],
                    selectedRowKeys:selectedRowKeys[0]
                })
            }
        }

        return (
            <div className='home-view'>
                <div className='spinning'>
                    <Spin indicator={antIcon}
                          spinning={this.state.spinning}
                    />
                </div>
                <Card>
                    <Form layout="inline" className='totalForm'>
                        <FormItem
                            label="城市"
                        >
                            {
                                getFieldDecorator('city', {
                                    initialValue: '请选择城市'
                                })(
                                    <Select style={{width: 160}}>
                                        {this.cityOptions.map((item, index) => {
                                            return <Option value={item.label} key={index}>{item.label}</Option>
                                        })}
                                    </Select>
                                )
                            }
                        </FormItem>

                        <FormItem
                            label="订单时间"
                        >
                            {
                                getFieldDecorator('searchTime', rangeConfig)(
                                    <RangePicker/>
                                )
                            }
                        </FormItem>

                        <FormItem
                            label="订单状态"
                        >
                            {
                                getFieldDecorator('status', {
                                    initialValue: '请选择状态'
                                })(
                                    <Select style={{width: 160}}>
                                        {this.orderForm.map((item, index) => {
                                            return <Option value={item.label} key={index}>{item.label}</Option>
                                        })}
                                    </Select>
                                )
                            }
                        </FormItem>
                    </Form>

                    <div className='twoBtn'>
                        <Button type='primary' onClick={this.inquireData}>查询</Button>
                        <Button style={{marginLeft: "10px"}} onClick={this.resetData}>重置</Button>
                    </div>
                </Card>
                <Card>
                    <div style={{marginLeft: "50px"}}>
                        <Button type='primary' style={{width: '130px'}} onClick={this.orderDetail}>订单详情</Button>
                        <Button type='danger' style={{marginLeft: "10px", width: '130px'}} onClick={this.endOrder}>结束订单</Button>
                    </div>
                </Card>
                <Card>
                    <div className='Table'>
                        <Table columns={tableColumns}
                               dataSource={this.state.orderList}
                               pagination={false}
                               fixed={true}
                               rowSelection={rowSelection}
                        />
                    </div>
                    <div className='sortPage'>
                        <Pagination defaultCurrent={1}
                                    total={this.state.pageNums}
                                    pageSize={10}
                                    onChange={this.changePageNum}
                                    hideOnSinglePage={true}
                        />
                    </div>
                </Card>
            </div>
        )
    }
}

export default Form.create()(Home)