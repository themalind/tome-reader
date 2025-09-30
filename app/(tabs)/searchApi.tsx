import { ApiItem } from "@/components/apiItem";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { Searchbar } from "react-native-paper";

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

                // Filtrera bara böcker på svenska och engelska
                const filteredBooks = json.docs.filter(book => {
                    // Kontrollera språk
                    const hasValidLanguage = book.language && book.language.some(lang =>
                        lang === 'swe' || lang === 'eng' || lang === 'sv' || lang === 'en'
                    );

                    // Filtrera bort icke-böcker (tidskrifter, artiklar etc.)
                    // OpenLibrary använder olika markers för att identifiera böcker
                    const isBook = !book.key.includes('/periodicals/') &&
                                  !book.key.includes('/serials/') &&
                                  book.author_name && book.author_name.length > 0;

                    return hasValidLanguage && isBook;
                });

                //datan sätts till den filtrerade responsen
                setData(filteredBooks);

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


    return (<View>
        <Searchbar
            mode="view"
            value={inputText}
            onChangeText={text => setInputText(text)}
            onIconPress={() => setSearchText(inputText)}
            onSubmitEditing={() => setSearchText(inputText)}
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