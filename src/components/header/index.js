import React, {Component} from 'react';
import './index.scss'
import {Link} from 'react-router-dom'
import {Breadcrumb} from 'element-react';
import {Icon} from 'antd';
import until from '../../until'
import axios from 'axios'

const formdate = until.formatDate

export default class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            time: '2018-08-01 23:30:47',
            weather: '天气晴朗'
        };
    }

    getTime() {
        setInterval(() => {
            let unixdate = new Date().getTime()

            let timeStr = formdate(unixdate)
            this.setState({
                time: timeStr
            })
        }, 1000)
    }

    getWeather() {
        axios.get('http://t.weather.sojson.com/api/weather/city/101010100').then(res => {
            // console.log(res)
            let weatherMsg = res.data.data.forecast[0]
            let minT = weatherMsg.low
            let maxT = weatherMsg.high
            let fx = weatherMsg.fx
            let f1 = weatherMsg.fl
            let type = weatherMsg.type
            let weatherStr = `${minT}~${maxT} ${fx} ${f1} ${type}`
            // console.log(weatherStr)
            this.setState({
                weather: weatherStr
            })
        }).catch(err => {
            console.log(err)
        })
    }

    componentWillMount() {
        this.getTime()
        this.getWeather()
    }

    render() {
        return (
            <div className='header-wrap'>
                <div className='user-info'>
                    <div className="user-detail">
                        欢迎：<span className="username">大魔王</span>
                    </div>
                    <div className='loginOut'>
                        <Icon type="user" theme="outlined" className="icon"
                              onClick={()=>{
                                  this.props.handleClick()
                              }}
                        />
                        <Link to='/login' className="outClick" replace>
                            退出
                        </Link>
                    </div>
                </div>
                <div className='weather-wrap'>
                    <div className="breadcrumb">
                        <Breadcrumb separator="/">
                            <Breadcrumb.Item className="breadcrumb-item">首页</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className="weather">
                        <div className="dateNow">{this.state.time}</div>
                        <div className="weather-detail">
                            {this.state.weather}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}