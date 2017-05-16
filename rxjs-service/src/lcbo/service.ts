import * as Rx from "rxjs";

import fetch, { Response } from "node-fetch";
import { Page } from "../types";
import { parse } from "./parser";

const URL = "http://lcboapi.com/products";

const fetchProducts = () => fetch(URL);

const handler = (response: Response): Rx.Observable<any> => {
    console.log("handler");
    const result = response.status !== 200
        ? Promise.reject(new Error("service failed"))
        : response.json();

    return Rx.Observable.fromPromise(result);
};

const getProducts = (): Rx.Observable<Page> => {
    const productServiceClient = Rx.Observable.fromPromise(fetchProducts());
    return productServiceClient.flatMap(handler).flatMap(parse);
};

export { getProducts };