import { FontAwesome5 } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  BackHandler,
} from "react-native";
import { Button } from "react-native-paper";
import Camera from "./camera";

interface CameraInputProps {
  value: string;
  onChange: (uri: string) => void;
  label: string;
}

export const CameraInput: React.FC<CameraInputProps> = ({
  value,
  onChange,
  label,
}) => {
  const [showCamera, setShowCamera] = useState(false);

  // Hantera Android back-knappen när kameran är öppen
  useEffect(() => {
    if (!showCamera) return;

    const backAction = () => {
      setShowCamera(false);
      return true; // Förhindra standard-beteende (stänga appen)
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => backHandler.remove();
  }, [showCamera]);

  return (
    <>
      <View>
        <TouchableOpacity onPress={() => setShowCamera(true)}>
          <Button
            icon="camera"
            mode="contained"
            style={styles.button}
            theme={{ roundness: 3 }}
          >
            {value ? (
              <FontAwesome5 name="check" size={24} />
            ) : (
              "Click here to add a picture"
            )}
          </Button>
        </TouchableOpacity>
      </View>
      <Modal
        visible={showCamera}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => setShowCamera(false)}
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
  },
});
