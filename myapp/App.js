import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button, ScrollView } from 'react-native';

const API_URL = 'http://localhost:5000';

export default function App() {
  const [imoveis, setImoveis] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [dataCompra, setDataCompra] = useState('');
  const [endereco, setEndereco] = useState('');

  useEffect(() => {
    fetchImoveis();
  }, []);

  const fetchImoveis = async () => {
    try {
      const response = await fetch(`${API_URL}/imoveis`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setImoveis(data);
    } catch (error) {
      console.error('Error fetching imoveis:', error.message);
    }
  };

  const addImovel = async () => {
    try {
      const response = await fetch(`${API_URL}/imoveis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          descricao,
          dataCompra,
          endereco,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await fetchImoveis();
      setDescricao('');
      setDataCompra('');
      setEndereco('');
    } catch (error) {
      console.error('Error adding imovel:', error.message);
    }
  };

  const deleteImovel = async (id) => {
    try {
      const response = await fetch(`${API_URL}/imoveis/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await fetchImoveis();
    } catch (error) {
      console.error('Error deleting imovel:', error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Imóveis App</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Descrição"
          value={descricao}
          onChangeText={setDescricao}
        />
        <TextInput
          style={styles.input}
          placeholder="Data de Compra"
          value={dataCompra}
          onChangeText={setDataCompra}
        />
        <TextInput
          style={styles.input}
          placeholder="Endereço"
          value={endereco}
          onChangeText={setEndereco}
        />
        <Button title="Adicionar Imóvel" onPress={addImovel} />
      </View>

      <FlatList
        data={imoveis}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.imovelItem}>
            <Text>{item.descricao}</Text>
            <Text>{item.dataCompra}</Text>
            <Text>{item.endereco}</Text>
            <Button title="Deletar" onPress={() => deleteImovel(item.id)} color="red" />
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 50
  },
  imovelItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
});
