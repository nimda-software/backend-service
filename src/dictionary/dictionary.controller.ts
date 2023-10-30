import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { CreateDictionaryRequest } from './request/create-dictionary.request';
import { UpdateDictionaryRequest, UpdateDictionaryRequestParam } from './request/update-dictionary.request';
import { ApiAcceptedResponse, ApiNoContentResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteDictionaryRequestParam } from './request/remove-dictionary.request';
import { CreateDictionaryResponse } from './response/create-dictionary.response';
import { FetchDictionaryRequestParam } from './request/fetch-dictionary.request';
import { FetchDictionaryResponse } from './response/fetch-dictionary.response';
import { ActivityService } from '../activity/activity.service';
import { STATUS } from '/common/enums/status.enum';
import { Dictionary } from './dictionary.entity';
import { Env } from '/common/env';
import { ApiBadRequestResponse } from '/common/decorators/open-api-bad-request.decorator';
import { ApiProtected } from '/common/decorators/open-api-protected-route.decorator';
import { ApiCreatedResponse } from '/common/decorators/open-api-created-response.decorator';
import { ApiUnprocessableEntityResponse } from '/common/decorators/open-api-unprocessable-response.decorator';

@ApiTags('Dictionary')
@Controller('dictionary')
export class DictionaryController {
  constructor(
    private readonly dictionaryService: DictionaryService,
    private readonly activityService: ActivityService,
  ) {}

  @Get('find/by/:uuid')
  @ApiBadRequestResponse()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns OK when successful', type: FetchDictionaryResponse })
  async findOneByUUID(@Param() param: FetchDictionaryRequestParam): Promise<FetchDictionaryResponse> {
    const record = await this.dictionaryService.findOneBy(param.uuid);
    if (!record) throw new NotFoundException('No record found with the given uuid');

    return FetchDictionaryResponse.from(record);
  }

  @ApiProtected()
  @ApiBadRequestResponse()
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: CreateDictionaryResponse })
  async create(@Body() requestBody: CreateDictionaryRequest): Promise<CreateDictionaryResponse> {
    // TODO: when user data is available change the createdBy to the user's id
    const createdBy = -1;
    const payload: Partial<Dictionary> = {
      ...requestBody,
      ...(Env.isDev && { status: STATUS.ACTIVE }), // otherwise it will be set to PENDING by default
    };

    const created = await this.dictionaryService.create(payload);
    await this.activityService.addDictionaryCreated({ createdBy, dictionaryUUID: created.uuid });

    return CreateDictionaryResponse.from(created);
  }

  @ApiProtected()
  @ApiBadRequestResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('update/by/:uuid')
  @ApiNoContentResponse({ description: 'Returns NO_CONTENT when successful' })
  @ApiUnprocessableEntityResponse({ description: 'Returns UNPROCESSABLE_ENTITY when UUID is wrong' })
  async update(
    @Param() param: UpdateDictionaryRequestParam,
    @Body() requestBody: UpdateDictionaryRequest,
  ): Promise<void> {
    // TODO: when user data is available change the updatedBy to the user's id
    const updatedBy = -1;

    const oldValue = await this.dictionaryService.findOneBy(param.uuid);
    if (!oldValue) throw new UnprocessableEntityException('No record found with the given uuid');

    const updated = await this.dictionaryService.update(param.uuid, requestBody);
    Logger.log(`The record has been updated. Affected rows: ${updated}`);

    await this.activityService.addDictionaryUpdated({
      updatedBy,
      oldValue,
      dictionaryUUID: param.uuid,
    });

    return void 0;
  }

  @ApiProtected()
  @ApiBadRequestResponse()
  @HttpCode(HttpStatus.ACCEPTED)
  @Delete('delete/by/:uuid')
  @ApiAcceptedResponse({ description: 'Returns ACCEPTED when successful' })
  @ApiUnprocessableEntityResponse({ description: 'Returns UNPROCESSABLE_ENTITY when UUID is wrong' })
  async delete(@Param() param: DeleteDictionaryRequestParam): Promise<void> {
    // TODO: when user data is available change the deletedBy to the user's id
    const deletedBy = -1;

    const deleted = await this.dictionaryService.markAsDeleted(param.uuid);
    if (deleted.affected === 0) throw new UnprocessableEntityException('No record found with the given uuid');

    Logger.log(`The record has been removed. Affected rows: ${deleted.affected}`);

    await this.activityService.addDictionaryDeleted({ deletedBy, dictionaryUUID: param.uuid });

    return void 0;
  }
}
