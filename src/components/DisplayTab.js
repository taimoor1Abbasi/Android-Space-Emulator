import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

export default function DisplayTab({
  isLandscape,
  isChanging,
  error,
  toggleOrientation,
  isWideLayout,
  width,
  height,
  theme,
}) {
  return (
    <View style={[styles.content, isWideLayout && styles.contentWide]}>
      <View style={styles.visualColumn}>
        <View style={styles.orbit}>
          <View style={[styles.orbitRing, { borderColor: theme.borderColor }]} />
          <View style={[styles.orbitRingInner, { borderColor: theme.borderColor }]} />
          <View style={[styles.planet, { backgroundColor: theme.planetColor }]}>
            <View style={[styles.planetHighlight, { backgroundColor: theme.planetHighlight }]} />
          </View>
          <View style={[styles.orbitDot, { backgroundColor: theme.accentColor }]} />
        </View>
        <Text style={[styles.eyebrow, { color: theme.accentColor }]}>DISPLAY CONTROL</Text>
        <Text style={[styles.heading, { color: theme.textColor }]}>A new{'\n'}point of view.</Text>
        <Text style={[styles.description, { color: theme.textMuted }]}>
          Turn your screen to explore your space from a different angle.
        </Text>
      </View>

      <View style={[styles.controlCard, { backgroundColor: theme.cardColor, borderColor: theme.borderColor }]}>
        <View style={styles.cardTopRow}>
          <Text style={[styles.cardEyebrow, { color: theme.textMuted }]}>CURRENT ORIENTATION</Text>
          <View style={[styles.liveBadge, { backgroundColor: theme.badgeBg }]}>
            <View style={[styles.liveDot, { backgroundColor: theme.accentColor }]} />
            <Text style={[styles.liveText, { color: theme.accentColor }]}>LIVE</Text>
          </View>
        </View>

        <View style={styles.orientationDisplay}>
          <View
            style={[
              styles.orientationFrame,
              { borderColor: theme.accentColor },
              isLandscape ? styles.orientationFrameLandscape : styles.orientationFramePortrait,
            ]}
          >
            <View style={[styles.orientationFrameLine, { backgroundColor: theme.accentColor }]} />
          </View>
          <View style={styles.orientationCopy}>
            <Text style={[styles.orientationName, { color: theme.textColor }]}>
              {isLandscape ? 'Landscape' : 'Portrait'}
            </Text>
            <Text style={[styles.orientationHint, { color: theme.textMuted }]}>
              {isLandscape ? 'Wide view' : 'Tall view'} · {Math.round(width)} × {Math.round(height)} px
            </Text>
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: theme.borderColor }]} />

        {/* Quick Telemetry metrics */}
        <View style={styles.telemetryRow}>
          <View style={[styles.telemetryPill, { backgroundColor: theme.subtleBorder }]}>
            <Text style={[styles.telemetryLabel, { color: theme.textMuted }]}>ASPECT</Text>
            <Text style={[styles.telemetryVal, { color: theme.textColor }]}>
              {(width / height).toFixed(2)}:1
            </Text>
          </View>
          <View style={[styles.telemetryPill, { backgroundColor: theme.subtleBorder }]}>
            <Text style={[styles.telemetryLabel, { color: theme.textMuted }]}>MODE</Text>
            <Text style={[styles.telemetryVal, { color: theme.accentColor }]}>
              {isLandscape ? 'LANDSCAPE' : 'PORTRAIT'}
            </Text>
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Switch to ${isLandscape ? 'portrait' : 'landscape'} orientation`}
          disabled={isChanging}
          onPress={toggleOrientation}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: theme.accentColor },
            pressed && !isChanging && styles.buttonPressed,
            isChanging && styles.buttonDisabled,
          ]}
        >
          {isChanging ? (
            <ActivityIndicator color={theme.buttonTextColor} />
          ) : (
            <>
              <Text style={[styles.buttonText, { color: theme.buttonTextColor }]}>
                Switch to {isLandscape ? 'portrait' : 'landscape'}
              </Text>
              <Text style={[styles.buttonArrow, { color: theme.buttonTextColor }]}>↗</Text>
            </>
          )}
        </Pressable>

        {error ? (
          <Text accessibilityRole="alert" style={styles.errorText}>
            {error}
          </Text>
        ) : (
          <Text style={[styles.helperText, { color: theme.textMuted }]}>
            Your screen will rotate instantly.
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    gap: 28,
  },
  contentWide: {
    maxWidth: 900,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 52,
  },
  visualColumn: {
    alignItems: 'flex-start',
  },
  orbit: {
    width: 110,
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  orbitRing: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderWidth: 1,
    borderRadius: 55,
  },
  orbitRingInner: {
    position: 'absolute',
    width: 78,
    height: 78,
    borderWidth: 1,
    borderRadius: 39,
  },
  planet: {
    width: 46,
    height: 46,
    borderRadius: 23,
    overflow: 'hidden',
  },
  planetHighlight: {
    position: 'absolute',
    width: 22,
    height: 52,
    top: -4,
    right: 2,
    borderRadius: 16,
    transform: [{ rotate: '35deg' }],
  },
  orbitDot: {
    position: 'absolute',
    right: 11,
    top: 11,
    width: 9,
    height: 9,
    borderRadius: 4.5,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2.4,
    marginBottom: 10,
  },
  heading: {
    fontSize: 38,
    fontWeight: '600',
    letterSpacing: -1.6,
    lineHeight: 42,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    marginTop: 12,
    maxWidth: 310,
  },
  controlCard: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 22,
    padding: 20,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardEyebrow: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.6,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 20,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  liveText: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
  },
  orientationDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 20,
  },
  orientationFrame: {
    borderWidth: 2,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orientationFramePortrait: {
    width: 36,
    height: 50,
  },
  orientationFrameLandscape: {
    width: 50,
    height: 36,
  },
  orientationFrameLine: {
    width: 9,
    height: 3,
    borderRadius: 2,
    position: 'absolute',
    bottom: 4,
  },
  orientationCopy: {
    gap: 3,
  },
  orientationName: {
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: -0.5,
  },
  orientationHint: {
    fontSize: 12,
  },
  divider: {
    height: 1,
    marginBottom: 14,
  },
  telemetryRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  telemetryPill: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
    gap: 2,
  },
  telemetryLabel: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  telemetryVal: {
    fontSize: 12,
    fontWeight: '700',
  },
  button: {
    minHeight: 52,
    paddingHorizontal: 18,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonPressed: {
    opacity: 0.84,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  buttonArrow: {
    fontSize: 18,
    fontWeight: '500',
  },
  helperText: {
    fontSize: 11,
    textAlign: 'center',
    marginTop: 12,
  },
  errorText: {
    color: '#FF9B9B',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 12,
  },
});

