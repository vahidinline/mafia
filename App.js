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
import FinishGame from './components/game/finish';
import CardContext from './context/cardcontext';
import cards from './data/cards';
import GameIndex from './components/game';
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from 'react-native-paper';
import { useTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  ...DefaultTheme.colors,
  // Specify custom property in nested object
  colors: {
    myOwnColor: '#BADA55',
  },
};

export default function App() {
  const Stack = createNativeStackNavigator();
  const [team, setTeam] = useState([
    // {
    //   addable: false,
    //   alias: 'پدرخوانده',
    //   dead: false,
    //   essential: true,
    //   guard: true,
    //   gun: false,
    //   id: 1,
    //   investigated: false,
    //   name: 'Godfather',
    //   player: '',
    //   type: 'mafia',
    // },
    // {
    //   addable: false,
    //   alias: 'گروگانگیر',
    //   dead: false,
    //   essential: true,
    //   guard: false,
    //   gun: false,
    //   id: 2,
    //   investigated: false,
    //   name: 'Matador',
    //   player: '',
    //   type: 'mafia',
    // },
    // {
    //   addable: false,
    //   alias: 'دکتر',
    //   dead: false,
    //   essential: true,
    //   guard: false,
    //   gun: false,
    //   id: 3,
    //   investigated: false,
    //   name: 'Doctor',
    //   player: '',
    //   type: 'villager',
    // },
    // {
    //   addable: false,
    //   alias: 'کاراگاه',
    //   dead: false,
    //   essential: true,
    //   guard: false,
    //   gun: false,
    //   id: 4,
    //   investigated: false,
    //   name: 'Detective',
    //   player: '',
    //   type: 'villager',
    // },
    // {
    //   addable: false,
    //   alias: 'مافیا',
    //   dead: false,
    //   essential: false,
    //   guard: false,
    //   gun: false,
    //   id: 9,
    //   investigated: false,
    //   name: 'Mafia',
    //   player: '',
    //   type: 'mafia',
    // },
    // {
    //   addable: false,
    //   alias: 'نگهبان',
    //   dead: false,
    //   essential: true,
    //   guard: true,
    //   gun: false,
    //   id: 5,
    //   investigated: false,
    //   name: 'Guard',
    //   player: '',
    //   type: 'villager',
    // },
    // {
    //   addable: false,
    //   alias: 'تفنگدار',
    //   dead: false,
    //   essential: true,
    //   guard: true,
    //   gun: false,
    //   id: 6,
    //   investigated: false,
    //   name: 'Gun holder',
    //   player: '',
    //   type: 'villager',
    // },
    // {
    //   addable: true,
    //   alias: 'شهر ساده',
    //   dead: false,
    //   essential: true,
    //   guard: false,
    //   gun: false,
    //   id: 7,
    //   investigated: false,
    //   name: 'Villager',
    //   player: '',
    //   type: 'villager',
    // },
    // {
    //   addable: true,
    //   alias: 'شهر ساده',
    //   dead: false,
    //   essential: true,
    //   guard: false,
    //   gun: false,
    //   id: 8,
    //   investigated: false,
    //   name: 'Villager',
    //   player: '',
    //   type: 'villager',
    // },
    // {
    //   addable: true,
    //   alias: 'شهر ساده',
    //   dead: false,
    //   essential: true,
    //   guard: false,
    //   gun: false,
    //   id: 10,
    //   investigated: false,
    //   name: 'Villager',
    //   player: '',
    //   type: 'villager',
    // },
  ]);
  const [initialPlayer, setInitialPlayer] = useState([
    'Vahid',
    'Majid',
    'Eli',
    'Hamed',
    'Amir',
    'TT',
    'Azi',
    'Sahel',
  ]);
  const [card, setCard] = useState(cards);

  return (
    <PaperProvider theme={theme}>
      <CardContext.Provider value={{ card, setCard }}>
        <TeamContext.Provider value={{ team, setTeam }}>
          <PlayerContext.Provider value={{ initialPlayer, setInitialPlayer }}>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen
                  name="initialPlayer"
                  component={InitialPlayer}
                  options={{
                    title: 'Palyers',
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="Home"
                  component={Starterform}
                  options={{
                    title: 'Assign Roles',
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="AssignRoles"
                  component={AssignRoles}
                  options={{
                    title: 'Assign Roles',
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="CreateListOfRoles"
                  component={CreateListOfRoles}
                  options={{
                    title: 'Roles',
                    headerShown: false,
                  }}
                />
                <Stack.Screen name="finishGame" component={FinishGame} />
                <Stack.Screen
                  name="InitialTeam"
                  component={InitialTeam}
                  options={{
                    title: 'Initiation',
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="game"
                  component={GameIndex}
                  options={{
                    title: 'Game',
                    headerShown: false,
                  }}
                />
                <Stack.Screen name="day" component={Day} />
                <Stack.Screen name="night" component={Night} />
                <Stack.Screen name="card" component={Cards} />
              </Stack.Navigator>
            </NavigationContainer>
          </PlayerContext.Provider>
        </TeamContext.Provider>
      </CardContext.Provider>
    </PaperProvider>
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
