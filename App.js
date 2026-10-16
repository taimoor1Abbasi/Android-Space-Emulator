import { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as ScreenOrientation from 'expo-screen-orientation';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

import { DEFAULT_THEME } from './src/theme/themes';
import {
  STORAGE_KEYS,
  clearAllOrbitalStorage,
  loadStorageItem,
  saveStorageItem,
} from './src/storage/storage';
import TabBar from './src/components/TabBar';
import DisplayTab from './src/components/DisplayTab';
import ColorsTab from './src/components/ColorsTab';
import SettingsTab from './src/components/SettingsTab';

export default function App() {
  const [activeTab, setActiveTab] = useState('display');
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [rememberTab, setRememberTab] = useState(true);
  const [savedTime, setSavedTime] = useState(null);
  const [savedStatus, setSavedStatus] = useState('');

  const [isLandscape, setIsLandscape] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [error, setError] = useState('');

  const { width, height } = useWindowDimensions();
  const isWideLayout = width > height;
  const statusTimerRef = useRef(null);

  // Helper to show temporary save status
  const triggerSaveNotification = (msg = 'Changes saved ✓') => {
    setSavedStatus(msg);
    if (statusTimerRef.current) {
      clearTimeout(statusTimerRef.current);
    }
    statusTimerRef.current = setTimeout(() => {
      setSavedStatus('');
    }, 2500);
  };

  // Load persisted theme and tab preferences on startup
  useEffect(() => {
    let isMounted = true;

    async function loadPersistedState() {
      try {
        const [savedTheme, savedTab, systemPrefs, lastSaved] = await Promise.all([
          loadStorageItem(STORAGE_KEYS.THEME_CONFIG, null),
          loadStorageItem(STORAGE_KEYS.ACTIVE_TAB, null),
          loadStorageItem(STORAGE_KEYS.SYSTEM_PREFS, null),
          loadStorageItem(STORAGE_KEYS.LAST_SAVED, null),
        ]);

        if (!isMounted) return;

        if (savedTheme) {
          setTheme((prev) => ({ ...prev, ...savedTheme }));
        }

        const shouldRememberTab = systemPrefs?.rememberTab !== false;
        setRememberTab(shouldRememberTab);

        if (shouldRememberTab && savedTab) {
          setActiveTab(savedTab);
        }

        if (lastSaved) {
          setSavedTime(lastSaved);
        }
      } catch (loadErr) {
        console.warn('Error loading persisted orbital state:', loadErr);
      }
    }

    loadPersistedState();

    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP).catch(
      (orientationError) => {
        if (isMounted) {
          setError(`Couldn't set the starting orientation: ${orientationError.message}`);
        }
      }
    );

    return () => {
      isMounted = false;
      if (statusTimerRef.current) {
        clearTimeout(statusTimerRef.current);
      }
    };
  }, []);

  // Handle Tab Change and persist
  const handleSelectTab = async (tabId) => {
    setActiveTab(tabId);
    if (rememberTab) {
      await saveStorageItem(STORAGE_KEYS.ACTIVE_TAB, tabId);
      triggerSaveNotification(`Tab switched to ${tabId.toUpperCase()}`);
    }
  };

  // Handle Preset Selection and persist
  const handleSelectPreset = async (preset) => {
    setTheme(preset);
    const now = new Date().toISOString();
    setSavedTime(now);
    await saveStorageItem(STORAGE_KEYS.THEME_CONFIG, preset);
    triggerSaveNotification(`Applied ${preset.name} ✓`);
  };

  // Handle Custom Accent Selection and persist
  const handleSelectAccent = async (hex) => {
    const updated = {
      ...theme,
      id: 'custom',
      name: `${theme.name || 'Custom'} (${hex.toUpperCase()})`,
      accentColor: hex,
      highlightColor: hex,
    };
    setTheme(updated);
    const now = new Date().toISOString();
    setSavedTime(now);
    await saveStorageItem(STORAGE_KEYS.THEME_CONFIG, updated);
    triggerSaveNotification(`Accent set to ${hex} ✓`);
  };

  // Handle Planet Selection and persist
  const handleSelectPlanet = async (planetInfo) => {
    const updated = {
      ...theme,
      planetColor: planetInfo.color,
      planetHighlight: planetInfo.highlight,
    };
    setTheme(updated);
    const now = new Date().toISOString();
    setSavedTime(now);
    await saveStorageItem(STORAGE_KEYS.THEME_CONFIG, updated);
    triggerSaveNotification(`Planet style: ${planetInfo.name} ✓`);
  };

  // Explicit Save Theme Button
  const handleExplicitSave = async () => {
    const now = new Date().toISOString();
    setSavedTime(now);
    await saveStorageItem(STORAGE_KEYS.THEME_CONFIG, theme);
    triggerSaveNotification('All theme changes saved! ✓');
  };

  // Reset Theme to Default
  const handleResetThemeDefault = async () => {
    setTheme(DEFAULT_THEME);
    const now = new Date().toISOString();
    setSavedTime(now);
    await saveStorageItem(STORAGE_KEYS.THEME_CONFIG, DEFAULT_THEME);
    triggerSaveNotification('Aurora Default restored ✓');
  };

  // Toggle Remember Tab
  const handleToggleRememberTab = async () => {
    const nextVal = !rememberTab;
    setRememberTab(nextVal);
    await saveStorageItem(STORAGE_KEYS.SYSTEM_PREFS, { rememberTab: nextVal });
    if (nextVal) {
      await saveStorageItem(STORAGE_KEYS.ACTIVE_TAB, activeTab);
    }
    triggerSaveNotification(nextVal ? 'Tab memory active' : 'Tab memory disabled');
  };

  // Reset All Storage Data
  const handleResetAllData = async () => {
    await clearAllOrbitalStorage();
    setTheme(DEFAULT_THEME);
    setActiveTab('display');
    setRememberTab(true);
    setSavedTime(null);
    triggerSaveNotification('All settings reset to default ✓');
  };

  // Screen orientation toggling
  const toggleOrientation = async () => {
    const nextIsLandscape = !isLandscape;
    setIsChanging(true);
    setError('');

    try {
      await ScreenOrientation.lockAsync(
        nextIsLandscape
          ? ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
          : ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
      setIsLandscape(nextIsLandscape);
      await saveStorageItem(STORAGE_KEYS.ORIENTATION_PREF, nextIsLandscape ? 'landscape' : 'portrait');
    } catch (orientationError) {
      setError(`Couldn't change the orientation: ${orientationError.message}`);
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: theme.backgroundColor }]}>
      <StatusBar style="light" />

      <View style={styles.appWrapper}>
        {/* Persistent Tab Bar */}
        <TabBar
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
          theme={theme}
          savedStatus={savedStatus}
        />

        {/* Tab Content Panels */}
        <View style={styles.tabContentContainer}>
          {activeTab === 'display' && (
            <DisplayTab
              isLandscape={isLandscape}
              isChanging={isChanging}
              error={error}
              toggleOrientation={toggleOrientation}
              isWideLayout={isWideLayout}
              width={width}
              height={height}
              theme={theme}
            />
          )}

          {activeTab === 'colors' && (
            <ColorsTab
              theme={theme}
              onSelectPreset={handleSelectPreset}
              onSelectAccent={handleSelectAccent}
              onSelectPlanet={handleSelectPlanet}
              onSaveTheme={handleExplicitSave}
              onResetDefault={handleResetThemeDefault}
              isWideLayout={isWideLayout}
              savedTime={savedTime}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsTab
              theme={theme}
              activeTab={activeTab}
              savedTime={savedTime}
              rememberTab={rememberTab}
              onToggleRememberTab={handleToggleRememberTab}
              onResetAllData={handleResetAllData}
              isWideLayout={isWideLayout}
            />
          )}
        </View>

        {/* Persistent Footer */}
        <Text style={[styles.footer, { color: theme.textMuted }]}>
          ORBITAL 01 · {activeTab.toUpperCase()} · {theme.name?.toUpperCase() || 'DEFAULT'}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 18,
  },
  appWrapper: {
    flex: 1,
    maxWidth: 960,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  tabContentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  footer: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.8,
    opacity: 0.7,
  },
});
