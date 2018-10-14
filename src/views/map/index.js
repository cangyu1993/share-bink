import React, {Component} from 'react';
import axios from '../../until/axios'
import Header from '../../components/header'
import {Card, Icon, Spin} from 'antd'

import {
    Map, Marker, NavigationControl, Polyline,
    Polygon, simpleMapStyle,
    MapTypeControl, ScaleControl,
    OverviewMapControl, enableScrollWheelZoom
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
        spinning: false
    }

    getData() {
        this.setState({
            spinning: true
        })
        const id = this.props.match.params.id
        axios.get(`/order/detail/?id=${id}`).then(res => {
            this.setState({
                spinning: false
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
            // console.log(this.state.userData)
            // console.log(this.state.position_list)
            // console.log(place)
            // console.log(area)
            // console.log(this.state.centerPlace)
            this.initMap(area)
        }).catch(err => {
            console.log(err)
            this.setState({
                spinning: true
            })
        })
    }

    //实例化地图
    initMap = (area) => {
            const AMap = window.AMap
            this.map = new AMap.Map('container', {
                zoom: 11,//级别
                center: [this.state.centerPlace.lng, this.state.centerPlace.lat],//中心点坐标
                viewMode: '3D'//使用3D视图
            });

        //添加控件
        this.addMapContor()
        this.addMapPolygon()
        this.addMapArea(area)
        this.addMapPonint()

    }

    //添加控件
    addMapContor = () => {
        const AMap = window.AMap
        const map = this.map
        AMap.plugin([
            'AMap.ToolBar',
            'AMap.Scale',
            'AMap.OverView',
            'AMap.MapType',
            'AMap.Geolocation',
        ], function () {
            // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
            map.addControl(new AMap.ToolBar());

            // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
            map.addControl(new AMap.Scale());

            // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
            map.addControl(new AMap.OverView({isOpen: true}));

            // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
            map.addControl(new AMap.MapType());

            // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
            map.addControl(new AMap.Geolocation());
        });
    }
    //添加点标记
    addMapPonint=()=>{
        const AMap = window.AMap
        const map = this.map
        // 创建 AMap.Icon 实例：
        let iconStart = new AMap.Icon({
            size: new AMap.Size(40, 50),    // 图标尺寸
            image: '/00.png',  // Icon的图像
            imageSize: new AMap.Size(40, 50)   // 根据所设置的大小拉伸或压缩图片
        });
        let iconEnd = new AMap.Icon({
            size: new AMap.Size(40, 50),    // 图标尺寸
            image: '/01.png',  // Icon的图像
            imageSize: new AMap.Size(40, 50)   // 根据所设置的大小拉伸或压缩图片
        });
        // 将 Icon 实例添加到 marker 上:
        const startPoint = new AMap.Marker({
            position: new AMap.LngLat(this.state.centerPlace.lng, this.state.centerPlace.lat),
            offset: new AMap.Pixel(-10, -10),
            icon: 'start', // 添加 Icon 实例
            zoom: 13
        })
        const endPoint = new AMap.Marker({
            position: new AMap.LngLat(this.state.endPlace.lng, this.state.endPlace.lat),
            offset: new AMap.Pixel(-10, -10),
            icon: 'end', // 添加 Icon 实例
            zoom: 13
        })
        let markerList = [startPoint,endPoint]
        map.add(markerList );
    }
    //添加折线
    addMapPolygon = () => {
        const AMap = window.AMap
        const map = this.map
        let path = this.state.position_list.map((item, index) => {
            item.key = index
            return new AMap.LngLat(item.lon, item.lat)
        })

// 创建折线实例
        var polyline = new AMap.Polyline({
            path: path,
            borderWeight: 2, // 线条宽度，默认为 1
            strokeColor: 'red', // 线条颜色
            lineJoin: 'round' // 折线拐点连接处样式
        });

// 将折线添加至地图实例
        map.add(polyline);
    }
    //添加区域
    addMapArea=(area)=>{
        const AMap = window.AMap
        const map = this.map
        let path = area.map((item, index) => {
            item.key = index
            return new AMap.LngLat(item.lon, item.lat)
        })

        var polygon = new AMap.Polygon({
            path: path,
            fillColor: 'rgba(147,147,147,0.9)', // 多边形填充颜色
            borderWeight: 2, // 线条宽度，默认为 1
            strokeColor: 'skyblue', // 线条颜色
        });
        map.add(polygon);
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.getData()
    }

    render() {
        const antIcon = <Icon type="loading" style={{fontSize: 200}} spin/>;
        return (
            <div>
                <Header/>
                <div>
                    <Map center={this.state.centerPlace} zoom="11" enableScrollWheelZoom="true">
                        <Marker position={this.state.centerPlace}
                                icon="start"
                                title="起点"
                        />
                        <Marker position={this.state.endPlace}
                                icon="end"
                                title="终点"
                        />
                        <NavigationControl/>
                        <MapTypeControl/>
                        <ScaleControl/>
                        <OverviewMapControl/>
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
                    <div id="container"></div>
                </div>
                <Card>
                    <div className="detail-info">
                        <div className="item-title">
                            基础信息
                        </div>
                        <ul>
                            <li>
                                <span className="info-left">用车模式</span>
                                <span className="info-right">{this.state.userData == 1 ? '服务区' : '停车点'}</span>
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
                                <span className="info-right">{this.state.userData.distance / 1000 + 'KM'}</span>
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

