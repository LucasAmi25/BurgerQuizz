import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EquipeJoueur} from '../models/EquipeJoueur';

@Injectable({
  providedIn: 'root'
})
export class EquipesService {
  private lenEJ = 0;

  constructor(private http: HttpClient) {this.updateLengthJoueurEquipe(); }

  private updateLengthJoueurEquipe(): void {
    const url = 'https://equipe04.chez-wam.info:443/api/equipes_joueurs';
    this.http.get<EquipeJoueur[]>(url).subscribe((ejs) => {
      if (ejs === null) { this.lenEJ = 0; }
      else { this.lenEJ = ejs.length; }
    });
  }

  getLengthJoueurEquipe(): number {
    return this.lenEJ;
  }

  addJoueurToEquipe(equipeJoueur: EquipeJoueur): EquipeJoueur {
    const url = 'https://equipe04.chez-wam.info:443/api/equipes_joueurs';
    this.http.post<EquipeJoueur>(url, equipeJoueur).subscribe(() => alert('Vous êtes bien inscrit dans l\'équipe'));
    return equipeJoueur;
  }
}
