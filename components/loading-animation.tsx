import LottieView from "lottie-react-native";
import { StyleProp, View, ImageProps } from "react-native";

interface AnimationProp {
  style: StyleProp<ImageProps>;
}
export const LoadingAnimation = ({ style }: AnimationProp) => {
  return (
    <View style={{ flex: 1 }}>
      <LottieView
        autoPlay
        style={style}
        source={require("../assets/animations/LoadingScreen.json")}
      />
    </View>
  );
};
