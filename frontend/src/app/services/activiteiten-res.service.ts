import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ActiviteitRes } from "../models/activiteit-res";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ActiviteitenResService {
  public readonly api: string =
    "http://localhost:4200/api/activiteiten/reserveringen/";

  constructor(private http: HttpClient) {}

  private static activiteitResToActiviteitResMapper(
    reservering: IActiviteitres[]
  ): ActiviteitRes[] {
      return reservering
    // return reservering.map(
    //   ActiviteitenResService.activiteitResToActiviteitMapper
    // );
  }

  // private static activiteitResToActiviteitMapper(
  //   reservering: IActiviteitres
  // ): ActiviteitRes {
  //   return new ActiviteitRes(
  //     reservering.resid,
  //     reservering.planid,
  //     reservering.emailGast,
  //     reservering.phoneGast,
  //     reservering.aantalPersonen
  //   );
  // }

  getAllActiviteitenRes(): Observable<ActiviteitRes[]> {
    return this.http
      .get<IActiviteitres[]>(this.api)
      .pipe(map(ActiviteitenResService.activiteitResToActiviteitResMapper));
  }

  saveActiviteitRes(reservering: ActiviteitRes) {
    /*return*/ this.http
      .post<IActiviteitres[]>(this.api /*+ "savereservering"*/, reservering)
      .subscribe();
    // location.reload();
  }

  deleteActiviteitRes(reservering: ActiviteitRes) {
    this.http
      .delete<IActiviteitres[]>(this.api + reservering.resid)
      .subscribe();
    // location.reload();
  }
}
interface IActiviteitres {
  resid: number;
  planid: number;
  emailGast: string;
  phoneGast: string;
  aantalPersonen: number;
}
