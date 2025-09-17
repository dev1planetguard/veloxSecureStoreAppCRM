import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const OnCall = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>On Call</Text>
      <Text style={styles.subtitle}>Log and manage your phone-based interactions here.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#94a3b8',
  },
})

export default OnCall


