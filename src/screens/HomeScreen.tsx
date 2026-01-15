import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import {RootStackParamList, InputType} from '../types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const {width} = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const analysisOptions = [
    {
      type: 'text' as InputType,
      title: 'Text Analysis',
      icon: 'text-box',
      description: 'Analyze news articles and posts',
      color: ['#3b82f6', '#2563eb'],
    },
    {
      type: 'url' as InputType,
      title: 'URL Analysis',
      icon: 'link-variant',
      description: 'Check news from web links',
      color: ['#8b5cf6', '#7c3aed'],
    },
    {
      type: 'image' as InputType,
      title: 'Image Analysis',
      icon: 'image',
      description: 'Verify images and screenshots',
      color: ['#ec4899', '#db2777'],
    },
    {
      type: 'video' as InputType,
      title: 'Video Analysis',
      icon: 'video',
      description: 'Analyze video content',
      color: ['#f59e0b', '#d97706'],
    },
    {
      type: 'headline' as InputType,
      title: 'Headline Check',
      icon: 'newspaper',
      description: 'Quick headline verification',
      color: ['#10b981', '#059669'],
    },
  ];

  const handleAnalysisType = (type: InputType) => {
    navigation.navigate('Analysis', {type});
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#1e40af', '#3b82f6']}
        style={styles.header}>
        <Icon name="shield-check" size={60} color="#fff" />
        <Text style={styles.headerTitle}>Fake News Detector</Text>
        <Text style={styles.headerSubtitle}>
          AI-Powered Truth Verification
        </Text>
      </LinearGradient>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Choose Analysis Type</Text>

        <View style={styles.optionsContainer}>
          {analysisOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleAnalysisType(option.type)}
              style={styles.optionCard}>
              <LinearGradient
                colors={option.color}
                style={styles.optionGradient}>
                <Icon name={option.icon} size={40} color="#fff" />
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionDescription}>
                  {option.description}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('History')}>
            <Icon name="history" size={24} color="#1e40af" />
            <Text style={styles.actionText}>History</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Settings')}>
            <Icon name="cog" size={24} color="#1e40af" />
            <Text style={styles.actionText}>Settings</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          <Icon name="information" size={24} color="#3b82f6" />
          <Text style={styles.infoText}>
            This app uses AI to detect potential misinformation. Always verify
            important news through multiple trusted sources.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    padding: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 15,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#e0e7ff',
    marginTop: 5,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 15,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionCard: {
    width: (width - 50) / 2,
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
  },
  optionGradient: {
    padding: 20,
    alignItems: 'center',
    minHeight: 150,
    justifyContent: 'center',
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
  },
  optionDescription: {
    fontSize: 12,
    color: '#e0e7ff',
    marginTop: 5,
    textAlign: 'center',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    minWidth: 140,
    justifyContent: 'center',
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e40af',
    marginLeft: 8,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#dbeafe',
    padding: 15,
    borderRadius: 10,
    alignItems: 'flex-start',
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#1e40af',
    marginLeft: 10,
    lineHeight: 20,
  },
});

export default HomeScreen;