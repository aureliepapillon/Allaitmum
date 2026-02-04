import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function LionMascot({ size = 120 }) {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Mane */}
      <View style={[styles.mane, { width: size, height: size, borderRadius: size / 2 }]} />
      {/* Face */}
      <View style={[styles.face, { width: size * 0.72, height: size * 0.72, borderRadius: (size * 0.72) / 2 }]}>
        {/* Eyes */}
        <View style={styles.eyesRow}>
          <View style={[styles.eye, { width: size * 0.13, height: size * 0.13, borderRadius: size * 0.065 }]}>
            <View style={[styles.pupil, { width: size * 0.08, height: size * 0.08, borderRadius: size * 0.04 }]} />
          </View>
          <View style={[styles.eye, { width: size * 0.13, height: size * 0.13, borderRadius: size * 0.065 }]}>
            <View style={[styles.pupil, { width: size * 0.08, height: size * 0.08, borderRadius: size * 0.04 }]} />
          </View>
        </View>
        {/* Nose */}
        <View style={[styles.nose, { width: size * 0.12, height: size * 0.08, borderRadius: size * 0.06 }]} />
        {/* Mouth */}
        <View style={styles.mouthRow}>
          <View style={styles.mouthLeft} />
          <View style={styles.mouthRight} />
        </View>
        {/* Cheeks */}
        <View style={[styles.cheek, styles.cheekLeft, { width: size * 0.12, height: size * 0.08, borderRadius: size * 0.06 }]} />
        <View style={[styles.cheek, styles.cheekRight, { width: size * 0.12, height: size * 0.08, borderRadius: size * 0.06 }]} />
      </View>
      {/* Ears */}
      <View style={[styles.ear, styles.earLeft, { width: size * 0.2, height: size * 0.2, borderRadius: size * 0.1 }]} />
      <View style={[styles.ear, styles.earRight, { width: size * 0.2, height: size * 0.2, borderRadius: size * 0.1 }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
  mane: { position: 'absolute', backgroundColor: '#D4956E' },
  face: { backgroundColor: '#FCEBD5', alignItems: 'center', justifyContent: 'center', zIndex: 1 },
  eyesRow: { flexDirection: 'row', gap: 18, marginBottom: 4, marginTop: -8 },
  eye: { backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  pupil: { backgroundColor: '#3D2C2C' },
  nose: { backgroundColor: '#AB7058', marginBottom: 2 },
  mouthRow: { flexDirection: 'row', gap: 1 },
  mouthLeft: { width: 10, height: 6, borderBottomLeftRadius: 8, borderBottomColor: '#AB7058', borderBottomWidth: 2, borderLeftColor: '#AB7058', borderLeftWidth: 2 },
  mouthRight: { width: 10, height: 6, borderBottomRightRadius: 8, borderBottomColor: '#AB7058', borderBottomWidth: 2, borderRightColor: '#AB7058', borderRightWidth: 2 },
  cheek: { position: 'absolute', backgroundColor: '#F5C3A8', bottom: 22 },
  cheekLeft: { left: 10 },
  cheekRight: { right: 10 },
  ear: { position: 'absolute', backgroundColor: '#D4956E', top: 4, zIndex: 0 },
  earLeft: { left: 8 },
  earRight: { right: 8 },
});
