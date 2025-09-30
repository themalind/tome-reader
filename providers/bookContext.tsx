import { Book, mockbooks } from "@/data/books";
import { getData, saveBooks } from "@/data/storage";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

// 1. Bestäm vad som ska skickas över kontexten.
type BookContextValue = {
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  addNewBook: (newBook: Book) => Promise<void>;
  deleteBook: (bookId: string) => Promise<void>;
};

// 2. Skapa kontexten.
const booksContext = createContext<BookContextValue | undefined>(undefined);

// 3. Skapa providern med tillståndet
export default function BooksProvider(props: PropsWithChildren) {
  // Tillstånd
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    async function initBookCollection() {
      const storedBooks = await getData();

      if (!storedBooks) {
        await saveBooks(mockbooks);
        setBooks(mockbooks);
      } else {
        setBooks(storedBooks);
      }
    }

    initBookCollection();
  }, []);

  const deleteBook = async (bookId: string) => {
    const updatedBooks = books.filter((b) => b.id !== bookId);

    setBooks(updatedBooks);
    await saveBooks(updatedBooks);
  };

  const addNewBook = async (newBook: Book) => {
    const updatedBooks = [...books, newBook];

    await saveBooks(updatedBooks);
    setBooks(updatedBooks);
  };

  // Rendering
  return (
    <booksContext.Provider value={{ books, setBooks, addNewBook, deleteBook }}>
      {props.children}
    </booksContext.Provider>
  );
}

// 4. skapa en wrapper hook for att konsumera kontextens värde
export function useBook() {
  const context = useContext(booksContext);
  if (!context) {
    throw new Error("useBook must be used within a BooksProvider");
  }
  return context;
}
