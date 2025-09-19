import { StaticScreenProps, useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";

type Props = StaticScreenProps<{
    id: string,
}>;

export default function Book({ route }: Props) {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text>This is a book detail {route.params.id}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {

    }
})