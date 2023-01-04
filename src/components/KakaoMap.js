import styled from "styled-components"
import { Map, CustomOverlayMap } from "react-kakao-maps-sdk";
const KakaoMap = ({latProps, lonProps, name}) => {
  return(
    <MapLayout>
    <Map
      center={{ lat: `${latProps}`, lng: `${lonProps}` }}
      style={{ width: "100%", height: "360px" }}
      level={9}
    >
      <CustomOverlayMap
        position={{ lat: `${latProps}`, lng: `${lonProps}` }}
        yAnchor={1}
      >
        <div className="customoverlay">
          <MapSpan className="title" >{name}</MapSpan>
        </div>
      </CustomOverlayMap>
    </Map>
  </MapLayout>
  )

}

const MapLayout = styled.div`
  width:100%;
  height:100%;

`
const MapSpan = styled.span`
    background-color : ${(props) => props.currentVillage === props.name ? 'darkslategrey' : 'white'};
    color :  ${(props) => props.currentVillage === props.name ? 'white' : 'black'};
    padding: 5%;
    border-radius: 10px;
    transition : 0.3s;
`

export default KakaoMap