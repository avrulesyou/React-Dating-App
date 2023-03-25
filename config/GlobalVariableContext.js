import React from "react";
import { View, ActivityIndicator } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const DD_SCREEN_TITLE = {
  0: "",
  1: "Likes",
  2: "Matches",
  3: "Profile",
  undefined: "Profile",
};

export const EDIT_PROFILE_IMAGE_KEY = {
  0: "featured_photo",
  1: "profilePic2",
  2: "profilePic3",
  3: "profilePic4",
  4: "profilePic4",
  5: "profilePic5",
};

export const MEMBERSHIP = {
  BASIC: "basic",
  KUPPLE_PLUS_MONTHLY: "kupple_plus_monthly",
  KUPPLE_PLATINUM_MONTHLY: "kupple_platinum_monthly",
};

export const AGE_PREFENRENCE = {
  MAXIMUM_AGE: 99,
  MINIMUM_AGE: 18,
};

export const GET_CUSTOM_AGE = () =>
  Array(80)
    .fill(0)
    .map((_, idx) => String(idx + 18));

export const URL = {
  TERM_AND_CONDITION: "http://kuppleapp.com/terms-and-conditions.html",
  PRIVACY_POLICY: "http://kuppleapp.com/privacy-policy.html",
};

export const GETSTREAM_API_KEY = "28q2m8bwfek9";

export const GENDER_LIST = ["Male", "Female", "Non-Binary"];

export const PROMPT_LIST = [
  "A life goal of mine",
  "My simple pleasures",
  "The way to win me over is",
  "Typical sunday",
  "My most irrational fear",
  "A random fact I love is",
  "Dating me is like",
  "I’m convinced that",
  "Don’t hate me if I",
  "I won’t shut up about",
  "I geek out on",
  "Change my mind about",
  "Let’s debate this topic",
  "Two truths and a lie",
  "Never have I ever",
  "Biggest risk I’ve taken",
  "Worst idea I’ve ever had",
  "What I order for the table",
  "First round is on me if",
  "I know the best spot in town for",
  "I’ll brag about you to my friends if",
  "We’ll get along if",
  "All I ask is that you",
];

export const DD_PROMPT_LIST = [
  "How we know each other",
  "The reason we get along",
  "Our best double date idea",
  "Our craziest friendship story",
  "The difference between us is",
  "We want to find a team that",
  "Our go-to weekend plans are",
  "Let's debate this topic",
  "Why we are roommates",
  "Why we aren’t roommates",
  "Where you'll find us at the party",
  "A question we need you to answer",
  "Guess which one of us",
  "What we like to do for fun",
  "Our best piece of advice",
  "We disagree on",
  "Something you should know about us",
  "Our biggest red flag",
  "Our biggest green flag",
  "What we want for Christmas",
  "What our podcast would be called",
  "Teach us something about",
  "We know way too much about",
  "Our motto",
  "Our most controversial opinion",
  "What we would be famous for",
  "Our typical weekend",
  "Swipe right if",
  "Two truths and a lie",
];

export const DEFAULT_USER_IMAGE =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

const DeviceVariables = {
  age: "",
  Age: "",
  AUTHORIZATION_HEADER: "",
  bio: "",
  company: "",
  distance_preference: "",
  double_dating_teams_id: "",
  featured_photo: "",
  gender: "",
  id: "",
  job_title: "",
  matches_id: "",
  maximum_age: "",
  minimum_age: "",
  name: "",
  phoneNumber: "",
  profilePic2: "",
  profilePic3: "",
  profilePic4: "",
  profilePic5: "",
  profilePic6: "",
  prompt1: "",
  prompt2: "",
  prompt3: "",
  promptResponse1: "",
  promptResponse2: "",
  promptResponse3: "",
  sexual_interest: "",
  subscription: "",
  token: "",
  user2_id: "",
  user_city: "",
  user_contacts: [
    {
      id: "177C371E-701D-42F8-A03B-C61CA31627F6",
      name: "Kate Bell",
      image: {
        uri: "file:///var/mobile/Containers/Data/Application/[...]thumbnailImageData.png",
        width: 320,
        height: 320,
      },
      emails: [
        {
          id: "93D6F4AF-5C10-43FC-8405-A8BB02F2F9F7",
          email: "kate-bell@mac.com",
          label: "work",
        },
      ],
      company: "CreativeConsulting",
      birthday: { day: 20, year: 1978, month: 0, format: "gregorian" },
      jobTitle: "Producer",
      lastName: "Bell",
      addresses: [
        {
          id: "8A2633AE-0400-48A4-AD83-49DBCE07CEAF",
          city: "Hillsborough",
          label: "work",
          region: "CA",
          street: "165 Davis Street",
          country: "",
          postalCode: "94010",
          isoCountryCode: "us",
        },
      ],
      firstName: "Kate",
      contactType: "person",
      phoneNumbers: [
        {
          id: "EF48385D-28C2-48DE-AAB3-A81BC5F16981",
          label: "mobile",
          digits: "5555648583",
          number: "(555)564-8583",
          countryCode: "us",
        },
      ],
      imageAvailable: true,
    },
    {
      id: "177C371E-701D-42F8-A03B-C61CA31627F6",
      name: "Kate Bell",
      image: {
        uri: "file:///var/mobile/Containers/Data/Application/[...]thumbnailImageData.png",
        width: 320,
        height: 320,
      },
      emails: [
        {
          id: "93D6F4AF-5C10-43FC-8405-A8BB02F2F9F7",
          email: "kate-bell@mac.com",
          label: "work",
        },
      ],
      company: "CreativeConsulting",
      birthday: { day: 20, year: 1978, month: 0, format: "gregorian" },
      jobTitle: "Producer",
      lastName: "Bell",
      addresses: [
        {
          id: "8A2633AE-0400-48A4-AD83-49DBCE07CEAF",
          city: "Hillsborough",
          label: "work",
          region: "CA",
          street: "165 Davis Street",
          country: "",
          postalCode: "94010",
          isoCountryCode: "us",
        },
      ],
      firstName: "Kate",
      contactType: "person",
      phoneNumbers: [
        {
          id: "EF48385D-28C2-48DE-AAB3-A81BC5F16981",
          label: "mobile",
          digits: "5555648583",
          number: "(555)564-8583",
          countryCode: "us",
        },
      ],
      imageAvailable: true,
    },
  ],
  user_id: "",
  invited_team_id: "",
  logInUserID: "",
};
const AppVariables = {
  ERROR_MESSAGE: "",
  geocodio_api_key: "39faa3e0340730754906e3c7f30e67a06cc469f",
  lat: "",
  long: "",
  url: "",
  visible: false,
  visible2: false,
  dd_visible: false,
  revenueCat_public_api_key: "Bearer appl_EiQrglvPDtsrMVrRakiftrPhIKn",
  ENTITLEMENT_ID: "pro",
};
const GlobalVariableContext = React.createContext();
const GlobalVariableUpdater = React.createContext();

// Attempt to parse a string as JSON. If the parse fails, return the string as-is.
// This is necessary to account for variables which are already present in local
// storage, but were not stored in JSON syntax (e.g. 'hello' instead of '"hello"').
function tryParseJson(str) {
  try {
    return JSON.parse(str);
  } catch {
    return str;
  }
}

class GlobalVariable {
  /**
   *  Filters an object of key-value pairs for those that should be
   *  persisted to storage, and persists them.
   *
   *  @param values Record<string, string>
   */
  static async syncToLocalStorage(values) {
    const update = Object.entries(values)
      .filter(([key]) => key in DeviceVariables)
      .map(([key, value]) => [key, JSON.stringify(value)]);

    if (update.length > 0) {
      await AsyncStorage.multiSet(update);
    }

    return update;
  }

  static async loadLocalStorage() {
    const entries = await AsyncStorage.multiGet(Object.keys(DeviceVariables));

    // If values isn't set, use the default. These will be written back to
    // storage on the next render.
    const withDefaults = entries.map(([key, value]) => [
      key,
      value ? tryParseJson(value) : DeviceVariables[key],
    ]);

    return Object.fromEntries(withDefaults);
  }
}

class State {
  static defaultValues = {
    ...AppVariables,
    ...DeviceVariables,
  };

  static reducer(state, { type, payload }) {
    switch (type) {
      case "RESET":
        return { values: State.defaultValues, __loaded: true };
      case "LOAD_FROM_ASYNC_STORAGE":
        return { values: { ...state.values, ...payload }, __loaded: true };
      case "UPDATE":
        return state.__loaded
          ? {
              ...state,
              values: {
                ...state.values,
                [payload.key]: payload.value,
              },
            }
          : state;
      default:
        return state;
    }
  }

  static initialState = {
    __loaded: false,
    values: State.defaultValues,
  };
}

export function GlobalVariableProvider({ children }) {
  const [state, dispatch] = React.useReducer(State.reducer, State.initialState);

  React.useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }

    prepare();
  }, []);

  // This effect runs on mount to overwrite the default value of any
  // key that has a local value.
  React.useEffect(() => {
    async function initialStorageLoader() {
      try {
        const payload = await GlobalVariable.loadLocalStorage();
        dispatch({ type: "LOAD_FROM_ASYNC_STORAGE", payload });
      } catch (err) {
        console.error(err);
      }
    }
    initialStorageLoader();
  }, []);

  // This effect runs on every state update after the initial load. Gives us
  // best of both worlds: React state updates sync, but current state made
  // durable next async tick.
  React.useEffect(() => {
    async function syncToAsyncStorage() {
      try {
        await GlobalVariable.syncToLocalStorage(state.values);
      } catch (err) {
        console.error(err);
      }
    }
    if (state.__loaded) {
      syncToAsyncStorage();
    }
  }, [state]);

  const onLayoutRootView = React.useCallback(async () => {
    if (state.__loaded) {
      await SplashScreen.hideAsync();
    }
  }, [state.__loaded]);

  // We won't want an app to read a default state when there might be one
  // incoming from storage.
  if (!state.__loaded) {
    return null;
  }

  return (
    <GlobalVariableUpdater.Provider
      value={dispatch}
      onLayout={onLayoutRootView}
    >
      <GlobalVariableContext.Provider value={state.values}>
        {children}
      </GlobalVariableContext.Provider>
    </GlobalVariableUpdater.Provider>
  );
}

// Hooks
export function useSetValue() {
  const dispatch = React.useContext(GlobalVariableUpdater);
  return ({ key, value }) => {
    dispatch({ type: "UPDATE", payload: { key, value } });
    return value;
  };
}

export function useValues() {
  return React.useContext(GlobalVariableContext);
}
