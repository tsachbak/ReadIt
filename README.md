# ReadIt - Senior React Native Take-Home Assignment

ReadIt is a production-minded React Native (Expo) news reader built against the Hacker News Firebase API.

The app includes:

- Mock authentication with secure token storage and expiry handling
- Top stories feed with pagination and pull-to-refresh
- Article detail reader with WebView
- Persistent saved articles
- Offline-aware behavior (cached feed + connectivity indicator)
- Meaningful animations (skeleton shimmer + card entry)

## Demo Credentials

- Email: `user@readit.dev`
- Password: `password123`

## Tech Stack

- React Native `0.81`
- Expo SDK `54`
- TypeScript
- React Navigation (native stack)
- Zustand (bookmarks state)
- AsyncStorage (feed cache + persisted bookmarks middleware)
- expo-secure-store (auth token)
- react-native-webview
- NetInfo

## Setup (Fresh Machine)

### 1. Prerequisites

Install:

- Node.js 18+ (LTS recommended)
- npm
- Git

For running on mobile:

- Android Emulator / iOS Simulator, or Expo Go on a physical device

### 2. Clone and Install

```bash
git clone https://github.com/tsachbak/ReadIt
cd ReadIt
npm install
```

### 3. Run the App

```bash
npm run start
```

Then choose one target:

- Press `a` for Android emulator
- Press `i` for iOS simulator (macOS)
- Scan QR with Expo Go

Convenience scripts:

```bash
npm run android
npm run ios
npm run web
```

## Requirement Coverage

### Login

- Hardcoded credentials validated client-side
- Mock token generated on success
- Token persisted with `expo-secure-store`
- Redirects based on session state
- Token expiry validated on app launch
- Logout clears stored token

### Feed

- Fetches HN top stories IDs, resolves item details with parallel item requests
- Pagination: 20 items per page
- Pull-to-refresh
- Row content: title, score, comments, domain, relative time
- Row press navigates to detail
- Save/remove toggle available from row actions

### Article Detail

- Shows title, author, score, date metadata
- Uses `WebView` for readable URL content
- Bookmark toggle available on detail screen
- Smooth native navigation transition from feed to detail

### Saved Articles

- Persisted locally across app restarts
- Removing bookmark updates saved + feed state in real time (shared store)

### Offline

- Last successful feed cached to AsyncStorage
- Cached data used as fallback when network/API fails
- Visible online/offline status in top bar
- Saved articles store full metadata (not only IDs)

### Performance

- Stable `keyExtractor` (`item.id.toString()`)
- Tuned list batching (`windowSize`, `maxToRenderPerBatch`)
- Reduced unnecessary re-renders (`React.memo` on article rows + `useCallback` renderItem)
- `getItemLayout` intentionally omitted (rows are not fixed height)

### Animation

- Shimmer skeleton loader while fetching
- Subtle feed card entry animation

## Architectural Decisions Log

### State Management

- Chosen approach:
  - Auth/session state via React Context (`AuthProvider`)
  - Bookmarks via Zustand store (with persist middleware)
  - Feed loading logic inside a dedicated hook (`useFeed`)

- Why:
  - Keeps screens thin and focused on rendering/navigation
  - Avoids prop drilling
  - Co-locates async logic with domain concerns
  - Uses lightweight tools with clear ownership boundaries

### Data Flow

- API concerns are isolated in `src/api/hackerNews`
- Persistence concerns are isolated in `src/services`
- UI components are reusable and presentational where possible
- Screens orchestrate composed hooks/services rather than embedding heavy business logic

### Folder Structure

```text
src/
  api/
  components/
  hooks/
  navigation/
  screens/
  services/
  store/
  theme/
  utils/
```

This follows the suggested assignment structure with separation by responsibility.

## Trade-offs Made Under Time Pressure

- Chose a robust mock auth flow (secure token + expiry) instead of implementing the optional backend JWT stub
- Focused on one polished visual style and meaningful animation set rather than broader feature breadth
- Implemented offline fallback for feed and full offline saved-article metadata; skipped stale-while-revalidate strategy to keep behavior predictable

## What I Would Do With More Time

- Add a server JWT stub (`/server`) and switch auth service to real token verification
- Add unit tests for `useFeed`, auth token lifecycle helpers, and bookmarks store
- Add error boundary + dedicated offline empty/error states per screen
- Add accessibility and reduced-motion handling
- Add CI checks (type-check/lint/test) and release pipeline

## Optional APK Distribution (Extra, Not Instead of Expo)

You can provide an APK so reviewers can install without Expo Go.

### Option A: Attach a prebuilt APK in GitHub Releases

- Build the APK using Option B
- Upload the generated `.apk` file to a GitHub Release
- Add the Release URL in this README for one-click install

### Option B: Build APK with EAS

1. Install EAS CLI:

```bash
npm install -g eas-cli
```

2. Login:

```bash
eas login
```

3. Configure EAS in the project (creates `eas.json`):

```bash
eas build:configure
```

4. Build APK (not AAB):

```bash
eas build -p android --profile preview
```

5. Download APK from the build URL returned by EAS and share it.

Notes:

- Keep Expo start instructions as the primary path.
- APK is an additional reviewer-friendly option only.

## Quick Reviewer Run Path

1. `npm install`
2. `npm run start`
3. Login with demo credentials
4. Verify feed refresh/pagination, open detail, bookmark/unbookmark, open saved screen
5. Turn off network and verify connectivity indicator + cached/saved behavior
