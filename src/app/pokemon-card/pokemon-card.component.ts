import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pokemon } from '../model/pokemon.model';
import { AppService } from '../service/app.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Species } from '../model/species/species.model';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { map, switchMap } from 'rxjs/operators';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-pokemon-card',
  imports: [
    MatCardModule,
    CommonModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.css',
})
export class PokemonCardComponent implements OnInit {

  data = inject(MAT_DIALOG_DATA);

  pokemon: Pokemon;
  id: number;
  description: string;

  types: string[] = [];

  isLoadingResults = true;
  isLoadingPokemonSprite = true;

  constructor(private appService: AppService) {

    this.appService.getPokemonInfo(this.data.infoUrl).pipe(
      switchMap((response: Pokemon) => {
        this.pokemon = response;
        this.id = response.id;
        this.pokemon.types.forEach((type) => {
          this.types.push(type.type.name);
        });

        return this.appService.getPokemonSpecies(this.id).pipe(
          map((species: Species) => {
            this.description = species.flavor_text_entries[0].flavor_text;
          })
        );
      })
    ).subscribe(() => {
      this.isLoadingResults = false;
      this.isLoadingPokemonSprite = false;
    });

  }


  ngOnInit() {

  }

  ngOnDestroy() {
    console.log('PokemonCardComponent destroyed');
  }

}
