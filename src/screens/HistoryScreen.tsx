import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RootStackParamList, HistoryItem} from '../types';
import {getHistory, clearHistory} from '../services/storage';

type HistoryScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'History'
>;

const HistoryScreen = () => {
  const navigation = useNavigation<HistoryScreenNavigationProp>();
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const data = await getHistory();
    setHistory(data);
  };

  const handleClearHistory = () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear all analysis history?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            await clearHistory();
            setHistory([]);
          },
        },
      ],
    );
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'REAL':
        return '#10b981';
      case 'FAKE':
        return '#ef4444';
      case 'UNCERTAIN':
        return '#f59e0b';
      default:
        return '#6b7280';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'text':
        return 'text-box';
      case 'url':
        return 'link-variant';
      case 'image':
        return 'image';
      case 'video':
        return 'video';
      case 'headline':
        return 'newspaper';
      default:
        return 'file';
    }
  };

  const renderItem = ({item}: {item: HistoryItem}) => (
    <TouchableOpacity
      style={styles.historyItem}
      onPress={() => navigation.navigate('Result', {result: item.result})}>
      <View style={styles.itemHeader}>
        <Icon name={getTypeIcon(item.type)} size={24} color="#3b82f6" />
        <View style={styles.itemInfo}>
          <Text style={styles.itemType}>{item.type.toUpperCase()}</Text>
          <Text style={styles.itemDate}>
            {new Date(item.timestamp).toLocaleDateString()}
          </Text>
        </View>
        <View
          style={[
            styles.verdictBadge,
            {backgroundColor: getVerdictColor(item.result.verdict)},
          ]}>
          <Text style={styles.verdictText}>{item.result.verdict}</Text>
        </View>
      </View>
      <Text style={styles.itemContent} numberOfLines={2}>
        {item.content}
      </Text>
      <View style={styles.itemFooter}>
        <Text style={styles.confidenceText}>
          Confidence: {item.result.confidence}%
        </Text>
        <Icon name="chevron-right" size={20} color="#9ca3af" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {history.length > 0 ? (
        <>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              {history.length} {history.length === 1 ? 'Analysis' : 'Analyses'}
            </Text>
            <TouchableOpacity onPress={handleClearHistory}>
              <Text style={styles.clearButton}>Clear All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={history}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.list}
          />
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Icon name="history" size={80} color="#d1d5db" />
          <Text style={styles.emptyText}>No analysis history yet</Text>
          <Text style={styles.emptySubtext}>
            Your analyzed content will appear here
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  clearButton: {
    fontSize: 14,
    color: '#ef4444',
    fontWeight: '600',
  },
  list: {
    padding: 15,
  },
  historyItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    elevation: 2,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemType: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  itemDate: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  verdictBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  verdictText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  itemContent: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 10,
    lineHeight: 20,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  confidenceText: {
    fontSize: 12,
    color: '#6b7280',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#6b7280',
    marginTop: 20,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default HistoryScreen;