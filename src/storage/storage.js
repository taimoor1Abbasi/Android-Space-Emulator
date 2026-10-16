import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  ACTIVE_TAB: '@orbital_active_tab',
  THEME_CONFIG: '@orbital_theme_config',
  ORIENTATION_PREF: '@orbital_orientation_pref',
  SYSTEM_PREFS: '@orbital_system_prefs',
  LAST_SAVED: '@orbital_last_saved_time',
};

/**
 * Save an item to AsyncStorage with JSON serialization
 */
export async function saveStorageItem(key, value) {
  try {
    const serialized = JSON.stringify(value);
    await AsyncStorage.setItem(key, serialized);
    await AsyncStorage.setItem(STORAGE_KEYS.LAST_SAVED, new Date().toISOString());
    return true;
  } catch (err) {
    console.warn(`[Storage] Failed to save key "${key}":`, err);
    // Fallback for web if window.localStorage is present
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (localErr) {
        console.warn('[Storage] Fallback localStorage failed:', localErr);
      }
    }
    return false;
  }
}

/**
 * Load an item from AsyncStorage with JSON parsing and fallback default
 */
export async function loadStorageItem(key, defaultValue = null) {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (raw !== null && raw !== undefined) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn(`[Storage] Failed to load key "${key}":`, err);
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const localRaw = window.localStorage.getItem(key);
        if (localRaw !== null && localRaw !== undefined) {
          return JSON.parse(localRaw);
        }
      } catch {
        // ignore
      }
    }
  }
  return defaultValue;
}

/**
 * Remove an item from AsyncStorage
 */
export async function removeStorageItem(key) {
  try {
    await AsyncStorage.removeItem(key);
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(key);
    }
    return true;
  } catch (err) {
    console.warn(`[Storage] Failed to remove key "${key}":`, err);
    return false;
  }
}

/**
 * Clear all orbital keys
 */
export async function clearAllOrbitalStorage() {
  try {
    const keys = Object.values(STORAGE_KEYS);
    await AsyncStorage.multiRemove(keys);
    if (typeof window !== 'undefined' && window.localStorage) {
      keys.forEach((k) => window.localStorage.removeItem(k));
    }
    return true;
  } catch (err) {
    console.warn('[Storage] Failed to clear storage:', err);
    return false;
  }
}

