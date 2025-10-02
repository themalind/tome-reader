import { ApiBook, Docs } from "@/app/(tabs)/search-api";

export async function getBooksFromApi(
  searchText: string,
  controller: AbortController,
): Promise<ApiBook[]> {
  const response = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(searchText)}`,
    {
      signal: controller.signal,
    },
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

  return filteredBooks;
}
