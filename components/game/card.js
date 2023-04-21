import _ from 'lodash';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native';

const data = ['ذهن زیبا', 'تغییر چهره', 'بی خوابی', 'دستبند'];
const Cards = () => {
  const [show, setShow] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>کارت ها</Text>
      <View style={styles.cardContainer}>
        {_.shuffle(data).map((item, index) => {
          return (
            <View key={index} style={styles.card}>
              <TouchableOpacity onPress={() => setShow(!show)}>
                <Text style={styles.cardText}>{index + 1}</Text>
              </TouchableOpacity>
              {show && <Text style={styles.cardText}>{item}</Text>}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    width: '40%',
    height: 100,
    backgroundColor: '#ccc',
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Cards;
