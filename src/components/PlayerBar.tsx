import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { usePlayer } from '../player/PlayerContext';

export const PlayerBar: React.FC = () => {
	const { current, isPlaying, pause, resume, next } = usePlayer();
	if (!current) return null;
	return (
		<Pressable className="bg-card px-4 py-3 border-t border-neutral-800" onPress={() => {}}>
			<View className="flex-row items-center justify-between">
				<Text className="text-white flex-1" numberOfLines={1}>
					{current.title}
				</Text>
				<View className="flex-row items-center gap-4">
					<Pressable onPress={isPlaying ? pause : resume}>
						<Text className="text-primary">{isPlaying ? 'Pause' : 'Play'}</Text>
					</Pressable>
					<Pressable onPress={next}>
						<Text className="text-white">Next</Text>
					</Pressable>
				</View>
			</View>
		</Pressable>
	);
};


