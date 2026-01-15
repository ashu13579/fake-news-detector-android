# 🛠️ Complete Setup Guide

This guide will help you set up the development environment and build the Fake News Detector Android app.

## 📋 Prerequisites

### 1. Install Node.js
Download and install Node.js 18+ from [nodejs.org](https://nodejs.org/)

```bash
# Verify installation
node --version
npm --version
```

### 2. Install Java Development Kit (JDK)
Download and install JDK 17 from [Oracle](https://www.oracle.com/java/technologies/downloads/) or use OpenJDK

```bash
# Verify installation
java -version
javac -version
```

### 3. Install Android Studio
1. Download from [developer.android.com](https://developer.android.com/studio)
2. Install Android Studio
3. Open Android Studio → More Actions → SDK Manager
4. Install:
   - Android SDK Platform 34
   - Android SDK Build-Tools 34.0.0
   - Android SDK Command-line Tools
   - Android Emulator
   - Android SDK Platform-Tools

### 4. Configure Environment Variables

#### Windows
```bash
# Add to System Environment Variables
ANDROID_HOME=C:\Users\YourUsername\AppData\Local\Android\Sdk
JAVA_HOME=C:\Program Files\Java\jdk-17

# Add to Path
%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\tools
%ANDROID_HOME%\tools\bin
%JAVA_HOME%\bin
```

#### macOS/Linux
Add to `~/.bash_profile` or `~/.zshrc`:
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-17.jdk/Contents/Home
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$JAVA_HOME/bin
```

Then run:
```bash
source ~/.bash_profile  # or source ~/.zshrc
```

### 5. Install React Native CLI
```bash
npm install -g react-native-cli
```

## 🚀 Project Setup

### 1. Clone Repository
```bash
git clone https://github.com/ashu13579/fake-news-detector-android.git
cd fake-news-detector-android
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
bun install
```

### 3. Link Native Dependencies
```bash
npx react-native link react-native-vector-icons
```

## 📱 Running the App

### Option 1: Using Android Emulator

1. **Create Virtual Device**
   - Open Android Studio
   - Tools → Device Manager
   - Create Device → Select a device (e.g., Pixel 6)
   - Select System Image (API 34 recommended)
   - Finish

2. **Start Emulator**
   - Click Play button in Device Manager
   - Or use command:
   ```bash
   emulator -avd Pixel_6_API_34
   ```

3. **Run App**
   ```bash
   npm start
   # In new terminal
   npm run android
   ```

### Option 2: Using Physical Device

1. **Enable Developer Options**
   - Go to Settings → About Phone
   - Tap "Build Number" 7 times
   - Go back to Settings → Developer Options
   - Enable "USB Debugging"

2. **Connect Device**
   - Connect via USB
   - Accept USB debugging prompt on device
   - Verify connection:
   ```bash
   adb devices
   ```

3. **Run App**
   ```bash
   npm start
   # In new terminal
   npm run android
   ```

## 🔨 Building APK

### Debug APK
```bash
cd android
./gradlew assembleDebug
```
Output: `android/app/build/outputs/apk/debug/app-debug.apk`

### Release APK

1. **Generate Keystore**
```bash
cd android/app
keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

2. **Create gradle.properties**
Create `android/gradle.properties`:
```properties
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=your_password
MYAPP_RELEASE_KEY_PASSWORD=your_password
```

3. **Update build.gradle**
Edit `android/app/build.gradle`:
```gradle
android {
    ...
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
                storeFile file(MYAPP_RELEASE_STORE_FILE)
                storePassword MYAPP_RELEASE_STORE_PASSWORD
                keyAlias MYAPP_RELEASE_KEY_ALIAS
                keyPassword MYAPP_RELEASE_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
```

4. **Build Release APK**
```bash
cd android
./gradlew assembleRelease
```
Output: `android/app/build/outputs/apk/release/app-release.apk`

## 🐛 Troubleshooting

### Metro Bundler Issues
```bash
# Clear cache
npm start -- --reset-cache

# Or
npx react-native start --reset-cache
```

### Build Errors
```bash
# Clean build
cd android
./gradlew clean

# Rebuild
./gradlew assembleDebug
```

### Gradle Issues
```bash
# Update Gradle wrapper
cd android
./gradlew wrapper --gradle-version=8.3
```

### Port Already in Use
```bash
# Kill process on port 8081
npx react-native start --port 8082
```

### ADB Not Found
```bash
# Add to PATH or use full path
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### Dependencies Issues
```bash
# Remove node_modules and reinstall
rm -rf node_modules
npm install

# Clear watchman (macOS)
watchman watch-del-all
```

## 🔧 Development Tips

### Hot Reload
- Shake device or press `Ctrl+M` (emulator)
- Select "Enable Hot Reloading"

### Debug Menu
- Shake device or press `Ctrl+M`
- Options:
  - Reload
  - Debug
  - Enable Hot Reloading
  - Toggle Inspector

### Chrome DevTools
1. Open Debug Menu
2. Select "Debug"
3. Open Chrome: `chrome://inspect`
4. Click "inspect" under your app

### React Native Debugger
```bash
# Install
brew install --cask react-native-debugger

# Or download from
# https://github.com/jhen0409/react-native-debugger/releases
```

## 📊 Performance Optimization

### Enable Hermes
Already enabled in `android/app/build.gradle`:
```gradle
project.ext.react = [
    enableHermes: true
]
```

### ProGuard (Release)
Enable in `android/app/build.gradle`:
```gradle
def enableProguardInReleaseBuilds = true
```

### Bundle Size Analysis
```bash
npx react-native bundle \
  --platform android \
  --dev false \
  --entry-file index.js \
  --bundle-output android/app/src/main/assets/index.android.bundle \
  --assets-dest android/app/src/main/res
```

## 🧪 Testing

### Unit Tests
```bash
npm test
```

### E2E Tests (Detox)
```bash
# Install Detox
npm install -g detox-cli

# Build for testing
detox build --configuration android.emu.debug

# Run tests
detox test --configuration android.emu.debug
```

## 📱 Publishing to Play Store

1. **Prepare Release**
   - Update version in `android/app/build.gradle`
   - Build release APK
   - Test thoroughly

2. **Create Play Store Account**
   - Go to [play.google.com/console](https://play.google.com/console)
   - Pay $25 one-time fee

3. **Create App**
   - Create new app
   - Fill in app details
   - Upload screenshots
   - Upload APK/AAB

4. **Submit for Review**
   - Complete all required sections
   - Submit for review

## 🆘 Getting Help

- **Documentation**: [React Native Docs](https://reactnative.dev/docs/getting-started)
- **Issues**: [GitHub Issues](https://github.com/ashu13579/fake-news-detector-android/issues)
- **Email**: 23053934@kiit.ac.in

## ✅ Checklist

- [ ] Node.js installed
- [ ] JDK installed
- [ ] Android Studio installed
- [ ] Android SDK configured
- [ ] Environment variables set
- [ ] Project cloned
- [ ] Dependencies installed
- [ ] Emulator/Device ready
- [ ] App running successfully

---

Happy Coding! 🚀