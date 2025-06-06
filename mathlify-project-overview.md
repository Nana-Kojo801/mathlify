# Mathlify - Mental Math App Project

## Overview

**Mathlify** is a competitive mental math app designed to sharpen users' calculation skills through engaging gameplay modes. Players can practice solo, compete against friends in real-time, or climb global leaderboards as they develop their mental math abilities.

## Core Game Concept

- Two distinct game modes to test different math skills:
  - **Casual**: A sequence of numbers appears one after another, and players must calculate and input the sum at the end.
  - **Speed Solve**: Players are given math expressions with multiple operations and must choose the correct answer from four options as quickly as possible.
- Competitive gameplay through ranking systems (ELO), weekly tournaments, and head-to-head matches.
- Social features allowing players to connect with friends, chat, and track each other's progress.
- Customizable difficulty settings for personalized practice sessions.

## Gameplay

1. Players can choose between **Casual** mode for addition practice or **Speed Solve** for mixed operations.
2. In **Casual**, numbers appear sequentially with timed intervals, and players calculate the running sum.
3. In **Speed Solve**, players race against the clock to solve as many expressions as possible.
4. Both modes feature progressive difficulty and competitive ranking.
5. Players earn ELO points based on performance, which determines their position on leaderboards.

## Pages/Features

Here are the primary pages for the app:

### 1. Landing Page
- Header with Mathlify logo/text on the left and "Get Started" button on the right.
- Hero section featuring app logo, tagline, and primary call-to-action.
- Feature highlights section showcasing the game modes and key benefits.
- Screenshots/animations of gameplay to demonstrate the experience.
- Footer with links to social media, terms, and privacy policy.

### 2. Login/Signup Page
- Clean, minimalist interface for entering username and password.
- Options to create a new account or sign in to an existing one.
- Social login integrations (optional).
- Password recovery functionality.

### 3. Home Page
- Header with Mathlify logo on left, profile icon on right.
- Prominent display of player's ELO rankings for both game modes.
- Quick action buttons for Practice, Competition, and Online play.
- Friends list with online status indicators and chat options.
- Friend request notifications and user search functionality.
- "View All" option for expanding the friends list.
- Recent activity or achievements showcase.

### 4. Practice Page
- Game mode selection (Casual vs Speed Solve).
- Difficulty settings configuration panel:
  - **Casual**: Number range, quantity of numbers, time interval, total timer.
  - **Speed Solve**: Number range, quantity of questions, time duration.
- Saved custom difficulty presets.
- Visual indicators of difficulty levels.
- "Start Practice" button with clear visual emphasis.

### 5. Competition Page
- Weekly leaderboards for both game modes.
- **Casual Competition**: Marathon-style with increasing difficulty rounds, scored by advancement and speed.
- **Speed Solve Competition**: Scored by total questions answered correctly.
- Performance statistics and historical data.
- Tabs or nested pages for each game mode.
- Countdown timer to next competition reset.

### 6. Online Page
- Room creation interface with customizable settings.
- Room joining functionality via search or room code entry.
- 1v1 matchmaking based on ELO and selected game mode.
- Recently played rooms or quick rejoin options.

### 7. Room Page
- Game performance statistics (games played/won/lost).
- Room details (owner, member count, settings).
- Game configuration options (mode, number range, quantity, duration).
- Prominently displayed and copyable room code.
- Footer navigation with:
  - Home (room overview)
  - Members (list of players)
  - Chat (in-room messaging)
  - Leaderboard (room-specific rankings)

### 8. Profile Page
- User statistics dashboard (username, avatar, play history).
- Achievements and badges display.
- Profile editing capabilities.
- Global leaderboards (separate for each game mode).
- Performance analytics and improvement tracking.
- Settings for notifications and preferences.

## Color Palette

- **Background**: Deep Blue (#101828)
- **Primary**: Electric Blue (#00BFFF)
- **Secondary**: Soft Lavender (#7B68EE)
- **Accent**: Bright Teal (#40E0D0)
- **Success**: Mint Green (#50C878)
- **Error**: Coral Red (#FF6347)
- **Text Primary**: White (#FFFFFF)
- **Text Secondary**: Light Gray (#D0D9E8)

## Key Technical Challenges

- **Real-time Synchronization**: Ensuring accurate timing for online multiplayer sessions.
- **ELO Ranking System**: Implementing a fair and balanced ranking algorithm.
- **Problem Generation**: Creating varied and appropriately difficult math problems.
- **UI Responsiveness**: Building interfaces that allow quick inputs during timed gameplay.
- **Social Features**: Implementing reliable friend connections and chat functionality.
- **Leaderboard Management**: Updating and displaying global rankings efficiently.
- **Custom Difficulty Storage**: Saving and retrieving user-created difficulty settings.

## Game Modes Detail

### Casual Mode
- Sequential number display with controlled timing
- Memory and addition focused
- Marathon-style difficulty progression
- Final sum submission with time-based scoring

### Speed Solve (formerly "Answer Rush")
- Quick arithmetic expressions with multiple operations
- Multiple-choice format with four potential answers
- Rapid-fire questions with overall time limit
- Score based on total correct answers
