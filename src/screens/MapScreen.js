import { Dimensions, Platform, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { colors } from "../../styles/global";

const MapScreen = ({ navigation, route }) => {
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: "flex",
          paddingTop: 4,
          paddingHorizontal: 82,
          alignItems: "center",
          justifyContent: "center",
        },
      });
    };
  }, []);

  const [latitudeData, longitudeData] = ["37.785834", "-122.406417"];

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        provider={MapView.PROVIDER_GOOGLE}
        region={{
          latitude: latitudeData,
          longitude: longitudeData,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        onMapReady={() => console.log("Map is ready")}
        onRegionChange={() => console.log("Region change")}
      >
        <Marker
          coordinate={{
            latitude: latitudeData,
            longitude: longitudeData,
          }}
        />
      </MapView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
