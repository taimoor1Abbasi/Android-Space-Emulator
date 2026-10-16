import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function TabBar({ activeTab, onSelectTab, theme, savedStatus }) {
  const tabs = [
    { id: 'display', label: 'Orbit', icon: '🪐' },
    { id: 'colors', label: 'Colors', icon: '🎨' },
    { id: 'settings', label: 'System', icon: '⚙️' },
  ];

  return (
    <View style={[styles.container, { borderColor: theme.borderColor, backgroundColor: theme.cardColor }]}>
      <View style={styles.tabRow}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <Pressable
              key={tab.id}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              onPress={() => onSelectTab(tab.id)}
              style={({ pressed }) => [
                styles.tabItem,
                isActive && [styles.tabItemActive, { backgroundColor: theme.badgeBg }],
                pressed && styles.tabItemPressed,
              ]}
            >
              <Text style={styles.tabIcon}>{tab.icon}</Text>
              <Text
                style={[
                  styles.tabLabel,
                  { color: isActive ? theme.accentColor : theme.textMuted },
                  isActive && styles.tabLabelActive,
                ]}
              >
                {tab.label}
              </Text>
              {isActive && (
                <View style={[styles.activeIndicator, { backgroundColor: theme.accentColor }]} />
              )}
            </Pressable>
          );
        })}
      </View>

      {savedStatus ? (
        <View style={styles.savedBanner}>
          <View style={[styles.savedDot, { backgroundColor: theme.accentColor }]} />
          <Text style={[styles.savedText, { color: theme.accentColor }]}>{savedStatus}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 18,
    borderWidth: 1,
    padding: 6,
    marginBottom: 20,
  },
  tabRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 6,
  },
  tabItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 12,
    gap: 6,
    position: 'relative',
  },
  tabItemActive: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  tabItemPressed: {
    opacity: 0.75,
  },
  tabIcon: {
    fontSize: 14,
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  tabLabelActive: {
    fontWeight: '700',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 2,
    width: 16,
    height: 3,
    borderRadius: 2,
  },
  savedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingTop: 6,
    paddingBottom: 2,
  },
  savedDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  savedText: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

