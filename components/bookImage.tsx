import { Book } from "@/data/books";
import { Image, ImageStyle, StyleProp } from "react-native";
import { NoImage } from "./noImage";

interface BookImageProp {
    style?: StyleProp<ImageStyle>;
    item: Book;
}

export const BookImage = (props: BookImageProp) => {
    return (
        <>
            {
                props.item.imagePath === ''
                    ? <NoImage />
                    : typeof props.item.imagePath === 'string'
                        ? <Image source={{ uri: props.item.imagePath }} style={props.style} resizeMode="contain" />
                        : <Image source={props.item.imagePath} style={props.style} resizeMode="contain" />
            }
        </>
    );

}

