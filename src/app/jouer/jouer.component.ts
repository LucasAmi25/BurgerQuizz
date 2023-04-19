import { ThemesService } from './../services/themes.service';
import { Question } from './../models/question';
import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ɵsetCurrentInjector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs';
import { Reponse } from '../models/reponse';
import { QuestionsService } from '../services/questions.service';
import { ReponsesService } from '../services/reponses.service';
import { FormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Theme } from '../models/theme';

@Component({
  selector: 'app-jouer',
  templateUrl: './jouer.component.html',
  styleUrls: ['./jouer.component.css']
})
export class JouerComponent implements  OnChanges,OnInit {


  question: Question = <Question>{};
  reponses: Reponse[] = [];
  loading: boolean = false;
  tabReponse: any = [];
  score:number = 0;
  nbSecondesEntreQuestion = 15;
  valInterval:number = this.nbSecondesEntreQuestion * 1000;
  estSoumis = false;
  form: any;
  numQuestion = 0;


  constructor(private questionsService: QuestionsService, private route: ActivatedRoute, private reponsesService: ReponsesService,private fb:UntypedFormBuilder) {
  }



  @Input('tabQ')
  current!: Question[];

  @Input('categorie')
  categorieChoisi!: number;

  nIntervId: any;
  id:number = 0;

  estSelect:boolean = false;
  estFini = false;

  selectOk(){
    this.estSelect = true;
  }

  afficheQuestion(){
    this.estSoumis = false;
    this.estSelect = false;
    this.numQuestion++;
    if(this.current.length > 0){
      this.id = this.current[this.current.length-1].id_question;
      this.questionsService.getQuestion(this.id).subscribe(question => {
        this.question = question;
        this.reponsesService.getReponses(this.id).subscribe(reponses => {
          this.reponses = reponses;
          this.loading = false;
        });
      });
      this.current.pop();
    }
    else{
      this.estFini = true;
    }
  }

  valueOfRep(rep:boolean, idQuestion:number , idReponse:number){
    this.estSoumis = true;
    let tabRep = [idQuestion,idReponse,rep];
    this.tabReponse.push(tabRep);
    if(rep){
      this.score++;
    }

    console.log(this.tabReponse);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.current.length > 0 ){
      this.afficheQuestion();
      let a = setInterval(() => {
        this.afficheQuestion();
      }, this.valInterval);
    }

  }


  repForm = new UntypedFormGroup({
      title: new UntypedFormControl(),
  });

  // cette fonction est appelée lorsque l'on utilise le mode sel et poivre
  submitBook() {
    this.estSoumis = true;
    let rep: Reponse[] = [];
    console.log(this.repForm.value.title);
    this.reponsesService.getReponses(this.id).subscribe(value => {
      let a = value.filter(q => q.id_reponse == this.repForm.value.title)[0];
      this.valueOfRep(a.bonne_reponse,a.id_question,a.id_reponse);
    });
  }

  submitCheckbox(){
    let tabDeRep:number[] = [];
    let truc :NodeListOf<HTMLInputElement> = document.querySelectorAll('.checkbox');
    truc.forEach((elt : HTMLInputElement, key : number) => {
      if (elt.checked) tabDeRep.push(key);
    })

    let tabRepDeRetour:Reponse[] = [];
    for(let r of tabDeRep){
      tabRepDeRetour.push(this.reponses[r]);
    }

    this.valueOfRepMultiple(tabRepDeRetour);
  }

  valueOfRepMultiple(tab:Reponse[]){
    this.estSoumis = true;

    let tabBonneRep:Reponse[] = [];

    for(let r of this.reponses){
      if(r.bonne_reponse){
        tabBonneRep.push(r);
      }

    }

    let tabRep = [tab[0].id_question,tab];
    this.tabReponse.push(tabRep);


    let ok = true;

    for(let r of tab){
      if(tabBonneRep.indexOf(r) == -1){
        ok = false;
      }
    }

    if((tab.length == tabBonneRep.length) && (ok) ){
      this.score++;
    }
  }

  ngOnInit(): void {
  }
}
