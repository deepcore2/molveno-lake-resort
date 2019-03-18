import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';
import {KamerReservering} from "../kamerReservering";

@Entity()
export class KamerReserveringEntity {
  @PrimaryGeneratedColumn() public readonly id?: number;
  @Column('varchar') public readonly voornaam: string;
  @Column('varchar') public readonly achternaam: string;
  @Column('varchar') public readonly telefoonnummer: string;
  @Column('varchar') public readonly emailadres: string;
  @Column('varchar') public readonly identiteitsid: string;
  @Column('varchar') public readonly postcode: string;
  @Column('varchar') public readonly straat: string;
  @Column('varchar') public readonly huisnummer: string;
  @Column('varchar') public readonly woonplaats: string;
  @Column('varchar') public readonly land: string;
  @Column('varchar') public readonly datumvan: string;
  @Column('varchar') public readonly datumtot: string;
  @Column('varchar') public readonly kamernaam: string;

  constructor(
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
    kamernaam: string,
  ) {
    this.voornaam = voornaam;
    this.achternaam = achternaam;
    this.telefoonnummer = telefoonnummer;
    this.emailadres = emailadres;
    this.identiteitsid = identiteitsid;
    this.postcode = postcode;
    this.straat = straat;
    this.huisnummer = huisnummer;
    this.woonplaats = woonplaats;
    this.land = land;
    this.datumvan = datumvan;
    this.datumtot = datumtot;
    this.kamernaam = kamernaam;
  }

  mapToKamersReserving(): KamerReservering {
    return new KamerReservering(this.id, this.voornaam, this.achternaam, this.telefoonnummer, this.emailadres , this.identiteitsid, this.postcode, this.straat, this.huisnummer, this.woonplaats, this.land, this.datumvan, this.datumtot, this.kamernaam);
  }
}