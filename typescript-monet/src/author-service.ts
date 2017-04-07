import { Either } from "monet";
import { Author, ServiceError } from "./type";

const authors: Author[] = [{
    "id": "RRiordan",
    "name": "Rick Riordan"
},
{
    "id": "JGaarder",
    "name": "Jostein Gaarder"
},
{
    "id": "MMcCandless",
    "name": "Michael McCandless"
}];

export const getAuthors = (): Promise<Either<ServiceError, Author[]>> => {
    return Promise.resolve(Either.Right(authors));
}