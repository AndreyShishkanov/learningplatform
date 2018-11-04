import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Role } from '../../classes/user';

@Injectable()
export class DataService {

    constructor(private http: HttpClient) {
    }

    getRoles(): Observable<Role[]>{
        return this.http.get<Role[]>('/api/getroles');
    }
}
