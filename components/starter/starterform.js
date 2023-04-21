import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TeamContext from '../../context/teamcontext';
import PlayerContext from '../../context/playercontext';

const StarterForm = () => {
  const { team, setTeam } = useContext(TeamContext);
  const { initialPlayer, setInitialPlayer } = useContext(PlayerContext);
  console.log(initialPlayer);
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{ fontSize: 40, fontWeight: 'bold' }}>مافیاتبر</Text>
      <View style={styles.container}>
        <Text># of Players {initialPlayer.length}</Text>
        <Text># of roles {team.length}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('AssignRoles', {
              team: team,
            })
          }>
          <Text style={styles.text}>Assign Roles</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('initialPlayer', {
              team: team,
            })
          }>
          <Text style={styles.text}>New Team</Text>
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
