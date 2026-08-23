import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

interface EmblemProps {
  size?: number;
}

export const Emblem: React.FC<EmblemProps> = ({ size = 32 }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Image
        source={{
          uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfcI6oPcdDuTpr8Nu32yqHUzzVTUor--5_ZsXiemlrrEYz2zNT0m7gq-cwpvmaQCNVfs4umqzyjy30ECD-1-hc2inQGki3CkzTOdTQNKttqgC1oY0kmlyCuOpHvMYasuqJRkEIXSJsRrHOdKt3IhzwDLQmEosWLZQSkXPeUhiSBoSr56YdQchPKc_FwKhixTey8g4vZdksAD5v2vsi2Y3m5NccuYFsp1B0s-AVOcaP39ifZjrz59sG25aUg2BduP0HNg'
        }}
        style={{ width: size, height: size, resizeMode: 'contain' }}
        defaultSource={{
          uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfcI6oPcdDuTpr8Nu32yqHUzzVTUor--5_ZsXiemlrrEYz2zNT0m7gq-cwpvmaQCNVfs4umqzyjy30ECD-1-hc2inQGki3CkzTOdTQNKttqgC1oY0kmlyCuOpHvMYasuqJRkEIXSJsRrHOdKt3IhzwDLQmEosWLZQSkXPeUhiSBoSr56YdQchPKc_FwKhixTey8g4vZdksAD5v2vsi2Y3m5NccuYFsp1B0s-AVOcaP39ifZjrz59sG25aUg2BduP0HNg'
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});
