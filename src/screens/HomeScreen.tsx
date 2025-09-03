import React, { useMemo } from 'react';
import { View, Text, FlatList, Image, Pressable } from 'react-native';
import data from '../../assets/data.json';
import { usePlayer } from '../player/PlayerContext';

const getSong = (id: string) => data.songs.find(s => s.id === id)!;

export const HomeScreen: React.FC = () => {
	const { play, setQueue } = usePlayer();
	const trending = useMemo(() => data.playlists.find(p => p.id === 'p1')!, []);
	const recommended = useMemo(() => data.playlists.find(p => p.id === 'p2')!, []);
	const recent = useMemo(() => data.playlists.find(p => p.id === 'p3')!, []);

	const renderRow = (title: string, playlistSongIds: string[]) => (
		<View className="mb-6">
			<Text className="text-white text-lg font-semibold mb-3 px-4">{title}</Text>
			<FlatList
				horizontal
				showsHorizontalScrollIndicator={false}
				data={playlistSongIds}
				keyExtractor={(id) => id}
				renderItem={({ item }) => {
					const song = getSong(item);
					return (
						<Pressable
							className="mx-2 w-40"
							onPress={() => {
								const q = playlistSongIds.map(getSong);
								setQueue(q);
								void play(song, q);
							}}
						>
							<Image source={{ uri: song.cover }} className="w-40 h-40 rounded" />
							<Text className="text-white mt-2" numberOfLines={1}>{song.title}</Text>
						</Pressable>
					);
				}}
			/>
		</View>
	);

	return (
		<FlatList
			className="flex-1 bg-background"
			ListHeaderComponent={
				<View className="py-4">
					{renderRow('Trending Playlists', trending.songIds)}
					{renderRow('Recommended Songs', recommended.songIds)}
					{renderRow('Recently Played', recent.songIds)}
				</View>
			}
		/>
	);
};


