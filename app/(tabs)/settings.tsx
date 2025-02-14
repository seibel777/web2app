import { StyleSheet, View, Text, TouchableOpacity, Linking, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

interface ButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  onPress: () => void;
}

const SettingsButton: React.FC<ButtonProps> = ({ icon, title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <View style={styles.buttonContent}>
      <Ionicons name={icon} size={20} color="#FF385C" />
      <Text style={styles.buttonText}>{title}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#72777A" />
  </TouchableOpacity>
);

export default function SettingsScreen() {
  const openPrivacyPolicy = () => {
    Linking.openURL('https://magnattos.com/privacy').catch(() => {
      // Handle error silently
    });
  };

  const openTerms = () => {
    Linking.openURL('https://magnattos.com/terms').catch(() => {
      // Handle error silently
    });
  };

  const openSupport = () => {
    Linking.openURL('mailto:support@magnattos.com').catch(() => {
      // Handle error silently
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <LinearGradient
          colors={['#FF385C', '#FF5C7C']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <Text style={styles.headerTitle}>Magnattos</Text>
          <Text style={styles.headerSubtitle}>Web2App Store</Text>
        </LinearGradient>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Store Information</Text>
        <View style={styles.card}>
          <View style={styles.cardRow}>
            <Ionicons name="phone-portrait-outline" size={20} color="#FF385C" />
            <Text style={styles.cardText}>App Version 1.0.0</Text>
          </View>
          <View style={[styles.cardRow, styles.cardRowBorder]}>
            <Ionicons name="globe-outline" size={20} color="#FF385C" />
            <Text style={styles.cardText}>Web Version 2023.11</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <SettingsButton
          icon="mail-outline"
          title="Contact Support"
          onPress={openSupport}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Legal</Text>
        <SettingsButton
          icon="shield-checkmark-outline"
          title="Privacy Policy"
          onPress={openPrivacyPolicy}
        />
        <SettingsButton
          icon="document-text-outline"
          title="Terms of Service"
          onPress={openTerms}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    paddingBottom: 40,
  },
  header: {
    height: 150,
    marginBottom: 20,
  },
  headerGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1c1c1e',
    marginBottom: 12,
    marginLeft: 4,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  cardRowBorder: {
    borderTopWidth: 1,
    borderTopColor: '#f1f1f1',
  },
  cardText: {
    fontSize: 16,
    color: '#1c1c1e',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  buttonText: {
    fontSize: 16,
    color: '#1c1c1e',
  },
});