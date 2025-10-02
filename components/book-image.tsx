import { Book } from "@/data/books";
import { Image, ImageStyle, StyleProp } from "react-native";
import { NoImage } from "./no-image";

interface BookImageProp {
  style?: StyleProp<ImageStyle>;
  item: Book;
}

export const BookImage = ({ style, item }: BookImageProp) => {
  return (
    <>
      {item.imagePath === "" ? (
        <NoImage style={style} />
      ) : typeof item.imagePath === "string" ? (
        <Image source={{ uri: item.imagePath }} style={style} />
      ) : (
        <Image source={item.imagePath} style={style} />
      )}
    </>
  );
};
