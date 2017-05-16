import { ValidationError, Validator, ValidatorResult } from "jsonschema";
import * as Rx from "rxjs";
import { Page, Product } from "../types";

const ProductSchema = {
    type: "object",
    properties: {
        id: { type: "number" },
        name: { type: "string" },
        alcohol_content: { type: "number" },
        price_in_cents: { type: "number" }
    },
    required: ["id", "name", "alcohol_content", "price_in_cents"],
    additionalProperties: true
};

const Pager = {
    type: "object",
    properties: {
        current_page: { type: "number" }
    },
    required: ["current_page"],
    additionalProperties: true
};

const Schema = {
    type: "object",
    properties: {
        status: { type: "number" },
        message: { type: ["string", "null"] },
        pager: { $ref: "/Pager" },
        result: { type: "array", items: { $ref: "/Product" } }
    },
    required: ["status", "message", "result", "pager"],
    additionalProperties: true
};

const ResponseValidator = new Validator();
ResponseValidator.addSchema(ProductSchema, "/Product");
ResponseValidator.addSchema(Pager, "/Pager");

const validateProducts = (payload: any): ValidatorResult => ResponseValidator.validate(payload, Schema);

const parseProduct = (value: any): Product => ({
    id: value.id,
    name: value.name,
    alcoholContent: value.alcohol_content,
    priceInCents: value.price_in_cents
});

const parsePage = (value: any): Page => ({
    page: value.pager.current_page,
    products: value.result.map(parseProduct)
});

const parse = (payload: any): Rx.Observable<Page> => {
    return Rx.Observable.of<ValidatorResult>(validateProducts(payload))
        .filter((value) => value.valid)
        .map(result => parsePage(result.instance));
};

export { parse };
