import { DecompteComponent } from './decompte/decompte.component';
import { JouerComponent } from './jouer/jouer.component';
import { JeuComponent } from './jeu/jeu.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {QuestionsComponent} from './questions/questions.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {GestionCategorieComponent} from './gestion-categorie/gestion-categorie.component';
import {EquipesComponent} from './equipes/equipes.component';

const routes: Routes = [
  {path: 'question/:id', component: QuestionsComponent},
  {path: 'jeu/:id', component: JouerComponent},
  {path: '', component : JeuComponent},
  {path: 'categorie', component: GestionCategorieComponent},
  {path: 'equipes', component: EquipesComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
