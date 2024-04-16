# Google Authentication Template For A Expo Manage React Native project


### Configuring a basic app login template  with Google's firebase for Android and iOS apps and development  build for devices and simulators/emulators

### Table of Contents 
- [Setup](#setup)
- [UI/UX](#uiux)
- [Firebase](#firebase)
- [Configure](#configure)
- [Generate Credentials](#generating-credentials-sha-1)
- [Web Client Id](#web-client-id)
- [EAS Builds](#eas-builds)
- [User flow](#user-flow)
- [Demo](#demo)
- [Resources](#resources)

# Setup

Since we are building a standalone app outside of the Expo Go wrapper we need to install 3rd party libs and expo packages we need outside of the expo go app and update app.json plugins, etc 

### Install stuff
1. Install the google sign in package plugin with npm `npm install @react-native-google-signin/google-signin `
2. Need to install the dev client to run development build outside of Expo Go (Now it's a standalone app) `npx expo install expo-dev-client
`
### Configure

Configuring the `app.json` into an `app.config.js` and updating several keys

1. Change <span style='color:orange'>NAMESPACE</span> of <span style='color:red'>app.json</span> to <span style='color:green'>app.config.js</span> to make it an object and add the `export default` at the top of file so we can gain access to the environment variable via process env

- ex:
  ```javascript
  //app.config.js
        export default {
                        expo: {
                          name: "auth-app-template",
                          slug: "expo-login-template",
                          ...
                        }
  ```

2. Go to `app.config.js` and in the <span style="color:orange">ios</span> set `bundleIdentifier:"com.gp.firebasesignin"` to the reverse url  and the environment variable `googleServicesFile:process.env.GOOGLE_SERVICES_INFOPLIST`,

   - ex:
      ```javascript
        ios: {
              supportsTablet: true,
              bundleIdentifier: "com.gp.firebasesignin",
              googleServicesFile:process.env.GOOGLE_SERVICES_INFOPLIST,
            }
      ```

3. In `app.config.js` in the <span style="color:orange">android</span> object set the `package: "com.gp.firebasesignin"` and the environment variable googleServicesFile: process.env.GOOGLE_SERVICES_JSON
    - ex:
      ```javascript
        android: {
            adaptiveIcon: {
              foregroundImage: './assets/images/adaptive-icon.png',
              backgroundColor: '#ffffff'
            },
            package: 'com.gp.firebasesignin',
            googleServicesFile: process.env.GOOGLE_SERVICES_JSON
          },
      ```
4. Add google plugin to avoid the need to eject

   ```json
     "plugins": [
             "expo-router",
             "expo-secure-store",
             "@react-native-google-signin/google-signin"
           ]
   ```
5. Log into EAS and create a project, name it the same as name in app.config.json. In my case ` name: 'auth-app-template',`
6. Run this command to wire up the cli  `eas cli  --global eas-cli && eas init --id xyz` (where id of the EAS project to link)

# UI/UX 

Create a Google Sign in and get the webClient id

  ### Create sign in
  
  Implemented this in the `sign-in.ts` page to POC then will later implement into the context

```javascript
//in your sign-in.ts or app.ts should have this code as a minimum
    import { useState, useEffect } from 'react';
    import {GoogleSignin,GoogleSigninButton} from '@react-native-google-signin/google-signin';

    export default function SignIn() {
    const [error, setError] = useState(null); //google sign in
    const [userInfo, setUserInfo] = useState(null); //google sign in

      useEffect(() => {
      GoogleSignin.configure({webClientId:'abc123.apps.googleusercontent.com'});//values from the google-services.json file
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
    return {
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
      }
    }
```

# Firebase

1. In the google firebase console create a project and name it the same as name in `app.config.js`
2. Don't need analytics turned on 
3. Click Continue
3. Enable google sign in
    -  In the google console go to `Build` > `Authentication` > `Get Started` > `Sign-in` Click on Google icon
    - Hit enable button and provide a support email (I used mine, but would need to use support@email.com for prod)
    - Save
     <!-- ?? NOT SURE IF THIS NEEDED SINCE WE DOWNLOAD THE UPDATED VERSIONS OF THE GOOGLESERVICES-PLIST IN THE LATER STEPS??
     After saving, download the environment variables to your machine, later will use these for the build via EAS
      - <span style='color:orange'> GoogleServices-info.Plist </span> (for iOS sign in )
      -  <span style='color:orange'>google-services.json</span> (for Android sign in) -->

### iOS App

1. click on the `ios` icon and give a app name and nick name
2. For the name in the  <span style="color:green">**Apple bundle**</span> input box, enter a reverse url `com.gp.firebasesignin` it's the same value for <span style="color:orange">
**bundleIdentifier** 
</span>in `app.config.js`
3. The nickname can be anything, I named it `Firebase Signin` 
4. Click Register app
5. download to your machine the <span style='color:orange'> GoogleServices-info.Plist </span> (for iOS sign in)

### Android app

1. click on the `android` icon and give a app name and nick name
2. For the name in the  <span style="color:green">**Android Package Name**</span> input box, enter a reverse url `com.gp.firebasesignin` it's the same value for <span style="color:orange">
**package**</span> in `app.config.js`
3. The nickname can be anything, I named it `Firebase Signin`
4. The <span style="color:orange"> SHA-1</span> needs to be generated in the terminal
    - Open terminal and run `eas build:configure` this will generate `eas.json`
    - Choose `All`
    - Run `eas credentials`
    - Choose `Android`
    -  choose `development`
        - side note: preview and production will need to generate separate credentials and google info plist

 ## Generating Credentials (SHA-1)

5. Select the Keystore

   ```
   What do you want to do? › - Use arrow-keys. Return to submit.
   ❯   Keystore: Manage everything needed to build your project
   ```

6. Select set up new key store

   ```
   What do you want to do? › - Use arrow-keys. Return to submit.
   ❯   Set up a new keystore
   ```

7. Several questions are asked for setting the keystore and can hit return on all of them.
   ```
   ✔ What do you want to do? › Set up a new keystore
       ✔ Assign a name to your build credentials: … Build Credentials tL3-oWp6Yg
       ✔ Generate a new Android Keystore? … yes
   ```
8. This is what the credentials look like and we need the SHA1 Fingerprint to put into firebase for the android app

   ```
         Configuration: Build Credentials 123abc-1a2b (Default)
             Keystore
             Type                JKS
             Key Alias           abc123
             MD5 Fingerprint     00:00:00...
             SHA1 Fingerprint    00:00:00...
             SHA256 Fingerprint  00:00:00...
   ```

9. Copy the SHA1 value and paste into the `firebase console` for the `android app` 3rd input down is labeled `Debug signing certificate` SHA-1 (optional)

10. Click Register the app
11. Download the env file <span style='color:orange'>google-services.json</span> (for Android sign in)
12. Next all the way through to finish

# Web Client Id

Set up environmental variables (secrets) on <span style='color:green'>EAS</span>  with a name  set to a file we downloaded earlier from the builds for each [ios](#ios-app) /[android](#android-app) app `google-services.json` and the `GoogleService-Info.plist`.

<p style='color:red'>DO NOT CHECK THESE INTO THE PROJECT WITH VERSION CONTROL</p>

Run two commands below :

```
1. eas secret:create --scope project --name GOOGLE_SERVICES_JSON --type file --value /Users/gregpetropoulos/Downloads/google-services.json

2. eas secret:create --scope project --name GOOGLE_SERVICES_INFOPLIST --type file --value /Users/gregpetropoulos/Downloads/GoogleService-Info.plist
  ```


### webClientId lives in the google-services.json
- The google-services.json file downloaded earlier from the firebase console has property `client_id`, be aware there are several of them and we need the one that has `client_type=3`
    ```json
    //in google-services.json
            {
              "client_id": "abc123.apps.googleusercontent.com",//this is the webClientId 
              "client_type": 3
            }
    ```
- Add the webClientId into the GoogleSignin.configure() like so :
  ```javascript
  //sign-in.ts or app.js
    GoogleSignin.configure({webClientId:"abc123.apps.googleusercontent.com"})
  ```

# EAS Builds

#### [Build for Simulator Android/iOS](https://docs.expo.dev/develop/development-builds/create-a-build/#create-a-build-for-emulatorsimulator)

No preview or production builds just development builds. There are two critical steps in getting a build to run on a device or simulator.
  1. Install the build on the device or virtual device
  2. Run the dev server (not expo go on the development build installed on the phone)

### iOS

- Check the `simulator:true` eas.json

  ```json
       "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "simulator": true
      }
    },
  ```

# Development Build for Simulators/Emulators

[Installing build on the simulator](https://docs.expo.dev/build-reference/simulators/#installing-build-on-the-simulator)

### Build For Android emulator and real device 
  - Development build on Android simulator: `eas build -p android --profile development`
  - With real device scan barcode to get the build installed  on the device  If this doesn't work try logging into expo on the device and long press the install build button
  - `npx expo start --dev-client`
  - Scan the barcode again with real device, if it didn't already start up.
  - If you want to use the emulator press a

### Build For iOS simulator 
- Development build on iOS simulator: `eas build -p ios --profile development`
- Once the build completes you can run `npx expo start --dev-client`
- press i for the simulator 

### Development for Real iOS devices

  #### iOS [Must have developer account](https://docs.expo.dev/develop/development-builds/create-a-build/#create-a-build-for-the-device)
  
  - Several more steps are needed for an ios device to be registered
      - set ios phone turn on developer mode 
      - Go to the Settings app, and navigate to Privacy & Security > Developer Mode toggle it on and restart phone.
      - Sign up with the Apple Developer Program $100/year
      - Run `eas device:create`
      - Follow the prompts
        - Asks for apple id, etc...
        - Choose the `Website` method to register the device, this gives a url associated with your build by registered to device(s). The url can be passed around to other team members for use.
        - Scan barcode with real device
        - Device will prompt to <span style='color:green'>"Download a profile for internal distribution"</span>
        - Go to `Settings` > `More for Your iPhone` > `View Profile` > `Install`
        - Now that device is registered run `eas build --profile development --platform ios`
      - Will ask to login into apple account
      - If you do not have a distribution certificate apple will reuse last one
      - Choose from list of devices or for first time just yours
      - Build will complete and present a barcode 
      - scan barcode with real device
      - run `npx expo start --dev-client`
      - There are several ways but for this case use the Account syncing feature
      - On the device log into expo
      - Dev server should show up in app, press it to load app and should have live reloading.
      
      #### If you don't have an account yet 
      - alternatively can connect to a mac with xcode see the link [connect to ios device with mac](https://docs.expo.dev/guides/ios-developer-mode/#connect-an-ios-device-with-a-mac)



## User Flow

## Demo
[Back to Top](#table-of-contents )
## Resources

**video**

[Chelsea Farley Google Auth Guide](https://www.youtube.com/watch?v=HY3O_wrvDsI)

[Expo Developer Keith Guide on Development Builds](https://www.youtube.com/watch?v=LUFHXsBcW6w)

[Kadi Kraman Build and Deploy React Native Apps with Expo EAS ](https://egghead.io/courses/build-and-deploy-react-native-apps-with-expo-eas-85ab521e)

**docs**

[Build for iOS simulator / Android emulator](https://docs.expo.dev/develop/development-builds/create-a-build/#create-a-build-for-emulatorsimulator)