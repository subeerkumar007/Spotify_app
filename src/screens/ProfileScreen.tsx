import React from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import data from '../../assets/data.json';
import { usePlayer } from '../player/PlayerContext';

export const ProfileScreen: React.FC = () => {
	const { play, setQueue } = usePlayer();
	const likedSongs = data.likedSongs.map(id => data.songs.find(s => s.id === id)!).filter(Boolean);
	const likedPlaylists = data.likedPlaylists.map(id => data.playlists.find(p => p.id === id)!).filter(Boolean);

	return (
		<FlatList
			className="flex-1 bg-background"
			ListHeaderComponent={
				<View className="px-4 py-4">
					<Text className="text-white text-xl font-bold">Demo User</Text>
					<Text className="text-muted">@demouser</Text>
				</View>
			}
			data={likedSongs}
			keyExtractor={s => s.id}
			renderItem={({ item }) => (
				<Pressable className="px-4 py-3 border-b border-neutral-800" onPress={() => { setQueue(likedSongs); void play(item, likedSongs); }}>
					<Text className="text-white">{item.title}</Text>
				</Pressable>
			)}
			ListFooterComponent={
				<View className="px-4 py-4">
					<Text className="text-white text-lg font-semibold mb-2">Liked Playlists</Text>
					{likedPlaylists.map(p => (
						<Pressable key={p.id} className="py-2" onPress={() => { const q = p.songIds.map(id => data.songs.find(s => s.id === id)!).filter(Boolean); if (q.length) { setQueue(q); void play(q[0], q); } }}>
							<Text className="text-white">{p.title}</Text>
						</Pressable>
					))}
				</View>
			}
		/>
	);
};


