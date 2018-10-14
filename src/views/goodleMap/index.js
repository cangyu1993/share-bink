import React, {Component} from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker  } from "react-google-maps"
import { compose, withProps } from "recompose"

const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) =>
    <GoogleMap
        defaultZoom={11}
        defaultCenter={{ lat: 39.928216, lng: 116.402544 }}
    >
        {props.isMarkerShown && <Marker position={{ lat:39.928216 , lng: 116.402544  }} onClick={props.onMarkerClick} />}
    </GoogleMap>
)



class goodleMap extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        isMarkerShown: false,
    }

    componentDidMount() {
        this.delayedShowMarker()
    }

    delayedShowMarker = () => {
        setTimeout(() => {
            this.setState({ isMarkerShown: true })
        }, 3000)
    }

    handleMarkerClick = () => {
        this.setState({ isMarkerShown: false })
        this.delayedShowMarker()
    }


    render() {
        return (
            <div>
                <MyMapComponent
                    isMarkerShown={this.state.isMarkerShown}
                    onMarkerClick={this.handleMarkerClick}
                />
            </div>
        )
    }
}

export default goodleMap