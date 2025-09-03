import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { PlayerProvider } from './src/player/PlayerContext';
import { PlayerBar } from './src/components/PlayerBar';
import { HomeScreen as Home } from './src/screens/HomeScreen';
import { SearchScreen as Search } from './src/screens/SearchScreen';
import { LibraryScreen as Library } from './src/screens/LibraryScreen';
import { ProfileScreen as Profile } from './src/screens/ProfileScreen';

// Screens (placeholders to be implemented)
function HomeScreen() {
	return (
		<View className="flex-1 bg-background items-center justify-center">
			<Text className="text-white">Home</Text>
		</View>
	);
}

function SearchScreen() {
	return (
		<View className="flex-1 bg-background items-center justify-center">
			<Text className="text-white">Search</Text>
		</View>
	);
}

function LibraryScreen() {
	return (
		<View className="flex-1 bg-background items-center justify-center">
			<Text className="text-white">Library</Text>
		</View>
	);
}

function ProfileScreen() {
	return (
		<View className="flex-1 bg-background items-center justify-center">
			<Text className="text-white">Profile</Text>
		</View>
	);
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const DarkTheme: Theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: '#121212',
		card: '#181818',
		text: '#ffffff',
		primary: '#1DB954',
		border: '#282828',
	},
};

function Tabs() {
	return (
		<Tab.Navigator
			initialRouteName="Home"
			screenOptions={{
				headerShown: false,
				tabBarStyle: { backgroundColor: '#181818', borderTopColor: '#282828' },
				tabBarActiveTintColor: '#1DB954',
				tabBarInactiveTintColor: '#B3B3B3',
			}}
		>
			<Tab.Screen name="Home" component={Home} />
			<Tab.Screen name="Search" component={Search} />
			<Tab.Screen name="Library" component={Library} />
			<Tab.Screen name="Profile" component={Profile} />
		</Tab.Navigator>
	);
}

export default function App() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<PlayerProvider>
				<NavigationContainer theme={DarkTheme}>
					<StatusBar style="light" />
					<Stack.Navigator screenOptions={{ headerShown: false }}>
						<Stack.Screen name="Root" component={Tabs} />
					</Stack.Navigator>
					<PlayerBar />
				</NavigationContainer>
			</PlayerProvider>
		</GestureHandlerRootView>
	);
}
