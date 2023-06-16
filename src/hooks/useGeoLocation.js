import React, { useCallback, useEffect } from "react";
//import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';
import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "../slice/MyLocation";
import { useFocusEffect } from "@react-navigation/native";

function UseGeoLocation(){
  const dispatch = useDispatch();
  const {locationPermission} = useSelector(state => state.myLocation);
  useEffect(() => {
    console.log("locationPermission =", locationPermission);
    if(locationPermission === "granted"){
      Geolocation.getCurrentPosition(position => {
          console.log("***************************************")
          console.log('position:', position)
          const locationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }
          console.log("locationData :", locationData);
          dispatch(setLocation(locationData));
          console.log("***************************************")
        },
        error => {
          console.log('geoLocation Error : ', error)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 10000
        }
      );
    }
  },[locationPermission]);
  // useFocusEffect(
  //   useCallback(() => {
  //     Geolocation.getCurrentPosition(position => {
  //         console.log("***************************************")
  //         console.log('position:', position)
  //         const locationData = {
  //           latitude: position.coords.latitude,
  //           longitude: position.coords.longitude,
  //         }
  //         console.log("locationData :", locationData);
  //         dispatch(setLocation(locationData));
  //         console.log("***************************************")
  //       },
  //       error => {
  //         console.log('geoLocation Error : ', error)
  //       },
  //       {
  //         enableHighAccuracy: true,
  //         timeout: 10000,
  //       }
  //     );
  //   }, [dispatch]),
  // )
}
export default UseGeoLocation;
