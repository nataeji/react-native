----------------- 해당파일 세팅 ---------------------------
react-native 세팅을 한 후 
- react-native init 프로젝트명.
App.tsx파일을 App.js 파일로 변경(필요없는 부분은 제거, typescript부분을 javascript로 변경-타입제거).
index.js 파일에 import 부분을 변경. App.tsx -> App.js로 변경.

package.json 파일의 dependencies에 아래 내용을 붙여 넣는다.
"@gorhom/bottom-sheet": "^4.4.5",
"@hookform/resolvers": "^2.9.11",
"@react-native-community/geolocation": "^3.0.5",
"@react-native-masked-view/masked-view": "^0.2.8",
"@react-navigation/bottom-tabs": "^6.5.7",
"@react-navigation/drawer": "^6.6.2",
"@react-navigation/material-top-tabs": "^6.6.2",
"@react-navigation/stack": "^6.3.16",
"@reduxjs/toolkit": "^1.9.3",
"@shopify/flash-list": "^1.4.1",
"axios": "^1.3.4",
"react": "18.2.0",
"react-hook-form": "^7.44.3",
"react-native": "0.71.10",
"react-native-actions-sheet": "^0.8.29",
"react-native-encrypted-storage": "^4.0.3",
"react-native-fast-image": "^8.6.3",
"react-native-flipper": "^0.183.0",
"react-native-geolocation-service": "^5.3.1",
"react-native-gesture-bottom-sheet": "^1.1.0",
"react-native-gesture-handler": "^2.9.0",
"react-native-keyboard-aware-scroll-view": "^0.9.5",
"react-native-linear-gradient": "^2.6.2",
"react-native-permissions": "^3.6.0",
"react-native-reanimated": "^3.0.2",
"react-native-safe-area-context": "^4.5.3",
"react-native-screens": "^3.20.0",
"react-native-status-bar-height": "^2.6.0",
"react-native-vector-icons": "^9.2.0",
"react-native-webview": "^12.0.1",
"react-redux": "^8.0.5",
"redux-flipper": "^2.0.2",
"yup": "^1.0.2"

해당 프로젝트 콘솔에서 npm run android 을 실행한다.

react-navigation(v6.xx) 설치후 설정할 부분
- android/app/src/main/java/MyProjectApp/MainActivity.java
import android.os.Bundle;
...
@Override
protected void onCreate(Bundle savedInstanceState) {
super.onCreate(null);
}

-android/build.gradle
buildscript {
ext {
...
kotlin_version = '1.7.0'
}

babel.confi.js 파일에
plugins: ["react-native-reanimated/plugin"], 추가

제일상단의 index.js에
import "react-native-gesture-handler";

- @react-navigation/drawer 설치시 react-native 버전은 "react-native": "0.71.4", 버전으로
  그렇지 않으면 에러발생.

src 폴더 생성 후 
assets, common, components, contants, hook, navigation, page, request, store등의 폴더를 생성.

-vector아이콘 사용
node_modules 폴더에서 
react-native-vector-icon/Fonts/ 폴더의 필요한 파일을 복사 -> android/app/src/main/assets/fonts
android/app/src/main/assets/fonts 이곳에 필요한 폰트을 삽입해서 사용이 가능.

- KeyboardAwareScrollView 라이브러리는 화면이 키보드에 가리는것을 방지한다.

- 회원가입, 로그인페이지는 백엔드서버가 없어서 https://reqres.in/api/를 이용.
- 회원로그인시 이메일 :eve.holt@reqres.in, 비밀번호 : 4자리수 아무거나.
- 데이터사이트는 TMDB사이트 이용.

위치관련
android/app/src/main/AndroidManifest.xml 추가
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
<uses-permission android:name="android.permission.VIBRATE"/>

네이버지도 추가.
npm install react-native-nmap --force
/android/app/src/AndroidManifest.xml
<manifest>
<application>
<meta-data
android:name="com.naver.maps.map.CLIENT_ID"
android:value="YOUR_CLIENT_ID_HERE" />
</application>
</manifest>

/android/app/build.gradle




