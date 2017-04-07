interface Book {
    readonly id: string;
    readonly title: string;
    readonly authorKey: string;
}

interface Author {
    readonly id: string;
    readonly name: string;
}

interface BookView {
    readonly id: string;
    readonly title: string;
    readonly authorName: string;

}

interface ServiceError {
    code: string;
}

export { Author, Book, BookView, ServiceError};
