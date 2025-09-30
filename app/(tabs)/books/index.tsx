import { BookCard } from "@/components/bookCard";
import { Book } from "@/data/books";
import { useBook } from "@/providers/bookContext";
import { router } from "expo-router";
import * as React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper";

// https://medium.com/@betomoedano01/search-filter-react-native-search-bar-tutorial-fe3069fa55b5

const Index = () => {
  const { books } = useBook();
  const [searchText, setSearchText] = React.useState("");
  const [filteredData, setFilteredData] = React.useState(books);

  const sortedData = React.useMemo(
    // För att slippa sort() vid varje rendering.
    () =>
      [...filteredData].sort(
        (a, b) => b.dateAdded.getTime() - a.dateAdded.getTime(),
      ),
    [filteredData],
  );

  React.useEffect(() => {
    const searchFilterFunction = (text: string) => {
      if (text) {
        const textData = text.toUpperCase();
        const newData = books.filter((item) => {
          const itemDataTitle = item.title ? item.title.toUpperCase() : "";
          const itemDataAuthor = item.author ? item.author.toUpperCase() : "";
          return (
            itemDataTitle.indexOf(textData) > -1 ||
            itemDataAuthor.indexOf(textData) > -1
          );
        });
        setFilteredData(newData);
      } else {
        setFilteredData(books);
      }
    };

    searchFilterFunction(searchText);
  }, [searchText, books]);

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
        data={sortedData}
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
