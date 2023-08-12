import React, { useContext, useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Mask from '../../assets/mask.jpeg';
import _ from 'lodash';
import MyModal from './Modal';
import { useNavigation } from '@react-navigation/native';
import PlayerContext from '../../context/playercontext';
import TeamContext from '../../context/teamcontext';
import { Appbar, Button } from 'react-native-paper';

const AssignRoles = () => {
  const navigator = useNavigation();
  const { team, setTeam } = useContext(TeamContext);
  const { initialPlayer, setInitialPlayer } = useContext(PlayerContext);
  const [rolesArray, setRolesArray] = useState([]);

  const [isModalVisible, setModalVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState();
  const [disabledButtonIds, setDisabledButtonIds] = useState([]);
  const [buttondisable, setButtondisable] = useState(true);
  console.log(team.length, disabledButtonIds.length);
  console.log('buttondisable', buttondisable);
  useEffect(() => {
    if (disabledButtonIds.length == team.length) {
      console.log('equal');
      setButtondisable(false);
    }
  }, [disabledButtonIds]);

  const handleButtonClick = (role) => {
    setRole(role);
    setModalVisible(true);
    setDisabledButtonIds([...disabledButtonIds, role.id]);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleNameSubmit = (name) => {
    setUserName(name);
    setModalVisible(false);
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
        <Appbar.BackAction color="white" onPress={() => navigator.goBack()} />
        <Appbar.Content color="white" title="Start" />
      </Appbar.Header>

      <ScrollView style={{ backgroundColor: '#FFA41B' }}>
        <View style={myStyle.container}>
          {_.shuffle(team)?.map((role, i) => (
            <TouchableOpacity
              key={i}
              style={myStyle.item}
              onPress={() => handleButtonClick(role)} // Conditionally set onPress based on pressed status
              disabled={disabledButtonIds.includes(role.id)}>
              <Image
                source={Mask}
                style={[
                  myStyle.image,
                  disabledButtonIds.includes(role.id) && myStyle.disabledImage, // Apply disabledImage style when the button is disabled
                ]}
              />
              {/* <Text style={[myStyle.text]}>
                {role.alias}-{role.player}
              </Text> */}
            </TouchableOpacity>
          ))}
          {/* {team.map((role, i) => (
            <Text key={i} style={[myStyle.text]}>
              {role.alias}-{role.player}
            </Text>
          ))} */}
        </View>

        {/* Render the modal */}
        <MyModal
          role={role}
          isVisible={isModalVisible}
          onClose={handleCloseModal}
          onSubmit={handleNameSubmit}
        />
        {/* Render a button to trigger the modal */}
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Button
          style={
            buttondisable == false ? myStyle.button : myStyle.buttonDisabled
          }
          onPress={() => {
            navigator.navigate('InitialTeam');
          }}>
          <Text style={myStyle.buttonText}>Start the Game</Text>
        </Button>
      </View>
    </View>
  );
};

const myStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  item: {
    width: '20%',
    margin: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    width: '50%',
    height: 60,
    margin: 10,
    padding: 10,
    backgroundColor: '#525FE1',
    borderRadius: 5,
  },
  buttonDisabled: {
    width: '50%',
    margin: 20,
    padding: 10,
    backgroundColor: 'gray',
    borderRadius: 5,
    height: 60,
  },
  image: {
    width: 50,
    height: 50,
    // Add your regular image styles here
  },
  disabledImage: {
    opacity: 0.5, // Set opacity to create a semi-transparent overlay effect when the button is disabled
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default AssignRoles;
