import { ApiItem } from "@/components/apiItem";
import LottieView from "lottie-react-native";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
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
        const response = await fetch(
          `https://openlibrary.org/search.json?q=${encodeURIComponent(searchText)}`,
          { signal: abortControllerRef.current?.signal },
        );

        const json = (await response.json()) as Docs;

        const filteredBooks = json.docs.filter((book) => {
          const hasValidLanguage = book.language?.some(
            (lang) => lang === "eng" || lang === "swe",
          );

          const isBook =
            book.author_name?.length > 0 &&
            !book.key.includes("/periodicals/") &&
            !book.key.includes("/serials/") &&
            (book.edition_count ?? 0) > 0;

          return hasValidLanguage && isBook;
        });

        setData(filteredBooks);
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
  }, [searchText]);

  return (
    <View style={styles.container}>
      <Searchbar
        mode="bar"
        value={inputText}
        onChangeText={setInputText}
        onIconPress={() => setSearchText(inputText)}
        onSubmitEditing={() => setSearchText(inputText)}
        placeholder="Search"
        style={styles.searchbar}
      />

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <LottieView
            autoPlay
            loop
            style={styles.lottieAnimation}
            source={require("../../assets/animations/LoadingScreen.json")}
          />
        </View>
      ) : data.length === 0 ? (
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
  },
});
