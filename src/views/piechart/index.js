import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react'
import {Card} from 'antd';

export default class pieChart extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }
    option = {
        title : {
            text: '单车骑行次数',
            subtext: '真实数据',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['摩拜单车', '小蓝单车', '死亡飞车','云霄飞车','滴滴打车']
        },
        series : [
            {
                name: '骑行数量',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'摩拜单车'},
                    {value:310, name:'小蓝单车'},
                    {value:2341, name:'死亡飞车'},
                    {value:135, name:'云霄飞车'},
                    {value:1548, name:'滴滴打车'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    optionTwo = {
        title : {
            text: '单车骑行次数',
            subtext: '真实数据',
            x:'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data:['摩拜单车', '小蓝单车', '死亡飞车','云霄飞车','滴滴打车']
        },
        series: [
            {
                name:'骑行数量',
                type:'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {value:335, name:'摩拜单车'},
                    {value:310, name:'小蓝单车'},
                    {value:2341, name:'死亡飞车'},
                    {value:135, name:'云霄飞车'},
                    {value:1548, name:'滴滴打车'}
                ]
            }
        ]
    };
    render() {
        return (
            <div>
                <Card>
                    <ReactEcharts
                        option={this.option}
                    />
                </Card>
                <Card>
                    <ReactEcharts
                        option={this.optionTwo}
                    />
                </Card>
            </div>
        )
    }
}