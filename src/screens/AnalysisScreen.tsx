import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchImageLibrary} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import Toast from 'react-native-toast-message';
import {RootStackParamList} from '../types';
import {analyzeContent} from '../services/api';

type AnalysisScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Analysis'
>;
type AnalysisScreenRouteProp = RouteProp<RootStackParamList, 'Analysis'>;

const AnalysisScreen = () => {
  const navigation = useNavigation<AnalysisScreenNavigationProp>();
  const route = useRoute<AnalysisScreenRouteProp>();
  const {type} = route.params;

  const [content, setContent] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImagePick = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
      });

      if (result.assets && result.assets[0].uri) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to pick image',
      });
    }
  };

  const handleVideoPick = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.video],
      });

      if (result[0].uri) {
        setVideoUri(result[0].uri);
      }
    } catch (error) {
      if (!DocumentPicker.isCancel(error)) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to pick video',
        });
      }
    }
  };

  const handleAnalyze = async () => {
    if (!content && !imageUri && !videoUri) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please provide content to analyze',
      });
      return;
    }

    setIsLoading(true);
    try {
      const analysisContent = imageUri || videoUri || content;
      const result = await analyzeContent(type, analysisContent);

      navigation.navigate('Result', {result});
      Toast.show({
        type: 'success',
        text1: 'Analysis Complete',
        text2: `Verdict: ${result.verdict}`,
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Analysis Failed',
        text2: 'Please try again',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderInput = () => {
    switch (type) {
      case 'text':
        return (
          <TextInput
            style={styles.textInput}
            placeholder="Paste the news article or text content here..."
            multiline
            numberOfLines={10}
            value={content}
            onChangeText={setContent}
            textAlignVertical="top"
          />
        );

      case 'url':
        return (
          <TextInput
            style={styles.urlInput}
            placeholder="https://example.com/news-article"
            value={content}
            onChangeText={setContent}
            keyboardType="url"
            autoCapitalize="none"
          />
        );

      case 'image':
        return (
          <View style={styles.mediaContainer}>
            {imageUri ? (
              <View style={styles.imagePreview}>
                <Image source={{uri: imageUri}} style={styles.previewImage} />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => setImageUri(null)}>
                  <Icon name="close-circle" size={30} color="#ef4444" />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={handleImagePick}>
                <Icon name="image-plus" size={50} color="#3b82f6" />
                <Text style={styles.uploadText}>Tap to select image</Text>
              </TouchableOpacity>
            )}
          </View>
        );

      case 'video':
        return (
          <View style={styles.mediaContainer}>
            {videoUri ? (
              <View style={styles.videoPreview}>
                <Icon name="video" size={80} color="#3b82f6" />
                <Text style={styles.videoName}>Video selected</Text>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => setVideoUri(null)}>
                  <Icon name="close-circle" size={30} color="#ef4444" />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={handleVideoPick}>
                <Icon name="video-plus" size={50} color="#3b82f6" />
                <Text style={styles.uploadText}>Tap to select video</Text>
              </TouchableOpacity>
            )}
          </View>
        );

      case 'headline':
        return (
          <TextInput
            style={styles.headlineInput}
            placeholder="Enter the news headline..."
            value={content}
            onChangeText={setContent}
            multiline
            numberOfLines={3}
          />
        );

      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.infoCard}>
          <Icon name="information" size={24} color="#3b82f6" />
          <Text style={styles.infoText}>
            {type === 'text' && 'Paste or type the content you want to verify'}
            {type === 'url' && 'Enter the URL of the article to analyze'}
            {type === 'image' && 'Upload an image containing news or claims'}
            {type === 'video' && 'Upload a video for content verification'}
            {type === 'headline' && 'Enter a headline for quick verification'}
          </Text>
        </View>

        {renderInput()}

        <TouchableOpacity
          style={[
            styles.analyzeButton,
            isLoading && styles.analyzeButtonDisabled,
          ]}
          onPress={handleAnalyze}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Icon name="shield-search" size={24} color="#fff" />
              <Text style={styles.analyzeButtonText}>Analyze Content</Text>
            </>
          )}
        </TouchableOpacity>

        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3b82f6" />
            <Text style={styles.loadingText}>
              Analyzing content with AI...
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  content: {
    padding: 20,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#dbeafe',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#1e40af',
    marginLeft: 10,
    lineHeight: 20,
  },
  textInput: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    minHeight: 200,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 20,
  },
  urlInput: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 20,
  },
  headlineInput: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 20,
  },
  mediaContainer: {
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 40,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#3b82f6',
    borderStyle: 'dashed',
  },
  uploadText: {
    fontSize: 16,
    color: '#3b82f6',
    marginTop: 10,
    fontWeight: '600',
  },
  imagePreview: {
    position: 'relative',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  previewImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  videoPreview: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 40,
    alignItems: 'center',
  },
  videoName: {
    fontSize: 16,
    color: '#1f2937',
    marginTop: 10,
  },
  removeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  analyzeButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 10,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  analyzeButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  analyzeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  loadingContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 10,
  },
});

export default AnalysisScreen;