export default class User {
    constructor(data: any) {
        this.name = data.name;
        this.email = data.email;
        this.password = data.password;
    }
    name: string
    email: string
    password: string
}