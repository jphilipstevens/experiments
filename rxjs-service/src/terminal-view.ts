import * as chalk from "chalk";
import { Observer } from "rxjs";
import { Page } from "./types";

const next = (page: Page) => {
    console.log(chalk.blue(`Found ${page.products.length} products. Displaying page ${page.page}`));
    console.log();
    console.log();

    page.products.forEach(product => {
        console.log(chalk.blue(`Name: \t ${product.name}`));
        console.log(chalk.blue(`Alcohol: ${product.alcoholContent}`));
        console.log(chalk.blue(`Price: \t ${product.priceInCents}`));
        console.log(chalk.bgGreen.blue("==================================="));
    });
};

const error = (err: any) => {
    console.log(chalk.bgRed.white("There was an error while getting products"));
};

const createView = (): Observer<Page> => ({
    next,
    error,
    complete: () => { }
});

export { createView };