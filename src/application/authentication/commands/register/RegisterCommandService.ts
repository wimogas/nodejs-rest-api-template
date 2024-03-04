import User from "../../../../domain/entities/User";
import {IAuthenticationResponse} from "../../../../contracts/authentication/IAuthenticationResponse";
import {IAuthRepository} from "../../../common/interfaces/persistance/IAuthRepository";
import {IPresenter} from "../../../common/interfaces/IPresenter";
import {IRegisterRequest} from "../../../../contracts/authentication/IRegisterRequest";
import {ITokenService} from "../../../common/interfaces/security/ITokenService";
import {ICryptoService} from "../../../common/interfaces/security/ICryptoService";
import {IIdGeneratorService} from "../../../common/interfaces/services/IIdGeneratorService";
import {AuthErrors} from "../../../../domain/errors/AuthErrors";

export default class RegisterCommandService {

    private _authRepository: IAuthRepository;
    private _presenter: IPresenter;
    private _tokenGenerator: ITokenService;
    private _crypto: ICryptoService
    private _idGenerator: IIdGeneratorService
    public constructor(
        authRepository: IAuthRepository,
        presenter: IPresenter,
        tokenGenerator: ITokenService,
        crypto: ICryptoService,
        idGenerator: IIdGeneratorService
    ) {
        this._authRepository = authRepository
        this._presenter = presenter
        this._tokenGenerator = tokenGenerator
        this._crypto = crypto
        this._idGenerator = idGenerator
    }

    public async register(request: IRegisterRequest): Promise<void> {

        const foundUser = await this._authRepository.getUserByEmail(request.email)

        if (foundUser) {
            throw AuthErrors.DuplicateEmail()
        }

        const hashedPassword = await this._crypto.handleHash(request.password, 10)

        const id = this._idGenerator.generateId()

        const newUser = User.create({
            name: request.name,
            email: request.email,
            password: hashedPassword
        }, id)

        try {
            await this._authRepository.addUser(newUser)

            const token = this._tokenGenerator.generateToken(newUser.id, newUser)

            const authenticationResponse: IAuthenticationResponse = {
                id: newUser.id,
                name: newUser.getName,
                email: newUser.getEmail,
                token: token
            }

            this._presenter.present(authenticationResponse)

        } catch (error) {
            throw error
        }
    }
}