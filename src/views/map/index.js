import React, {Component} from 'react';
import axios from '../../until/axios'
import Header from '../../components/header'
import {Card, Icon,Spin} from 'antd'

import {Map, Marker, NavigationControl,Polyline,
    Polygon,simpleMapStyle,
    MapTypeControl,ScaleControl,
    OverviewMapControl,enableScrollWheelZoom
} from 'react-bmap'
import './index.scss'

class Mapbaidu extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        userData: {},
        position_list: [],
        centerPlace: {lng: 116.402544, lat: 39.928216},
        endPlace: {lng: 116.402544, lat: 39.928216},
        area: [],
        spinning:false
    }

    getData() {
        this.setState({
            spinning:true
        })
        const id = this.props.match.params.id
        axios.get(`/order/detail/?id=${id}`).then(res => {
            this.setState({
                spinning:false
            })
            // console.log(res)
            const place = res.data.result.position_list
            const area = res.data.result.area
            this.setState({
                userData: res.data.result,
                position_list: place,
                centerPlace: {lng: place[0].lon, lat: place[0].lat},
                endPlace: {lng: place[place.length - 1].lon, lat: place[place.length - 1].lat},
                area: area
            })
            console.log(this.state.userData)
            // console.log(this.state.position_list)
            // console.log(this.state.centerPlace)
        }).catch(err => {
            console.log(err)
            this.setState({
                spinning:true
            })
        })
    }

    componentWillMount() {
        this.getData()
    }


    render() {
        const antIcon = <Icon type="loading" style={{ fontSize: 200 }} spin />;
        return (
            <div>
                <Header/>
                <div>
                    <Map center={this.state.centerPlace}  zoom="11" enableScrollWheelZoom="true">
                        <Marker position={this.state.centerPlace}
                                icon="start"
                                title="起点"
                        />
                        <Marker position={this.state.endPlace}
                                icon="end"
                                title="终点"
                        />
                        <NavigationControl/>
                        <MapTypeControl />
                        <ScaleControl />
                        <OverviewMapControl />
                        <Polyline
                            strokeColor='red'
                            path={
                                this.state.position_list.map((item, index) => {
                                    item.key = index
                                    return {lng: item.lon, lat: item.lat}
                                })
                            }
                        />
                        <Polygon
                            fillColor='rgba(147,147,147,0.9)'
                            strokeColor='yellow'
                            path={
                                this.state.area.map((item, index) => {
                                    item.key = index
                                    return {lng: item.lon, lat: item.lat}
                                })}
                        />
                    </Map>
                </div>
                <Card>
                    <div className="detail-info">
                        <div className="item-title">
                            基础信息
                        </div>
                        <ul>
                            <li>
                                <span className="info-left">用车模式</span>
                                <span className="info-right">{this.state.userData == 1 ? '服务区': '停车点'}</span>
                            </li>
                            <li>
                                <span className="info-left">订单编号</span>
                                <span className="info-right">{this.state.userData.order_sn}</span>
                            </li>
                            <li>
                                <span className="info-left">车辆编号</span>
                                <span className="info-right">{this.state.userData.bike_sn}</span>
                            </li>
                            <li>
                                <span className="info-left">用户姓名</span>
                                <span className="info-right">{this.state.userData.user_name}</span>
                            </li>
                            <li>
                                <span className="info-left">手机号码</span>
                                <span className="info-right">{this.state.userData.mobile}</span>
                            </li>
                        </ul>
                    </div>
                    <div className="detail-info">
                        <div className="item-title">
                            行驶轨迹
                        </div>
                        <ul className='info-wrap'>
                            <li>
                                <span className="info-left">行程起点</span>
                                <span className="info-right">{this.state.userData.start_location}</span>
                            </li>
                            <li>
                                <span className="info-left">行程终点</span>
                                <span className="info-right">{this.state.userData.end_location}</span>
                            </li>
                            <li>
                                <span className="info-left">行驶里程</span>
                                <span className="info-right">{this.state.userData.distance/1000 + 'KM'}</span>
                            </li>
                        </ul>
                    </div>
                </Card>
                <div className='spinning'>
                    <Spin indicator={antIcon}
                          spinning={this.state.spinning}
                    />
                </div>
            </div>
        )
    }
}


export default Mapbaidu

