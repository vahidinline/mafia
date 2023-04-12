import { useEffect, useState } from 'react';
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
const StarterForm = () => {
  const [players, setPlayers] = useState(0);
  const navigation = useNavigation();
  useEffect(() => {
    if (players > 0) {
      navigation.navigate('AssignRoles', { players });
    }
  }, [players]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>تعداد بازیکنان</Text>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setPlayers(8);
          }}>
          <Text style={styles.text}>8 players</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setPlayers(7);
          }}>
          <Text style={styles.text}>7 players</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setPlayers(6);
          }}>
          <Text style={styles.text}>6 players</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    //alignItems: 'center',
    //backgroundColor: '#F5FCFF',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    margin: 10,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
export default StarterForm;
