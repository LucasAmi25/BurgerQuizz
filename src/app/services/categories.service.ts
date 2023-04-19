import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Categorie} from '../models/categorie';



export class CategoriesService {

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<Categorie[]> {
    const url = 'https://equipe04.chez-wam.info:443/api/categories';
    return this.http.get<Categorie[]>(url);
  }

  addCategorie(categorie: Categorie): Categorie{
    const url = 'https://equipe04.chez-wam.info:443/api/categories';
    this.http.post<Categorie>(url, categorie).subscribe(() => {
      alert('Categorie ajouté !');
    });
    return categorie;
  }

  updateCategorie(id: number, categorie: Categorie): Categorie{
    const url = 'https://equipe04.chez-wam.info:443/api/categories?id_catetgorie=eq.' + id;
    this.http.patch(url, categorie).subscribe(() => alert('Categorie modifié !'));
    return categorie;
  }
}
