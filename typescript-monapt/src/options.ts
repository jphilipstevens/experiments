import { Option, None } from "monapt";
import { User } from "./models";
import * as Repository from "./repository";

// service/biz logic 
const getNickName = (realName: string): Option<string> => {
    const user = Repository.getUserByRealName(realName);
    return !!user
        ? Option(user.nickName)
        : None;
}

// main
const name = process.argv[2];

getNickName(name).match({
    Some: nickName => console.log(`I found ${nickName}`),
    None: () => console.log(`No nickname could be found with the full name "${name}"`)
});


