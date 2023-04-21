import { ScrollView, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { eight } from '../../data/roles';
import { useContext, useEffect, useState } from 'react';
import PlayerContext from '../../context/playercontext';
import TeamContext from '../../context/teamcontext';
import { useNavigation } from '@react-navigation/native';

const CreateListOfRoles = () => {
  const { team, setTeam } = useContext(TeamContext);
  const navigation = useNavigation();

  useEffect(() => {
    setTeam([]);
  }, []);

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
    setTeam((prevItems) =>
      prevItems.filter((prevItem) => prevItem.id !== role.id)
    );
    setTeam((prevItems) => [...prevItems, role]);
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          //flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          //flexWrap: 'wrap',
        }}>
        <View style={styles.container}>
          {eight.map((role, i) => (
            <TouchableOpacity
              key={i}
              style={styles.button}
              onPress={() => handleItemAdd(role)}>
              <Text style={styles.buttonText}>{role.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.container}>
          {team?.map((role, i) => (
            <TouchableOpacity
              key={i}
              style={styles.button}
              onPress={() => handleItemRemove(role)}>
              <Text style={styles.buttonText}>{role.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <Button
        mode="contained"
        style={{ margin: 10 }}
        onPress={() => {
          navigation.navigate('Home');
        }}>
        <Text
          style={{
            color: 'white',
          }}>
          Next
        </Text>
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '50%',
  },
  button: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 20,
    color: '#000',
  },
  list: {
    width: '100%',
  },
});

export default CreateListOfRoles;
