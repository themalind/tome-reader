import { getBooksFromApi } from "@/api/book";
import { ApiItem } from "@/components/apiItem";
import { LoadingAnimation } from "@/components/loading-animation";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Searchbar } from "react-native-paper";

export interface ApiBook {
  cover_edition_key: string;
  cover_i?: number;
  author_key: string[];
  title: string;
  author_name: string[];
  language?: string[];
  first_publish_year?: number;
  publisher?: string[];
  key: string;
  edition_count?: number;
}

export interface Docs {
  docs: ApiBook[];
}

export default function SearchApi() {
  const [inputText, setInputText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState<ApiBook[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const getBookResult = async () => {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      setIsLoading(true);
      try {
        const bookResult = await getBooksFromApi(
          searchText,
          abortControllerRef.current,
        );

        setData(bookResult);
      } catch (error: any) {
        if (error.name === "AbortError") {
          console.log("Aborted");
          return;
        }
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getBookResult();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [searchText]);

  // Om Man tömmer sökfältet ska resultaten tas bort
  function handleSearchField(text: string) {
    setInputText(text);

    if (text === "") {
      setData([]);
      setSearchText("");
    }
  }

  return (
    <View style={styles.container}>
      <Searchbar
        mode="bar"
        value={inputText}
        onChangeText={handleSearchField}
        onIconPress={() => setSearchText(inputText)}
        onSubmitEditing={() => setSearchText(inputText)}
        placeholder="Search"
        style={styles.searchbar}
      />

      {isLoading ? (
        <LoadingAnimation style={styles.lottieAnimation} />
      ) : data.length === 0 && searchText !== "" ? (
        <View style={styles.emptyContainer}>
          <Text>No books found</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ key }) => key}
          renderItem={({ item }) => <ApiItem item={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchbar: {
    margin: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  lottieAnimation: {
    width: 150,
    height: 150,
    alignSelf: "center",
  },
});
