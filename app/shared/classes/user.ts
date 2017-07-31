export class User {
    name: string;
    role: Role;
    email: string;
    password: string;
}

export class Role {
    name: string;
    hasControlAccess: boolean;
}

