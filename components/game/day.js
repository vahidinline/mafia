import {
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, DataTable, Text } from 'react-native-paper';
import TeamContext from '../../context/teamcontext';
import { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/base';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
import { StyleSheet } from 'react-native';

const Day = () => {
  const { team, setTeam } = useContext(TeamContext);
  console.log('team', team);
  const navigator = useNavigation();
  const [isTimerStart, setIsTimerStart] = useState(false);
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [timerDuration, setTimerDuration] = useState(30000);
  const [resetTimer, setResetTimer] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);
  return (
    <ScrollView>
      {team.map((item, index) => {
        return (
          <View key={index}>
            <DataTable style={{ margin: 10 }}>
              <DataTable.Row>
                <DataTable.Cell>{item.player}</DataTable.Cell>
                <DataTable.Cell>{item.alias}</DataTable.Cell>
                <DataTable.Cell>
                  {item.guard ? (
                    <Icon name="shield" size={20} color="green" />
                  ) : null}
                </DataTable.Cell>
                <DataTable.Cell>
                  <Icon
                    name="delete"
                    onPress={() => {
                      const newTeam = team.filter((item, i) => i !== index);
                      setTeam(newTeam);
                    }}
                    size={20}
                    color="red"
                  />
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          </View>
        );
      })}
      <Button
        mode="contained"
        onPress={() => navigator.navigate('night')}
        style={{ margin: 10 }}>
        شب
      </Button>
      <View style={styles.sectionStyle}>
        <Text style={styles.title}>تایمر </Text>
        <Timer
          totalDuration={timerDuration}
          msecs
          //Time Duration
          start={isTimerStart}
          //To start
          reset={resetTimer}
          //To reset
          options={options}
          //options for the styling
          handleFinish={() => {}}
          //can call a function On finish of the time
          getTime={(time) => {
            console.log(time);
          }}
        />
        <TouchableHighlight
          onPress={() => {
            setIsTimerStart(!isTimerStart);
            setResetTimer(false);
          }}>
          <Text style={styles.buttonText}>
            {!isTimerStart ? 'شروع' : 'توقف'}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            setIsTimerStart(false);
            setResetTimer(true);
          }}>
          <Text style={styles.buttonText}>ریست</Text>
        </TouchableHighlight>
      </View>
      <Button
        mode="contained"
        onPress={() => navigator.navigate('card')}
        style={{ margin: 10 }}>
        کارت ها
      </Button>
      <Button
        mode="contained"
        onPress={() => navigator.navigate('InitialTeam')}
        style={{ margin: 10 }}>
        برگشت{' '}
      </Button>
    </ScrollView>
  );
};

const options = {
  container: {
    backgroundColor: '#FF0000',
    padding: 5,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    color: '#FFF',
    marginLeft: 7,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  sectionStyle: {
    flex: 1,
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    marginTop: 10,
  },
});

export default Day;
