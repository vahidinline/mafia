import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Button, Card, DataTable, Text } from 'react-native-paper';
import TeamContext from '../../context/teamcontext';
import { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Icon, Dialog } from '@rneui/themed';
import { Audio } from 'expo-av';
import { ListItem } from '@rneui/base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Night = () => {
  const { team, setTeam } = useContext(TeamContext);
  const navigator = useNavigation();
  const [blocked, setBlocked] = useState([]);
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [tempIndex, setTempIndex] = useState(0);
  const [player, setPlayer] = useState({});

  const removesheild = (item) => {
    console.log('item', item);
    const newTeam = team.map((i) => {
      if (i.name === item.name) {
        i.guard = false;
      }
      return i;
    });
  };
  const blockPlayer = (item) => {
    setBlocked([...blocked, item.name]);
  };

  const toggleDialog = (item, index) => {
    setPlayer(item);
    setTempIndex(index);
    setVisibleDialog(!visibleDialog);
  };

  const removePlayer = () => {
    //شadd removed to the player object
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

  const removeGuard = () => {
    //شadd removed to the player object
    const newPlayer = { ...player, guard: false };
    // replace the old player with the new player
    const newTeam = team.map((item, index) => {
      if (index === tempIndex) {
        return newPlayer;
      }
      return item;
    });

    setTeam(newTeam);
  };

  const savePlayer = () => {
    // شadd removed to the player object
    const newPlayer = { ...player, removed: false };
    // replace the old player with the new player
    const newTeam = team.map((item, index) => {
      if (index === tempIndex) {
        return newPlayer;
      }
      return item;
    });

    setTeam(newTeam);
  };

  // const blockPlayer = () => {
  //   // شadd removed to the player object
  //   const newPlayer = { ...player, blocked: true };
  //   // replace the old player with the new player
  //   const newTeam = team.map((item, index) => {
  //     if (index === tempIndex) {
  //       return newPlayer;
  //     }
  //     return item;
  //   });
  // };

  return (
    <ScrollView style={{ backgroundColor: '#5A5A5A' }}>
      {team.map((item, index) => {
        return (
          <View key={index}>
            <Card
              style={{
                margin: 10,
                padding: 10,
                backgroundColor: '#5A5A5A',
              }}>
              <Card.Title
                titleStyle={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#eee',
                }}
                title={item.player}
                subtitle={
                  item.removed ? (
                    <Text style={{ color: 'red', fontWeight: 'bold' }}>
                      Eliminated
                    </Text>
                  ) : null
                }
              />

              <Card.Content>
                <Icon
                  name={blocked.includes(item.name) ? 'lock' : 'lock-open'}
                  type="material"
                  size={30}
                  color="white"
                />
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
                  buttonStyle={{ backgroundColor: 'rgba(255, 193, 7, 1)' }}
                  onPress={() => {
                    toggleDialog(item, index);
                  }}>
                  <Text style={{ color: '#fff' }}>Action</Text>

                  <Icon
                    name="chevron-forward"
                    type="ionicon"
                    size={25}
                    color="#fff"
                    iconStyle={{
                      justifyContent: 'flex-end',
                    }}
                  />
                </Button>
              </Card.Content>
            </Card>
          </View>
        );
      })}

      <Dialog
        titleStyle={{ color: '#eee' }}
        isVisible={visibleDialog}
        onBackdropPress={toggleDialog}>
        <Dialog.Title
          title={`${player.player} 
          ${player.removed ? 'Eliminated' : ''}
          `}
          style={{ color: '#eee' }}></Dialog.Title>

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
          onPress={() => {
            savePlayer(player);
            setVisibleDialog(!visibleDialog);
          }}>
          <Icon name="heart" type="ionicon" size={30} color="red" />
          <ListItem.Content>
            <ListItem.Title>Save</ListItem.Title>
            {/* check if player removed from list then show msg */}
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem
          bottomDivider
          onPress={() => {
            blockPlayer(player);
            setVisibleDialog(!visibleDialog);
          }}>
          <Icon name="block" type="material" size={30} color="gray" />
          <ListItem.Content>
            <ListItem.Title>Block ability</ListItem.Title>
            {/* check if player removed from list then show msg */}
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        {player.guard ? (
          <ListItem
            bottomDivider
            onPress={() => {
              removeGuard(player);
              setVisibleDialog(!visibleDialog);
            }}>
            <Icon name="shield" type="material" size={30} color="green" />
            <ListItem.Content>
              <ListItem.Title>Remove Gaurd</ListItem.Title>
              {/* check if player removed from list then show msg */}
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ) : (
          <ListItem bottomDivider>
            {/* add disable shield acon
             */}

            <Icon
              name="remove-moderator"
              type="material"
              size={30}
              color="gray"
            />
            <ListItem.Content>
              <ListItem.Title>Has no Gaurd</ListItem.Title>
              {/* check if player removed from list then show msg */}
            </ListItem.Content>
            <ListItem.Chevron />
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
      </Dialog>
    </ScrollView>
  );
};

export default Night;
