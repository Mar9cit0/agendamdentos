import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Agendamento } from '../models/agendamento';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }



  getAllAgendamento(id:any):  Observable<Agendamento> {
    console.log(`${environment.baseApiUrl}listar`);
    return this.http.get(`${environment.baseApiUrl}listar/${id}`)
      .pipe(
        map(obj => obj),
        catchError(e => this.errorHandler(e))
      );
  }

  delete(id:any):  Observable<Agendamento> {

    return this.http.delete(`${environment.baseApiUrl}agendamento/${id}`)
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
