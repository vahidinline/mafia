import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Starterform from './components/starter/starterform';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AssignRoles from './components/starter/AssignRoles';
import TeamContext from './context/teamcontext';
import { useState } from 'react';
import InitialTeam from './components/game/initialTeam';
export default function App() {
  const Stack = createNativeStackNavigator();
  const [team, setTeam] = useState([1, 2]);

  return (
    <TeamContext.Provider value={{ team, setTeam }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Starterform} />
          <Stack.Screen name="AssignRoles" component={AssignRoles} />
          <Stack.Screen name="InitialTeam" component={InitialTeam} />
        </Stack.Navigator>
      </NavigationContainer>
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
