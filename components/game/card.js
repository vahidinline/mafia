import _ from 'lodash';
import { useContext, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native';
import CardContext from '../../context/cardcontext';
import { Badge } from 'react-native-paper';

const Cards = () => {
  const { card, setCard } = useContext(CardContext);
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');

  const handleCards = (item) => {
    setDescription(item.desc);
    setName(item.name);
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
                <Badge
                  style={{ backgroundColor: '#525FE1', color: '#fff' }}
                  size={50}>
                  {index + 1}
                </Badge>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
      <Text style={styles.cardText}>{name} </Text>
      <Text>{description}</Text>
      <View></View>
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
  },
});

export default Cards;
