import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Starterform from './components/starter/starterform';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AssignRoles from './components/starter/AssignRoles';
import TeamContext from './context/teamcontext';
import { useState } from 'react';
import InitialTeam from './components/game/initialTeam';
import Day from './components/game/day';
import Night from './components/game/night';
import Cards from './components/game/card';
import PlayerContext from './context/playercontext';
import InitialPlayer from './components/starter/initialPlayer';
import CreateListOfRoles from './components/starter/createListofRoles';

export default function App() {
  const Stack = createNativeStackNavigator();
  const [team, setTeam] = useState([]);
  const [initialPlayer, setInitialPlayer] = useState([]);

  return (
    <TeamContext.Provider value={{ team, setTeam }}>
      <PlayerContext.Provider value={{ initialPlayer, setInitialPlayer }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="initialPlayer" component={InitialPlayer} />
            <Stack.Screen name="Home" component={Starterform} />
            <Stack.Screen name="AssignRoles" component={AssignRoles} />
            <Stack.Screen
              name="CreateListOfRoles"
              component={CreateListOfRoles}
            />
            <Stack.Screen name="InitialTeam" component={InitialTeam} />
            <Stack.Screen name="day" component={Day} />
            <Stack.Screen name="night" component={Night} />
            <Stack.Screen name="card" component={Cards} />
          </Stack.Navigator>
        </NavigationContainer>
      </PlayerContext.Provider>
    </TeamContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
