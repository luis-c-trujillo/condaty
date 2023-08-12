import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const [facilities] = useState([
    'Área social',
    'Churrasquera',
    'Cancha',
    'Sala de reunión',
    'Cine',
  ]);

  const handleFacilityPress = (facility) => {
    navigation.navigate('Reservation', { facility });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Reservar instalación</Text>
        <Text style={styles.desc}>La siguiente lista son instalaciones disponibles para reservar llenando los datos de la siguiente pantalla.</Text>
        <ScrollView style={styles.facility} horizontal={true} >
        {facilities.map((facility, index) => (
        <TouchableOpacity
          key={index}
          style={styles.facilityBox}
          onPress={() => handleFacilityPress(facility)}
        >
          <Text style={styles.text}>{facility}</Text>
        </TouchableOpacity>
      ))}
      </ScrollView>
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
  facility: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
  },
  facilityBox: {
    borderRadius: 20,
    width: 80,
    height: 80,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00cf80',
  },
  text: {
    fontSize: 12,
  }
});

export default HomeScreen;
