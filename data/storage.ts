import AsyncStorage from "@react-native-async-storage/async-storage";
import { File, Paths } from "expo-file-system";
import { Book } from "./books";

export const saveBook = async (value: Book) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("books", jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const saveBooks = async (value: Book[]) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("books", jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const getData = async (): Promise<Book[] | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem("books");
    if (jsonValue != null) {
      const rawBooks = JSON.parse(jsonValue);

      // Datum, skapa upp nya efter parsning.
      return rawBooks.map((book: any) => ({
        ...book,
        readDate: book.readDate ? new Date(book.readDate) : new Date(),
        dateAdded: book.dateAdded ? new Date(book.dateAdded) : new Date(),
      }));
    }
    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const saveBookImage = async (imageUri: string, bookId: string) => {
  try {
    const sourceFile = new File(imageUri); // skapa referens till källfilen, den temporära platsen i cachen.
    const destinationFile = new File(Paths.document, `book_${bookId}.jpg`); // Kopiera filen och ge den nytt namn. Paths.document --> permanent dokumentmapp.

    await sourceFile.copy(destinationFile); // Retunera URI

    return destinationFile.uri;
  } catch (error) {
    console.error(error);
  }
};
