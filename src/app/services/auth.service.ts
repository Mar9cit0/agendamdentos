import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  Autenticar(user:User): Observable<User> { 
    return this.http.post<User>(`${environment.baseApiUrl}auth`, user);
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(`${environment.baseApiUrl}users`, user)
  }
}
