import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService 
{

    constructor(private http:HttpClient) { }

    postUser( postToUrl:string ,userData:User):Observable<any>
    {
        return this.http.post(postToUrl,userData,{ responseType: 'text' });
    }

    getUser( getFromUrl:string):Observable<any>
    {
        return this.http.get(getFromUrl);
    }

    putUser(putTourl:string, userData:User):Observable<any>
    {
        return this.http.put(putTourl,userData,{responseType: 'text'});
    }

}
