import { ScrollView, Text, View } from 'react-native';
import { useContext, useEffect } from 'react';
import TeamContext from '../../context/teamcontext';
import { Button, DataTable } from 'react-native-paper';
import { RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
const InitialTeam = () => {
  const navigator = useNavigation();
  const { team, setTeam } = useContext(TeamContext);
  //   useEffect(() => {
  //     setTeam([]);
  //   }, []);
  return (
    <ScrollView>
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
          onPress={() => navigator.navigate('night')}
          style={{ margin: 10 }}>
          شروع بازی
        </Button>
      </View>
    </ScrollView>
  );
};

export default InitialTeam;
