import { Injectable } from '@angular/core';
import {Question} from "../models/question";
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import { Theme } from '../models/theme';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http: HttpClient) { }

  getQuestion(id: string | number): Observable<Question> {
    const url = 'https://equipe01.chez-wam.info/api/questions?id_question=eq.' + id;
    return this.http.get<Question[]>(url).pipe(map(rep => rep[0]));
  }

  recupQuestions(id:number):Observable<Question[]>{

    const url = 'https://equipe04.chez-wam.info:443/api/questions?id_catetgorie=eq.' + id;
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    let a = this.http.get<Question[]>(url, httpOptions)
      .pipe(
        map(res => res),
        catchError(err => {
          console.log('Erreur http : ', err);
          return of([]);
        }),
      );

    return a;
  }

  recupQuestionsTheme(id:number):Observable<Question[]>{

    const url = 'https://equipe04.chez-wam.info:443/api/questions?id_theme=eq.' + id;
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    let a = this.http.get<Question[]>(url, httpOptions)
      .pipe(
        map(res => res),
        catchError(err => {
          console.log('Erreur http : ', err);
          return of([]);
        }),
      );

    return a;
  }




}
