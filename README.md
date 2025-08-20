# Garage Marketplace

A mobile application for renting and listing garage spaces. Built with React Native, Expo, and Supabase.

## 🚀 Getting Started

### Prerequisites

- Node.js (v21 or later)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app (for testing on physical devices)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/garage-marketplace.git
   cd garage-marketplace
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   ```

3. **Set up environment variables**
   - Create a `.env` file in the root directory
   - Copy the contents from `.env.example` to `.env`
   - Fill in your Supabase credentials:
     ```
     EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
     EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. **Start the development server**
   ```bash
   # For iOS
   npm run ios
   # or
   yarn ios
   
   # For Android
   npm run android
   # or
   yarn android
   
   # For web
   npm run web
   # or
   yarn web
   ```

## 🛠️ Development

### Project Structure

- `/src` - Source code
  - `/components` - Reusable UI components
  - `/screens` - App screens
  - `/navigation` - Navigation configuration
  - `/store` - Redux store and slices
  - `/http` - API services
  - `/core` - Core utilities and styles

### Available Scripts

- `npm start` or `yarn start` - Start the development server
- `npm test` or `yarn test` - Run tests
- `npm run build` or `yarn build` - Build the app for production

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [Supabase](https://supabase.com/)
