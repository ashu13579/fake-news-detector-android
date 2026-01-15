# 📅 Day 2: Input Screens & Media Handling

## 🎯 Goal
Build interactive input screens for all 5 analysis types with image/video pickers and validation.

---

## ⏰ Time Breakdown (6-8 hours)

- **AnalysisScreen Setup**: 1 hour
- **Text & URL Inputs**: 1.5 hours
- **Image Picker Integration**: 2 hours
- **Video Picker Integration**: 1.5 hours
- **Validation & Error Handling**: 1-2 hours

---

## 📚 What You'll Learn Today

### 1. State Management
- useState hook
- Controlled components
- State updates

### 2. Native Modules
- react-native-image-picker
- react-native-document-picker
- Permission handling

### 3. Form Handling
- Input validation
- Error messages
- Loading states

### 4. Async Operations
- Async/await syntax
- Promise handling
- Error catching

---

## 🛠️ Step-by-Step Implementation

### Step 1: Understand AnalysisScreen Structure (30 min)

**Open `src/screens/AnalysisScreen.tsx`**

#### Key Sections:
```typescript
const AnalysisScreen = () => {
  // 1. State management
  const [content, setContent] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 2. Navigation & route params
  const route = useRoute<AnalysisScreenRouteProp>();
  const {type} = route.params;

  // 3. Event handlers
  const handleImagePick = async () => { /* ... */ };
  const handleAnalyze = async () => { /* ... */ };

  // 4. Render logic
  const renderInput = () => { /* ... */ };

  return (/* JSX */);
};
```

**Explain to Professor:**
- State hooks for managing data
- Route params for dynamic content
- Async handlers for native operations
- Conditional rendering based on type

### Step 2: Text Input Implementation (45 min)

**Study the TextInput case:**

```typescript
case 'text':
  return (
    <TextInput
      style={styles.textInput}
      placeholder="Paste the news article..."
      multiline
      numberOfLines={10}
      value={content}
      onChangeText={setContent}
      textAlignVertical="top"
    />
  );
```

**Key Concepts:**
- `multiline` - Allows multiple lines
- `value` - Controlled component
- `onChangeText` - Update state
- `textAlignVertical` - Text alignment

**Practice Exercise:**
Add character counter:
```typescript
<Text style={styles.charCount}>
  {content.length} / 5000 characters
</Text>
```

### Step 3: URL Input with Validation (45 min)

**Study URL validation:**

```typescript
const handleAnalyze = async () => {
  // URL validation
  try {
    new URL(url);  // Throws if invalid
  } catch {
    Toast.show({
      type: 'error',
      text1: 'Invalid URL',
      text2: 'Please enter a valid URL',
    });
    return;
  }
  // Continue with analysis...
};
```

**Explain to Professor:**
- URL constructor for validation
- Try-catch for error handling
- Toast for user feedback
- Early return pattern

**Practice Exercise:**
Add URL protocol check:
```typescript
if (!url.startsWith('http://') && !url.startsWith('https://')) {
  Toast.show({
    type: 'error',
    text1: 'Invalid Protocol',
    text2: 'URL must start with http:// or https://',
  });
  return;
}
```

### Step 4: Image Picker Integration (2 hours)

#### 4.1 Understanding the Library (30 min)

**Study the import:**
```typescript
import {launchImageLibrary} from 'react-native-image-picker';
```

**Read the implementation:**
```typescript
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
```

**Explain to Professor:**
- `launchImageLibrary` - Opens native picker
- `mediaType: 'photo'` - Only images
- `quality: 0.8` - Compression (80%)
- `result.assets[0].uri` - Image path
- Try-catch for error handling

#### 4.2 Image Preview (30 min)

**Study the preview component:**
```typescript
{imageUri ? (
  <View style={styles.imagePreview}>
    <Image source={{uri: imageUri}} style={styles.previewImage} />
    <TouchableOpacity onPress={() => setImageUri(null)}>
      <Icon name="close-circle" size={30} color="#ef4444" />
    </TouchableOpacity>
  </View>
) : (
  <TouchableOpacity onPress={handleImagePick}>
    <Icon name="image-plus" size={50} color="#3b82f6" />
    <Text>Tap to select image</Text>
  </TouchableOpacity>
)}
```

**Key Concepts:**
- Conditional rendering (ternary operator)
- Image component with URI source
- Remove button functionality
- Upload button when no image

#### 4.3 Android Permissions (30 min)

**Check `android/app/src/main/AndroidManifest.xml`:**
```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.CAMERA" />
```

**Explain to Professor:**
- Android requires explicit permissions
- READ_EXTERNAL_STORAGE for gallery
- CAMERA for taking photos
- Permissions requested at runtime

#### 4.4 Testing (30 min)

**Test scenarios:**
1. Click image upload button
2. Select image from gallery
3. Verify preview shows
4. Click remove button
5. Verify image clears

**Common Issues:**
- Permissions not granted
- Image not displaying
- URI format issues

### Step 5: Video Picker Integration (1.5 hours)

#### 5.1 Document Picker Setup (30 min)

**Study the import:**
```typescript
import DocumentPicker from 'react-native-document-picker';
```

**Read the implementation:**
```typescript
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
```

**Explain to Professor:**
- DocumentPicker for files
- Filter by video type
- Handle cancellation separately
- Error handling for failures

#### 5.2 File Size Validation (30 min)

**Add size check:**
```typescript
if (file.size > 100 * 1024 * 1024) { // 100MB
  Toast.show({
    title: 'File too large',
    description: 'Please upload a video smaller than 100MB',
    variant: 'destructive',
  });
  return;
}
```

**Explain to Professor:**
- File size in bytes
- 100MB = 100 * 1024 * 1024 bytes
- User-friendly error message
- Prevent large uploads

#### 5.3 Video Preview (30 min)

**Study the preview:**
```typescript
{videoUri ? (
  <View style={styles.videoPreview}>
    <Icon name="video" size={80} color="#3b82f6" />
    <Text style={styles.videoName}>Video selected</Text>
    <TouchableOpacity onPress={() => setVideoUri(null)}>
      <Icon name="close-circle" size={30} color="#ef4444" />
    </TouchableOpacity>
  </View>
) : (
  <TouchableOpacity onPress={handleVideoPick}>
    <Icon name="video-plus" size={50} color="#3b82f6" />
    <Text>Tap to select video</Text>
  </TouchableOpacity>
)}
```

**Key Concepts:**
- Video icon instead of preview
- File name display
- Remove functionality
- Upload button

### Step 6: Loading States (30 min)

**Study loading implementation:**

```typescript
const [isLoading, setIsLoading] = useState(false);

const handleAnalyze = async () => {
  setIsLoading(true);
  try {
    const result = await analyzeContent(type, content);
    navigation.navigate('Result', {result});
  } catch (error) {
    // Handle error
  } finally {
    setIsLoading(false);
  }
};
```

**Explain to Professor:**
- Loading state prevents multiple clicks
- Set true before async operation
- Set false in finally block
- Finally runs regardless of success/error

**Loading UI:**
```typescript
{isLoading && (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#3b82f6" />
    <Text>Analyzing content with AI...</Text>
  </View>
)}
```

### Step 7: Error Handling (1 hour)

**Study error patterns:**

```typescript
// 1. Empty input
if (!content && !imageUri && !videoUri) {
  Toast.show({
    type: 'error',
    text1: 'Error',
    text2: 'Please provide content to analyze',
  });
  return;
}

// 2. Invalid URL
try {
  new URL(url);
} catch {
  Toast.show({
    type: 'error',
    text1: 'Invalid URL',
    text2: 'Please enter a valid URL',
  });
  return;
}

// 3. API errors
try {
  const result = await analyzeContent(type, content);
} catch (error) {
  Toast.show({
    type: 'error',
    text1: 'Analysis Failed',
    text2: 'Please try again',
  });
}
```

**Explain to Professor:**
- Multiple validation layers
- User-friendly error messages
- Graceful error handling
- Toast for non-intrusive feedback

---

## 🎓 Concepts to Explain to Professor

### 1. Controlled vs Uncontrolled Components
**Question**: "What's a controlled component?"

**Answer**:
```typescript
// Controlled - React manages state
<TextInput
  value={content}
  onChangeText={setContent}
/>

// Uncontrolled - DOM manages state
<TextInput defaultValue="initial" />
```

### 2. Async/Await Pattern
**Question**: "How does async/await work?"

**Answer**:
```typescript
// Without async/await
launchImageLibrary().then(result => {
  setImageUri(result.uri);
}).catch(error => {
  console.error(error);
});

// With async/await (cleaner)
try {
  const result = await launchImageLibrary();
  setImageUri(result.uri);
} catch (error) {
  console.error(error);
}
```

### 3. Native Modules
**Question**: "How do native modules work?"

**Answer**:
- JavaScript calls native code via bridge
- Native code accesses device features
- Results returned to JavaScript
- Async operations for non-blocking

### 4. State Management
**Question**: "Why use useState?"

**Answer**:
- Preserves data between renders
- Triggers re-render on update
- Functional component pattern
- Simple and effective

---

## 📸 Screenshots to Take

1. **Text Input** - With content
2. **URL Input** - With validation
3. **Image Picker** - Upload button
4. **Image Preview** - Selected image
5. **Video Picker** - Upload button
6. **Loading State** - Activity indicator
7. **Error Toast** - Validation message

---

## 🐛 Common Issues & Solutions

### Issue 1: Image Picker Not Working
```bash
# Solution: Link native modules
npx react-native link react-native-image-picker
cd android && ./gradlew clean && cd ..
npm run android
```

### Issue 2: Permissions Denied
```bash
# Solution: Check AndroidManifest.xml
# Ensure permissions are declared
# Request at runtime if needed
```

### Issue 3: Toast Not Showing
```bash
# Solution: Check Toast component in App.tsx
<Toast />  # Must be at root level
```

---

## ✅ Day 2 Completion Checklist

### Must Have
- [ ] All 5 input types implemented
- [ ] Text input works with multiline
- [ ] URL input validates correctly
- [ ] Image picker opens and selects
- [ ] Video picker opens and selects
- [ ] Loading states show during operations
- [ ] Error messages display properly

### Should Have
- [ ] Understand state management
- [ ] Can explain async/await
- [ ] Know how native modules work
- [ ] Can handle errors gracefully

### Nice to Have
- [ ] Added character counter
- [ ] Improved validation
- [ ] Enhanced error messages
- [ ] Added file size display

---

## 📝 Professor Demo Script (15 min)

### 1. Introduction (2 min)
"Today I implemented all input interfaces with native module integration for media handling."

### 2. Text & URL Demo (3 min)
- Show text input with typing
- Demonstrate URL validation
- Show error messages

### 3. Image Picker Demo (4 min)
- Click upload button
- Select image from gallery
- Show preview
- Remove image

### 4. Video Picker Demo (3 min)
- Click upload button
- Select video file
- Show file info
- Remove video

### 5. Technical Explanation (3 min)
- "I used useState for state management"
- "Integrated native modules for media"
- "Implemented comprehensive validation"
- "Added loading states and error handling"

---

## 🎯 Key Takeaways for Day 2

### Technical Skills
✅ State management with hooks  
✅ Native module integration  
✅ Form validation  
✅ Async/await operations  
✅ Error handling  
✅ Loading states  
✅ Media file handling  

### Soft Skills
✅ Debugging native modules  
✅ Reading library documentation  
✅ User experience thinking  
✅ Error message writing  

---

## 🚀 Prepare for Day 3

### Tomorrow's Focus
- Building analysis algorithm
- Creating results screen
- Implementing confidence scoring
- Displaying detailed analysis

### Pre-reading
- Algorithm design basics
- String manipulation in JavaScript
- Progress bars in React Native
- Accordion components

---

**Excellent progress! Tomorrow we'll bring the AI analysis to life! 🚀**