import { Test, TestingModule } from '@nestjs/testing';
import { ActivityService } from './activity.service';
import { SetupModule } from '/common/setup/setup.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from './activity.entity';
import { ActivityAction, ActivityType } from './activity.enum';
import { DataSource } from 'typeorm';

describe('ActivityLogsService', () => {
  let service: ActivityService;
  let connection: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SetupModule, TypeOrmModule.forFeature([Activity])],
      providers: [ActivityService],
    }).compile();

    service = module.get<ActivityService>(ActivityService);
    connection = module.get<DataSource>(DataSource);
  });

  afterEach(() => connection.destroy());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addDictionaryCreated', () => {
    it('should add an activity with CREATED flag', async () => {
      const activity = await service.addDictionaryCreated({
        createdBy: -1,
        dictionaryUUID: 'uuid',
      });
      expect(activity).toBeDefined();
      expect(activity).toEqual(
        expect.objectContaining({
          action: ActivityAction.CREATED,
          type: ActivityType.DICTIONARY,
        }),
      );
    });
  });

  describe('addDictionaryUpdated', () => {
    it('should add an activity with UPDATED flag', async () => {
      const activity = await service.addDictionaryUpdated({
        updatedBy: -1,
        oldValue: { some: 'old value' },
        dictionaryUUID: 'uuid',
      });
      expect(activity).toBeDefined();
      expect(activity).toEqual(
        expect.objectContaining({
          action: ActivityAction.UPDATED,
          type: ActivityType.DICTIONARY,
        }),
      );
    });
  });

  describe('addDictionaryDeleted', () => {
    it('should add an activity with DELETED flag', async () => {
      const activity = await service.addDictionaryDeleted({
        deletedBy: -1,
        dictionaryUUID: 'uuid',
      });
      expect(activity).toBeDefined();
      expect(activity).toEqual(
        expect.objectContaining({
          action: ActivityAction.DELETED,
          type: ActivityType.DICTIONARY,
        }),
      );
    });
  });
});
