import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Button, DataTable, Text } from 'react-native-paper';
import TeamContext from '../../context/teamcontext';
import { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import { Audio } from 'expo-av';

const Night = () => {
  const [sound, setSound] = useState();
  // async function playSound() {
  //   console.log('Loading Sound');
  //   const { sound } = await Audio.Sound.createAsync(
  //     require('./assets/Hello.mp3')
  //   );
  //   setSound(sound);

  //   console.log('Playing Sound');
  //   await sound.playAsync();
  // }

  // React.useEffect(() => {
  //   return sound
  //     ? () => {
  //         console.log('Unloading Sound');
  //         sound.unloadAsync();
  //       }
  //     : undefined;
  // }, [sound]);
  const { team, setTeam } = useContext(TeamContext);
  const navigator = useNavigation();
  const [health, setHealth] = useState([]);
  console.log('health', health);
  const removesheild = (item) => {
    console.log('item', item);
    const newTeam = team.map((i) => {
      if (i.name === item.name) {
        i.guard = false;
      }
      return i;
    });
  };
  const nightHeal = (item) => {
    setHealth([...health, item.name]);
  };
  return (
    <ScrollView>
      {team.map((item, index) => {
        return (
          <View key={index}>
            <DataTable style={{ margin: 10 }}>
              <DataTable.Row>
                <DataTable.Cell>{item.alias}</DataTable.Cell>
                <DataTable.Cell>{item.player}</DataTable.Cell>
                <DataTable.Cell>
                  <Icon
                    color={'red'}
                    name="delete"
                    onPress={() => {
                      const newTeam = team.filter((item, i) => i !== index);
                      setTeam(newTeam);
                    }}
                  />
                </DataTable.Cell>
                <DataTable.Cell>
                  {item.guard ? (
                    <Icon
                      name="shield"
                      size={20}
                      color="green"
                      onPress={() => {
                        removesheild(item);
                      }}
                    />
                  ) : null}
                </DataTable.Cell>
                <DataTable.Cell>
                  <Icon
                    color={
                      health.includes(item.name) ? 'green' : 'rgba(0,0,0,0.5)'
                    }
                    name="heartbeat"
                    type="font-awesome"
                    onPress={() => {
                      nightHeal(item);
                    }}
                  />
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          </View>
        );
      })}
      <View>
        <Button
          mode="contained"
          onPress={() =>
            navigator.reset({
              index: 0,
              routes: [{ name: 'day' }],
            })
          }
          style={{ margin: 10 }}>
          روز
        </Button>
      </View>
      {/* <View style={styles.container}>
        <Button title="Play Sound" onPress={playSound} />
      </View> */}
    </ScrollView>
  );
};

export default Night;
