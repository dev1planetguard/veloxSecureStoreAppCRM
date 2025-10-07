import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Feather from 'react-native-vector-icons/Feather'
import { API_BASE_URL } from '../../config/config'

function SalesPersonDetails() {
  const navigation = useNavigation()
  const [salesPersons, setSalesPersons] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSalesPersons = async () => {
      setLoading(true)
      try {
        const token = await AsyncStorage.getItem('jwtToken')
        const response = await fetch(
          `${API_BASE_URL}/userRole/getRoleList/sales`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token ? `Bearer ${token}` : '',
            },
          }
        )

        const result = await response.json()
        if (result.statusCode === 200) {
          setSalesPersons(result.data || [])
        } else {
          Alert.alert('Failed to fetch sales person details')
        }
      } catch (error) {
        Alert.alert('Error', 'Network error fetching sales persons')
      } finally {
        setLoading(false)
      }
    }

    fetchSalesPersons()
  }, [])

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('SalesActivity', { salesPerson: item })}
    >
      <Text style={styles.name}>
        Sales Person Name: {item.firstName} {item.lastName}
      </Text>
      <Text style={styles.field}>Email: {item.email}</Text>
      <Text style={styles.field}>
        Location: {item.billingAddress?.street || ''} {item.billingAddress?.city || ''} {item.billingAddress?.state || ''}
      </Text>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.openDrawer()}>
          <Feather name="menu" size={26} color="#60A5FA" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sales Person Details</Text>
      </View>

      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#60A5FA" />
        ) : (
          <FlatList
            data={salesPersons}
            keyExtractor={(item) => (item.id != null ? String(item.id) : `${item.email}`)}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No sales persons found.</Text>
            }
          />
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0F172A' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  backBtn: { marginRight: 12 },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  list: {
    padding: 12,
    paddingBottom: 70,
  },
  emptyText: {
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  name: {
    color: '#60A5FA',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  field: {
    color: '#E2E8F0',
    fontSize: 14,
    marginTop: 4,
  },
  container: {
    flex: 1,
  },
})

export default SalesPersonDetails


