# Spotify Clone (Expo, React Native)

A lightweight Spotify-style mobile app built with Expo and React Native using static JSON data. No backend.

## Features
- Dummy authentication screen (no real auth)
- Home: Trending, Recommended, Recently Played (from local JSON)
- Search: Query songs and artists (local filter)
- Music Player: Play/Pause/Next/Previous, Shuffle, Repeat, Seek (expo-av)
- Playlists: List pre-made playlists and open to play
- Profile: Dummy profile with liked songs and playlists
- Navigation: Bottom tabs (Home, Search, Library, Profile)
- Styling: Dark theme with NativeWind (Tailwind)

## Prerequisites
- Node.js LTS
- Expo CLI (installed automatically by scripts)
- Android Studio (Android emulator) or iOS Simulator (macOS) or Expo Go on a device

## Setup
```bash
# In the project root
npm install

# Start Metro
npm run start
```

Then:
- Android: Press "a" in the terminal or run `npm run android` (Android Studio/emulator required)
- iOS (macOS): Press "i" or run `npm run ios`
- Device: Scan the QR code with Expo Go (Android) or switch to LAN/Tunnel and scan (iOS)

## Notes
- Static data: `assets/data.json`
- Player context: `src/player/PlayerContext.tsx`
- Screens: `src/screens/*`
- Tailwind config: `tailwind.config.js`
- Babel config (Reanimated + NativeWind): `babel.config.js`

## Troubleshooting (Windows)
- If PowerShell complains about `&&`, run commands separately.
- If Reanimated errors, ensure `react-native-reanimated/plugin` is the last plugin in `babel.config.js` and restart Metro.

## License
MIT
