import AsyncStorage from '@react-native-async-storage/async-storage';
import {HistoryItem, AnalysisResult, InputType} from '../types';

const HISTORY_KEY = '@fake_news_detector_history';

export async function saveToHistory(
  type: InputType,
  content: string,
  result: AnalysisResult,
): Promise<void> {
  try {
    const history = await getHistory();
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      type,
      content: content.substring(0, 200), // Store first 200 chars
      result,
      timestamp: new Date().toISOString(),
    };

    // Add to beginning of array and limit to 50 items
    const updatedHistory = [newItem, ...history].slice(0, 50);
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error('Error saving to history:', error);
  }
}

export async function getHistory(): Promise<HistoryItem[]> {
  try {
    const data = await AsyncStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting history:', error);
    return [];
  }
}

export async function clearHistory(): Promise<void> {
  try {
    await AsyncStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error('Error clearing history:', error);
  }
}

export async function deleteHistoryItem(id: string): Promise<void> {
  try {
    const history = await getHistory();
    const updatedHistory = history.filter(item => item.id !== id);
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error('Error deleting history item:', error);
  }
}