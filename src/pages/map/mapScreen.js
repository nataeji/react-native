import React, { useCallback, useEffect, useState } from "react";
import { Button, Linking, Text, View } from "react-native";
import AppLayout from "../../components/appLayout";
import CustomerPermissionModal from "../../components/common/customerPermissionModal";
import Geolocation from "react-native-geolocation-service";
import NaverMapView, { Marker } from "react-native-nmap";
import { useFocusEffect } from "@react-navigation/native";

function MapScreen() {
  const [myLocation, setMyLocation] = useState(null);
  const [lotteMall, setLotteMall] = useState({ latitude: 37.63753659999971, longitude: 126.91230208189434 });

  //길찾기
  const onFindLoadHandler = useCallback(async () => {
    const url = `kakaomap://route?sp=${myLocation?.latitude},${myLocation?.longitude}&ep=${lotteMall.latitude},${lotteMall.longitude}&by=${"FOOT"}`
    const alterUrl =
      Platform.OS === 'ios'
        ? 'https://itunes.apple.com/app/id304608425?mt=8'
        : 'market://details?id=net.daum.android.map'

    const supported = await Linking.canOpenURL(url)

    console.log('sup => ', supported)

    if (supported) {
      await Linking.openURL(url)
    } else {
      await Linking.openURL(alterUrl)
    }
  },[])


  useFocusEffect(
    useCallback(() => {
      Geolocation.getCurrentPosition(position => {
          console.log("***************************************");
          console.log("position:", position);
          const locationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          console.log("locationData :", locationData);
          setMyLocation(locationData);
          console.log("***************************************");
        },
        error => {
          console.log("geoLocation Error : ", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 10000,
        },
      );
    }, []),
  );

  return (
    <AppLayout title={"지도"}>
      <View>
        <Button title="길찾기 클릭" onPress={onFindLoadHandler} />
      </View>
      {myLocation && <NaverMapView
        style={{ width: "100%", height: "100%" }}
        zoomControl={false}
        rotateGesturesEnabled={false}
        center={{
          zoom: 11,
          //   //tilt: 40, 3D입체효과
          latitude: (lotteMall?.latitude + myLocation?.latitude) / 2,
          longitude: (lotteMall?.longitude + myLocation?.longitude) / 2,
        }}
      >
        {myLocation && <Marker
          coordinate={lotteMall}
          width={25}
          height={30}
          pinColor="green"
          iconPerspectiveEnabled={true}
          isForceShowIcon={true}
        />}
       <Marker
          coordinate={myLocation}
          width={25}
          height={30}
          pinColor="blue"
          iconPerspectiveEnabled={true}
          isForceShowIcon={true}
        />

      </NaverMapView>
      }
    </AppLayout>
  );
}

export default React.memo(MapScreen);
