import { Either } from "monet";
import { Book, ServiceError } from "./type";

const Books: Array<Book> = [
    {
        "id": "978-0641723445",
        "title": "The Lightning Thief",
        "authorKey": "RRiordan"
    }
    ,
    {
        "id": "978-1423103349",
        "title": "The Sea of Monsters",
        "authorKey": "RRiordan"
    }
    ,
    {
        "id": "978-1857995879",
        "title": "Sophie's World : The Greek Philosophers",
        "authorKey": "JGaarder"
    }
    ,
    {
        "id": "978-1933988177",
        "title": "Lucene in Action, Second Edition",
        "authorKey": "MMcCandless",
    },
    {
        "id": "01",
        "title": "Clean Code",
        "authorKey": "BMartin"
    }
]

export const getBooks = (): Promise<Either<ServiceError, Array<Book>>> => {
    return Promise.resolve(Either.Right(Books));
}