import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

export const LoginScreen: React.FC<{ onContinue: () => void }> = ({ onContinue }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Welcome back</Text>
			<TextInput
				style={styles.input}
				placeholder="Email"
				placeholderTextColor="#888"
				value={email}
				onChangeText={setEmail}
				autoCapitalize="none"
			/>
			<TextInput
				style={styles.input}
				placeholder="Password"
				placeholderTextColor="#888"
				secureTextEntry
				value={password}
				onChangeText={setPassword}
			/>
			<Pressable style={styles.button} onPress={onContinue}>
				<Text style={styles.buttonText}>Continue</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#121212', // replace with your bg-background color
		paddingHorizontal: 24, // px-6
		justifyContent: 'center',
		alignItems: 'stretch',
	},
	title: {
		color: '#fff',
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 24, // mb-6
	},
	input: {
		backgroundColor: '#282828', // replace with your bg-card color
		color: '#fff',
		paddingHorizontal: 16, // px-4
		paddingVertical: 12, // py-3
		borderRadius: 8,
		marginBottom: 12, // mb-3 or mb-6
	},
	button: {
		backgroundColor: '#1DB954', // replace with your bg-primary color
		paddingVertical: 12, // py-3
		borderRadius: 8,
		alignItems: 'center',
	},
	buttonText: {
		color: '#000',
		fontWeight: '600',
	},
});


