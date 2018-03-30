import React from 'react';
import { View, Platform, Dimensions, Text } from 'react-native';
import Board from './Board';
import ScoreCard from './ScoreCard';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const Yahtzee = () => (
  <View>
    <ScoreCard />
    <Board />
  </View>
)

export default Yahtzee