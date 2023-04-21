import { Icon } from '@rneui/base';
import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import PlayerContext from '../../context/playercontext';
import { useNavigation } from '@react-navigation/native';

const InitialPlayer = () => {
  const { initialPlayer, setInitialPlayer } = useContext(PlayerContext);
  const [inputValue, setInputValue] = useState('');
  const navigator = useNavigation();
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log('initialPlayer', initialPlayer);
  }, [initialPlayer]);

  const handleSubmit = () => {
    if (inputValue) {
      setInitialPlayer((prev) => {
        return [...prev, inputValue]; // Add the inputValue to the entries array
      });
      setInputValue(''); // Reset the inputValue
    }
  };

  return (
    <View>
      <Text>InitialPlayers</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Icon
          name="plus"
          type="antdesign"
          size={20}
          color="black"
          onPress={() => setCount(count + 1)}
        />
        <Text style={styles.number}>{count}</Text>
        <Icon
          name="minus"
          type="antdesign"
          size={20}
          color="black"
          onPress={() => setCount(count - 1)}
        />
      </View>
      {Array.apply(null, { length: count }).map((e, i) => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <TextInput
            key={i}
            placeholder={`Player ${i + 1}`}
            style={styles.input}
            onChangeText={(text) => {
              setInputValue(text); // Update the inputValue with the current text
            }}
          />
          <Button
            onPress={handleSubmit}
            // mode="contained"
            style={{ margin: 10 }}>
            <Text
              style={{
                color: '#000va',
              }}>
              Add
            </Text>
          </Button>
        </View>
      ))}
      <Button
        mode="contained"
        style={{ margin: 10 }}
        onPress={() => {
          navigator.navigate('CreateListOfRoles');
        }}>
        <Text
          style={{
            color: 'white',
          }}>
          Next
        </Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '60%',
    height: 40,
  },
  number: {
    fontSize: 30,
    marginHorizontal: 10,
  },
});

export default InitialPlayer;
