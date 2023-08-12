import React, { useState, useContext } from 'react';
import {
  Modal,
  View,
  TextInput,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import TeamContext from '../../context/teamcontext';
import { Button } from 'react-native-paper';
import PlayerContext from '../../context/playercontext';
import { set } from 'lodash';
const MyModal = ({ isVisible, onClose, onSubmit, role }) => {
  const [name, setName] = useState('');
  const [disabled, setDisabled] = useState(true);
  const { team, setTeam } = useContext(TeamContext);

  const { initialPlayer, setInitialPlayer } = useContext(PlayerContext);

  const handleNameChange = (text) => {
    setDisabled(false);
    setName(text);
  };

  const handleSubmit = (name) => {
    // console.log('player in modal', name);
    onSubmit(name);
    setName(name);
    role.player = name;

    setInitialPlayer(initialPlayer.filter((player) => player !== name));

    onClose();
  };

  return (
    <Modal visible={isVisible} onRequestClose={onClose}>
      <View style={styles.container}>
        <Image source={role?.image} style={{ width: 100, height: 100 }} />
        <Text style={styles.text}> Role is: {role?.name}</Text>

        {initialPlayer.map((player, i) => {
          const itemNumber = i + 1;
          return (
            <TouchableOpacity
              key={i}
              onPress={() => handleSubmit(player)}
              style={{
                width: '50%',
                height: 40,
                textAlign: 'center',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                borderColor: '#ccc',
                borderRadius: 5,
                borderWidth: 0.5,
                marginBottom: 10,
                shadowColor: '#000',

                paddingHorizontal: 10,
              }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{player}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.buttonContainer}>
        {/* <Button
          mode="contained"
          style={{ margin: 10, backgroundColor: 'green', borderRadius: 1 }}
          disabled={disabled}
          onPress={handleSubmit}>
          <Text style={{ color: 'white' }}>Done</Text>
        </Button> */}
        {/* <Button title="کنسل" onPress={onClose} /> */}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFA41B',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 150,
    top: 0,
  },
  input: {
    width: '80%',
    height: 40,
    textAlign: 'center',
    borderColor: '#ccc',
    borderRadius: 15,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
    color: '#fff',
  },
  role: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
});

export default MyModal;
