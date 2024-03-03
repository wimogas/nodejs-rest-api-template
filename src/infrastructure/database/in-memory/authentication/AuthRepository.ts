import {IAuthRepository} from "../../../../application/authentication/interfaces/IAuthRepository";
import User from "../../../../domain/User";

export class AuthRepository implements IAuthRepository {

    public async addUser(user: User): Promise<User> {
        return User.create({
            name: user.getName,
            email: user.getEmail,
            password: user.getPassword,
        }, '65e0936b330d7e4c8d503cec')
    }
}