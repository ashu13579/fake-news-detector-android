import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SettingsScreen = () => {
  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>

        <View style={styles.card}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Version</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Developer</Text>
            <Text style={styles.infoValue}>ASHUTOSH YADAV</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>23053934@kiit.ac.in</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resources</Text>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() =>
            openLink('https://github.com/ashu13579/fake-news-detector-android')
          }>
          <Icon name="github" size={24} color="#1f2937" />
          <Text style={styles.menuText}>GitHub Repository</Text>
          <Icon name="chevron-right" size={24} color="#9ca3af" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => openLink('https://www.snopes.com')}>
          <Icon name="web" size={24} color="#1f2937" />
          <Text style={styles.menuText}>Snopes Fact Checking</Text>
          <Icon name="chevron-right" size={24} color="#9ca3af" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => openLink('https://www.factcheck.org')}>
          <Icon name="web" size={24} color="#1f2937" />
          <Text style={styles.menuText}>FactCheck.org</Text>
          <Icon name="chevron-right" size={24} color="#9ca3af" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => openLink('https://www.politifact.com')}>
          <Icon name="web" size={24} color="#1f2937" />
          <Text style={styles.menuText}>PolitiFact</Text>
          <Icon name="chevron-right" size={24} color="#9ca3af" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Legal</Text>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="file-document" size={24} color="#1f2937" />
          <Text style={styles.menuText}>Privacy Policy</Text>
          <Icon name="chevron-right" size={24} color="#9ca3af" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="file-document" size={24} color="#1f2937" />
          <Text style={styles.menuText}>Terms of Service</Text>
          <Icon name="chevron-right" size={24} color="#9ca3af" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="license" size={24} color="#1f2937" />
          <Text style={styles.menuText}>Open Source Licenses</Text>
          <Icon name="chevron-right" size={24} color="#9ca3af" />
        </TouchableOpacity>
      </View>

      <View style={styles.disclaimerCard}>
        <Icon name="information" size={24} color="#3b82f6" />
        <Text style={styles.disclaimerText}>
          This app uses AI to detect potential misinformation. Results should be
          used as guidance only. Always verify important information through
          multiple trusted sources and use critical thinking.
        </Text>
      </View>

      <Text style={styles.footer}>
        Made with ❤️ by ASHUTOSH YADAV{'\n'}© 2026 All rights reserved
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6b7280',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  infoLabel: {
    fontSize: 16,
    color: '#6b7280',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 2,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
    marginLeft: 15,
  },
  disclaimerCard: {
    flexDirection: 'row',
    backgroundColor: '#dbeafe',
    padding: 15,
    borderRadius: 12,
    margin: 20,
    alignItems: 'flex-start',
  },
  disclaimerText: {
    flex: 1,
    fontSize: 14,
    color: '#1e40af',
    marginLeft: 10,
    lineHeight: 20,
  },
  footer: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    padding: 20,
    lineHeight: 20,
  },
});

export default SettingsScreen;