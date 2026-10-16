import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function SettingsTab({
  theme,
  activeTab,
  savedTime,
  rememberTab,
  onToggleRememberTab,
  onResetAllData,
  isWideLayout,
}) {
  const handleResetPress = () => {
    if (typeof window !== 'undefined' && window.confirm) {
      if (window.confirm('Reset all saved settings, theme colors, and active tab back to defaults?')) {
        onResetAllData();
      }
    } else {
      Alert.alert(
        'Reset All Data',
        'This will reset your saved theme colors, active tab, and display preferences back to orbital defaults.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Reset All', style: 'destructive', onPress: onResetAllData },
        ]
      );
    }
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={[styles.content, isWideLayout && styles.contentWide]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerBlock}>
        <Text style={[styles.eyebrow, { color: theme.accentColor }]}>SYSTEM & PREFERENCES</Text>
        <Text style={[styles.heading, { color: theme.textColor }]}>Orbital Settings</Text>
        <Text style={[styles.description, { color: theme.textMuted }]}>
          Manage persistent tabs, theme storage, and system telemetry.
        </Text>
      </View>

      {/* Persistence Status Card */}
      <View style={[styles.card, { backgroundColor: theme.cardColor, borderColor: theme.borderColor }]}>
        <View style={styles.cardHeader}>
          <Text style={[styles.cardTitle, { color: theme.textColor }]}>Storage & Persistence</Text>
          <View style={[styles.statusBadge, { backgroundColor: theme.badgeBg }]}>
            <View style={[styles.statusDot, { backgroundColor: theme.accentColor }]} />
            <Text style={[styles.statusText, { color: theme.accentColor }]}>PERSISTED</Text>
          </View>
        </View>

        <Text style={[styles.cardBody, { color: theme.textMuted }]}>
          Every time you change themes, select custom accent swatches, or switch tabs, your choices are safely stored in device local storage.
        </Text>

        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: theme.textMuted }]}>Storage Engine</Text>
          <Text style={[styles.infoVal, { color: theme.accentColor }]}>AsyncStorage / Local</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: theme.textMuted }]}>Last Saved</Text>
          <Text style={[styles.infoVal, { color: theme.textColor }]}>
            {savedTime ? new Date(savedTime).toLocaleString() : 'Defaults Loaded'}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: theme.textMuted }]}>Active Tab ID</Text>
          <Text style={[styles.infoVal, { color: theme.textColor }]}>{activeTab}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: theme.textMuted }]}>Active Theme</Text>
          <Text style={[styles.infoVal, { color: theme.textColor }]}>{theme.name || 'Custom'}</Text>
        </View>
      </View>

      {/* Tabs Behavior Card */}
      <View style={[styles.card, { backgroundColor: theme.cardColor, borderColor: theme.borderColor }]}>
        <View style={styles.cardHeader}>
          <Text style={[styles.cardTitle, { color: theme.textColor }]}>Tab Navigation State</Text>
        </View>

        <Text style={[styles.cardBody, { color: theme.textMuted }]}>
          Configure whether the emulator automatically remembers and restores your active tab when you restart the application.
        </Text>

        <Pressable
          accessibilityRole="button"
          onPress={onToggleRememberTab}
          style={({ pressed }) => [
            styles.toggleRow,
            { backgroundColor: theme.subtleBorder },
            pressed && styles.buttonPressed,
          ]}
        >
          <View style={styles.toggleTextGroup}>
            <Text style={[styles.toggleTitle, { color: theme.textColor }]}>
              Remember Last Active Tab
            </Text>
            <Text style={[styles.toggleDesc, { color: theme.textMuted }]}>
              {rememberTab ? 'Enabled: Reopens to your last visited tab' : 'Disabled: Always starts on Orbit tab'}
            </Text>
          </View>
          <View
            style={[
              styles.switchTrack,
              { backgroundColor: rememberTab ? theme.accentColor : theme.borderColor },
            ]}
          >
            <View
              style={[
                styles.switchThumb,
                rememberTab ? styles.switchThumbOn : styles.switchThumbOff,
                { backgroundColor: rememberTab ? theme.buttonTextColor : theme.textMuted },
              ]}
            />
          </View>
        </Pressable>
      </View>

      {/* Danger Zone: Reset All */}
      <View style={[styles.card, { backgroundColor: theme.cardColor, borderColor: theme.borderColor }]}>
        <Text style={[styles.cardTitle, { color: theme.textColor }]}>Data Management</Text>
        <Text style={[styles.cardBody, { color: theme.textMuted }]}>
          Clear all saved theme preferences, active tab memory, and restore the orbital defaults.
        </Text>

        <Pressable
          accessibilityRole="button"
          onPress={handleResetPress}
          style={({ pressed }) => [
            styles.dangerButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.dangerButtonText}>Reset All Saved Changes</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
  },
  content: {
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    gap: 20,
    paddingBottom: 40,
  },
  contentWide: {
    maxWidth: 720,
  },
  headerBlock: {
    alignItems: 'flex-start',
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2.2,
    marginBottom: 6,
  },
  heading: {
    fontSize: 32,
    fontWeight: '600',
    letterSpacing: -1,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
  },
  card: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 18,
    gap: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
  cardBody: {
    fontSize: 13,
    lineHeight: 19,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  infoLabel: {
    fontSize: 12,
  },
  infoVal: {
    fontSize: 12,
    fontWeight: '600',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 12,
    gap: 12,
  },
  toggleTextGroup: {
    flex: 1,
    gap: 2,
  },
  toggleTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  toggleDesc: {
    fontSize: 11,
  },
  switchTrack: {
    width: 44,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    padding: 2,
  },
  switchThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  switchThumbOn: {
    alignSelf: 'flex-end',
  },
  switchThumbOff: {
    alignSelf: 'flex-start',
  },
  dangerButton: {
    minHeight: 46,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF4D6D',
    backgroundColor: 'rgba(255, 77, 109, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginTop: 4,
  },
  dangerButtonText: {
    color: '#FF6B8B',
    fontSize: 13,
    fontWeight: '700',
  },
  buttonPressed: {
    opacity: 0.8,
  },
});

