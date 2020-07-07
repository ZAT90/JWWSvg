import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';
import axios from 'axios';
import Svg, {G, Path, Line, Text, Rect} from 'react-native-svg';
const URL = 'http://tales-lab.com/views.json';

export default function App() {
  const [lines, setLines] = useState([]);
  const [paths, setPaths] = useState([]);
  const [imgStoreView, setImgStoreView] = useState({storeView: {}});
  useEffect(() => {
    axios.get(URL).then(res => {
      setLines(res.data.lines);
      setPaths(res.data.paths);
      setImgStoreView(prevState => {
        return {...prevState, storeView: res.data.storeView};
      });
    });
  }, []);
  if (Object.keys(imgStoreView.storeView).length === 0) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={{flex: 1}}>
          <View
            style={[
              StyleSheet.absoluteFill,
              {
                height: Dimensions.get('window').height,
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}>
            <Svg
              height="100%"
              width={Dimensions.get('window').width / 1.5}
              viewBox="-1.5 0 100 100">
              {lines.map(line => {
                return (
                  <Line
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    stroke={line.stroke}
                    strokeWidth={line.strokeWidth}
                  />
                );
              })}
              {paths.map(path => {
                return (
                  <Path
                    x={path.x}
                    y={path.y}
                    d={path.d}
                    fill={path.fill}
                    stroke={path.stroke}
                    strokeWidth={path.strokeWidth}
                  />
                );
              })}

              <G
                onPress={() =>
                  Alert.alert('Alert Title', 'My Alert Msg', [
                    {
                      text: 'OK',
                      onPress: () => console.log('Ask me later pressed'),
                    },
                  ])
                }>
                <Rect
                  x={imgStoreView.storeView.rect.x}
                  y={imgStoreView.storeView.rect.y}
                  width={imgStoreView.storeView.rect.width}
                  height={imgStoreView.storeView.rect.height}
                  stroke={imgStoreView.storeView.rect.stroke}
                  strokeWidth={imgStoreView.storeView.rect.strokeWidth}
                  fill={imgStoreView.storeView.rect.fill}
                />
                <Text
                  x={imgStoreView.storeView.text.x}
                  y={imgStoreView.storeView.text.y}
                  fontSize={imgStoreView.storeView.text.fontSize}
                  stroke={imgStoreView.storeView.text.stroke}
                  fill={imgStoreView.storeView.text.fill}
                  strokeWidth={imgStoreView.storeView.text.strokeWidth}
                  textAnchor={imgStoreView.storeView.text.textAnchor}>
                  Store
                </Text>
              </G>
            </Svg>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({});
