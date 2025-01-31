import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../model/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  apiUrl: string = 'https://pokeapi.co/api/v2'

  constructor(public httpClient: HttpClient) { }

  getPokemonById(id: number) {
    console.log(`${this.apiUrl}/${id}`)
    return this.httpClient.get(`${this.apiUrl}/pokemon/${id}`)
  }

  getPokemonSpecies(id: number) {
    return this.httpClient.get(`${this.apiUrl}/pokemon-species/${id}`)
  }
}
