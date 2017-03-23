import { Maybe } from "tsmonad";
import { User, AppError } from "./models";
import * as Repository from "./repository";

const getNickNameFromRealName = (realName: string): Maybe<string> => {
    const user = Repository.getUserByRealName(realName);
    return Maybe.maybe(user).bind(user => Maybe.maybe(user.nickName));
};

// main
const name = process.argv[2];

getNickNameFromRealName(name).caseOf({
    just: nickName => console.log(`I found ${nickName}`),
    nothing: () => console.log(`No nickname could be found with the full name "${name}"`)
});


