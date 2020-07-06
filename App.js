/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';

import views from './JsonData/views.json';
import Svg, {G, Path, Line, Text, Rect} from 'react-native-svg';

export default function App() {
  const {lines, paths, storeView} = views;
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
                  x={storeView.rect.x}
                  y={storeView.rect.y}
                  width={storeView.rect.width}
                  height={storeView.rect.height}
                  stroke={storeView.rect.stroke}
                  strokeWidth={storeView.rect.strokeWidth}
                  fill={storeView.rect.fill}
                />
                <Text
                  x={storeView.text.x}
                  y={storeView.text.y}
                  fontSize={storeView.text.fontSize}
                  stroke={storeView.text.stroke}
                  fill={storeView.text.fill}
                  strokeWidth={storeView.text.strokeWidth}
                  textAnchor={storeView.text.textAnchor}>
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
