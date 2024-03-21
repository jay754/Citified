import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, ScrollView } from 'react-native';

const Search = () => {
  const [term, setTerm] = useState('');
  const [entries, setEntries] = useState([]);

  const searchWord = async () => {
    const apiUrl = `https://api.urbandictionary.com/v0/define?term=${term}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.list && data.list.length > 0) {
        setEntries(data.list); // Store the entire list
      } else {
        setEntries([]);
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
      setEntries([]);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setTerm}
        value={term}
        placeholder="Search a term"
      />
      <Button title="Search" onPress={searchWord} />
      <ScrollView style={styles.resultsContainer}>
        {entries.map((entry, index) => (
          <View key={index} style={styles.entryContainer}>
            <Text style={styles.wordText}>{entry.word}</Text>
            <Text style={styles.definitionText}>Definition: {entry.definition}</Text>
            {entry.example ? <Text style={styles.exampleText}>Example: {entry.example}</Text> : null}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fde4f2'
  },
  input: {
    height: 40,
    width: '100%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  resultsContainer: {
    width: '100%',
    marginTop: 20,
  },
  entryContainer: {
    marginBottom: 20,
  },
  wordText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  definitionText: {
    fontSize: 16,
    marginTop: 5,
  },
  exampleText: {
    fontSize: 16,
    marginTop: 5,
    fontStyle: 'italic',
  },
});

export default Search;