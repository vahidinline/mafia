import {
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { Card, DataTable, Text } from 'react-native-paper';
import TeamContext from '../../context/teamcontext';
import { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Dialog, Icon, ListItem } from '@rneui/base';
import { StyleSheet } from 'react-native';
import CoutnDown from '../../components/timer';
import { Button } from '@rneui/themed';

const Day = () => {
  const { team, setTeam } = useContext(TeamContext);
  const [player, setPlayer] = useState({});
  const navigator = useNavigation();
  const [visibleDialog, setVisibleDialog] = useState(false);

  const [tempIndex, setTempIndex] = useState(0);
  const toggleDialog = (item, index) => {
    setPlayer(item);
    setTempIndex(index);
    setVisibleDialog(!visibleDialog);
  };

  const faceOff = (alias) => {
    //شadd removed to the player object
    const newPlayer = {
      ...player,
      alias: alias,
      type: player.type === 'mafia' ? 'villager' : 'mafia',
    };

    // replace the old player with the new player
    const newTeam = team.map((item, index) => {
      if (index === tempIndex) {
        return newPlayer;
      }
      return item;
    });

    setTeam(newTeam);
  };

  const removePlayer = () => {
    // شadd removed to the player object
    const newPlayer = { ...player, removed: true };
    // replace the old player with the new player
    const newTeam = team.map((item, index) => {
      if (index === tempIndex) {
        return newPlayer;
      }
      return item;
    });

    setTeam(newTeam);
  };

  const filteredData = team.filter((item) => item.removed !== true);

  return (
    <View>
      <ScrollView>
        {/* make space in bottom */}

        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            color: '#fff',
            backgroundColor: '#5A5A5A',
            padding: 10,
            margin: 10,
          }}>
          {filteredData.length} Players
        </Text>
        {team.map((item, index) => {
          return (
            <View key={index}>
              <Card
                style={{
                  margin: 10,
                  padding: 10,
                  backgroundColor: '#F86F03',
                  //bottom: 200,
                }}>
                <Card.Title
                  title={item.player}
                  titleStyle={{ color: '#fff', fontWeight: 'bold' }}
                  subtitle={
                    item.removed ? (
                      <Text style={{ color: 'red', fontWeight: 'bold' }}>
                        Eliminated
                      </Text>
                    ) : null
                  }
                />
                {/* <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 20,
                    color: '#fff',
                    backgroundColor: '#5A5A5A',
                    padding: 10,
                    margin: 10,
                  }}>
                  {item.alias}
                </Text> */}
                <Card.Content>
                  <Button
                    containerStyle={{
                      //height: 10,
                      width: '60%',
                      //marginHorizontal: 50,
                      // marginVertical: 10,
                    }}
                    titleStyle={{
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: '#fff',
                    }}
                    buttonStyle={{ backgroundColor: '#525FE1' }}
                    onPress={() => {
                      toggleDialog(item, index);
                    }}>
                    Player Info
                    <Icon
                      name="chevron-forward"
                      type="ionicon"
                      size={20}
                      color="#fff"
                      iconStyle={{
                        justifyContent: 'flex-end',
                      }}
                    />
                  </Button>
                </Card.Content>
                <CoutnDown />
              </Card>
            </View>
          );
        })}

        <Dialog
          overlayStyle={{
            backgroundColor: '#fff',
          }}
          isVisible={visibleDialog}
          onBackdropPress={toggleDialog}>
          <Dialog.Title title={player.player} />
          {!player.removed ? (
            <ListItem
              bottomDivider
              onPress={() => {
                removePlayer(player);
                setVisibleDialog(!visibleDialog);
              }}>
              <Icon name="delete" size={30} color="red" />
              <ListItem.Content>
                <ListItem.Title>Remove</ListItem.Title>
                {/* check if player removed from list then show msg */}
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          ) : (
            <ListItem bottomDivider>
              <Icon name="delete" size={30} color="red" />
              <ListItem.Content>
                <ListItem.Title>
                  {player.player} has been Eliminated
                </ListItem.Title>
                {/* check if player removed from list then show msg */}
              </ListItem.Content>
            </ListItem>
          )}
          <ListItem
            bottomDivider
            containerStyle={{
              backgroundColor: player.removed ? 'gray' : 'green',
            }}>
            <Icon name="person" size={30} color="#fff" />
            <ListItem.Content>
              <ListItem.Title
                style={{
                  color: '#fff',
                }}>
                {player.player} {player.removed ? 'was' : 'is'} {player.name}
              </ListItem.Title>
              {/* check if player removed from list then show msg */}
            </ListItem.Content>
          </ListItem>
          <ListItem bottomDivider>
            <Icon name="person" size={30} color="#fff" />
            <ListItem.Content>
              <ListItem.Title
                onPress={() => {
                  faceOff('faced off');
                  setVisibleDialog(!visibleDialog);
                }}
                style={{
                  color: '#000',
                }}>
                Face Off {player.type}
              </ListItem.Title>
              {/* check if player removed from list then show msg */}
            </ListItem.Content>
          </ListItem>
        </Dialog>
        <View>
          <Button
            containerStyle={{
              height: 70,
              width: '100%',
              //marginHorizontal: 50,
              // marginVertical: 10,
            }}
            titleStyle={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#fff',
            }}
            buttonStyle={{ backgroundColor: 'rgba(255, 193, 7, 1)' }}>
            Night
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  sectionStyle: {
    flex: 1,
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 20,
    marginTop: 10,
  },
});

export default Day;
