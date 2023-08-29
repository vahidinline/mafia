import { Icon } from '@rneui/base';
import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { Appbar, Button, Text, TextInput } from 'react-native-paper';
import PlayerContext from '../../context/playercontext';
import { useNavigation } from '@react-navigation/native';
import App from '../../App';

const InitialPlayer = () => {
  const { initialPlayer, setInitialPlayer } = useContext(PlayerContext);
  const [inputValue, setInputValue] = useState('');
  const navigation = useNavigation();
  const [count, setCount] = useState(initialPlayer.length);
  const [playerNames, setPlayerNames] = useState([]);

  // useEffect(() => {
  //   console.log('initialPlayer', initialPlayer);
  // }, [initialPlayer]);

  const addNewInput = () => {
    setCount(count + 1);
    setPlayerNames((prevNames) => [
      { id: count, name: inputValue },
      ...prevNames,
    ]);
    setInputValue('');
  };

  const handleNameChange = (index, newName) => {
    setInitialPlayer = (prevNames) => {
      const updatedNames = [...prevNames];
      updatedNames[index] = newName;
      return updatedNames;
    };
  };
  // const handleSubmit = () => {
  //   if (inputValue) {
  //     setInitialPlayer((prev) => {
  //       return [...prev, inputValue]; // Add the inputValue to the entries array
  //     });
  //     setInputValue(''); // Reset the inputValue
  //   }
  // };

  const handleSubmit = () => {
    const nonEmptyNames = playerNames.filter((name) => name !== '');
    if (initialPlayer.length === 0) {
      setInitialPlayer(nonEmptyNames);
    }
    navigation.navigate('CreateListOfRoles');
  };

  const handleDelete = (index) => {
    setPlayerNames((prevNames) => {
      const updatedNames = [...prevNames];
      updatedNames.splice(index, 1);
      return updatedNames;
    });
    setInitialPlayer((prevNames) => {
      const updatedNames = [...prevNames];
      updatedNames.splice(index, 1);
      return updatedNames;
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#FFA41B' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled>
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFA41B',
        }}>
        <Appbar.Header
          style={{
            backgroundColor: '#525FE1',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0.5,
            borderBottomColor: '#ccc',
          }}>
          <Appbar.Content color="white" title="لیست بازیکنان" />
          <Appbar.Action
            icon="cards-outline"
            color="#FFF6F4"
            onPress={() => navigation.navigate('card')}
          />
        </Appbar.Header>

        <Text
          style={{
            textAlign: 'center',
            fontSize: 30,
            margin: 10,
            color: '#fff',
          }}>
          اضافه کردن بازیکن جدید
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Icon
            name="plus-circle"
            type="material-community"
            size={30}
            color="white"
            onPress={() => setCount(count + 1)}
          />
          <Text style={styles.number}>{count}</Text>
          <Icon
            name="minus-circle"
            type="material-community"
            size={30}
            color="white"
            onPress={() => setCount(count - 1)}
          />
        </View>
        <ScrollView>
          {Array.apply(null, { length: count }).map((e, i) => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                width: '90%',
                alignSelf: 'center',
              }}>
              <TextInput
                key={i}
                returnKeyType="done"
                defaultValue={initialPlayer[i]}
                placeholder={`Player ${i + 1}`}
                placeholderStyle={{ color: '#fff' }}
                placeholderTextColor="#eee"
                color="#fff"
                style={styles.input}
                onChangeText={(text) => {
                  handleNameChange(i, text);
                }}
                right={
                  <TextInput.Icon
                    style={{ top: 10 }}
                    icon="delete"
                    onPress={() => handleDelete(i)}
                  />
                }
              />
            </View>
          ))}
        </ScrollView>
        <View style={{ backgroundColor: '#525FE1' }}>
          <Button
            onPress={handleSubmit}
            mode="contained"
            style={{ margin: 10, backgroundColor: '#525FE1', borderRadius: 1 }}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,

                fontWeight: 'bold',
              }}>
              مرحله بعد
            </Text>
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 20,
    color: 'white',
    borderColor: '#eee',
    borderWidth: 0.3,
    padding: 10,
    margin: 10,
    borderRadius: 5,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    elevation: 5,
  },
  number: {
    fontSize: 30,
    marginHorizontal: 10,
    color: '#fff',
  },
});

export default InitialPlayer;
