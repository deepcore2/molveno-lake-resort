import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActiviteitResEntity } from 'src/entities/activiteit-res-entity';
import { Repository } from 'typeorm';
import { CreateActiviteitResDto } from 'src/dto/create-activiteit-res-dto';
import { ActiviteitPlanningEntity } from 'src/entities/activiteit-planning-entity';

@Injectable()
export class ActiviteitResService {
  constructor(
    @InjectRepository(ActiviteitResEntity)
    private readonly activiteitResRepository: Repository<ActiviteitResEntity>,
    @InjectRepository(ActiviteitPlanningEntity)
    private readonly activiteitenPlanningRepository: Repository<
      ActiviteitPlanningEntity
    >,
  ) {}

  public insertReservering(
    reservering: CreateActiviteitResDto,
  ): Promise<ActiviteitResEntity> {
    return this.activiteitResRepository.save(reservering);
  }

  public async saveReservering(
    reservering: ActiviteitResEntity,
    planningid: number,
  ): Promise<void> {
    const planning = await this.activiteitenPlanningRepository.findOne(
      planningid,
    );
    reservering.planning = planning;
    this.activiteitResRepository.save([reservering]);
  }

  //
  // public async saveActiviteitPlanning(
  //   activiteitplanning: ActiviteitPlanningEntity,
  //   activiteitId: number,
  // ): Promise<void> {
  //   const activiteit = await this.activiteitRepository.findOne(activiteitId);
  //   activiteitplanning.activiteit = activiteit;
  //   this.activiteitenPlanningRepository.save([activiteitplanning]);
  // }
  //

  async getReservering(): Promise<ActiviteitResEntity[]> {
    return this.activiteitResRepository.find({ relations: ['planning', 'planning.activiteit'] });
  }

  public updateReservering(
    reservering: CreateActiviteitResDto,
    planningId: number,
  ): void {
    this.activiteitResRepository.update(
      { resid: reservering.resid },
      {
        // planid: reservering.planid,
        emailGast: reservering.emailGast,
        phoneGast: reservering.phoneGast,
        aantalPersonen: reservering.aantalPersonen,
      },
    );
  }

  public deleteReservering(reserveringId: number) {
    this.activiteitResRepository.delete({ resid: reserveringId });
  }
}
