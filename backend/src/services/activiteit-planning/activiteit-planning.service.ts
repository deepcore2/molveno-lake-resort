import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActiviteitPlanningEntity } from 'src/entities/activiteit-planning-entity';
import { Repository } from 'typeorm';
import { CreateActiviteitPlanningDto } from 'src/dto/create-activiteit-planning-dto';
import { ActiviteitEntity } from 'src/entities/activiteit-entity';

@Injectable()
export class ActiviteitPlanningService {
  constructor(
    @InjectRepository(ActiviteitPlanningEntity)
    private readonly activiteitenPlanningRepository: Repository<
      ActiviteitPlanningEntity
    >,
    @InjectRepository(ActiviteitEntity)
    private readonly activiteitRepository: Repository<ActiviteitEntity>,
  ) {}
  async getActiviteitenPlanning(): Promise<ActiviteitPlanningEntity[]> {
    return this.activiteitenPlanningRepository.find({
      relations: ['activiteit'],
    });
  }

  public async saveActiviteitPlanning(
    activiteitplanning: ActiviteitPlanningEntity,
    actId: number,
  ): Promise<void> {
    const activiteit = await this.activiteitRepository.findOne(actId);
    activiteitplanning.activiteit = activiteit;
    this.activiteitenPlanningRepository.save([activiteitplanning]);
  }

  public updateActiviteitPlanning(
    planning: ActiviteitPlanningEntity,
    activiteitId: number,
  ): void {
    this.activiteitenPlanningRepository.update(
      { planid: planning.planid },
      {
        actCapaciteit: planning.actCapaciteit,
        actDate: planning.actDate,
        actPrijs: planning.actPrijs,
      },
    );
  }

  public deleteActiviteitenPlanning(planningId: number) {
    this.activiteitenPlanningRepository.delete({ planid: planningId });
  }
}
