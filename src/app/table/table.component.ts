import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import {AppService} from '../service/app.service';
import {Pokemon} from '../model/pokemon.model';
import { PokemonResponse } from '../response/pokemon.response.model';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort, SortDirection} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css'],
    standalone: false
})
export class TableComponent implements OnInit, AfterViewInit {

  private _httpClient = inject(HttpClient);

  pokemon: Pokemon;
  id: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['name', 'url'];
  paginatedResults: PokeApiPage | null;
  data: PokeApiPageResult[] = [];

  dataSource: MatTableDataSource<PokeApiPageResult[]>;
  
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.paginatedResults = new PokeApiPage(this._httpClient);

    

    // If the user changes the sort order, reset back to the first page.
    // this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(
      // this.sort?.sortChange, 
      this.paginator.page
    )
      .pipe(
        startWith({}),
        switchMap((page) => {
          this.isLoadingResults = true;
          return this.paginatedResults!.getPaginatedResults(
            this.paginator.pageIndex,
          ).pipe(catchError(() => observableOf(null)));


        }),
        map((data: PokeApiPaginated)=> {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.resultsLength = data.count;
          return data.results;
        }),
      )
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
      });
  }

  getPokemonByID(id: number) {
    this.appService.getPokemonById(id).subscribe((response) => {
      this.pokemon = <Pokemon> response;
      console.log(this.pokemon);
      console.log(this.id);
    });
  }

}

export interface PokeApiPaginated {
  count: number,
  next: string,
  previous: string,
  results: [
    PokeApiPageResult
  ]
}

export class PokeApiPage {
  constructor(private _httpClient: HttpClient) {}

  getPaginatedResults(page: number): Observable<PokeApiPaginated> {
    const requestUrl = `https://pokeapi.co/api/v2/pokemon/?offset=${page * 100}&limit=100`;
    return this._httpClient.get<PokeApiPaginated>(requestUrl);
  }
}

export interface PokeApiPageResult {
  name: string,
  url: string
}
