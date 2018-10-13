import React, {Component} from 'react';
import {Map, Marker, NavigationControl,
    simpleMapStyle,MapTypeControl,ScaleControl,OverviewMapControl,Arc,icon
} from 'react-bmap'

class Text extends Component {
    constructor(props) {
        super(props)
    }

    state = {};

    render() {
        return (
            <div>
                <Map
                    style={{height: '400px'}} mapStyle={simpleMapStyle} center={{lng: 105.403119, lat: 38.328658}} zoom='13'>
                    <NavigationControl/>
                    <MapTypeControl />
                    <ScaleControl />
                    <OverviewMapControl />
                    <Arc enableAnimation={true}
                         showFromPoint={false}
                         showToPoint={true}
                         data={[
                             {
                                 color: 'red',
                                 from: {
                                     city: '北京'
                                 },
                                 to: {
                                     city: '南京'
                                 }
                             },
                             {
                                 from: {
                                     city: '北京',
                                 },
                                 to: {
                                     name: '哈哈',
                                     point: {
                                         lng: 101.45934,
                                         lat: 39.135305
                                     }
                                 }
                             },
                             {
                                 from: {
                                     city: '北京'
                                 },
                                 to: {
                                     city: '成都'
                                 }
                             },
                             {
                                 from: {
                                     city: '北京'
                                 },
                                 to: {
                                     city: '广州'
                                 }
                             }
                         ]} />
                    <Marker icon="start" position='center' />
                </Map>
                <div style={{height:"36px"}}></div>
            </div>

        )
    }
}

export default Text