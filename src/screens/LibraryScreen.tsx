import React from 'react';
import { View, Text, FlatList, Image, Pressable } from 'react-native';
import data from '../../assets/data.json';
import { usePlayer } from '../player/PlayerContext';

export const LibraryScreen: React.FC = () => {
	const { play, setQueue } = usePlayer();
	return (
		<FlatList
			className="flex-1 bg-background"
			data={data.playlists}
			keyExtractor={(p) => p.id}
			renderItem={({ item }) => (
				<Pressable
					className="flex-row items-center px-4 py-3 border-b border-neutral-800"
					onPress={() => {
						const q = item.songIds.map(id => data.songs.find(s => s.id === id)!).filter(Boolean);
						if (q.length) void play(q[0], q);
						setQueue(q);
					}}
				>
					<Image source={{ uri: item.cover }} className="w-12 h-12 rounded mr-3" />
					<Text className="text-white text-base">{item.title}</Text>
				</Pressable>
			)}
		/>
	);
};


