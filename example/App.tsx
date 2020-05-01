import React from 'react';
import {
  StyleSheet, Text, View, Button,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDate } from 'rn-useful-hooks';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function App(): JSX.Element {
  const {
    date, mode, show, showDatepicker, showTimepicker, onChangeDate,
  } = useDate(() => []);
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <View>
        <Button onPress={showDatepicker} title="Show date picker!" />
      </View>
      <View>
        <Button onPress={showTimepicker} title="Show time picker!" />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
        />
      )}
    </View>
  );
}
