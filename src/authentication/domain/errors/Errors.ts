import {IError} from "./IError";

export abstract class Errors implements IError {
    static NotFound() {
        return {
            status: 404,
            title: "Not found",
        }
    }
}