import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-paper';
import Camera from './camera';

interface CameraInputProps {
    value: string;
    onChange: (uri: string) => void;
    label: string;
}

export const CameraInput: React.FC<CameraInputProps> = ({ value, onChange, label }) => {
    const [showCamera, setShowCamera] = useState(false);

    return (
        <>
            <View >
                <TouchableOpacity
                    onPress={() => setShowCamera(true)}
                >
                    <Button icon="camera" mode="contained" style={styles.button} theme={{ roundness: 3 }}>
                        {value ? <FontAwesome5 name="check" size={24} /> : 'Click here to take picture'}
                    </Button>
                </TouchableOpacity>
            </View >

            <Modal
                visible={showCamera}
                animationType="slide"
                presentationStyle="fullScreen"
            >
                <Camera
                    selectedValue={value}
                    onValueChange={(itemValue) => {
                        onChange(itemValue);
                        setShowCamera(false);
                    }}
                    onClose={() => setShowCamera(false)}
                />
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    button: {
        margin: 5,
    }
});
