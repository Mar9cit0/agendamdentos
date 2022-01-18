import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Areas } from '../models/areas';
import { map, catchError } from 'rxjs/operators'
import { Profesores } from '../models/profesor';
import { Datas } from '../models/datas';
import { Agendamento } from '../models/agendamento';

@Injectable({
  providedIn: 'root'
})
export class AgendarService {

  constructor(private http: HttpClient) { }



  getAllAreas():  Observable<Areas> {
    console.log(`${environment.baseApiUrl}areas`);
    return this.http.get(`${environment.baseApiUrl}areas`)
      .pipe(
        map(obj => obj),
        catchError(e => this.errorHandler(e))
      );
  }

  getAllProfesores(id:any):  Observable<Profesores> {
    console.log(`${environment.baseApiUrl}prof&id=${id}`);
    return this.http.get(`${environment.baseApiUrl}prof/${id}`)
      .pipe(
        map(obj => obj),
        catchError(e => this.errorHandler(e))
      );
  }

  getAllDatas(id:any):  Observable<Datas> {
    return this.http.get(`${environment.baseApiUrl}data/${id}`)
      .pipe(
        map(obj => obj),
        catchError(e => this.errorHandler(e))
      );
  }

  getAllHoras(id:any,data:any):  Observable<Datas> {

    return this.http.get(`${environment.baseApiUrl}hora/${id}/${data}`)
      .pipe(
        map(obj => obj),
        catchError(e => this.errorHandler(e))
      );
  }

  create(agendamento: Agendamento): Observable<Agendamento> {
    return this.http.post<Agendamento>(`${environment.baseApiUrl}agendamento`,agendamento)
  }

  update(agendamento: Agendamento, id:any): Observable<Agendamento> {
    console.log(`${environment.baseApiUrl}update/${id}`);
    return this.http.put<Agendamento>(`${environment.baseApiUrl}update/${id}`,agendamento)
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
