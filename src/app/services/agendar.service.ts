import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Areas } from '../models/areas';
import { map, catchError } from 'rxjs/operators'
import { Profesores } from '../models/profesor';

@Injectable({
  providedIn: 'root'
})
export class AgendarService {

  constructor(private http: HttpClient) { }

  getAllProfesores(id:any):  Observable<Profesores> {
    console.log(`${environment.baseApiUrl}prof&id=${id}`);
    return this.http.get(`${environment.baseApiUrl}prof&id=${id}`)
      .pipe(
        map(obj => obj),
        catchError(e => this.errorHandler(e))
      );
  }

  getAllAreas():  Observable<Areas> {
    console.log(`${environment.baseApiUrl}areas`);
    return this.http.get(`${environment.baseApiUrl}areas`)
      .pipe(
        map(obj => obj),
        catchError(e => this.errorHandler(e))
      );
  }

  errorHandler(e: any): Observable<any> {
    let errors = [];
    for (let er of e.error.message) {
      errors.push(er)
    }
    let str_errors = JSON.stringify(errors);
    throw new Error(str_errors)
    return EMPTY;
  }


}
