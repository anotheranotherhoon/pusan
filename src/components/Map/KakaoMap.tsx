import styled from "styled-components"
import { Map, CustomOverlayMap, MapMarker } from "react-kakao-maps-sdk";

interface KakaoMapProps{
  latProps : number;
  lonProps : number;
  name : string
}

const KakaoMap = ({latProps, lonProps, name}: KakaoMapProps) => {
  return(
    <MapLayout>
    <Map
      center={{ lat: latProps, lng:lonProps }}
      style={{ width: "100%", height: "360px" }}
      level={9}
    >
              <MapMarker
        position={{ lat: latProps, lng:lonProps }}
          image={{
            src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png", 
            size: {
              width: 64,
              height: 69,
            },
            options: {
              offset: {
                x: 27,
                y: 69,
              }, 
            },
          }}
        />
      <CustomOverlayMap
        position={{ lat: latProps, lng: lonProps }}
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
    color: black;
`

export default KakaoMap