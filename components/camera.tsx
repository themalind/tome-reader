import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { Image } from "expo-image";
import { useRef, useState } from 'react';
import { Button, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// https://github.com/expo/examples/blob/master/with-camera/App.tsx
// https://docs.expo.dev/versions/latest/sdk/camera/#camerapictureoptions

export default function Camera() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [uri, setUri] = useState<string | null>(null);
    const ref = useRef<CameraView>(null);

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(facing === 'back' ? 'front' : 'back');
    }

    const takePicture = async () => {
        const photo = await ref.current?.takePictureAsync();
        if (photo?.uri) setUri(photo.uri);
    };

    function savePicture(uri: string) {
        //save till filsystem 

        // const file = new File(uri);

        // try {
        //     const tomereaderDir = new Directory(Paths.document, 'tomereader');
        //     if (!tomereaderDir.exists) tomereaderDir.create();
        //     const imageDir = new Directory(Paths.document, 'tomereader/newFolder');
        //     if (!imageDir.exists) tomereaderDir.create();

        //     file.move(new Directory(Paths.document, 'tomereader/newFolder'));
        //     setUri(file.uri);

        // } catch (error) {
        //     console.error(error);
        // }
    }

    const renderPicture = (uri?: string) => {
        if (!uri) return null;

        return (
            <View style={styles.container}>
                <Button onPress={() => setUri(null)} title="Take another picture" />
                <Button title="Keep" onPress={() => savePicture(uri)} />
                <Image
                    source={{ uri }}
                    style={{ width: "90%", height: "90%", alignSelf: "center" }}
                    contentFit="contain"
                />
            </View>
        );
    };

    if (uri) {
        return renderPicture(uri);
    }

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={facing} ref={ref} />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                    <Text style={styles.text}>Flip Camera</Text>
                </TouchableOpacity>
                <Pressable onPress={takePicture}>
                    {({ pressed }) => (
                        <View
                            style={[
                                styles.shutterBtn,
                                {
                                    opacity: pressed ? 0.5 : 1,
                                },
                            ]}
                        >
                            <View
                                style={[
                                    styles.shutterBtnInner,
                                    {
                                        backgroundColor: "white",
                                    },
                                ]}
                            />
                        </View>
                    )}
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 64,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        width: '100%',
        paddingHorizontal: 64,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    shutterBtn: {
        backgroundColor: "transparent",
        borderWidth: 5,
        borderColor: "white",
        width: 85,
        height: 85,
        borderRadius: 45,
        alignItems: "center",
        justifyContent: "center",
    },
    shutterBtnInner: {
        width: 70,
        height: 70,
        borderRadius: 50,
    },
});