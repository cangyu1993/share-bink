import React, {Component} from 'react';
import {
    Map, Marker, NavigationControl,
    simpleMapStyle, MapTypeControl, ScaleControl, OverviewMapControl, Arc, icon,MapvLayer
} from 'react-bmap'

class DDDD extends Component {
    constructor(props) {
        super(props)
    }

    state = {};

    render() {
        var data = [
            {"geometry":{"type":"Point","coordinates":[116.84037246524984,39.824588422242826]},"count":2.0423924061051713},
            {"geometry":{"type":"Point","coordinates":[121.16373269573734,28.907202585313065]},"count":7.34255379550703},
            {"geometry":{"type":"Point","coordinates":[112.4213181018664,29.125553983295717]},"count":0.5826470656070248},
            {"geometry":{"type":"Point","coordinates":[108.52219188481017,28.006706406073217]},"count":28.386668894740634},
            {"geometry":{"type":"Point","coordinates":[115.96733752322879,31.211306591330036]},"count":10.144652179697722},
            {"geometry":{"type":"Point","coordinates":[107.54990381051348,23.56109118761129]},"count":17.592234389760314},
            {"geometry":{"type":"Point","coordinates":[107.88052008658457,27.689159328332877]},"count":21.026930316877703},
            {"geometry":{"type":"Point","coordinates":[111.7658619294828,21.96726494129865]},"count":12.640232984944678}
            ]
        return (
            <div>
                <Map center = {{
                    lng: 105.403119,
                    lat: 38.028658
                }}
                     zoom = '5'
                     mapStyle={{style: 'midnight'}}
                     enableScrollWheelZoom="true"
                >
                    <NavigationControl/>
                    <MapTypeControl/>
                    <ScaleControl/>
                    <OverviewMapControl/>
                    <MapvLayer data={data} options={{
                        fillStyle: 'rgba(255, 250, 50, 0.8)',
                        methods: {click: (item)=>{console.log(item)}},
                        shadowColor: 'rgba(255, 250, 50, 1)',
                        shadowBlur: 30,
                        globalCompositeOperation: 'lighter',
                        size: 8,
                        draw: 'simple',
                        autoViewport: true,
                        viewportOptions: {zoomFactor: 1}
                    }} />
                </Map>
            </div>
        )
    }
}

export default DDDD