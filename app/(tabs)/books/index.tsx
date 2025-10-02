import { BookCard } from "@/components/book-card";
import { Book } from "@/data/books";
import { useBook } from "@/providers/bookContext";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper";

// https://medium.com/@betomoedano01/search-filter-react-native-search-bar-tutorial-fe3069fa55b5

const Index = () => {
  const { books } = useBook();
  const [filteredData, setFilteredData] = useState(books);
  const [searchText, setSearchText] = useState("");

  useMemo(
    // För att slippa sort() vid varje rendering.
    () => {
      const sortBooks = (filteredBooks: Book[]) => {
        return filteredBooks.sort(
          (a, b) => b.dateAdded.getTime() - a.dateAdded.getTime(),
        )
      };

      const searchFilterFunction = (text: string) => {
        const textData = text.toUpperCase();
        return books.filter((item) => {
          const itemDataTitle = item.title ? item.title.toUpperCase() : "";
          const itemDataAuthor = item.author ? item.author.toUpperCase() : "";
          return (
            itemDataTitle.indexOf(textData) > -1 ||
            itemDataAuthor.indexOf(textData) > -1
          );
        });
      };

      if (!searchText) {
        setFilteredData(sortBooks(books));
        return;
      }

      setFilteredData(sortBooks(searchFilterFunction(searchText)));
    },
    [books, searchText]
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        value={searchText}
        onChangeText={(text) => {
          setSearchText(text);
        }}
        style={{ margin: 10 }}
      />
      <FlatList
        data={filteredData}
        renderItem={({ item }) => (
          <BookCard // Deta är en memokomponent som gör att raderna inte renderas om förrän item ändras.
            item={item}
            onPress={() =>
              router.push({
                pathname: "/(tabs)/books/[id]",
                params: { id: item.id },
              })
            }
          />
        )}
        keyExtractor={(bookItem: Book) => bookItem.id}
      />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    padding: 10,
  },
  surface: {
    padding: 20,
  },
  image: {
    height: 200,
    width: "100%",
    resizeMode: "contain",
  },
  grade: {
    alignSelf: "flex-end",
  },
  title: {
    paddingTop: 15,
    textDecorationLine: "underline",
  },
});
