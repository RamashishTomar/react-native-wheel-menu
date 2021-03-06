import React, { Component } from 'react';
import { Platform, StyleSheet, View, Easing, ImageBackground, Animated, BackHandler } from 'react-native';
// const { Surface, Group, Rectangle, Shape } = ART;
import {Surface, Group, Rectangle, Shape} from '@react-native-community/art';
import Svg, { Circle, G, Text, Path, Line, Use, Image } from 'react-native-svg';
const Animatee = {
  G: Animated.createAnimatedComponent(G),
  Path: Animated.createAnimatedComponent(Path),
  Text: Animated.createAnimatedComponent(Text),
}

import * as shape from 'd3-shape';
import * as d3 from 'd3';


export default class GenerateArcText extends Component {

  constructor(props) {
    super(props);
    this.state= {
      fillColor: new Animated.Value(0),
      B1: new Animated.Value(0)
    };
  }

  componentWillMount() {
    this.executeMe();
  }

  executeMe() {
    Animated.parallel([
        Animated.timing(this.state.fillColor, {
          toValue: 1,
          duration: 50,
          delay: 30 * this.props.idx,
          useNativeDriver: true
        }),
        Animated.stagger(0.5, [

          this.timing('B1'),

        ])
        ]).start();
  }

  timing(id) {
    return Animated.sequence([
      Animated.timing(
        this.state[id],
        { toValue: 1, duration: 60 + 50 * this.props.idx }
      ),
      Animated.timing(
        this.state[id],
        { toValue: 0, duration: 60 + 50 * this.props.idx }
      )
    ])
  }

  truncate(string) {
    if(this.props.semi) {
      if(this.props.passed) {
        if (string.length >= 4) return string.substring(0, 3) + '...';
          else return string;  
        }
      else {
        if (string.length >= 7) return string.substring(0, 5) + '...';
          else return string;  
        }
      }

    else {
      if(this.props.passed) {
        if (string.length > 8)  
          return string.substring(0, 8) + '..';
          
          else return string;
        }
      else {
        if (string.length > 8) return string.substring(0, 8) + '..';
          else return string;
      }
      }
  }

  interp(id, value) {
    return this.state[id].interpolate({
      inputRange: [0, 1],
      outputRange: value,
    })
  }

  render() {
     const anim = { transform: [{translateX: this.state.scaleX}] }
     let xval = this.props.path.centroid(this.props.section)[0]
     let yval = this.props.path.centroid(this.props.section)[1]
    return (
      <Animatee.G
      onPress= {()=> this.props.onPress(this.props.section.data, this.props.section.data.itemName, this.props.idx)}
            y={this.interp('B1', [0, 0.5])}
            x={this.interp('B1', [0, 0.5])}
            scaleX={this.interp('B1', [1, .95])}
            scaleY={this.interp('B1', [1, .95])}
      >

      <Animatee.Text
            opacity={this.interp('fillColor', [0, 5])}
          fontSize={this.props.passed && !this.props.noChild? "5" : "4"}
          
          fill= {this.props.textColor}
          x={xval}
          y={yval + 2}
          textAnchor="middle">
          {this.truncate(this.props.section.data.itemName)}
      <Image 
        height={this.props.passed && !this.props.noChild ? 17 : 10} 
        width={this.props.passed && !this.props.noChild? 50 : 20} 
        x={this.props.passed && !this.props.noChild? xval - 8 : xval - 11}
        y={this.props.passed && !this.props.noChild? yval - 14 : yval - 13}
        href={ this.props.section.data.icon } />
        </Animatee.Text>
        <Animatee.Text
            opacity={this.interp('fillColor', [0, 5])}
          fontSize={this.props.passed && !this.props.noChild? "5" : "4"}
          fill="#0256E1"
          x={xval}
          y={yval + 7}
          textAnchor="middle">
          {this.truncate(this.props.section.data.doller)}
      
        </Animatee.Text>
      </Animatee.G>
    );
  }
}