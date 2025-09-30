import { ApiItem } from "@/components/apiItem";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Image, View } from "react-native";
import { Searchbar, Text } from "react-native-paper";

export interface ApiBook {
    cover_edition_key: string;
    cover_i?: number;
    author_key: string[];
    title: string;
    author_name: string[];
    language: string[];
    first_publish_year?: number;
    publisher?: string[];
    key: string;
}

// Json retuneras som ett objekt med en property som heter docs
// som innehåller en array som innehåller apibook[] och en massa annat.
export interface Docs {
    docs: ApiBook[];
}

export default function SearchApi() {
    const [inputText, setInputText] = useState("");
    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState<ApiBook[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Skapa en abortkontroller som låter oss avbryta en req för att undvika racecondition
    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        const getBookResult = async () => {
            // När ett nytt anrop ska göras kontrolleras det innan om en pågående fetch finns
            // om ja så avbryts den, och en ny abortkontroller skapas och kopplas till den nya requesten
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();

            setIsLoading(true);
            try {
                // Respons från apiet
                const response = await fetch(
                    `https://openlibrary.org/search.json?q=${encodeURIComponent(searchText)}`,
                    { signal: abortControllerRef.current?.signal }
                );

                // Konverteras till json
                const json = await response.json() as Docs;
                //datan sätts till responsen
                setData(json.docs);

            } catch (error: any) {
                if (error.name === "AbortError") {
                    console.log("Aborted");
                    return;
                }
                console.error(error);
            } finally { // oavsett om det går bra eller inte så sätts loading till false.
                setIsLoading(false);
            }
        };

        getBookResult();
    }, [searchText]);

    function bookCover(coverId: string): string {
        console.log(coverId);
        return `https://covers.openlibrary.org/b/olid/${encodeURIComponent(coverId)}-M.jpg`;

    }

    return (<View>
        <Searchbar
            mode="view"
            value={inputText}
            onChangeText={text => setInputText(text)}
            onIconPress={() => setSearchText(inputText)}
            placeholder="Search"
            style={{ margin: 10 }}
        />
        {isLoading ? (
            <ActivityIndicator />
        ) : (
            <FlatList
                data={data}
                keyExtractor={({ key }) => key}
                renderItem={({ item }) => (
                    <ApiItem item={item} />
                )}
            />
        )}
    </View>);
}