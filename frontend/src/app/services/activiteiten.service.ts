import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Activiteit } from "../models/activiteit";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ActiviteitenService {
  public readonly api: string = `/api/activiteiten/`;

  constructor(private http: HttpClient) {}

  private static activiteitenResponseToActiviteitMapper(
    activiteitenResponse: IActiviteit[]
  ): Activiteit[] {
    // console.log(activiteitenResponse);
    return activiteitenResponse.map(
      ActiviteitenService.activiteitToActiviteitMapper
    );
  }

  private static activiteitToActiviteitMapper(
    activiteit: IActiviteit
  ): Activiteit {
    return new Activiteit(
      activiteit.id,
      activiteit.naam,
      activiteit.beschrijving,
      activiteit.datum,
      activiteit.capaciteit,
      activiteit.prijs,
      activiteit.thumb
    );
  }

  getAllActiviteiten(): Observable<Activiteit[]> {
    return this.http
      .get<IActiviteit[]>(this.api)
      .pipe(map(ActiviteitenService.activiteitenResponseToActiviteitMapper));
  }

  saveActiviteit(activiteit: Activiteit): void {
    this.http.post<IActiviteit[]>(this.api, activiteit).subscribe();
    // console.log(activiteit);
    // location.reload();
  }

  updateActiviteit(activiteit: Activiteit): void {
    this.http.post<IActiviteit[]>(this.api, activiteit).subscribe();
    // location.reload();
  }

  deleteActiviteit(activiteit: Activiteit): void {
    this.http.delete<IActiviteit[]>(this.api + activiteit.id).subscribe();
    // location.reload();
  }
}

interface IActiviteit {
  id: number;
  naam: string;
  beschrijving: string;
  datum: Date;
  capaciteit: number;
  prijs: number;
  thumb: string;
}
