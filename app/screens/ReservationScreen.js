import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from "moment";
import "moment/locale/es";

const ReservationScreen = ({ route }) => {
  const navigation = useNavigation();
  const { facility } = route.params;
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [showDatePickerDate, setShowDatePickerDate] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [showDatePickerStartTime, setShowDatePickerStartTime] = useState(false);
  const [endTime, setEndTime] = useState('');
  const [showDatePickerEndTime, setShowDatePickerEndTime] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDatePickerDate(false);
    setDate(currentDate);
  };

  const handleStartTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDatePickerStartTime(false);
    setStartTime(currentDate);
  };

  const handleEndTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDatePickerEndTime(false);
    setEndTime(currentDate);
  };

  const handleSave = async () => {
    if(name == "" || date == "" || startTime == "" || endTime == ""){
      Alert.alert('Campos obligatorios', 'Todos los campos son requeridos.');
    }else{
      const reservationData = {
        name,
        facility,
        date,
        startTime,
        endTime,
      };
      try {
        await AsyncStorage.setItem('reservation', JSON.stringify(reservationData));
        Alert.alert('Reserva registrada', 'Reserva guardada con éxito.', [{text: 'OK', onPress: () => navigation.navigate('Dashboard')}]);
      } catch (error) {
        Alert.alert('Error de registro', 'Error al guardar la reserva.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Realizar reservación</Text>
        <View style={styles.form}>
        <Text style={styles.desc}>{facility}</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre completo"
          placeholderTextColor = "#D4D4D4"
          value={name}
          onChangeText={setName}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Seleccionar Fecha" 
          placeholderTextColor = "#D4D4D4"
          onPressIn={() => setShowDatePickerDate(true)} 
          value={date ? moment(date).format("DD-MM-YYYY") : ""}
        />
        {showDatePickerDate && (
          <DateTimePicker
            testID="dateTimePicker1"
            value={date ? date : new Date()}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleDateChange}
          />
        )}
        <TextInput
          style={styles.input}
          placeholder="Hora de Inicio"
          placeholderTextColor = "#D4D4D4"
          value={startTime ? moment(startTime).format("HH:mm") : ""}
          onFocus={() => setShowDatePickerStartTime(true)}
        />
        {showDatePickerStartTime && (
          <DateTimePicker
            testID="dateTimePicker2"
            value={startTime ? startTime : new Date()}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={handleStartTimeChange}
          />
        )}
        <TextInput
          style={styles.input}
          placeholder="Hora de Finalización"
          placeholderTextColor = "#D4D4D4"
          value={endTime ? moment(endTime).format("HH:mm") : ""}
          onFocus={() => setShowDatePickerEndTime(true)}
        />
        {showDatePickerEndTime && (
          <DateTimePicker
            testID="dateTimePicker3"
            value={endTime ? endTime : new Date()}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={handleEndTimeChange}
          />
        )}
        <Button title="Guardar Reserva" onPress={handleSave} color="#5CC04B"/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#424744',
    padding: 20
  },
  content: {
    borderRadius: 20,
    backgroundColor: '#212121',
    padding: 20,
    width: '100%',
    marginTop: 40,
  },
  title: {
    color: '#5CC04B',
    fontWeight: '700'
  },
  desc: {
    color: '#D4D4D4'  
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#5CC04B',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: '#D4D4D4'
  }
});

export default ReservationScreen;
