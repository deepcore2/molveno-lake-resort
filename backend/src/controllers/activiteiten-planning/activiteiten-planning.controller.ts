import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { ActiviteitPlanning } from 'src/models/activiteit-planning';
import { ActiviteitPlanningService } from 'src/services/activiteit-planning/activiteit-planning.service';
import { CreateActiviteitPlanningDto } from 'src/dto/create-activiteit-planning-dto';
import { ActiviteitPlanningEntity } from 'src/entities/activiteit-planning-entity';
import { UpdateActiviteitPlanningDto } from 'src/dto/update-activiteit-planning-dto';

@Controller('activiteiten/planning')
@ApiUseTags('activiteiten')
export class ActiviteitenPlanningController {
  constructor(
    private readonly activiteitenPlanService: ActiviteitPlanningService,
  ) {}

  @Post(':activiteitid')
  @ApiOperation({ title: 'Maak een nieuw plannings element aan' })
  @ApiResponse({
    status: 201,
    description: 'De planning is succesvol aangemaakt',
  })
  @ApiResponse({
    status: 409,
    description: 'Een planning met dit kenmerk bestaat al',
  })
  public saveActiviteitPlanning(
    @Body() createActiviteitPlanning: CreateActiviteitPlanningDto,
    @Param('activiteitid') actId: number,
  ) {
    const activiteitenMaakPlanning: ActiviteitPlanningEntity = new ActiviteitPlanningEntity(
      createActiviteitPlanning.actCapaciteit,
      createActiviteitPlanning.actDate,
      createActiviteitPlanning.actPrijs,
 
    );
    console.log("activiteitenMaakPlanning", activiteitenMaakPlanning);
    return this.activiteitenPlanService.saveActiviteitPlanning(
      activiteitenMaakPlanning,
      actId,
    );
  }

  @Get('')
  @ApiOperation({ title: 'Maak een lijst van geplande activiteiten' })
  getActiviteitenPlanning(): Promise<ActiviteitPlanning[]> {
    return this.activiteitenPlanService.getActiviteitenPlanning();
  }

  @Put('')
  @ApiOperation({ title: 'Wijzig een geplande activiteit' })
  @ApiResponse({
    status: 201,
    description: 'De geplande activiteit is succesvol bijgewerkt',
  })
  updateActiviteitenPlanning(
    @Body() createActiviteitPlanning: UpdateActiviteitPlanningDto,
    @Param('activiteitid') activiteitid: number,
  ): void {
    const planning: ActiviteitPlanningEntity = new ActiviteitPlanningEntity(
      createActiviteitPlanning.actCapaciteit,
      createActiviteitPlanning.actDate,
      createActiviteitPlanning.actPrijs,
      createActiviteitPlanning.planid,
    );
    this.activiteitenPlanService.updateActiviteitPlanning(
      planning,
      activiteitid,
    );
  }

  @Delete(':planningsId')
  @ApiOperation({ title: 'Verwijder een geplande activiteit' })
  public deleteActiviteitenPlanning(
    @Param('planningsId') planningsId: number,
  ): void {
    this.activiteitenPlanService.deleteActiviteitenPlanning(planningsId);
  }
}
