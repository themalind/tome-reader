import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {

    return (
        <>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="[id]" options={{ title: 'Details' }} />
            </Stack>
            <StatusBar style="auto" />
        </>
    );
}
