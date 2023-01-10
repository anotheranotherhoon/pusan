import { Map, CustomOverlayMap } from "react-kakao-maps-sdk";
import { VILLAGE } from "../util/constValue"
import styled from "styled-components"
const WeatherMap = ({currentVillage, handleMouseOver}) => {
  return(
    <MapLayout>
    <Map
      center={{ lat: 35.189, lng: 129.07573898218627 }}
      style={{ width: "100%", height: "360px" }}
      level={9}
    >
      {VILLAGE.map((village, idx) =>
          <CustomOverlayMap
            position={{ lat: `${village.lat}`, lng: `${village.lon}` }}
            yAnchor={1}
            key={idx}
          >
            <div className="customoverlay">
            <MapSpan className="title" onMouseOver={()=>handleMouseOver(village.name)} currentVillage={currentVillage} name={village.name}>{village.name}</MapSpan>
            </div>
          </CustomOverlayMap>
      )}
    </Map>
  </MapLayout>
  )
}

const MapLayout = styled.div`
  width:100%;
  height:100%;

`
const MapSpan =styled.span`
  background-color :  ${(props)=>props.theme.theme==='light' ? props.currentVillage === props.name ? 'darkslategrey' : 'white'  : props.currentVillage === props.name ? 'darkslategrey' : 'navy'} ;
  color :  ${(props)=>props.theme.theme==='light' ? props.currentVillage === props.name ? 'white' : 'black'  : 'grey'} ;
    padding: 5%;
    border-radius: 10px;
    transition : 0.3s;
`


export default WeatherMap