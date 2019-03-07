import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'node_modules/class-validator/index';
import { KamerEntity } from '../models/entities/kamer.entity';

export class UpdateKamerDto {
  @IsString()
  @ApiModelProperty()
  public readonly kamerNaam: string;
  @IsString()
  @ApiModelProperty()
  public readonly kamerType: string;
  @IsString()
  @ApiModelProperty()
  public readonly kamerLigging: string;
  @IsNumber()
  @ApiModelProperty()
  public readonly aantalPersonen: number;
  @IsNumber()
  @ApiModelProperty()
  public readonly prijs: number;

 kamerEntity() {
  return new KamerEntity(
    this.kamerNaam,
    this.kamerType,
    this.kamerLigging,
    this.aantalPersonen,
    this.prijs,
  );
}
}
