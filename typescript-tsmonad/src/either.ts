import { compose } from "ramda";
import { Either } from "tsmonad";
import { User, AppError } from "./models";
import * as Repository from "./repository";

const getNickName = (user: Either<AppError, User>): Either<AppError, string> => {
    return user.bind((user: User) => {
        return !!user.nickName
            ? Either.right(user.nickName)
            : Either.left(`user with name ${user.realName} does not have a nickname`);
    });
}

const getUser = (realName: string): Either<AppError, User> => {
    const user = Repository.getUserByRealName(realName);
    return !!user
        ? Either.right(user)
        : Either.left(new AppError("NoUserFound", `I could not find the user with name ${realName}`));
};

const getNickNameFromRealName: (realName: string) => Either<AppError, string> = compose(getNickName, getUser);

// main
const name = process.argv[2];

getNickNameFromRealName(name).caseOf({
    right: nickName => console.log(`I found ${nickName}`),
    left: () => console.log(`No one could be found with the full name "${name}"`)
});


