export class User {
    name: string;
    role: Role;
    email: string;
}

export class Role {
    name: string;
    hasControlAccess: boolean;
}

