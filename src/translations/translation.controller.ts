import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  NotFoundException,
  Param,
  Patch,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { TranslationService } from './translation.service';
import { CreateTranslationRequest, CreateTranslationRequestParam } from './request/create-translation.request';
import { UpdateTranslationRequest, UpdateTranslationRequestParam } from './request/update-translation.request';
import {
  ApiAcceptedResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { FetchTranslationResponse } from './response/fetch-translation.response';
import { CreateDictionaryResponse } from '../dictionary/response/create-dictionary.response';
import { Env } from '/common/env';
import { STATUS } from '/common/enums/status.enum';
import { Translation } from './translation.entity';
import { ActivityService } from '../activity/activity.service';
import { DeleteTranslationRequestParam } from './request/remove-translation.request';
import { FetchDictionaryRequestParam } from '../dictionary/request/fetch-dictionary.request';
import { DictionaryService } from '../dictionary/dictionary.service';
import { ApiBadRequestResponse } from '/common/decorators/open-api-bad-request.decorator';
import { ApiProtected } from '/common/decorators/open-api-protected-route.decorator';

@ApiTags('Translation')
@Controller('translation')
export class TranslationController {
  constructor(
    private readonly translateService: TranslationService,
    private readonly dictionaryService: DictionaryService,
    private readonly activityService: ActivityService,
  ) {}

  @ApiBadRequestResponse()
  @HttpCode(HttpStatus.OK)
  @Get('find/:uuid')
  @ApiNotFoundResponse({ description: 'Returns NOT_FOUND when no record found with the given uuid' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns OK when successful', type: FetchTranslationResponse })
  async findOneByUUID(@Param() param: FetchDictionaryRequestParam): Promise<FetchTranslationResponse> {
    const record = await this.translateService.findOneBy(param.uuid);
    if (!record) throw new NotFoundException('No record found with the given uuid');

    return FetchTranslationResponse.from(record);
  }

  @ApiProtected()
  @ApiBadRequestResponse()
  @Post('create/:uuid')
  @HttpCode(HttpStatus.CREATED)
  @ApiUnprocessableEntityResponse({ description: 'Returns UNPROCESSABLE_ENTITY when UUID is wrong' })
  @ApiCreatedResponse({ type: CreateDictionaryResponse, description: 'Returns CREATED when successful' })
  async create(
    @Param() param: CreateTranslationRequestParam,
    @Body() requestBody: CreateTranslationRequest,
  ): Promise<FetchTranslationResponse> {
    // TODO: when user data is available change the createdBy to the user's id
    const createdBy = -1;
    const payload: Partial<Translation> = {
      ...requestBody,
      ...(Env.isDev && { status: STATUS.ACTIVE }), // otherwise it will be set to PENDING by default
    };

    const dictionary = await this.dictionaryService.findOneBy(param.uuid);
    if (!dictionary) throw new UnprocessableEntityException('No Dictionary record found with the given uuid');

    const translation = await this.translateService.create(payload, dictionary);
    await this.activityService.addTranslationCreated({ createdBy, dictionaryUUID: translation.uuid });

    return FetchTranslationResponse.from(translation);
  }

  @ApiProtected()
  @ApiBadRequestResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('update/:uuid')
  @ApiNoContentResponse({ description: 'Returns NO_CONTENT when successful' })
  @ApiUnprocessableEntityResponse({ description: 'Returns UNPROCESSABLE_ENTITY when UUID is wrong' })
  async update(@Param() param: UpdateTranslationRequestParam, @Body() requestBody: UpdateTranslationRequest) {
    // TODO: when user data is available change the updatedBy to the user's id
    const updatedBy = -1;

    const oldValue = await this.translateService.findOneBy(param.uuid);
    if (!oldValue) throw new UnprocessableEntityException('No record found with the given uuid');

    const updated = await this.translateService.update(param.uuid, requestBody);
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
  @Delete('delete/:uuid')
  @ApiAcceptedResponse({ description: 'Returns ACCEPTED when successful' })
  @ApiUnprocessableEntityResponse({ description: 'Returns UNPROCESSABLE_ENTITY when UUID is wrong' })
  async delete(@Param() param: DeleteTranslationRequestParam): Promise<void> {
    // TODO: when user data is available change the deletedBy to the user's id
    const deletedBy = -1;

    const deleted = await this.translateService.markAsDeleted(param.uuid);
    if (deleted.affected === 0) throw new UnprocessableEntityException('No record found with the given uuid');

    Logger.log(`The record has been removed. Affected rows: ${deleted.affected}`);

    await this.activityService.addDictionaryDeleted({ deletedBy, dictionaryUUID: param.uuid });

    return void 0;
  }
}
