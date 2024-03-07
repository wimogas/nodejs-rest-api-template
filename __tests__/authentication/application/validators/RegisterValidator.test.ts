import 'reflect-metadata'
import CreateUserCommandValidator
    from "../../../../src/authentication/application/commands/create-user/CreateUserCommandValidator";

describe("Register Validation Business Rules", () => {

    const validEmail = "user@mail.com"
    const validPassword = "9X8zMJ0XctMpo!"

    const registerValidator = new CreateUserCommandValidator()

    let mockData: any;

    beforeEach(() => {
        mockData = {
            email: validEmail,
            password: validPassword
        };
    })

    test("User is valid", () => {
        const res = registerValidator.validate(mockData)
        expect(res).toBe(undefined)
    });


    test("User Email is missing", () => {
        mockData.email = ""
        const res = registerValidator.validate(mockData)
        expect(res).toEqual({
            status: 400,
            title: "Your request parameters didn't validate.",
            "invalid-params": {
                name: "email",
                reason: "Email is required"
            }
        })
    });

    test("User Email is not valid", () => {
        mockData.email = "usermailcom"
        const res = registerValidator.validate(mockData)
        expect(res).toEqual({
            status: 400,
            title: "Your request parameters didn't validate.",
            "invalid-params": {
                name: "email",
                reason: "Email is not valid"
            }
        })
    });

    test("User Password is missing", () => {
        mockData.password = ""
        const res = registerValidator.validate(mockData)
        expect(res).toEqual({
            status: 400,
            title: "Your request parameters didn't validate.",
            "invalid-params": {
                name: "password",
                reason: "Password is required"
            }
        })
    });

    test("User Password is not valid", () => {
        mockData.password = "123123"
        const res = registerValidator.validate(mockData)
        expect(res).toEqual({
            status: 400,
            title: "Your request parameters didn't validate.",
            "invalid-params": {
                name: "password",
                reason: "Password must be at least 6 characters and contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 symbol"
            }
        })
    });
});