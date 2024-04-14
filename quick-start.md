
# Quick Start for EAS Development builds on Simulator/Emulator/Real Device
[EAS Tutorial](https://www.youtube.com/watch?v=LUFHXsBcW6w)
## Project Set Up

- `npx create-expo-app my-app`
- `eas build:configure`
- `All`
- Install 3rd party packages we want to use from expo
  - `npx expo install expo-dev-client expo-location expo-updates`

  ## Android Build

  ### For Device
    - `eas build --profile development --platform android`
    - several prompts will follow, I let EAS build out my keystore
    - No to emulator for now
    - scan barcode with real android device to get the development build
    - run `npx expo start --dev-client`
    - scan barcode and should be able to make live changes and debug

    # iOS Build

    ### For Simulator
    - eas.json needs to have simulator set true
        ```json
            "developmentClient": true,
              "distribution": "internal",
              "ios": {
                "simulator": true
              }
        ```
    - `eas build --profile development --platform ios` 
    - Several prompts will follow
    - Yes to simulator (if accidentally said no then run `eas build:run`) by saying yes we are installing the dev build onto the simulator
    - `npx expo start --dev-client `
    - press `i`

    ### For device (need to have apple developer account)

<!-- Added clean up by adding the development-simulator see eas.json -->
  Apple requires an Adhoc distribution for a development build to go a device that will not make it on the app store. The development build must register the device to the developer account and the device will be associated with that device
- `eas device:create`
- follow prompts will ask for apple id etc,..
- How would you like to register device?
  - choose website
  - qr code is generated, every one on the team should be using this
  - iOS device will prompt to install a profile
  - after downloading the profile got settings > more for your phone> install
  - a prompt saying your device is ready for internal distribution
  - run `eas build --profile development --platform ios`
  - Toggle yes to login to Apple Developer account
  - If you do not have a distribution certificate you must create one otherwise use the existing one
  - Key part from device registration this is where the teams devices will show up if they ran the same development url
  - scan qr code is generated after build complete
  - start local dev environment `npx expo start --dev-client`

  ## Side note: 
    If you already have a development build with iOS devices but want to add a team member. The team member must register their device with the registration link then they could use the command below
    - `eas build:resign`
