import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-victoire',
  templateUrl: './victoire.component.html',
  styleUrls: ['./victoire.component.css']
})
export class VictoireComponent implements OnInit {

  @Input('score') scoreE!:number;
  constructor() { }

  ngOnInit(): void {
  }

}
