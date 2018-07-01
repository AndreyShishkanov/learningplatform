import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from "@angular/common/http";
import {Attachment} from "../../shared/classes/attachment";

@Injectable()
export class VideoService {
    
    constructor(private http: HttpClient) {
    }
    
    getMedias(): Observable<Attachment[]>{
        return this.http.get<Attachment[]>('/api/getMediaList');
    }
    setCurrentMedia(attachment: Attachment): Observable<any>{
        return this.http.post("/api/setCurrentMedia", {attachment: attachment});
    }
}