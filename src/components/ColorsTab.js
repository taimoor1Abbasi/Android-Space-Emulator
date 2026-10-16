import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ACCENT_SWATCHES, PLANET_SWATCHES, THEME_PRESETS } from '../theme/themes';

export default function ColorsTab({
  theme,
  onSelectPreset,
  onSelectAccent,
  onSelectPlanet,
  onSaveTheme,
  onResetDefault,
  isWideLayout,
  savedTime,
}) {
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={[styles.content, isWideLayout && styles.contentWide]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Info */}
      <View style={styles.headerBlock}>
        <Text style={[styles.eyebrow, { color: theme.accentColor }]}>COLOR CUSTOMIZATION</Text>
        <Text style={[styles.heading, { color: theme.textColor }]}>Space Themes & Accents</Text>
        <Text style={[styles.description, { color: theme.textMuted }]}>
          Personalize the orbital cockpit, planet surface, and telemetry accents.
        </Text>
      </View>

      {/* Mini Live Preview */}
      <View style={[styles.previewCard, { backgroundColor: theme.cardColor, borderColor: theme.borderColor }]}>
        <View style={styles.previewTop}>
          <Text style={[styles.previewLabel, { color: theme.textMuted }]}>LIVE PREVIEW</Text>
          <View style={[styles.livePill, { backgroundColor: theme.badgeBg }]}>
            <View style={[styles.liveDot, { backgroundColor: theme.accentColor }]} />
            <Text style={[styles.livePillText, { color: theme.accentColor }]}>
              {theme.name || 'CUSTOM'}
            </Text>
          </View>
        </View>

        <View style={styles.previewCenter}>
          <View style={styles.miniOrbit}>
            <View style={[styles.miniRing, { borderColor: theme.borderColor }]} />
            <View style={[styles.miniPlanet, { backgroundColor: theme.planetColor }]}>
              <View style={[styles.miniPlanetHighlight, { backgroundColor: theme.planetHighlight }]} />
            </View>
            <View style={[styles.miniOrbitDot, { backgroundColor: theme.accentColor }]} />
          </View>

          <View style={styles.previewDetails}>
            <Text style={[styles.previewThemeName, { color: theme.textColor }]}>
              {theme.name || 'Custom Theme'}
            </Text>
            <Text style={[styles.previewHex, { color: theme.textMuted }]}>
              Accent: {theme.accentColor} · Planet: {theme.planetColor}
            </Text>
            {savedTime ? (
              <Text style={[styles.previewSavedText, { color: theme.accentColor }]}>
                ✓ Saved to storage ({new Date(savedTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })})
              </Text>
            ) : null}
          </View>
        </View>
      </View>

      {/* Section 1: Presets */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.textColor }]}>Interstellar Presets</Text>
        <Text style={[styles.sectionSubtitle, { color: theme.textMuted }]}>
          Complete color palettes engineered for deep space readability.
        </Text>

        <View style={styles.presetGrid}>
          {THEME_PRESETS.map((preset) => {
            const isSelected = theme.id === preset.id;
            return (
              <Pressable
                key={preset.id}
                accessibilityRole="button"
                accessibilityLabel={`Select theme ${preset.name}`}
                onPress={() => onSelectPreset(preset)}
                style={({ pressed }) => [
                  styles.presetCard,
                  {
                    backgroundColor: preset.cardColor,
                    borderColor: isSelected ? preset.accentColor : preset.borderColor,
                    borderWidth: isSelected ? 2 : 1,
                  },
                  pressed && styles.cardPressed,
                ]}
              >
                <View style={styles.presetHeader}>
                  <View>
                    <Text style={[styles.presetName, { color: preset.textColor }]}>
                      {preset.name}
                    </Text>
                    <Text style={[styles.presetSub, { color: preset.textMuted }]}>
                      {preset.subtitle}
                    </Text>
                  </View>
                  {isSelected && (
                    <View style={[styles.activeTag, { backgroundColor: preset.accentColor }]}>
                      <Text style={[styles.activeTagText, { color: preset.buttonTextColor }]}>
                        ACTIVE
                      </Text>
                    </View>
                  )}
                </View>

                {/* Color swatches preview inside preset */}
                <View style={styles.presetChipsRow}>
                  <View style={[styles.presetChip, { backgroundColor: preset.accentColor }]} />
                  <View style={[styles.presetChip, { backgroundColor: preset.planetColor }]} />
                  <View style={[styles.presetChip, { backgroundColor: preset.backgroundColor, borderColor: preset.borderColor, borderWidth: 1 }]} />
                  <View style={[styles.presetChip, { backgroundColor: preset.cardColor, borderColor: preset.borderColor, borderWidth: 1 }]} />
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Section 2: Accent Swatches */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.textColor }]}>Accent Color</Text>
        <Text style={[styles.sectionSubtitle, { color: theme.textMuted }]}>
          Change buttons, badges, indicators, and orbital beacons.
        </Text>

        <View style={styles.swatchRow}>
          {ACCENT_SWATCHES.map((hex) => {
            const isSelected = theme.accentColor.toLowerCase() === hex.toLowerCase();
            return (
              <Pressable
                key={hex}
                accessibilityRole="button"
                accessibilityLabel={`Accent color ${hex}`}
                onPress={() => onSelectAccent(hex)}
                style={({ pressed }) => [
                  styles.swatchItem,
                  { backgroundColor: hex },
                  isSelected && styles.swatchItemSelected,
                  pressed && styles.cardPressed,
                ]}
              >
                {isSelected && <View style={styles.swatchInnerDot} />}
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Section 3: Planet Style */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.textColor }]}>Planet Body & Highlight</Text>
        <Text style={[styles.sectionSubtitle, { color: theme.textMuted }]}>
          Choose the celestial appearance of your focal planet.
        </Text>

        <View style={styles.planetGrid}>
          {PLANET_SWATCHES.map((p) => {
            const isSelected = theme.planetColor.toLowerCase() === p.color.toLowerCase();
            return (
              <Pressable
                key={p.name}
                accessibilityRole="button"
                accessibilityLabel={`Planet style ${p.name}`}
                onPress={() => onSelectPlanet(p)}
                style={({ pressed }) => [
                  styles.planetCard,
                  {
                    backgroundColor: theme.cardColor,
                    borderColor: isSelected ? theme.accentColor : theme.borderColor,
                    borderWidth: isSelected ? 2 : 1,
                  },
                  pressed && styles.cardPressed,
                ]}
              >
                <View style={[styles.planetCircle, { backgroundColor: p.color }]}>
                  <View style={[styles.planetCircleHighlight, { backgroundColor: p.highlight }]} />
                </View>
                <Text style={[styles.planetName, { color: theme.textColor }]}>{p.name}</Text>
                {isSelected && (
                  <View style={[styles.planetSelectedDot, { backgroundColor: theme.accentColor }]} />
                )}
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Save & Reset Actions */}
      <View style={styles.actionsContainer}>
        <Pressable
          accessibilityRole="button"
          onPress={onSaveTheme}
          style={({ pressed }) => [
            styles.primaryButton,
            { backgroundColor: theme.accentColor },
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={[styles.primaryButtonText, { color: theme.buttonTextColor }]}>
            Save Theme Changes
          </Text>
          <Text style={[styles.primaryButtonIcon, { color: theme.buttonTextColor }]}>💾</Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          onPress={onResetDefault}
          style={({ pressed }) => [
            styles.secondaryButton,
            { borderColor: theme.borderColor },
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={[styles.secondaryButtonText, { color: theme.textMuted }]}>
            Reset to Default Theme
          </Text>
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
    gap: 24,
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
  previewCard: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    gap: 12,
  },
  previewTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  previewLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  livePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  livePillText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  previewCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  miniOrbit: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniRing: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderWidth: 1,
    borderRadius: 30,
  },
  miniPlanet: {
    width: 26,
    height: 26,
    borderRadius: 13,
    overflow: 'hidden',
  },
  miniPlanetHighlight: {
    position: 'absolute',
    width: 12,
    height: 30,
    top: -2,
    right: 1,
    borderRadius: 8,
    transform: [{ rotate: '35deg' }],
  },
  miniOrbitDot: {
    position: 'absolute',
    right: 5,
    top: 5,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  previewDetails: {
    flex: 1,
    gap: 3,
  },
  previewThemeName: {
    fontSize: 17,
    fontWeight: '600',
  },
  previewHex: {
    fontSize: 11,
  },
  previewSavedText: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  section: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    fontSize: 12,
    lineHeight: 17,
  },
  presetGrid: {
    gap: 10,
  },
  presetCard: {
    borderRadius: 14,
    padding: 14,
    gap: 10,
  },
  presetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  presetName: {
    fontSize: 15,
    fontWeight: '600',
  },
  presetSub: {
    fontSize: 11,
    marginTop: 1,
  },
  activeTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  activeTagText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },
  presetChipsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  presetChip: {
    width: 22,
    height: 22,
    borderRadius: 11,
  },
  cardPressed: {
    opacity: 0.8,
  },
  swatchRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    alignItems: 'center',
  },
  swatchItem: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swatchItemSelected: {
    borderWidth: 3,
    borderColor: '#FFFFFF',
    transform: [{ scale: 1.1 }],
  },
  swatchInnerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#000000',
  },
  planetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  planetCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    minWidth: 130,
    flexGrow: 1,
  },
  planetCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    overflow: 'hidden',
  },
  planetCircleHighlight: {
    position: 'absolute',
    width: 10,
    height: 26,
    top: -2,
    right: 1,
    borderRadius: 8,
    transform: [{ rotate: '35deg' }],
  },
  planetName: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  planetSelectedDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  actionsContainer: {
    gap: 10,
    marginTop: 8,
  },
  primaryButton: {
    minHeight: 48,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 16,
  },
  primaryButtonText: {
    fontSize: 14,
    fontWeight: '700',
  },
  primaryButtonIcon: {
    fontSize: 16,
  },
  secondaryButton: {
    minHeight: 44,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  secondaryButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  buttonPressed: {
    opacity: 0.8,
  },
});

