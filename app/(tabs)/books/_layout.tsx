import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import 'react-native-reanimated';
import LottieView from 'lottie-react-native';

export default function BookLayout() {

    return (
        <>
            <StatusBar style="auto" />
            <Stack>
                <Stack.Screen
                    name="index"
                    options={{
                        title: "Your Collection",
                        headerLeft: () => (
                            <View style={style.lottieContainer}>
                                <LottieView
                                    source={require('../../../assets/animations/Books.json')}
                                    style={style.lottieAni}
                                />
                            </View>
                        )
                    }}
                />
                <Stack.Screen name="[id]" options={{ title: 'Details' }} />
            </Stack>
        </>
    );
}

const style = StyleSheet.create({
    lottieContainer: {
        marginRight: 10,
        justifyContent: "space-between"
    },
    lottieAni: {
        width: 60,
        height: 60,
        alignSelf: "flex-start"
    }
});