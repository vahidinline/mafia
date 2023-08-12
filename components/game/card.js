import _ from 'lodash';
import { useContext, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native';
import CardContext from '../../context/cardcontext';

const Cards = () => {
  const { card, setCard } = useContext(CardContext);
  const [show, setShow] = useState(false);
  const handleCards = (item) => {
    console.log('item', item);
    setCard(card.filter((card) => card !== item));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>کارت ها</Text>
      <View style={styles.cardContainer}>
        {_.shuffle(card).map((item, index) => {
          return (
            <View key={index} style={styles.card}>
              <TouchableOpacity onPress={() => handleCards(item)}>
                <Text style={styles.cardText}>
                  {index + 1}-{item.name}{' '}
                </Text>
              </TouchableOpacity>
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
    backgroundColor: '#FFA41B',
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
    backgroundColor: '#eee',
  },
  card: {
    width: '40%',
    height: 100,
    backgroundColor: '#FFA41B',
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
