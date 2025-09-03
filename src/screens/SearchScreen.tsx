import React, { useMemo, useState } from 'react';
import { View, TextInput, FlatList, Text, Pressable } from 'react-native';
import data from '../../assets/data.json';
import { usePlayer } from '../player/PlayerContext';

export const SearchScreen: React.FC = () => {
	const [q, setQ] = useState('');
	const { play, setQueue } = usePlayer();

	const results = useMemo(() => {
		const query = q.trim().toLowerCase();
		if (!query) return [] as { id: string; title: string }[];
		const artistMatches = data.artists
			.filter(a => a.name.toLowerCase().includes(query))
			.map(a => ({ id: a.id, title: `Artist · ${a.name}` }));
		const songMatches = data.songs
			.filter(s => s.title.toLowerCase().includes(query))
			.map(s => ({ id: s.id, title: `Song · ${s.title}` }));
		return [...artistMatches, ...songMatches];
	}, [q]);

	return (
		<View className="flex-1 bg-background">
			<TextInput
				className="mx-4 mt-4 mb-2 px-4 py-3 rounded bg-card text-white"
				placeholder="Search artists, songs"
				placeholderTextColor="#888"
				value={q}
				onChangeText={setQ}
			/>
			<FlatList
				data={results}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<Pressable
						className="px-4 py-3 border-b border-neutral-800"
						onPress={() => {
							if (item.title.startsWith('Song')) {
								const song = data.songs.find(s => s.id === item.id)!;
								const q = data.songs;
								setQueue(q);
								void play(song, q);
							}
						}}
					>
						<Text className="text-white">{item.title}</Text>
					</Pressable>
				)}
			/>
		</View>
	);
};


