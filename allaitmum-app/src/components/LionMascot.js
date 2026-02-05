import React from 'react';
import { Image, StyleSheet } from 'react-native';

const lionImage = require('../../assets/lion-mascot.png');
const girlImage = require('../../assets/girl-mascot.png');

export default function LionMascot({ size = 120, gender = 'fille' }) {
  const imageSource = gender === 'garçon' ? lionImage : girlImage;

  return (
    <Image
      source={imageSource}
      style={[styles.image, { width: size, height: size }]}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 20,
  },
});
