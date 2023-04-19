import { ReponsesService } from './../services/reponses.service';
import { QuestionsService } from './../services/questions.service';
import { Question } from './../models/question';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import {Router} from '@angular/router';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Theme } from '../models/theme';
import { ThemesService } from '../services/themes.service';

@Component({
  selector: 'app-jeu',
  templateUrl: './jeu.component.html',
  styleUrls: ['./jeu.component.css']
})
export class JeuComponent implements OnInit {


  tabQuestions: Observable<Question[]> = new Observable();
  tabQuestionsLive: Question[] = [];
  estTrie = false;
  tab: Question[] = [];
  current_question: Question | undefined;
  timeLeft = 60;
  categorie = 0;
  nbQuestions = 10;
  paramPartie = false;
  tabQuestionRetourne: Question[] = [];
  listeTheme: Theme[] = [];
  listeThemeSelect: Theme[] = [];


  themePossible: number[] = [];

  paramPartieValeur = new UntypedFormGroup({
    theme: new UntypedFormControl(),
  });

  constructor(private http: HttpClient, private router: Router, private questionsService: QuestionsService, private reponsesService: ReponsesService, private themeService: ThemesService) {
  }

  choixCat = 0;

  triSelect(id: number){
    this.choixCat = id;
    this.estTrie = true;

    let tab: Question[] = [];

    this.questionsService.recupQuestions(id).subscribe(value => {
      tab = value;
      for (const q of tab){
        if (this.themePossible.indexOf(q.id_theme) == -1){
          this.themePossible.push(q.id_theme);
        }
      }
      let randNumber;
      for (let i = 0 ; i < 4 ; i ++){
        randNumber = Math.random() * this.themePossible.length - 1;
        randNumber = Math.ceil(randNumber);
        this.listeThemeSelect = [];
        this.themeService.getTheme(this.themePossible[randNumber]).subscribe(value => {this.listeThemeSelect.push(value[0]); console.log(value[0]); });
        this.themePossible.splice(this.themePossible.indexOf(this.themePossible[randNumber]), 1);
      }
    });
  }

  triSelectBis(){
    this.paramPartie = true;
    this.categorie = this.choixCat;
    this.tabQuestions = this.questionsService.recupQuestionsTheme(this.paramPartieValeur.value.theme);
    this.estTrie = true;

    this.tabQuestions.subscribe(value => {this.tabQuestionsLive = value; });

  }

  retourneQuestion(){
    let randNumber = 0;
    const questionsChoisi: Question[] = [];
    for (let i = 0 ; i < this.nbQuestions ; i++){
      randNumber = Math.random() * this.tabQuestionsLive.length - 1;
      randNumber = Math.ceil(randNumber);
      questionsChoisi.push(this.tabQuestionsLive[randNumber]);
      const index  = this.tabQuestionsLive.indexOf(this.tabQuestionsLive[randNumber]);
      this.tabQuestionsLive.splice(index, 1);
    }
    this.tabQuestionRetourne = questionsChoisi;
  }



  ngOnInit(): void {
    this.themeService.getThemes().subscribe(value => {
      this.listeTheme = value;
      let randNumber;
      const tabThemeSelect: Theme[] = [];

      for (let i = 0 ; i < 4 ; i++){
        randNumber = Math.random() * this.listeTheme.length - 1;
        randNumber = Math.ceil(randNumber);
        tabThemeSelect.push(this.listeTheme[randNumber]);
      }

    });

  }

}

