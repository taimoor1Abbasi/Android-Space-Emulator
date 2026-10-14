import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as ScreenOrientation from 'expo-screen-orientation';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

export default function App() {
  const [isLandscape, setIsLandscape] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [error, setError] = useState('');
  const { width, height } = useWindowDimensions();
  const isWideLayout = width > height;

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP).catch(
      (orientationError) => {
        setError(`Couldn't set the starting orientation: ${orientationError.message}`);
      }
    );
  }, []);

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
    } catch (orientationError) {
      setError(`Couldn't change the orientation: ${orientationError.message}`);
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <View style={[styles.content, isWideLayout && styles.contentWide]}>
        <View style={styles.visualColumn}>
          <View style={styles.orbit}>
            <View style={styles.orbitRing} />
            <View style={styles.orbitRingInner} />
            <View style={styles.planet}>
              <View style={styles.planetHighlight} />
            </View>
            <View style={styles.orbitDot} />
          </View>
          <Text style={styles.eyebrow}>DISPLAY CONTROL</Text>
          <Text style={styles.heading}>A new{'\n'}point of view.</Text>
          <Text style={styles.description}>
            Turn your screen to explore your space from a different angle.
          </Text>
        </View>

        <View style={styles.controlCard}>
          <View style={styles.cardTopRow}>
            <Text style={styles.cardEyebrow}>CURRENT ORIENTATION</Text>
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE</Text>
            </View>
          </View>

          <View style={styles.orientationDisplay}>
            <View
              style={[
                styles.orientationFrame,
                isLandscape ? styles.orientationFrameLandscape : styles.orientationFramePortrait,
              ]}
            >
              <View style={styles.orientationFrameLine} />
            </View>
            <View style={styles.orientationCopy}>
              <Text style={styles.orientationName}>
                {isLandscape ? 'Landscape' : 'Portrait'}
              </Text>
              <Text style={styles.orientationHint}>
                {isLandscape ? 'Wide view' : 'Tall view'}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Switch to ${isLandscape ? 'portrait' : 'landscape'} orientation`}
            disabled={isChanging}
            onPress={toggleOrientation}
            style={({ pressed }) => [
              styles.button,
              pressed && !isChanging && styles.buttonPressed,
              isChanging && styles.buttonDisabled,
            ]}
          >
            {isChanging ? (
              <ActivityIndicator color="#10121B" />
            ) : (
              <>
                <Text style={styles.buttonText}>
                  Switch to {isLandscape ? 'portrait' : 'landscape'}
                </Text>
                <Text style={styles.buttonArrow}>↗</Text>
              </>
            )}
          </Pressable>

          {error ? (
            <Text accessibilityRole="alert" style={styles.errorText}>
              {error}
            </Text>
          ) : (
            <Text style={styles.helperText}>Your screen will rotate instantly.</Text>
          )}
        </View>
      </View>
      <Text style={styles.footer}>ORBITAL 01 · SCREEN SETTINGS</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#10121B',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 28,
  },
  content: {
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    gap: 36,
  },
  contentWide: {
    maxWidth: 900,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 64,
  },
  visualColumn: {
    alignItems: 'flex-start',
  },
  orbit: {
    width: 126,
    height: 126,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  orbitRing: {
    position: 'absolute',
    width: 126,
    height: 126,
    borderColor: '#323744',
    borderWidth: 1,
    borderRadius: 63,
  },
  orbitRingInner: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderColor: '#323744',
    borderWidth: 1,
    borderRadius: 45,
  },
  planet: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#B6F36A',
    overflow: 'hidden',
  },
  planetHighlight: {
    position: 'absolute',
    width: 26,
    height: 62,
    top: -5,
    right: 3,
    borderRadius: 20,
    backgroundColor: '#D5FFA1',
    transform: [{ rotate: '35deg' }],
  },
  orbitDot: {
    position: 'absolute',
    right: 13,
    top: 13,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#B6F36A',
  },
  eyebrow: {
    color: '#B6F36A',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2.4,
    marginBottom: 12,
  },
  heading: {
    color: '#F4F4F1',
    fontSize: 42,
    fontWeight: '600',
    letterSpacing: -1.8,
    lineHeight: 46,
  },
  description: {
    color: '#9297A5',
    fontSize: 15,
    lineHeight: 23,
    marginTop: 14,
    maxWidth: 310,
  },
  controlCard: {
    width: '100%',
    backgroundColor: '#1A1D28',
    borderColor: '#2B2F3C',
    borderWidth: 1,
    borderRadius: 22,
    padding: 22,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardEyebrow: {
    color: '#9297A5',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.6,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 20,
    backgroundColor: '#262D25',
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#B6F36A',
  },
  liveText: {
    color: '#B6F36A',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
  },
  orientationDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    paddingVertical: 28,
  },
  orientationFrame: {
    borderColor: '#B6F36A',
    borderWidth: 2,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orientationFramePortrait: {
    width: 38,
    height: 54,
  },
  orientationFrameLandscape: {
    width: 54,
    height: 38,
  },
  orientationFrameLine: {
    width: 9,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#B6F36A',
    position: 'absolute',
    bottom: 4,
  },
  orientationCopy: {
    gap: 4,
  },
  orientationName: {
    color: '#F4F4F1',
    fontSize: 23,
    fontWeight: '600',
    letterSpacing: -0.5,
  },
  orientationHint: {
    color: '#9297A5',
    fontSize: 13,
  },
  divider: {
    height: 1,
    backgroundColor: '#2B2F3C',
    marginBottom: 18,
  },
  button: {
    minHeight: 56,
    paddingHorizontal: 18,
    backgroundColor: '#B6F36A',
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
    color: '#10121B',
    fontSize: 15,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  buttonArrow: {
    color: '#10121B',
    fontSize: 21,
    fontWeight: '500',
  },
  helperText: {
    color: '#777D8C',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 14,
  },
  errorText: {
    color: '#FF9B9B',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 14,
  },
  footer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 14,
    color: '#646A79',
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 1.8,
  },
});
