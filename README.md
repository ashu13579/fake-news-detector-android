# 📱 Fake News Detector - Android App

A powerful React Native Android application for AI-powered fake news detection with multi-input support.

![React Native](https://img.shields.io/badge/React%20Native-0.73-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript)
![Android](https://img.shields.io/badge/Android-21+-3DDC84?logo=android)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

### 🎯 Multi-Input Analysis
- **Text Analysis** - Analyze news articles and social media posts
- **URL Analysis** - Check news directly from web links
- **Image Analysis** - Verify images and screenshots
- **Video Analysis** - Analyze video content (up to 100MB)
- **Headline Check** - Quick headline verification

### 🤖 AI-Powered Detection
- Advanced pattern recognition
- Confidence scoring (0-100%)
- Comprehensive analysis reports
- Red flag detection
- Smart recommendations

### 📊 Detailed Analysis
- Source credibility assessment
- Language quality analysis
- Factual consistency checks
- Bias indicators detection
- Verification status

### 📱 Mobile Features
- Beautiful native Android UI
- Smooth animations and transitions
- Analysis history with local storage
- Offline capability
- Share results
- Dark mode support (coming soon)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- Java Development Kit (JDK) 17
- Android Studio
- Android SDK (API 21+)
- React Native CLI

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ashu13579/fake-news-detector-android.git
cd fake-news-detector-android
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
bun install
```

3. **Install iOS dependencies (if on macOS)**
```bash
cd ios && pod install && cd ..
```

4. **Start Metro bundler**
```bash
npm start
# or
yarn start
```

5. **Run on Android**
```bash
# In a new terminal
npm run android
# or
yarn android
```

## 📱 Building APK

### Debug APK
```bash
cd android
./gradlew assembleDebug
```
APK location: `android/app/build/outputs/apk/debug/app-debug.apk`

### Release APK

1. **Generate signing key**
```bash
cd android/app
keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

2. **Configure gradle.properties**
```properties
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=*****
MYAPP_RELEASE_KEY_PASSWORD=*****
```

3. **Build release APK**
```bash
cd android
./gradlew assembleRelease
```
APK location: `android/app/build/outputs/apk/release/app-release.apk`

## 🏗️ Project Structure

```
fake-news-detector-android/
├── android/                 # Android native code
│   ├── app/
│   │   ├── src/main/
│   │   │   ├── AndroidManifest.xml
│   │   │   └── res/
│   │   └── build.gradle
│   └── build.gradle
├── src/
│   ├── screens/            # App screens
│   │   ├── HomeScreen.tsx
│   │   ├── AnalysisScreen.tsx
│   │   ├── ResultScreen.tsx
│   │   ├── HistoryScreen.tsx
│   │   └── SettingsScreen.tsx
│   ├── services/           # Business logic
│   │   ├── api.ts         # AI analysis service
│   │   └── storage.ts     # Local storage
│   ├── types/             # TypeScript types
│   │   └── index.ts
│   └── App.tsx            # Main app component
├── package.json
├── tsconfig.json
└── README.md
```

## 🎨 Screenshots

### Home Screen
Beautiful gradient cards for each analysis type with intuitive icons.

### Analysis Screen
- Text input with character counter
- URL input with validation
- Image picker with preview
- Video picker with file info
- Headline quick check

### Result Screen
- Color-coded verdict (Green/Red/Yellow)
- Confidence progress bar
- Detailed analysis breakdown
- Red flags list
- Recommendations
- Verified sources

### History Screen
- All past analyses
- Filter by type
- Quick access to results
- Clear history option

## 🔧 Configuration

### Environment Variables
Create a `.env` file:
```env
API_ENDPOINT=https://your-api-endpoint.com
API_KEY=your_api_key_here
```

### AI Integration
Update `src/services/api.ts` to integrate with real AI services:

```typescript
export async function analyzeContent(
  type: InputType,
  content: string,
): Promise<AnalysisResult> {
  const response = await fetch(process.env.API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.API_KEY}`
    },
    body: JSON.stringify({ type, content })
  });
  
  return await response.json();
}
```

## 📦 Dependencies

### Core
- React Native 0.73
- React 18.2
- TypeScript 5.3

### Navigation
- @react-navigation/native
- @react-navigation/stack
- @react-navigation/bottom-tabs

### UI Components
- react-native-vector-icons
- react-native-linear-gradient
- react-native-progress
- react-native-modal
- react-native-toast-message

### Media
- react-native-image-picker
- react-native-document-picker
- react-native-fs

### Storage
- @react-native-async-storage/async-storage

## 🧪 Testing

```bash
# Run tests
npm test

# Run with coverage
npm test -- --coverage

# Run linting
npm run lint
```

## 📱 Supported Platforms

- ✅ Android 5.0+ (API 21+)
- 🔄 iOS (coming soon)

## 🎯 Roadmap

- [ ] iOS version
- [ ] Real-time fact-checking API integration
- [ ] User authentication
- [ ] Cloud sync for history
- [ ] Share analysis results
- [ ] Dark mode
- [ ] Multi-language support
- [ ] Offline AI model
- [ ] Widget support
- [ ] Wear OS support

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**ASHUTOSH YADAV**
- GitHub: [@ashu13579](https://github.com/ashu13579)
- Email: 23053934@kiit.ac.in

## 🙏 Acknowledgments

- Built with [React Native](https://reactnative.dev/)
- Icons from [Material Community Icons](https://materialdesignicons.com/)
- Navigation by [React Navigation](https://reactnavigation.org/)

## 📞 Support

If you have any questions or need help:
- Open an issue on GitHub
- Email: 23053934@kiit.ac.in

## ⚠️ Disclaimer

This app is designed to assist in identifying potential misinformation but should not be the sole source of truth. Always verify important information through multiple trusted sources and use critical thinking when evaluating news content.

---

Made with ❤️ by ASHUTOSH YADAV