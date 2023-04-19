import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Theme } from '../models/theme';

@Injectable({
  providedIn: 'root'
})
export class ThemesService {

  constructor(private http: HttpClient) { }

  getThemes():Observable<Theme[]>{

    const url = 'https://equipe04.chez-wam.info:443/api/themes';
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.get<Theme[]>(url, httpOptions)
      .pipe(
        map(res => res),
        catchError(err => {
          console.log('Erreur http : ', err);
          return of([]);
        }),
      );

  }

  getTheme(id: string | number): Observable<Theme[]> {
    const url = 'https://equipe04.chez-wam.info:443/api/themes?id_theme=eq.' + id;
    return this.http.get<Theme[]>(url);
  }

}
