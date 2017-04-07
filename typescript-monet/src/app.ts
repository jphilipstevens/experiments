import { getBookView } from "./book-view-service";

getBookView()
    .then((views) => console.log(views))
    .catch(err => console.log(err));