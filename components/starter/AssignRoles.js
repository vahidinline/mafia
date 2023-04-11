import {
  Image,
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Mask from '../../assets/mask.jpeg';
import roles from '../../data/roles';
import _ from 'lodash';

const AssignRoles = ({ route }) => {
  const { players } = route.params;
  const EssentialRoles = _.filter(roles, (role) => role.essential);
  const shuffledArray = _.shuffle(EssentialRoles);
  console.log(shuffledArray);
  return (
    <ScrollView>
      <Text>AssignRoles {players}</Text>
      <View style={myStyle.container}>
        {/* {_.map(shuffledArray, (role) => (
          <TouchableOpacity
            key={role.id}
            style={myStyle.item}
            onPress={() => alert('You tapped the button!')}>
            <Image source={Mask} style={{ width: 100, height: 100 }} />
            <Text key={role.id}>{role.name}</Text>
          </TouchableOpacity>
        ))} */}
      </View>
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
});

export default AssignRoles;
