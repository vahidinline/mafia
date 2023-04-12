import React, { useState } from 'react';
import { Modal, View, TextInput, Button, StyleSheet, Text } from 'react-native';

const MyModal = ({ isVisible, onClose, onSubmit, role }) => {
  console.log('role', role);
  const [name, setName] = useState('');

  const handleNameChange = (text) => {
    setName(text);
  };

  const handleSubmit = () => {
    onSubmit(name);
    setName('');
    onClose();
  };

  return (
    <Modal visible={isVisible} onRequestClose={onClose}>
      <View style={styles.container}>
        <Text style={styles.text}>نقش شما: {role?.alias}</Text>
        <TextInput
          style={styles.input}
          placeholder="اگه گفتی اسمت چی بود؟"
          onChangeText={handleNameChange}
          value={name}
        />
        <View style={styles.buttonContainer}>
          <Button title="ثبت" onPress={handleSubmit} />
          {/* <Button title="کنسل" onPress={onClose} /> */}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
});

export default MyModal;
