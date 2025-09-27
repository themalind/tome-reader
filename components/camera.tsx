import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { Image } from "expo-image";
import { useRef, useState } from 'react';
import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, Button } from 'react-native-paper';

// https://github.com/expo/examples/blob/master/with-camera/App.tsx
// https://docs.expo.dev/versions/latest/sdk/camera/#camerapictureoptions

interface CameraProps {
    selectedValue?: string;
    onValueChange: (uri: string) => void;
    onClose?: () => void;
}

export default function Camera({ selectedValue, onValueChange, onClose }: CameraProps) {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [uri, setUri] = useState<string | null>(selectedValue || null);
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
                <Button onPress={requestPermission}>Grant permission</Button>
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
        onValueChange(uri);
    }

    const renderPicture = (uri?: string) => {
        if (!uri) return null;

        return (
            <View style={styles.container}>
                <View style={styles.topButtons}>
                    {onClose && <Button onPress={onClose}>Close</Button>}
                </View>
                <Image
                    source={{ uri }}
                    style={styles.previewImage}
                    contentFit="contain"
                />
                <View style={styles.bottomButtons}>
                    <Button onPress={() => setUri(null)}>Retake</Button>
                    <Button onPress={() => savePicture(uri)}>Keep</Button>
                </View>
            </View>
        );
    };

    if (uri) {
        return renderPicture(uri);
    }

    return (
        <View style={styles.container}>
            <View style={styles.topButtons}>
                {onClose && <Button onPress={onClose}>Close</Button>}
            </View>
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
    topButtons: {
        position: 'absolute',
        top: 50,
        left: 20,
        right: 20,
        zIndex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    bottomButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 20,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    previewImage: {
        flex: 1,
        width: "100%",
    },
});