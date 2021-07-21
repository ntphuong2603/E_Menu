import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import BottomNavigation from './components/bottomNavigation';

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <BottomNavigation/>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    marginTop: 35,
  },
});
