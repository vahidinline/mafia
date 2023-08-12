import { ScrollView, Text, View } from 'react-native';
import { useContext, useEffect } from 'react';
import TeamContext from '../../context/teamcontext';
import { Appbar, Button, DataTable } from 'react-native-paper';
import { RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import App from '../../App';
const InitialTeam = () => {
  const navigator = useNavigation();
  const { team, setTeam } = useContext(TeamContext);
  //   useEffect(() => {
  //     setTeam([]);
  //   }, []);
  return (
    <ScrollView>
      <Appbar.Header
        style={{
          backgroundColor: '#525FE1',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0.5,
          borderBottomColor: '#ccc',
        }}>
        <Appbar.BackAction color="white" onPress={() => navigator.goBack()} />
        <Appbar.Content color="white" title="List" />
      </Appbar.Header>

      <DataTable.Header>
        <DataTable.Title>اسم</DataTable.Title>
        <DataTable.Title>نقش</DataTable.Title>
      </DataTable.Header>
      {team.map((item, index) => {
        return (
          <View key={index}>
            <DataTable style={{ margin: 10 }}>
              <DataTable.Row>
                <DataTable.Cell>{item.player}</DataTable.Cell>
                <DataTable.Cell>{item.alias}</DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          </View>
        );
      })}
      <View>
        <Button
          mode="contained"
          onPress={() => navigator.navigate('game')}
          style={{ margin: 10, backgroundColor: 'green', borderRadius: 1 }}>
          Start{' '}
        </Button>
      </View>
    </ScrollView>
  );
};

export default InitialTeam;
