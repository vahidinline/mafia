import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const StarterForm = () => {
  const [players, setPlayers] = useState(0);
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>تعداد بازیکنان</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          width: 100,
          textAlign: 'center',
        }}
        placeholder="تعداد بازیکنان را وارد کنید"
        onChange={(e) => {
          setPlayers(e.nativeEvent.text);
        }}></TextInput>

      <Button
        title="شروع بازی"
        onPress={() => {
          navigation.navigate('AssignRoles', { players: players });
        }}
      />
    </View>
  );
};

export default StarterForm;
