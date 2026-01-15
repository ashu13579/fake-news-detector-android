# 🔧 Troubleshooting Guide

## Common Issues and Solutions

### 1. Port 8081 Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::8081
```

**Solutions:**

#### Windows:
```bash
# Find process using port 8081
netstat -ano | findstr :8081

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Or kill all node processes
taskkill /F /IM node.exe

# Then restart
npm start
```

#### macOS/Linux:
```bash
# Find and kill process on port 8081
lsof -ti:8081 | xargs kill -9

# Or use this one-liner
npx react-native start --reset-cache

# Then restart
npm start
```

#### Alternative: Use Different Port
```bash
# Start on different port
npx react-native start --port 8088
```

---

### 2. Metro Bundler Won't Start

**Solutions:**

```bash
# Clear Metro cache
npm start -- --reset-cache

# Or
npx react-native start --reset-cache

# Clear all caches
rm -rf node_modules
rm -rf $TMPDIR/react-*
rm -rf $TMPDIR/metro-*
npm install
npm start
```

---

### 3. Build Errors

**Error:** Gradle build failed

**Solutions:**

```bash
# Clean Android build
cd android
./gradlew clean
cd ..

# Clear gradle cache
cd android
./gradlew cleanBuildCache
cd ..

# Rebuild
npm run android
```

---

### 4. App Won't Install on Device

**Solutions:**

```bash
# Check device connection
adb devices

# If no devices shown
adb kill-server
adb start-server
adb devices

# Uninstall old version
adb uninstall com.fakenewsdetector

# Reinstall
npm run android
```

---

### 5. Dependencies Not Installing

**Solutions:**

```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules
rm -rf node_modules
rm package-lock.json

# Reinstall
npm install

# If still issues, try yarn
yarn install
```

---

### 6. Image Picker Not Working

**Solutions:**

1. **Check Permissions in AndroidManifest.xml:**
```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.CAMERA" />
```

2. **Link Native Module:**
```bash
npx react-native link react-native-image-picker
cd android
./gradlew clean
cd ..
npm run android
```

3. **Request Runtime Permissions:**
```typescript
import {PermissionsAndroid} from 'react-native';

const requestCameraPermission = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.CAMERA
  );
  return granted === PermissionsAndroid.RESULTS.GRANTED;
};
```

---

### 7. Icons Not Showing

**Solutions:**

```bash
# Link vector icons
npx react-native link react-native-vector-icons

# Clean and rebuild
cd android
./gradlew clean
cd ..
npm run android
```

---

### 8. AsyncStorage Errors

**Solutions:**

```bash
# Reinstall AsyncStorage
npm uninstall @react-native-async-storage/async-storage
npm install @react-native-async-storage/async-storage

# Link (if needed)
npx react-native link @react-native-async-storage/async-storage

# Rebuild
cd android
./gradlew clean
cd ..
npm run android
```

---

### 9. TypeScript Errors

**Solutions:**

```bash
# Regenerate TypeScript cache
rm -rf node_modules/.cache

# Check tsconfig.json is correct
# Restart TypeScript server in VS Code
# Cmd/Ctrl + Shift + P -> "TypeScript: Restart TS Server"
```

---

### 10. Emulator Not Starting

**Solutions:**

```bash
# List available emulators
emulator -list-avds

# Start specific emulator
emulator -avd Pixel_6_API_34

# If emulator is slow
# In Android Studio: Tools -> AVD Manager
# Edit emulator -> Show Advanced Settings
# Increase RAM to 2048 MB
# Enable Hardware Acceleration
```

---

### 11. Hot Reload Not Working

**Solutions:**

1. **Enable in Dev Menu:**
   - Shake device or press Ctrl+M
   - Enable "Hot Reloading"

2. **Restart Metro:**
```bash
# Stop Metro (Ctrl+C)
npm start -- --reset-cache
```

3. **Check Firewall:**
   - Ensure port 8081 is not blocked
   - Allow Metro bundler through firewall

---

### 12. App Crashes on Startup

**Solutions:**

1. **Check Logs:**
```bash
# View Android logs
adb logcat | grep ReactNative

# Or use React Native CLI
npx react-native log-android
```

2. **Common Fixes:**
```bash
# Clear app data
adb shell pm clear com.fakenewsdetector

# Reinstall
npm run android
```

---

### 13. Gradle Daemon Issues

**Solutions:**

```bash
# Stop all Gradle daemons
cd android
./gradlew --stop

# Clear Gradle cache
rm -rf ~/.gradle/caches/

# Rebuild
./gradlew clean
./gradlew assembleDebug
```

---

### 14. Network Request Failed

**Solutions:**

1. **Check AndroidManifest.xml:**
```xml
<application
  android:usesCleartextTraffic="true">
```

2. **Check Network Permissions:**
```xml
<uses-permission android:name="android.permission.INTERNET" />
```

---

### 15. Unable to Load Script

**Error:** "Unable to load script. Make sure you're running Metro bundler."

**Solutions:**

```bash
# Ensure Metro is running
npm start

# In new terminal
npm run android

# If still fails, try:
adb reverse tcp:8081 tcp:8081
npm run android
```

---

## 🆘 Emergency Reset

If nothing works, try this complete reset:

```bash
# 1. Stop all processes
# Press Ctrl+C in all terminals

# 2. Kill all node processes
# Windows:
taskkill /F /IM node.exe
# macOS/Linux:
killall node

# 3. Clean everything
rm -rf node_modules
rm -rf android/app/build
rm -rf android/build
rm -rf $TMPDIR/react-*
rm -rf $TMPDIR/metro-*
rm package-lock.json

# 4. Reinstall
npm install

# 5. Clean Android
cd android
./gradlew clean
cd ..

# 6. Start fresh
npm start -- --reset-cache

# 7. In new terminal
npm run android
```

---

## 📞 Still Having Issues?

1. **Check GitHub Issues:**
   - https://github.com/ashu13579/fake-news-detector-android/issues

2. **React Native Docs:**
   - https://reactnative.dev/docs/troubleshooting

3. **Stack Overflow:**
   - Search for your specific error message

4. **Contact:**
   - Email: 23053934@kiit.ac.in
   - Open an issue on GitHub

---

## 💡 Prevention Tips

1. **Always close Metro properly** (Ctrl+C, not just closing terminal)
2. **Keep dependencies updated** (but test after updates)
3. **Use version control** (commit before major changes)
4. **Test on real device** (emulators can be unreliable)
5. **Clear cache regularly** (prevents weird issues)
6. **Read error messages carefully** (they usually tell you what's wrong)

---

**Remember: Most issues can be solved by cleaning caches and rebuilding! 🔧**