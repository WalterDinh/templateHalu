import { AsyncStorage } from 'react-native';

const HAS_LAUNCHED = 'hasLaunched';

function setAppLaunched() {
  AsyncStorage.setItem(HAS_LAUNCHED, 'true');
}

export async function checkIfFirstLaunch() {
  try {
    const hasLaunched = await AsyncStorage.getItem(HAS_LAUNCHED);
    if (hasLaunched === null) {
      setAppLaunched();
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

export async function getJson(key) {
  try {
    const rawData = await AsyncStorage.getItem(key);
    if (rawData) {
      return JSON.parse(rawData);
    }
    return {
      error: true,
      message: 'No data'
    };
  } catch (e) {
    console.log(e);
    return {
      error: true,
      message: e
    };
  }
}
export async function get(key) {
  try {
    const rawData = await AsyncStorage.getItem(key);
    if (rawData) {
      return rawData;
    }
    return {
      error: true,
      message: 'No data'
    };
  } catch (e) {
    console.log(e);
    return {
      error: true,
      message: e
    };
  }
}

export async function setJson(key, value) {
  try {
    const stringData = JSON.stringify(value);
    await AsyncStorage.setItem(key, stringData);
    return {
      error: false,
      message: 'Success'
    };
  } catch (e) {
    return {
      error: true,
      message: e
    };
  }
}
export async function set(key, value) {
  try {
    await AsyncStorage.setItem(key, value);
    return {
      error: false,
      message: 'Success'
    };
  } catch (e) {
    return {
      error: true,
      message: e
    };
  }
}
export const removeData = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};
