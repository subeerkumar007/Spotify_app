import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Audio, AVPlaybackStatus } from 'expo-av';

type Song = {
	id: string;
	title: string;
	artistId: string;
	audio: string;
	cover: string;
	duration: number;
};

type PlayerContextValue = {
	current: Song | null;
	queue: Song[];
	isPlaying: boolean;
	positionMs: number;
	durationMs: number;
	play: (song: Song, queue?: Song[]) => Promise<void>;
	pause: () => Promise<void>;
	resume: () => Promise<void>;
	next: () => Promise<void>;
	previous: () => Promise<void>;
	seekTo: (ms: number) => Promise<void>;
	setQueue: (songs: Song[]) => void;
	setShuffle: (enabled: boolean) => void;
	shuffle: boolean;
	setRepeat: (mode: 'off' | 'one' | 'all') => void;
	repeat: 'off' | 'one' | 'all';
};

const PlayerContext = createContext<PlayerContextValue | undefined>(undefined);

export const usePlayer = (): PlayerContextValue => {
	const ctx = useContext(PlayerContext);
	if (!ctx) throw new Error('usePlayer must be used within PlayerProvider');
	return ctx;
};

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const soundRef = useRef<Audio.Sound | null>(null);
	const [current, setCurrent] = useState<Song | null>(null);
	const [queue, setQueue] = useState<Song[]>([]);
	const [isPlaying, setIsPlaying] = useState(false);
	const [positionMs, setPositionMs] = useState(0);
	const [durationMs, setDurationMs] = useState(0);
	const [shuffle, setShuffle] = useState(false);
	const [repeat, setRepeat] = useState<'off' | 'one' | 'all'>('off');

	useEffect(() => {
		Audio.setAudioModeAsync({
			staysActiveInBackground: true,
			interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
			shouldDuckAndroid: true,
			playsInSilentModeIOS: true,
		});
	}, []);

	const unload = useCallback(async () => {
		if (soundRef.current) {
			await soundRef.current.unloadAsync();
			soundRef.current.setOnPlaybackStatusUpdate(null);
			soundRef.current = null;
		}
	}, []);

	const onStatus = useCallback((status: AVPlaybackStatus) => {
		if (!status.isLoaded) return;
		setIsPlaying(status.isPlaying ?? false);
		setPositionMs(status.positionMillis ?? 0);
		setDurationMs(status.durationMillis ?? 0);
		if (status.didJustFinish) {
			if (repeat === 'one' && current) {
				soundRef.current?.replayAsync();
				return;
			}
			void next();
		}
	}, [repeat, current]);

	const loadAndPlay = useCallback(async (song: Song) => {
		await unload();
		const { sound } = await Audio.Sound.createAsync({ uri: song.audio }, { shouldPlay: true }, onStatus);
		soundRef.current = sound;
		setCurrent(song);
	}, [onStatus, unload]);

	const play = useCallback(async (song: Song, q?: Song[]) => {
		if (q) setQueue(q);
		await loadAndPlay(song);
	}, [loadAndPlay]);

	const pause = useCallback(async () => {
		await soundRef.current?.pauseAsync();
	}, []);

	const resume = useCallback(async () => {
		await soundRef.current?.playAsync();
	}, []);

	const next = useCallback(async () => {
		if (!current || queue.length === 0) return;
		const idx = queue.findIndex(s => s.id === current.id);
		let nextIndex = idx + 1;
		if (shuffle) {
			nextIndex = Math.floor(Math.random() * queue.length);
		} else if (nextIndex >= queue.length) {
			nextIndex = repeat === 'all' ? 0 : idx; // stay if no repeat
		}
		const nextSong = queue[nextIndex];
		if (nextSong && nextSong.id !== current.id) await loadAndPlay(nextSong);
	}, [current, queue, shuffle, repeat, loadAndPlay]);

	const previous = useCallback(async () => {
		if (!current || queue.length === 0) return;
		const idx = queue.findIndex(s => s.id === current.id);
		const prevIndex = idx > 0 ? idx - 1 : 0;
		const prevSong = queue[prevIndex];
		if (prevSong) await loadAndPlay(prevSong);
	}, [current, queue, loadAndPlay]);

	const seekTo = useCallback(async (ms: number) => {
		await soundRef.current?.setPositionAsync(ms);
	}, []);

	const value = useMemo<PlayerContextValue>(() => ({
		current,
		queue,
		isPlaying,
		positionMs,
		durationMs,
		play,
		pause,
		resume,
		next,
		previous,
		seekTo,
		setQueue,
		setShuffle,
		shuffle,
		setRepeat,
		repeat,
	}), [current, queue, isPlaying, positionMs, durationMs, play, pause, resume, next, previous, seekTo, setQueue, shuffle, repeat]);

	return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
};


