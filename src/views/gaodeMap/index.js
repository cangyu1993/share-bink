import React, {Component} from 'react';
import './index.scss'

class gaodeMap extends Component {
    constructor(props) {
        super(props)
    }

    state = {};

    //实例化地图
    initMap=()=>{
        const AMap = window.AMap
        this.map = new AMap.Map('container', {
            zoom:11,//级别
            center: [116.397428, 39.90923],//中心点坐标
            viewMode:'3D'//使用3D视图
        });
    }

    //点标记


    componentDidMount(){
        this.initMap()
    }

    render() {
        return (
            <div id="container"></div>
        )
    }
}

export default gaodeMap