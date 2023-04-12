import React, { useEffect, useState } from 'react';
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
import { six, seven, eight } from '../../data/roles';
import _ from 'lodash';
import MyModal from './Modal';
import { useNavigation } from '@react-navigation/native';

const AssignRoles = ({ route }) => {
  const navigator = useNavigation();
  const { players } = route.params;
  const [rolesArray, setRolesArray] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState();
  const [disabledButtonIds, setDisabledButtonIds] = useState([]);

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

  useEffect(() => {
    if (players === 8) {
      setRolesArray(_.shuffle(eight));
    } else if (players === 7) {
      setRolesArray(_.shuffle(seven));
    } else if (players === 6) {
      setRolesArray(_.shuffle(six));
    }
  }, [players]);

  return (
    <ScrollView>
      <Text>AssignRoles {players}</Text>

      <View style={myStyle.container}>
        {rolesArray?.map((role) => (
          <TouchableOpacity
            key={role.id}
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
      </View>

      {/* Render the modal */}
      <MyModal
        role={role}
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        onSubmit={handleNameSubmit}
      />
      {/* Render a button to trigger the modal */}
      <TouchableOpacity
        style={myStyle.button}
        onPress={() => {
          navigator.navigate('InitialTeam', { players });
        }}>
        <Text style={myStyle.buttonText}>شروع بازی</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const myStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  item: {
    width: '30%',
    margin: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    margin: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
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
