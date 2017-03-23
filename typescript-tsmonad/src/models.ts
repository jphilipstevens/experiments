export class User {
    readonly realName: string;
    readonly nickName?: string;

    constructor(realName: string, nickName?: string) {
        this.realName = realName;
        this.nickName = nickName;
    }
}

export class AppError {
    readonly type: string;
    readonly message: string;

    constructor(type: string, message: string) {
        this.type = type;
        this.message = message;
    }
}