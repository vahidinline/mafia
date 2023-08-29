import {
  ScrollView,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Appbar, Button, Text } from 'react-native-paper';
import { eight } from '../../data/roles';
import { useContext, useEffect, useState } from 'react';
import PlayerContext from '../../context/playercontext';
import TeamContext from '../../context/teamcontext';
import { useNavigation } from '@react-navigation/native';

const CreateListOfRoles = () => {
  const { team, setTeam } = useContext(TeamContext);
  const { initialPlayer, setInitialPlayer } = useContext(PlayerContext);

  const navigation = useNavigation();

  // useEffect(() => {
  //   setTeam([]);
  // }, []);

  const handleItemAdd = (item) => {
    const isAllowedMultipleTimes = item.addable === true;
    if (isAllowedMultipleTimes) {
      // Find the last used ID
      const lastItemId = team.length > 0 ? team[team.length - 1].id : 0;

      // Increment the last used ID by 1 to get a new ID
      const newId = lastItemId + 1;

      // Create a new item object with the new ID
      const newItem = { ...item, id: newId };

      // Add the new item to the team array
      setTeam((prevItems) => [...prevItems, newItem]);
    } else {
      // If item is not allowed multiple times, check if it already exists in team array
      const exists = team.some((role) => role.id === item.id);
      if (!exists) {
        // If item doesn't exist, add it to team array
        setTeam((prevRoles) => [...prevRoles, item]);
      }
    }
  };

  const handleItemRemove = (role) => {
    console.log('role', role);
    setTeam((prevItems) =>
      prevItems.filter((prevItem) => prevItem.id !== role.id)
    );
    setTeam((prevItems) => [...prevItems, role]);
  };

  const handleNext = () => {
    if (team.length === initialPlayer.length) {
      navigation.navigate('Home');
    } else {
      alert('Please assign all roles');
    }
  };

  return (
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
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content color="white" title="انتخاب نقش ها" />
      </Appbar.Header>
      <ScrollView
        contentContainerStyle={{
          //flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          //flexWrap: 'wrap',
        }}>
        <View style={styles.container}>
          <Text>{initialPlayer.length}</Text>
          {eight.map((role, i) => (
            <TouchableOpacity
              key={role.id}
              style={styles.button}
              onPress={() => handleItemAdd(role)}>
              <Text style={styles.buttonText}>{role.alias}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.container}>
          <Text>{team.length}</Text>
          {team?.map((role, i) => (
            <TouchableOpacity
              key={role.id}
              style={styles.button}
              onPress={() => handleItemRemove(role)}>
              <Text style={styles.buttonText}>{role.alias}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={{ backgroundColor: '#525FE1' }}>
        <Button
          mode="contained"
          style={{
            margin: 10,
            backgroundColor: '#525FE1',
            borderRadius: 1,
            marginBottom: 20,
          }}
          onPress={() => {
            handleNext();
          }}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    width: '50%',
    //backgroundColor: '#FFA41B',
    height: Dimensions.get('window').height,
  },
  button: {
    borderColor: '#fff',
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 10,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  list: {
    width: '100%',
  },
});

export default CreateListOfRoles;
