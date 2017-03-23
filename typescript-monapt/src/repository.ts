import { User } from "./models";
import database from "./database";

export function getUserByRealName(realName: string): User {
    return database.find(user => user.realName === realName);
}
