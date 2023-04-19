import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {EquipesService} from '../services/equipes.service';

@Component({
  selector: 'app-equipes',
  templateUrl: './equipes.component.html',
  styleUrls: ['./equipes.component.css']
})
export class EquipesComponent implements OnInit {
  form: UntypedFormGroup = new UntypedFormGroup({
    equipe: new UntypedFormControl('', [Validators.required])
  });
  load = false;
  idJoueur = 0;

  constructor(private equipeService: EquipesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.idJoueur = params.id_joueur;
      this.load = true;
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      let idEquipe = 0;
      if (this.form.value.equipe === 'Mayo') { idEquipe = 0; }
      else { idEquipe = 1; }
      this.equipeService.addJoueurToEquipe({
        id_equipe_joueur : this.equipeService.getLengthJoueurEquipe(),
        id_joueur : this.idJoueur,
        id_equipe : idEquipe
      });
    }
  }

}
