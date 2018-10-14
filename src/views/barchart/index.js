import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react'
import {Card} from 'antd';

export default class barChart extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }

    barchart = {
        title: {
            text: '单车骑行次数',
            subtext: '真实数据'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['摩拜单车', '小蓝单车', '死亡飞车']
        },
        toolbox: {
            show: true,
            feature: {
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '摩拜单车',
                type: 'bar',
                data: [3000, 3500, 4000, 2000, 3500, 2500, 5000],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                }
            },
            {
                name: '小蓝单车',
                type: 'bar',
                data: [1500, 4000, 6400, 2600, 3400, 1689, 5000],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                }
            },
            {
                name: '死亡飞车',
                type: 'bar',
                data: [1300, 4800, 4440, 2520, 3430, 2356, 4352],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                }
            }
        ]
    };
    option = {
        title: {
            text: '单车骑行次数',
            subtext: '数据来自网络'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['摩拜单车', '小蓝单车', '死亡飞车']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        series: [
            {
                name: '摩拜单车',
                type: 'bar',
                data: [18203, 23489, 29034, 104970, 131744, 630230, 589565],

            },
            {
                name: '小蓝单车',
                type: 'bar',
                data: [19325, 23438, 31000, 121594, 134141, 681807, 745691],
            },
            {
                name: '死亡飞车',
                type: 'bar',
                data: [19725, 23478, 37000, 121494, 134161, 641807, 645691],
            }
        ]
    };


    render() {
        return (
            <div>

                <Card>
                    <div style={{paddingTop: "68px"}}></div>
                    <ReactEcharts
                        option={this.barchart}
                    />
                </Card>
                <Card>
                    <div style={{paddingTop: "68px"}}></div>
                    <ReactEcharts
                        option={this.option}
                    />
                </Card>

            </div>
        )
    }
}