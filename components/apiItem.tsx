import { ApiBook } from "@/app/(tabs)/searchApi";
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import { Divider, useTheme } from "react-native-paper";

export const ApiItem = ({ item }: { item: ApiBook }) => {
    const theme = useTheme();
    const styles = StyleSheet.create({
        touchable: {
            paddingTop: 15,
            paddingBottom: 15,
        },
        text: {
            color: theme.colors.onSurface,
        },
    })

    return (
        <View >
            <TouchableOpacity style={styles.touchable}>
                <Text style={styles.text}>{item.title}</Text>
                <Text style={styles.text}>{item.author_name}</Text>
            </TouchableOpacity>
            <Divider />
        </View>
    );
}

