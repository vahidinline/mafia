import { useEffect, useState } from 'react';
import { View, TouchableHighlight, StyleSheet } from 'react-native';
import { Timer } from 'react-native-stopwatch-timer';
import { Audio } from 'expo-av';

const options = {
  container: {
    padding: 5,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    color: '#fff',
    marginLeft: 7,
  },
};

const CoutnDown = () => {
  const [isTimerStart, setIsTimerStart] = useState(false);
  const [timerDuration, setTimerDuration] = useState(40000);
  //const [sound, setSound] = useState();

  //   const playSound = async () => {
  //     try {
  //       const { sound } = await Audio.Sound.createAsync({
  //         uri: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3',
  //       });
  //       setSound(sound);
  //       await sound.playAsync();
  //       console.log('Playing sound');
  //     } catch (error) {
  //       console.log('Error playing sound:', error);
  //     }
  //   };

  //   useEffect(() => {
  //     let timeoutId;

  //     if (isTimerStart) {
  //       timeoutId = setTimeout(() => {
  //         setIsTimerStart(false);
  //         playSound();
  //       }, timerDuration);
  //     }

  //     return () => clearTimeout(timeoutId);
  //   }, [isTimerStart, timerDuration]); // Include timerDuration in the dependencies

  //   useEffect(() => {
  //     return () => {
  //       if (sound) {
  //         sound.unloadAsync();
  //       }
  //     };
  //   }, [sound]);

  return (
    <View style={styles.sectionStyle}>
      <TouchableHighlight
        onPress={() => {
          setIsTimerStart(!isTimerStart);
        }}>
        <Timer
          totalDuration={timerDuration}
          msec
          start={isTimerStart}
          options={options}
          handleFinish={() => {}}
        />
      </TouchableHighlight>
    </View>
  );
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
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 20,
    marginTop: 10,
  },
});

export default CoutnDown;
