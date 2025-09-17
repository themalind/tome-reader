import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>hej hej kolla vad jag lyckats klara!!!!1</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#322468ff',
    alignItems: 'center',
    color: 'white',
    justifyContent: 'center',
  },
});
