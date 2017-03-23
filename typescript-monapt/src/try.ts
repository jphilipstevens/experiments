import { Try, Success, Failure } from "monapt";
import { compose } from "ramda";
import { User } from "./models";
import * as Repository from "./repository";

const getNickNameFromUser = (user: Try<User>): Try<string> => {
    return user.flatMap(user => !!user.nickName
        ? new Success<string>(user.nickName)
        : new Failure<string>(new Error(`no nickname for user ${user.realName}`))
    );
};

// service/biz logic 
const getUser = (realName: string): Try<User> => {
    const user = Repository.getUserByRealName(realName);

    return !!user
        ? new Success<User>(user)
        : new Failure<User>(new Error(`I could not find the user with name ${realName}`));
};

const getNickName = compose(getNickNameFromUser, getUser);

// main
const name = process.argv[2];

getNickName(name).match({
    Success: nickName => console.log(`I found ${nickName}`),
    Failure: (error) => console.log(`Error returned while searching for user with name "${name}". Error was ${error}`)
});


