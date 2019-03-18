import { Controller, Body, Post, Get, Param, Delete } from '@nestjs/common';
import { Activiteit } from 'src/models/activiteit';
import { ActiviteitEntity } from 'src/entities/activiteit-entity';
import { CreateActiviteitDto } from 'src/dto/create-activiteit-dto';
import { ActiviteitService } from 'src/services/activiteit/activiteit.service';

@Controller('activiteiten')
export class ActiviteitenController {

  constructor(
    private readonly activiteitenService: ActiviteitService,
  ) {}

  @Post('saveactiviteit')
  public saveActiviteit(@Body() createActiviteit: CreateActiviteitDto): void {
    const activiteit: ActiviteitEntity = new ActiviteitEntity(
      createActiviteit.naam,
      createActiviteit.beschrijving,
      createActiviteit.capaciteit,
      createActiviteit.datum,
      createActiviteit.prijs,
      createActiviteit.thumb,

    );
    return this.activiteitenService.saveActiviteit(activiteit);
  }
  @Get('')
  getActiviteit(): Promise<Activiteit[]> {
    return this.activiteitenService.getActiviteit();
  }

  @Delete('/:activiteitId')
    public deleteActiviteit(@Param('activiteitId') activiteitId: number): void{
      this.activiteitenService.deleteActiviteit(activiteitId);
    }
  }