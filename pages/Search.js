import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native'; // Import Button component

const base_url = "https://api.urbandictionary.com/v0/random";

const Search = () => {
  // State to store the fetched word and its definition
  const [entry, setEntry] = useState({ word: '', definition: '' });

  // Encapsulate fetching logic into a separate function
  const fetchRandomWord = async () => {
    try {
      const response = await fetch(base_url);
      const data = await response.json();
      if (data.list && data.list.length > 0) {
        const firstEntry = data.list[0];
        setEntry({
          word: firstEntry.word,
          definition: firstEntry.definition,
        });
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
      setEntry({
        word: 'Error',
        definition: 'Failed to load data',
      });
    }
  };

  useEffect(() => {
    fetchRandomWord(); // Fetch a random word when the component mounts
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.wordText}>{entry.word}</Text>
      <Text style={styles.definitionText}>{entry.definition}</Text>
      {/* Add a Button component */}
      <Button
        title="Random Word"
        onPress={fetchRandomWord} // Call fetchRandomWord function when the button is pressed
      />
    </View>
  );
};

// Add some basic styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fde4f2',
  },
  wordText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10, // Add some space between the word and its definition
  },
  definitionText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20, // Add some space above the button
  },
});

export default Search;