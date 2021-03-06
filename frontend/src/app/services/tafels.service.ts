import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Tafel } from '../models/tafel';
import { HttpClient } from '@angular/common/http';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TafelsService {
  private readonly api: string = '/api/restaurant/tafels';

  private readonly dataStore = new BehaviorSubject<Tafel[]>([]);
  public readonly data$: Observable<Tafel[]> = this.dataStore.asObservable();

  constructor(private http: HttpClient) {
    this.allTafels();
  }

  private static tafelsResponseToTafelMapper(tafelsResponse: ITafelsResponse): Tafel[] {
    return tafelsResponse.tafels.map(TafelsService.tafelToTafelMapper);
  }

  private static tafelToTafelMapper(tafel: ITafel): Tafel {
    return new Tafel(tafel.kenmerk, tafel.personen, tafel.id);
  }

  public allTafels(): void {
    this.http
      .get<ITafelsResponse>(this.api)
      .pipe(
        take(1),
        map(TafelsService.tafelsResponseToTafelMapper),
        tap(tafels => this.dataStore.next(tafels))
      )
      .subscribe();
  }

  public addNewTafel(tafel: Tafel): void {
    this.http
      .post(this.api, tafel)
      .pipe(
        take(1),
        tap(() => this.allTafels())
      )
      .subscribe();
  }

  public updateTafel(tafel: Tafel): void {
    this.http
      .put(`${this.api}/${tafel.id}`, tafel)
      .pipe(
        take(1),
        tap(() => this.allTafels())
      )
      .subscribe();
  }

  public deleteTafel(tafel: Tafel): void {
    this.http
      .delete(`${this.api}/${tafel.id}`)
      .pipe(
        take(1),
        tap(() => this.allTafels())
      )
      .subscribe();
  }
}

interface ITafelsResponse {
  tafels: ITafel[];
}

interface ITafel {
  id: number;
  kenmerk: string;
  personen: number;
}
