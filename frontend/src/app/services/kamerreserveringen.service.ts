import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KamerReservering } from '../models/kamerreservering';
import {map, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KamerreserveringenService {

  private static api = `/api/kamerreservering`;
  constructor(private http: HttpClient) {}

  getKamerReserveringen(): Observable<KamerReservering[]> {
   return this.http.get<IKamerReservering>(`${KamerreserveringenService.api}`)
    .pipe(
     map((data: any) => data.map((kamerreservering: KamerReservering) =>new KamerReservering(kamerreservering.id,
      kamerreservering.voornaam, kamerreservering.achternaam, kamerreservering.telefoonnummer, kamerreservering.emailadres,
      kamerreservering.identiteitsid, kamerreservering.postcode, kamerreservering.straat, kamerreservering.huisnummer,
      kamerreservering.woonplaats, kamerreservering.land, kamerreservering.datumvan, kamerreservering.datumtot, kamerreservering.kamernaam))),
     )
  }
  saveKamerReservering(kamerreservering: KamerReservering){
    console.log(kamerreservering);
    this.http.post('/api/kamerreservering', kamerreservering)
      .pipe(
        take(1)
      ).subscribe()
  }
  deleteKamerReservering(kamerdata: KamerReservering){
    console.log(kamerdata);
    this.http.delete(`${KamerreserveringenService.api}/${kamerdata.id}`).subscribe();
    location.reload();
  }

}

export interface IKamerReservering {
     id: number,
     voornaam: string,
     achternaam: string,
     telefoonnummer: string,
     emailadres: string,
     identiteitsid: string,
     postcode: string,
     straat: string,
     huisnummer: string,
     woonplaats: string,
     land: string,
     datumvan: string,
     datumtot: string,
     kamernaam: string
}
