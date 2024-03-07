import AuthValidator from "../../common/validator/AuthValidator";
import {AuthErrors} from "../../../domain/errors/AuthErrors";
import {singleton} from "tsyringe";

@singleton()
export default class GetTokenQueryValidator extends AuthValidator{
    public validate(request: any): any {

        if (!request.email) {
            return AuthErrors.MissingEmail()
        } else if (!this.isValidEmail(request.email)) {
            return AuthErrors.InvalidEmail()
        }

        if (!request.password) {
            return AuthErrors.MissingPassword()
        }
    }
}