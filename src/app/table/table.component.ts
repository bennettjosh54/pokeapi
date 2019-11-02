import { Component, OnInit } from '@angular/core';
import {AppService} from '../service/app.service';
import {Pokemon} from '../model/pokemon.model';
import {PokemonResponse} from '../response/pokemon.response.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  pokemon: Pokemon;
  id: number;

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

  getPokemonByID(id: number) {
    this.appService.getPokemonById(id).subscribe((response) => {
      this.pokemon = <Pokemon> response;
      console.log(this.pokemon);
      console.log(this.id);
    });
  }
}
