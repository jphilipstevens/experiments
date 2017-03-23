export class User {
    readonly realName: string;
    readonly nickName?: string;

    constructor(realName: string, nickName?: string) {
        this.realName = realName;
        this.nickName = nickName;
    }
}

