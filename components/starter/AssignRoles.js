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

const AssignRoles = ({ route }) => {
  const navigator = useNavigation();
  const { team } = route.params;
  const { initialPlayer } = useContext(PlayerContext);
  const [rolesArray, setRolesArray] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState();
  const [disabledButtonIds, setDisabledButtonIds] = useState([]);
  const [buttondisable, setButtondisable] = useState(true);
  console.log('disabledButtonIds', disabledButtonIds.length);

  useEffect(() => {
    if (disabledButtonIds.length === team.length) {
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

  useEffect(() => {}, [rolesArray]);

  return (
    <>
      <ScrollView style={{ backgroundColor: '#fff' }}>
        <View style={myStyle.container}>
          {team?.map((role, i) => (
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
            </TouchableOpacity>
          ))}
          {team.map((role, i) => (
            <Text key={i} style={[myStyle.text]}>
              {role.alias}-{role.player}
            </Text>
          ))}
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
          flex: 1,
          flexDirection: 'row',
          backgroundColor: '#fff',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          style={myStyle.button}
          onPress={() => {
            navigator.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            });
          }}>
          <Text style={myStyle.buttonText}>بازگشت</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            disabledButtonIds.length !== rolesArray.length
              ? myStyle.button
              : myStyle.buttonDisabled
          }
          //disabled={disabledButtonIds.length === team.length ? true : false}
          onPress={() => {
            navigator.navigate('InitialTeam');
          }}>
          <Text style={myStyle.buttonText}>شروع بازی</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const myStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  item: {
    width: '40%',
    margin: 15,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    width: '50%',
    height: 50,
    margin: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  buttonDisabled: {
    width: '50%',
    margin: 20,
    padding: 10,
    backgroundColor: 'gray',
    borderRadius: 5,
    height: 50,
  },
  image: {
    width: 100,
    height: 100,
    // Add your regular image styles here
  },
  disabledImage: {
    opacity: 0.5, // Set opacity to create a semi-transparent overlay effect when the button is disabled
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default AssignRoles;
