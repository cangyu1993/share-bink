import React, {Component} from 'react';
import axios from '../../until/axios'
import Header from '../../components/header'
import {Card} from 'antd'
import {Map, Marker, NavigationControl, InfoWindow,Polyline} from 'react-bmap'
class Mapbaidu extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        userData:{},
        position_list:[],
    };
    getData(){
        const id = this.props.match.params.id
        axios.get('/order/detail',{id:id}).then(res=>{
            console.log(res)
            this.setState({
                userData:res.data.result,
                position_list:res.data.result.position_list
            })
            console.log(this.state.userData)
            console.log(this.state.position_list)
        }).catch(err=>{
            console.log(err)
        })
    }

    bikeTrack=[]= this.state.position_list.map((item,index)=>{
        return {lng:item.lon,lat:item.lat}
    })

    componentWillMount(){
        this.getData()
    }
    render() {
        return (
            <div>
                <Header/>

                <div>
                    <Map center={{lng: 116.402544, lat: 39.928216}} zoom="11">
                        <Marker position={{lng: 116.402544, lat: 39.928216}} />
                        <NavigationControl/>
                        {/*<InfoWindow position={{lng: 116.403119, lat: 39.929543}} text="起点" title="起点" />*/}
                        <Polyline
                            strokeColor='green'
                            path={this.bikeTrack}
                        />
                        {/*<InfoWindow position={{lng: 116.217996, lat: 39.904309}} text="起点" title="重点" />*/}
                    </Map>
                </div>

                <Card>

                </Card>
            </div>
        )
    }
}

export default Mapbaidu