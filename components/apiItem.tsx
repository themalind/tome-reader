import { ApiBook } from "@/app/(tabs)/searchApi";
import { AntDesign, Entypo } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import {
    Button,
    Divider,
    Modal,
    Portal,
    Text,
    useTheme,
} from "react-native-paper";

export const ApiItem = ({ item }: { item: ApiBook }) => {
    const [visible, setVisible] = React.useState(false);
    const [imageLoading, setImageLoading] = React.useState(true); // För att visa lottiefiles när bilden laddas in.
    const theme = useTheme();
    const showModal = () => {
        setVisible(true);
        setImageLoading(true);
    };
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
            alignSelf: "flex-end",
        },
        noImageContainer: {
            alignSelf: "center",
            backgroundColor: theme.colors.surfaceDisabled,
            alignItems: "center",
            borderWidth: 3,
            borderColor: theme.colors.onSurface,
            height: 200,
            width: 150,
        },
        noImageText: {
            paddingTop: 20,
            color: theme.colors.onSurface,
        },
        loadingContainer: {
            height: 200,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.colors.surface,
        },
        lottieAnimation: {
            width: 100,
            height: 100,
        },
    });

    return (
        <>
            <View>
                <TouchableOpacity style={styles.touchable} onPress={showModal}>
                    <Text style={styles.textList}>{item.title}</Text>
                    <Text style={styles.textList}>{item.author_name}</Text>
                </TouchableOpacity>
                <Divider style={{ height: 3 }} />
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
                    {item.cover_edition_key ? (
                        <View>
                            {imageLoading && (
                                <View style={styles.loadingContainer}>
                                    <LottieView
                                        autoPlay
                                        loop
                                        style={styles.lottieAnimation}
                                        source={require("../assets/animations/LoadingScreen.json")}
                                    />
                                </View>
                            )}
                            <Image
                                source={{ uri: bookCover(item.cover_edition_key) }}
                                style={[
                                    styles.image,
                                    imageLoading && { position: "absolute", opacity: 0 },
                                ]}
                                onLoad={() => setImageLoading(false)}
                                onError={() => setImageLoading(false)}
                            />
                        </View>
                    ) : (
                        <View style={styles.noImageContainer}>
                            <Text style={styles.noImageText}>No image avaliable </Text>
                            <Text style={styles.noImageText}>
                                {
                                    <Entypo
                                        name="emoji-sad"
                                        size={34}
                                        color={theme.colors.onSurface}
                                    />
                                }
                            </Text>
                        </View>
                    )}
                    <Text style={styles.textModal} variant="titleMedium">
                        {item.title}
                    </Text>
                    <Text style={styles.textModal} variant="bodySmall">
                        {item.author_name}
                    </Text>
                </Modal>
            </Portal>
        </>
    );
};
