export default {
  expo: {
    name: 'auth-app-template',
    slug: 'expo-login-template',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.gp.firebasesignin',
      googleServicesFile: process.env.GOOGLE_SERVICES_INFOPLIST,
      usesAppleSignIn: true,
      config: {
        usesNonExemptEncryption: false
      }
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff'
      },
      package: 'com.gp.firebasesignin',
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png'
    },
    plugins: [
      'expo-router',
      '@react-native-google-signin/google-signin',
      'expo-secure-store',
      'expo-apple-authentication'
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      router: {
        origin: false
      },
      eas: {
        projectId: '765d8ec3-a623-4852-bf35-d8f969a3e246'
      }
    },
    owner: 'gregpetropoulosdev'
  }
};
