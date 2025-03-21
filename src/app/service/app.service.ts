import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../model/pokemon.model';
import { Observable } from 'rxjs';

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

  getPokemonInfo(urlString: string): Observable<Pokemon> {
    //Same as getPokemonById(), I.E https://pokeapi.co/api/v2/pokemon/1
    return this.httpClient.get<Pokemon>(urlString)
  }

  getPokemonSpecies(id: number) {
    return this.httpClient.get(`${this.apiUrl}/pokemon-species/${id}`)
  }
}
