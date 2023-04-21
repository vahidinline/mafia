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
const MyModal = ({ isVisible, onClose, onSubmit, role }) => {
  console.log(role);
  const [name, setName] = useState('');
  const [disabled, setDisabled] = useState(true);
  const { team, setTeam } = useContext(TeamContext);

  const { initialPlayer, setInitialPlayer } = useContext(PlayerContext);

  const handleNameChange = (text) => {
    setDisabled(false);
    setName(text);
  };

  const handleSubmit = () => {
    onSubmit(name);
    setName('');
    role.player = name;
    setInitialPlayer(initialPlayer.filter((player) => player !== name));

    //onClose();

    setDisabled(true);
  };

  return (
    <Modal visible={isVisible} onRequestClose={onClose}>
      <View style={styles.container}>
        <Image source={role?.image} style={{ width: 100, height: 100 }} />
        <Text style={styles.text}>نقش شما: </Text>
        <Text style={styles.role}>{role?.alias}</Text>

        {initialPlayer.map((player, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => handleNameChange(player)}
            style={{
              width: '50%',
              height: 40,
              textAlign: 'center',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              borderColor: '#ccc',
              borderRadius: 15,
              borderWidth: 1,
              marginBottom: 10,
              paddingHorizontal: 10,
            }}>
            <Text>{player}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={{ margin: 10 }}
          disabled={disabled}
          onPress={handleSubmit}>
          تایید
        </Button>
        {/* <Button title="کنسل" onPress={onClose} /> */}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 100,
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
    color: 'black',
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
