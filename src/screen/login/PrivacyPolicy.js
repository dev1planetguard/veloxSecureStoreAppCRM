import Feather from '@react-native-vector-icons/feather';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text, TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { wp } from '../../utils/responsive';
import { SafeAreaView } from 'react-native-safe-area-context';


// Import local logo asset
const Logo = require('../../../assets/icons/veloxlogo-latest.png');


const PrivacyPolicy = ({navigation}) => {
  return (
     <SafeAreaView style={styles.safe}>
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backBtn}
        activeOpacity={0.7}>
        <Feather name="arrow-left" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} resizeMode="contain" />
      </View>

      <Text style={styles.pageTitle}>Privacy Policy</Text>

      <View style={styles.card}>
        <Text style={styles.text}>
          We respect your privacy and are committed to protecting your personal information. This Privacy Policy
          explains how we collect, use, and safeguard your data when you purchase and use our cybersecurity
          software products.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>1. Information We Collect</Text>
        <Text style={styles.text}>
          We may collect your name, email address, billing information, device identifiers, and usage data when
          you interact with our website or purchase our products.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>2. How We Use Your Information</Text>
        <Text style={styles.text}>
          We use your information to process orders, provide customer support, improve our products and services,
          and comply with legal obligations.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>3. Sharing of Information</Text>
        <Text style={styles.text}>
          We do not sell your personal information. We will not share it with third-party service providers solely
          to facilitate our operations (e.g., payment processors).
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>4. Data Security</Text>
        <Text style={styles.text}>
          We use industry-standard security measures to protect your information from unauthorized access or
          disclosure.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>5. Your Rights</Text>
        <Text style={styles.text}>
          You may request correction if any in your personal data by contacting our support team.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>6. Changes to This Policy</Text>
        <Text style={styles.text}>
          We may update this Privacy Policy periodically and will post updates on our website.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.text}>
          If you have questions, contact us at [support email/contact form].
        </Text>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safe: {
            flex: 1,
            backgroundColor: '#000',
            width: wp('100')
        },
  container: {
    padding: 16,
    backgroundColor: '#000',
    // alignItems: 'center',
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 10,

  },
  logoContainer: {
    width: '100%',
    alignItems: 'center', // centers the image horizontally
    marginBottom: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2979FF',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
  },
  label: {
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 6,
    color: '#2979FF',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#E0E0E0',
  },
   backBtn: { padding: 6 },
});

export default PrivacyPolicy;
