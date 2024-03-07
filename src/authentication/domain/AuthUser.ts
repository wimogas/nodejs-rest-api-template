import {AggregateRoot} from "../../common/domain/models/AggregateRoot";
import {AuthUserId} from "./ValueObjects/AuthUserId";
import {AuthPermission} from "../application/common/security/permissions/AuthPermissions";
import {AuthRole} from "../application/common/security/roles/AuthRoles";

export class AuthUser extends AggregateRoot<AuthUserId> {
    public email: string;
    public password: string;
    public permissions: string;
    public roles: string;

    private constructor(
        id: AuthUserId,
        email: string,
        password: string,
        permissions: string,
        roles: string) {
        super(id);
        this.email = email
        this.password = password
        this.permissions = permissions
        this.roles = roles
    }

    public static create(
        id: string,
        email: string,
        password: string,
        permissions: string = `${AuthPermission.Edit},${AuthPermission.Delete}`,
        roles: string = `${AuthRole.User}`): AuthUser {
        return new AuthUser(
            AuthUserId.create(id),
            email,
            password,
            permissions,
            roles
        )
    }
}