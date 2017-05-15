import { Injectable } from '@angular/core';
import IRole from "../classes/role";
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export default class AuthenticationService {
    private _currentRole : IRole;
    currentRole: Observable<IRole>;
    private currentRoleObserver: any;

    constructor(private http: Http){
        this.currentRole = new Observable(observer => {
            this.currentRoleObserver = observer;
        });
        this.getroles().subscribe(x=> {
            this._currentRole = x[0];
            this.currentRoleObserver.next(this._currentRole);
        });
    }

    isTeacher(): boolean {
        return this._currentRole.hasControlsAccess;
    }

    getroles() : Observable<IRole[]> {
        return this.http.get('getRoles').map((response:Response) => response.json());
    }
    setCurrentRole(role:IRole){
        this._currentRole = role;
        this.currentRoleObserver.next(this._currentRole);
    }
}