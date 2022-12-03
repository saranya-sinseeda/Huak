import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';

export default class Preload extends React.Component {
  render() {
    return (
      <View style={styles.preload}>
        <LottieView  
          style={styles.frog}
          source={require('../assets/lf30_editor_86s9eqof.json')}
          speed = {1.5}
          autoPlay 
          loop = {false}
          onAnimationFinish={() => {
            console.log('Preload Finish')
            this.props.navigation.replace('Timeline')
          }}
        />
        <Text style={styles.huak}>HUAK</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  preload: {
    flex: 1,
    backgroundColor: '#003300',
    alignItems: 'center',
    justifyContent: 'center',
  },
  huak: {
    alignItems: 'center',
    marginBottom: -150,
    color: '#ede9a3',
    fontSize: 40,
    fontWeight: 'bold'
  },
  frog: {
    alignItems: 'center',
    marginBottom: 50,
  }
});
