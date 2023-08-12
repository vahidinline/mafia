import { Switch, Text } from '@rneui/base';
import { useState } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Day from './day';
import Night from './night';
import { Button } from '@rneui/themed';
import { Appbar } from 'react-native-paper';
const GameIndex = () => {
  const navigator = useNavigation();
  const [checked, setChecked] = useState(true);
  const toggleSwitch = () => {
    setChecked(!checked);
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFF6F4',
      }}>
      <Appbar.Header
        style={{
          backgroundColor: '#525FE1',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0.5,
          borderBottomColor: '#ccc',
        }}>
        <Appbar.BackAction
          color="#fff"
          onPress={() => {
            navigator.goBack();
          }}
        />

        <Appbar.Content
          titleStyle={{ color: '#FFF6F4' }}
          title="Game"
          subtitle={'Subtitle'}
        />
        {checked && (
          <Appbar.Action
            icon="cards-outline"
            color="#FFF6F4"
            onPress={() => navigator.navigate('card')}
          />
        )}
        <Text style={{ color: '#FFF6F4' }}>{checked ? 'Day' : 'Night'}</Text>
        <Switch value={checked} onValueChange={(value) => setChecked(value)} />
      </Appbar.Header>

      <View>{checked ? <Day /> : <Night />}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    // flex: 1,
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GameIndex;
