import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {View , Text, TouchableOpacity} from 'react-native'
import { StyleSheet } from 'react-native';


export default function HomeScreen({navigation,route}){

useEffect(() => {
  const api_url = '';

  axios.get(api_url)
    .then(response => {
      setpokemon(response.data.results);
      console.log('pokemon', pokemon);
    })
    .catch(error => {
      console.error(error);
    });

}, [route.params.title]);

const title = route?.params?.title ?? 'Home Screen';

const [pokemon, setpokemon] = useState([]);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}> {title} </Text>
  <TouchableOpacity style={styles.button}
    onPress={() => navigation.goBack()}
    >
        <Text style = {styles.buttonText}>go to Home Screen</Text>
      </TouchableOpacity>
      <TouchableOpacity style = {styles.backButton} 
      onPress={() => navigation.goBack()}>
        <Text style = {styles.buttonText}>go to Detail Screen</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafc', padding: 24 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#0f172a', marginBottom: 24 },
  button: { backgroundColor: '#0284c7', paddingVertical: 16, paddingHorizontal: 28, borderRadius: 12 },
  backButton: { backgroundColor: '#475569', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 10, marginTop: 24 },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  card: { backgroundColor: '#ffffff', width: '100%', padding: 24, borderRadius: 16, borderWidth: 1, borderColor: '#cbd5e1' },
  infoText: { fontSize: 18, color: '#1e293b', marginBottom: 12, fontWeight: '600' },
  studentText: { fontSize: 16, color: '#059669', marginTop: 8, fontWeight: 'bold' },
});
