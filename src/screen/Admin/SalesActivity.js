import React from 'react'
import { SafeAreaView, Text, View, StyleSheet } from 'react-native'

export default function SalesActivity({ route }) {
  const { salesPerson } = route.params || {}

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Sales Activity</Text>
        <Text style={styles.subtitle}>{salesPerson?.firstName} {salesPerson?.lastName}</Text>
        {/* TODO: Implement activity listing per sales person */}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#000' },
  container: { flex: 1, padding: 16 },
  title: { color: '#fff', fontSize: 20, fontWeight: '700', marginBottom: 8 },
  subtitle: { color: '#ccc' },
})


