import {User} from "./user";

export class ServerResponse {
    success: boolean;
    message: string;
    field: string;
    user: User;
}