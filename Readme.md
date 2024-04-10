# Authentication Template For A Expo Manage React Native project

# Configuring the APP with Google's firebase for Android and iOS

Here all the steps

- Setup/Configure app.json/eas/firebase mobile apps
- Generate Creds SHA-1
- Webclient Id
- Build for simulators
- Development Build and run the dev server
- UI/UX

### EXPO-RN-FIREBASE-LOGIN STEPS AND CONFIG

1. Create an eas project and when naming it use same name as app.json of your project for consistency
2. Must have run this command to wire up `eas cli  --global eas-cli && eas init --id xyz`
3. In the google firebase console create a project
4. click on the `ios` icon and give a app name and nick name
5. click on the `android` icon and give a app name and nick name and create a sha-1 with eas build `eas build:configure`
6. Choose `All`
7. run `eas credentials`
8. choose `Android`
9. choose ‘development`

# Configuring app.json And Packages

1. Will see this error but not a problem `Error: Specify "android.package" in app.json and run this command again. Cryptic error? Learn more`
2. go to app.json and add `bundleIdentifier` to ios object

   ```
   "ios": {
         "supportsTablet": true,
         "bundleIdentifier": "com.gp.firebasesignin"
       },
   ```

3. add the `package` to the android object

   ```
       "android": {
         "adaptiveIcon": {
           "foregroundImage": "./assets/images/adaptive-icon.png",
           "backgroundColor": "#ffffff"
         },
       "package": "com.gp.firebasesignin"
       },
   ```

4. Add google plugin to avoid the need to eject

   ```
     "plugins": [
             "expo-router",
             "expo-secure-store",
             "@react-native-google-signin/google-signin"
           ]
   ```

5. Install the google sign in package plugin with npm `npm install @react-native-google-signin/google-signin `
6. Need to install the dev client to run development build outside of Expo Go (Now it's a standalone app) `npx expo install expo-dev-client`

# Generating Credentials (SHA-1)

1. Now that we updated the app.json run the `eas credentials` pick `Android` and `development`

2. Select the Keystore

   ```
   What do you want to do? › - Use arrow-keys. Return to submit.
   ❯   Keystore: Manage everything needed to build your project
   ```

3. Select set up new key store

   ```
   What do you want to do? › - Use arrow-keys. Return to submit.
   ❯   Set up a new keystore
   ```

4. Several questions are asked for setting the keystore and can hit return on all of them.
   ```
   ✔ What do you want to do? › Set up a new keystore
       ✔ Assign a name to your build credentials: … Build Credentials tL3-oWp6Yg
       ✔ Generate a new Android Keystore? … yes
   ```
5. This is what the credentials look like and we need the SHA1 Fingerprint to put into firebase for the android app

   ```
         Configuration: Build Credentials 123abc-1a2b (Default)
             Keystore
             Type                JKS
             Key Alias           abc123
             MD5 Fingerprint     00:00:00...
             SHA1 Fingerprint    00:00:00...
             SHA256 Fingerprint  00:00:00...
   ```

6. Copy the SHA1 value and past into the `firebase console` for the `android app` 3rd input down is labeled `Debug signing certificate` SHA-1 (optional)

7. Click register the app and down load the google-services-json and hit next all the way through to finish

8. This step could have been done earlier we need to enable google sign in

   **a**. In the google console go to Build> Authentication > Get Started > Sign-in Click on Google icon

   **b**. Hit enable button and provide a support email (I used mine, but would need to use support@email.com for prod)

   **c**. Once you save a new updated google-services.json (for Android sign in) and GoogleServices-info.Plist (for iOS sign in)

9. Back at the integrated terminal ran `npx expo  --dev-client`

# [Build for Simulator Android/iOS](https://docs.expo.dev/develop/development-builds/create-a-build/#create-a-build-for-emulatorsimulator)

### iOS

### This will error if you have not built on the simulator outside Expo Go yet

- ran into an issue with the emulator needing the build installed on it
- › `Opening on iOS...
CommandError: No development build (com.gp.firebasesignin) for this project is installed. Please make and install a development build on the device first.`
  <!-- - Ran this command to install on the iOS emulator `eas build --profile development-simulator --platform ios`
- This led me to second issue so `Missing build profile in eas.json: development-simulator`
- Ran this command next `eas build:run -p ios` This didn;t work -->

- cause I needed to add to eas.json
  ```
        "preview": {
        "distribution": "internal",
            "ios": {
              "simulator": true
            }
        },
  ```
  - Then run `eas build -p ios --profile preview` it does not have be named profile it could be named local, dev etc. The build will take a while.
  - After the barcode show up and build finishes, Select Y to run on simulator
  - To run the latest build `eas build:run -p ios --latest`
  - The simulator will launch the app from the development build

## Android

## This will error if you have not built on the simulator outside Expo Go yet

`CommandError: No development build (com.gp.firebasesignin) for this project is installed. Please make and install a development build on the device first.
Learn more: https://docs.expo.dev/development/build/`

- Run this command `eas build -p android --profile preview`
- Select Y when prompted to install build on simulator

# Set Up Web Client Id - secrets

Set up environmental var on eas for google-services.json and the GoogleService-Info.plist.
DO NOT CHECK THESE INTO THE PROJECT WITH VERSION CONTROL
run two commands below :

1. `eas secret:create --scope project --name GOOGLE_SERVICES_JSON --type file --value /Users/gregpetropoulos/Downloads/google-services.json`

2. `eas secret:create --scope project --name GOOGLE_SERVICES_INFOPLIST --type file --value /Users/gregpetropoulos/Downloads/GoogleService-Info.plist`

3. Change NAMESPACE of `app.json` to `app.config.js` to make it an object and add the `export default` at the top of file so we can gain access to the environment variable via process env

- ex:
  ```javascript
  app.config.js
        export default {
                        expo: {
                          name: "auth-app-template",
                          slug: "expo-login-template",
                          ...
                        }
  ```

4. In the app.config.js inside the ios object specify

- ex:
  ```
    ios: {
          supportsTablet: true,
          bundleIdentifier: "com.gp.firebasesignin",
          googleServicesFile:process.env.GOOGLE_SERVICES_INFOPLIST,
        }
  ```

5. In the app.config.js inside the android object specify
   - ex:
     ```
       android: {
           adaptiveIcon: {
             foregroundImage: './assets/images/adaptive-icon.png',
             backgroundColor: '#ffffff'
           },
           package: 'com.gp.firebasesignin',
           googleServicesFile: process.env.GOOGLE_SERVICES_JSON
         },
     ```

# Development Build for Platforms/Devices

[Installing build on the simulator](https://docs.expo.dev/build-reference/simulators/#installing-build-on-the-simulator)

- Development build on iOS simulator: `eas build -p ios --profile development`
- Development build on Android simulator: `eas build -p android --profile development`
- Once the build completes you can run `npx expo start --dev-client` to run the dev build and see live changes

# UI/UX
  (Create sign in and get Webclient id)

  ### Create sign in

Implemented this in the sign in page to POC then will later implement into the context

    ```javascript
    sing-in.ts

    // imports
    import { useState, useEffect } from 'react';
    import {GoogleSignin,GoogleSigninButton} from '@react-native-google-signin/google-signin';

    export default function SignIn() {
    const [error, setError] = useState(null); //google sign in
    const [userInfo, setUserInfo] = useState(null); //google sing in

      useEffect(() => {
      GoogleSignin.configure();
    }, []);

    const googleSignIn = async (): Promise<void> => {
      try {
        await GoogleSignin.hasPlayServices();

        const user: any = await GoogleSignin.signIn();
        setUserInfo(user);
        setError(null);
      } catch (e: any) {
        setError(e);
      }
    };

    const googleLogout = (): void => {
      setUserInfo(null);
      GoogleSignin.revokeAccess();
      GoogleSignin.signOut();
    };
    // ======Google Sign in======

    ...more code

    return {

      // more code...

    {/*
          ===================
          ===================
          Needs to be imp with ctx
          ==================
          ==================
          */}
          <Text>Google Sign in</Text>
          <Text>{JSON.stringify({ error })}</Text>
          {userInfo && <Text>{JSON.stringify({ userInfo })}</Text>}
          {userInfo ? (
            <Button onPress={googleLogout}>Logout</Button>
          ) : (
            <GoogleSigninButton
              size={GoogleSigninButton.Size.Standard}
              color={GoogleSigninButton.Color.Dark}
              onPress={googleSignIn}
            />
          )}

          {/*
          ===================
          ===================
          Needs to be imp with ctx
          ==================
          ==================
          */}

      // more code...
    }
    }
    ```

### Get the weClientId
- The google-services.json file downloaded earlier from the firebase console has property `client_id`, be aware there are several of them and we need the one that has `client_type=3`
    ```
            {
              "client_id": "abc123.apps.googleusercontent.com",//this is the webClientId 
              "client_type": 3
            }
    ```
- Add the webClientId into the GoogleSignin.configure() like so :
  ```javascript
    GoogleSignin.configure({webClientId:"abc123"})
  ```
  # Last step run the dev server on the development build to see everything is working 
  - npx expo --dev-client
  - Worked right away for ios and android simulators
  - Devices were not able to start with the development build
    - Trouble shoot and found the docs for building for a device
    
    #### Android
      - android run this command `eas build --profile development --platform android` and scan the bar code with real android device
    
    #### iOS [Must have developer account](https://docs.expo.dev/develop/development-builds/create-a-build/#create-a-build-for-the-device)
      -ios device has more steps 
          - set ios phone turn on developer mode 
            - Go to the Settings app, and navigate to Privacy & Security > Developer Mode toggle it on and restart phone.
            - Will need apple developer account after running `eas device:create` stopped here I don't have an account yet
            - alternatively can connect to a mac with xcode see the link[connect to ios device with mac](https://docs.expo.dev/guides/ios-developer-mode/#connect-an-ios-device-with-a-mac)