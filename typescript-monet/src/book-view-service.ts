import { Either, Maybe } from "monet";
import { getBooks } from "./books-service";
import { getAuthors } from "./author-service";
import { Author, Book, BookView, ServiceError } from "./type";

const defaultAuthor: Author = {
    id: "000",
    name: "Unknown"
};

const toBookView = (author: Maybe<Author>, book: Book): BookView => ({
    id: book.id,
    title: book.title,
    authorName: author.orSome(defaultAuthor).name
});

type AuthorIdApplicative = (books: Book[]) => string[];
const toAuthorIds = (books: Book[]): string[] => books.map(book => book.authorKey);

type ApplicativeBooksView = (books: Book[]) => BookView[];
const toBooksView = (authors: Author[]) => (books: Book[]): BookView[] => books.map(book => {
    const author = Maybe.fromNull(authors.find(author => author.id === book.authorKey));
    return toBookView(author, book);
});

export const getBookView = async (): Promise<Either<ServiceError, BookView[]>> => {
    const books: Either<ServiceError, Book[]> = await getBooks();
    const authorids: Either<ServiceError, string[]> = books.ap(Either.Right<ServiceError, AuthorIdApplicative>(toAuthorIds));
    const authors: Author[] = (await getAuthors()).toMaybe().orSome([]);
    return books.ap(Either.Right<ServiceError, ApplicativeBooksView>(toBooksView(authors)));

};