import { ApiBook } from "@/app/(tabs)/searchApi";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, Button, Divider, Modal, Portal, useTheme } from "react-native-paper";

export const ApiItem = ({ item }: { item: ApiBook }) => {
    const [visible, setVisible] = React.useState(false);
    const theme = useTheme();
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    function bookCover(coverId: string) {
        console.log(coverId);
        return `https://covers.openlibrary.org/b/olid/${encodeURIComponent(coverId)}-M.jpg`;
    }

    const styles = StyleSheet.create({
        touchable: {
            paddingTop: 15,
            paddingBottom: 15,
        },
        textList: {
            paddingLeft: 20,
        },
        textModal: {
            padding: 20,
            color: theme.colors.onSurface,
        },
        modal: {
            backgroundColor: theme.colors.surface,
            padding: 20,
            margin: 20,
            borderRadius: 8,
        },
        image: {
            height: 200,
            width: "100%",
            resizeMode: "contain",

        },
        exitModal: {
            alignSelf: "flex-end"

        },


    });

    return (
        <>
            <View>
                <TouchableOpacity style={styles.touchable} onPress={showModal}>
                    <Text style={styles.textList}>{item.title}</Text>
                    <Text style={styles.textList}>{item.author_name}</Text>
                </TouchableOpacity>
                <Divider />
            </View>

            <Portal>
                <Modal
                    visible={visible}
                    onDismiss={hideModal}
                    contentContainerStyle={styles.modal}
                >
                    <Button style={styles.exitModal} onPress={hideModal}>
                        <AntDesign name="close" size={24} color={theme.colors.onSurface} />
                    </Button>
                    <Image
                        source={{ uri: bookCover(item.cover_edition_key) }}
                        style={styles.image}
                    />
                    <Text style={styles.textModal} variant="titleMedium">{item.title}</Text>
                    <Text style={styles.textModal} variant="bodySmall">{item.author_name}</Text>
                </Modal>
            </Portal>
        </>
    );
};