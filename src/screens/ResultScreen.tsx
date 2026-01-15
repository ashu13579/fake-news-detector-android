import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useRoute, RouteProp, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import * as Progress from 'react-native-progress';
import {RootStackParamList} from '../types';

type ResultScreenRouteProp = RouteProp<RootStackParamList, 'Result'>;

const ResultScreen = () => {
  const route = useRoute<ResultScreenRouteProp>();
  const navigation = useNavigation();
  const {result} = route.params;

  const getVerdictColor = () => {
    switch (result.verdict) {
      case 'REAL':
        return ['#10b981', '#059669'];
      case 'FAKE':
        return ['#ef4444', '#dc2626'];
      case 'UNCERTAIN':
        return ['#f59e0b', '#d97706'];
    }
  };

  const getVerdictIcon = () => {
    switch (result.verdict) {
      case 'REAL':
        return 'check-circle';
      case 'FAKE':
        return 'close-circle';
      case 'UNCERTAIN':
        return 'alert-circle';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={getVerdictColor()} style={styles.header}>
        <Icon name={getVerdictIcon()} size={80} color="#fff" />
        <Text style={styles.verdictText}>{result.verdict}</Text>
        <Text style={styles.confidenceText}>
          {result.confidence}% Confidence
        </Text>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Summary</Text>
          <Text style={styles.summaryText}>{result.summary}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Confidence Score</Text>
          <Progress.Bar
            progress={result.confidence / 100}
            width={null}
            height={12}
            color={
              result.confidence >= 80
                ? '#10b981'
                : result.confidence >= 60
                ? '#f59e0b'
                : '#ef4444'
            }
            unfilledColor="#e5e7eb"
            borderWidth={0}
            borderRadius={6}
          />
          <Text style={styles.progressText}>{result.confidence}%</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Detailed Analysis</Text>

          <View style={styles.analysisItem}>
            <Icon name="shield-check" size={20} color="#3b82f6" />
            <View style={styles.analysisContent}>
              <Text style={styles.analysisLabel}>Source Credibility</Text>
              <Text style={styles.analysisText}>
                {result.analysis.sourceCredibility}
              </Text>
            </View>
          </View>

          <View style={styles.analysisItem}>
            <Icon name="text" size={20} color="#3b82f6" />
            <View style={styles.analysisContent}>
              <Text style={styles.analysisLabel}>Language Quality</Text>
              <Text style={styles.analysisText}>
                {result.analysis.languageQuality}
              </Text>
            </View>
          </View>

          <View style={styles.analysisItem}>
            <Icon name="check-decagram" size={20} color="#3b82f6" />
            <View style={styles.analysisContent}>
              <Text style={styles.analysisLabel}>Factual Consistency</Text>
              <Text style={styles.analysisText}>
                {result.analysis.factualConsistency}
              </Text>
            </View>
          </View>

          <View style={styles.analysisItem}>
            <Icon name="scale-balance" size={20} color="#3b82f6" />
            <View style={styles.analysisContent}>
              <Text style={styles.analysisLabel}>Bias Indicators</Text>
              <Text style={styles.analysisText}>
                {result.analysis.biasIndicators}
              </Text>
            </View>
          </View>

          <View style={styles.analysisItem}>
            <Icon name="shield-search" size={20} color="#3b82f6" />
            <View style={styles.analysisContent}>
              <Text style={styles.analysisLabel}>Verification Status</Text>
              <Text style={styles.analysisText}>
                {result.analysis.verificationStatus}
              </Text>
            </View>
          </View>
        </View>

        {result.redFlags.length > 0 && (
          <View style={[styles.card, styles.redFlagsCard]}>
            <View style={styles.cardHeader}>
              <Icon name="alert" size={24} color="#ef4444" />
              <Text style={[styles.cardTitle, styles.redFlagsTitle]}>
                Red Flags Detected
              </Text>
            </View>
            {result.redFlags.map((flag, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listText}>{flag}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={[styles.card, styles.recommendationsCard]}>
          <View style={styles.cardHeader}>
            <Icon name="lightbulb" size={24} color="#3b82f6" />
            <Text style={[styles.cardTitle, styles.recommendationsTitle]}>
              Recommendations
            </Text>
          </View>
          {result.recommendations.map((rec, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.checkmark}>✓</Text>
              <Text style={styles.listText}>{rec}</Text>
            </View>
          ))}
        </View>

        {result.sources && result.sources.length > 0 && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Icon name="link-variant" size={24} color="#3b82f6" />
              <Text style={styles.cardTitle}>Verified Sources</Text>
            </View>
            {result.sources.map((source, index) => (
              <Text key={index} style={styles.sourceLink}>
                {source}
              </Text>
            ))}
          </View>
        )}

        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          Analysis completed at {new Date(result.timestamp).toLocaleString()}
          {'\n\n'}
          This analysis is AI-generated. Always verify important information
          through multiple trusted sources.
        </Text>
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
    padding: 40,
    alignItems: 'center',
  },
  verdictText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 15,
  },
  confidenceText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 5,
    opacity: 0.9,
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 15,
    marginLeft: 10,
  },
  summaryText: {
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 24,
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 10,
    textAlign: 'right',
  },
  analysisItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  analysisContent: {
    flex: 1,
    marginLeft: 15,
  },
  analysisLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 5,
  },
  analysisText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  redFlagsCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#ef4444',
  },
  redFlagsTitle: {
    color: '#ef4444',
  },
  recommendationsCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  recommendationsTitle: {
    color: '#3b82f6',
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  bullet: {
    fontSize: 20,
    color: '#ef4444',
    marginRight: 10,
  },
  checkmark: {
    fontSize: 18,
    color: '#3b82f6',
    marginRight: 10,
  },
  listText: {
    flex: 1,
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },
  sourceLink: {
    fontSize: 14,
    color: '#3b82f6',
    marginBottom: 8,
  },
  doneButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 10,
    padding: 18,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disclaimer: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
  },
});

export default ResultScreen;