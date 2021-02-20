import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import {
  getPosAction,
  getInfoWindow,
  getPostListAction,
} from '../../modules/postmap';
import axios from '../../api/axios';

const PostmapGoogle = props => {
  const dispatch = useDispatch();

  const userData = useSelector(state => state.auth.userData);
  const postList = useSelector(state => state.postmap.postList);
  const pos = useSelector(state => state.postmap.pos);
  const infoWindow = useSelector(state => state.postmap.infoWindow);
  const infoWindowCheck = useSelector(state => state.postmap.infoWindowCheck);

  const [data, setData] = useState('');

  const mapStyles = {
    height: '35vh',
  };

  useEffect(() => {
    if (navigator.geolocation) {
      const getPosition = async options => {
        return await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, options);
        });
      };

      getPosition().then(async position => {
        var myposition = {
          // latitude: position.coords.latitude,
          // longitude: position.coords.longitude,
          latitude: 48.853989,
          longitude: 2.341772,
        };

        dispatch(getPosAction(myposition));

        props.listFetch(myposition);

        setData(true);
      });
    }
  }, []);

  const getFetchMarker = async pos => {
    return await axios.get(
      `postmap/selectAll?latitude=${pos.latitude}&longitude=${pos.longitude}&uId=${userData.uid}`,
      {
        headers: { userToken: userData.userToken },
      },
    );
  };

  const displayMarkers = () => {
    return postList.map((chat, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: chat.latitude,
            lng: chat.longitude,
          }}
          // animation={props.google.maps.Animation.DROP}
          onClick={async () => {
            dispatch(getInfoWindow(chat));

            const res = await getFetchMarker(pos);
            dispatch(getPostListAction(res.data.data));
          }}
          icon={{
            path: props.google.maps.SymbolPath.CIRCLE,
            fillColor: '#D03A3A',
            fillOpacity: 1,
            strokeColor: '#912626',
            strokeOpacity: 1,
            strokeWeight: 1,
            scale: 7,
          }}
        />
      );
    });
  };

  return (
    data && (
      <div
        id="googleMap"
        style={{
          width: 'inherit',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Map
          google={props.google}
          zoom={13}
          style={mapStyles}
          initialCenter={{ lat: pos.latitude, lng: pos.longitude }}
          mapTypeControl={false}
          streetViewControl={false}
          fullscreenControl={false}
        >
          {displayMarkers()}

          {infoWindow && (
            <InfoWindow
              onCloseClick={() => {}}
              position={{
                lat: infoWindow.latitude,
                lng: infoWindow.longitude,
              }}
              visible={infoWindowCheck}
            >
              <div>
                {/* <h2>{infoWindow.registerId}</h2> */}
                <p>{infoWindow.contents}</p>
              </div>
            </InfoWindow>
          )}
        </Map>
      </div>
    )
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyB80YxWaSrVECbYuvospx4M9fQ7_CFB3Kk',
})(PostmapGoogle);
