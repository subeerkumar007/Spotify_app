import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { usePlayer } from '../player/PlayerContext';

export const PlayerScreen: React.FC = () => {
	const { current, isPlaying, pause, resume, next, previous, positionMs, durationMs, seekTo, shuffle, setShuffle, repeat, setRepeat } = usePlayer();
	const position = positionMs / 1000;
	const duration = Math.max(1, durationMs / 1000);

	const formatted = (s: number) => {
		const m = Math.floor(s / 60);
		const sec = Math.floor(s % 60).toString().padStart(2, '0');
		return `${m}:${sec}`;
	};
	
	const styles = StyleSheet.create({
		flex1: { flex: 1 },
		bgBackground: { backgroundColor: '#121212' }, // replace with your background color
		itemsCenter: { alignItems: 'center' },
		justifyCenter: { justifyContent: 'center' },
		textMuted: { color: '#888' }, // replace with your muted color
		px6: { paddingHorizontal: 24 },
		py8: { paddingVertical: 32 },
		textWhite: { color: '#fff' },
		textXl: { fontSize: 24 },
		mb6: { marginBottom: 24 },
		flexRow: { flexDirection: 'row' },
		justifyBetween: { justifyContent: 'space-between' },
		mb2: { marginBottom: 8 },
		h2: { height: 8 },
		bgNeutral700: { backgroundColor: '#333' }, // replace with your neutral color
		rounded: { borderRadius: 4 },
		bgPrimary: { backgroundColor: '#1db954' }, // replace with your primary color
		mt2: { marginTop: 8 },
		textPrimary: { color: '#1db954' }, // replace with your primary color
		textLg: { fontSize: 18 },
	});

	if (!current) {
		return (
			<View style={[styles.flex1, styles.bgBackground, styles.itemsCenter, styles.justifyCenter]}>
				<Text style={styles.textMuted}>Nothing playing</Text>
			</View>
		);
	}

	return (
		<View style={[styles.flex1, styles.bgBackground, styles.px6, styles.py8]}>
			<Text style={[styles.textWhite, styles.textXl, styles.mb6]} numberOfLines={1}>{current.title}</Text>
			<View style={[styles.flexRow, styles.itemsCenter, styles.justifyBetween, styles.mb2]}>
				<Text style={styles.textMuted}>{formatted(position)}</Text>
				<Text style={styles.textMuted}>{formatted(duration)}</Text>
			</View>
			{/* Slider substitute: simple progress bar with press to seek */}
			<Pressable
				style={[styles.h2, styles.bgNeutral700, styles.rounded, styles.mb6]}
				onPress={(e) => {
					const width = (e.nativeEvent as any).target.width || 1;
					const x = (e.nativeEvent as any).locationX || 0;
					const ratio = Math.max(0, Math.min(1, x / width));
					void seekTo(ratio * durationMs);
				}}
			>
				<View style={[
					styles.h2,
					styles.bgPrimary,
					styles.rounded,
					{ width: `${(position / duration) * 100}%` }
				]} />
			</Pressable>
			<View style={[styles.flexRow, styles.itemsCenter, styles.justifyBetween, styles.mt2]}>
				<Pressable onPress={() => setShuffle(!shuffle)}>
					<Text style={shuffle ? styles.textPrimary : styles.textWhite}>Shuffle</Text>
				</Pressable>
				<Pressable onPress={previous}>
					<Text style={styles.textWhite}>Prev</Text>
				</Pressable>
				<Pressable onPress={isPlaying ? pause : resume}>
					<Text style={[styles.textWhite, styles.textLg]}>{isPlaying ? 'Pause' : 'Play'}</Text>
				</Pressable>
				<Pressable onPress={next}>
					<Text style={styles.textWhite}>Next</Text>
				</Pressable>
				<Pressable onPress={() => setRepeat(repeat === 'off' ? 'all' : repeat === 'all' ? 'one' : 'off')}>
					<Text style={repeat !== 'off' ? styles.textPrimary : styles.textWhite}>Repeat: {repeat}</Text>
				</Pressable>
			</View>
		</View>
	);
};


