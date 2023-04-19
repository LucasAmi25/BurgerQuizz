import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Categorie} from '../models/categorie';
import {CategoriesService} from '../services/categories.service';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-gestion-categorie',
  templateUrl: './gestion-categorie.component.html',
  styleUrls: ['./gestion-categorie.component.css']
})
export class GestionCategorieComponent implements OnInit {
  categories: Categorie[] = [];
  loading = false;
  form: UntypedFormGroup = new UntypedFormGroup({
    libelle: new UntypedFormControl('', [Validators.required, Validators.max(100)]),
    bareme: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(25)]),
    nb_questions: new UntypedFormControl('', [Validators.required, Validators.min(2), Validators.max(50)]),
  });
  edit = false;
  id = 0;
  current: any = null;

  constructor(private categoriesService: CategoriesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loading = true;
    this.categoriesService.getAllCategories().subscribe(categories => {
      this.categories = categories;
      this.loading = false;
    });
  }

  addCategorie(): void {
    if (this.form.valid) {
      const val: any = this.form.value;
      const categorie = this.categoriesService.addCategorie(
        {
          id_catetgorie : this.categories.length,
          libelle : val.libelle,
          bareme : val.bareme,
          nb_question : val.nb_questions}
      );
      this.categories.push(categorie);
    }
  }

  updateCategorie(): void {
    if (this.form.valid) {
      const val: any = this.form.value;
      const categorie = this.categoriesService.updateCategorie(this.id,
        {
          id_catetgorie : this.id,
          libelle : val.libelle,
          bareme : val.bareme,
          nb_question : val.nb_questions}
      );
      this.edit = false;
      const i: number = this.findCategorie(this.id);
      this.categories[i].libelle = categorie.libelle;
      this.categories[i].bareme = categorie.bareme;
      this.categories[i].nb_question = categorie.nb_question;
    }
  }

  onEdit(id: number): void {
    this.id = id;
    this.current = this.categories[this.findCategorie(id)];
    console.log(this.current);
    this.edit = true;
  }

  findCategorie(id: number): number {
    for (let i = 1; i < this.categories.length; i++) {
      if (this.categories[i].id_catetgorie === id) { return i; }
    }
    return -1;
  }

}
