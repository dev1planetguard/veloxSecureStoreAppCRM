import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { wp } from '../../utils/responsive';
import Feather from '@react-native-vector-icons/feather';



// Import local logo asset
const Logo = require('../../../assets/icons/veloxlogo-latest.png');

const TermsOfService = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView contentContainerStyle={styles.container}>

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backBtn}
                    activeOpacity={0.7}
                >
                    <Feather name="arrow-left" size={24} color="#fff" />
                </TouchableOpacity>

                <View style={styles.logoContainer}>
                    <Image source={Logo} style={styles.logo} resizeMode="contain" />
                </View>

                <Text style={styles.pageTitle}>Terms and Conditions</Text>

                <View style={styles.card}>
                    <Text style={styles.text}>
                        By purchasing or using our cybersecurity software products, you agree to the following terms and
                        conditions:
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.label}>1. License Grant</Text>
                    <Text style={styles.text}>
                        We grant you a non-transferable license to use our software in accordance with
                        the terms specified in the License Agreement shared at the time of purchase.
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.label}>2. Restrictions</Text>
                    <Text style={styles.text}>
                        You may not reverse-engineer, modify, or redistribute the software.
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.label}>3. Intellectual Property</Text>
                    <Text style={styles.text}>
                        All rights, titles, and interests in the software remain with Velox.
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.label}>4. Disclaimer</Text>
                    <Text style={styles.text}>
                        Our software is provided "as is" without warranties of any kind. We disclaim liability
                        for damages arising from use of our products.
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.label}>5. Limitation of Liability</Text>
                    <Text style={styles.text}>
                        Our total liability is limited to the amount you paid for the software.
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.label}>6. Changes</Text>
                    <Text style={styles.text}>
                        We reserve the right to update these terms at any time.
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
    backBtn: { padding: 6 },

    container: {
        padding: 16,
        backgroundColor: '#000',

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

});



export default TermsOfService;
