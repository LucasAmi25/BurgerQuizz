import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Reponse} from "../models/reponse";
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReponsesService {

  constructor(private http: HttpClient) { }

  getReponses(id: string | number): Observable<Reponse[]> {
    const url = 'https://equipe01.chez-wam.info/api/reponses?id_question=eq.' + id;
    return this.http.get<Reponse[]>(url);
  }

  recupReponses(id:number):Observable<Reponse[]>{
    const url = 'https://equipe04.chez-wam.info/api/reponses?id_question=eq.' + id;
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.get<Reponse[]>(url, httpOptions)
      .pipe(
        map(res => res),
        catchError(err => {
          console.log('Erreur http : ', err);
          return of([]);
        }),
      );

  }
}
