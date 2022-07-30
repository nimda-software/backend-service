import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { CreateDictionaryRequest } from './request/create-dictionary.request';
import { UpdateDictionaryRequestBody, UpdateDictionaryRequestParam } from './request/update-dictionary.request';
import { ApiAcceptedResponse, ApiCreatedResponse, ApiNoContentResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Dictionary } from './entities/dictionary.entity';
import { STATUS } from '../common/enums/status.enum';
import { DeleteDictionaryRequestParam } from './request/remove-dictionary.request';
import { CreateDictionaryResponse } from './response/create-dictionary.response';
import { ApiBadRequestResponse, ApiProtected } from '../common/decorators';
import { FetchDictionaryRequestParam } from './request/fetch-dictionary.request';
import { FetchDictionaryResponse } from './response/fetch-dictionary.response';

@ApiTags('Dictionary')
@Controller('dictionary')
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @Post()
  @ApiProtected()
  @ApiBadRequestResponse()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: CreateDictionaryResponse, description: 'Returns CREATED when successful' })
  async create(@Body() requestBody: CreateDictionaryRequest): Promise<CreateDictionaryResponse> {
    // TODO: when user data is available, add user id to request body
    const createdBy = -1;
    const payload: Partial<Dictionary> = {
      ...requestBody,
      createdBy,
      status: STATUS.PENDING,
      properties: {
        editedBy: [
          {
            userId: createdBy,
            date: new Date(),
          },
        ],
      },
    };

    const dictionary = await this.dictionaryService.create(payload);

    return new CreateDictionaryResponse(dictionary);
  }

  @Get()
  @ApiBadRequestResponse()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns OK when successful',
    type: FetchDictionaryResponse,
    isArray: true,
  })
  async findAll(): Promise<FetchDictionaryResponse[]> {
    return this.dictionaryService.findAll();
  }

  @Get(':uuid')
  @ApiBadRequestResponse()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns OK when successful', type: FetchDictionaryResponse })
  async findOne(@Param() param: FetchDictionaryRequestParam): Promise<FetchDictionaryResponse> {
    return this.dictionaryService.findOne(param.uuid);
  }

  @ApiProtected()
  @Patch(':uuid')
  @ApiBadRequestResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'Returns NO_CONTENT when successful' })
  async update(
    @Param() param: UpdateDictionaryRequestParam,
    @Body() requestBody: UpdateDictionaryRequestBody,
  ): Promise<void> {
    await this.dictionaryService.update(param.uuid, requestBody);

    return void 0;
  }

  @ApiProtected()
  @Delete(':uuid')
  @ApiBadRequestResponse()
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiAcceptedResponse({ description: 'Returns ACCEPTED when successful' })
  async remove(@Param() param: DeleteDictionaryRequestParam): Promise<void> {
    await this.dictionaryService.remove(param.uuid);

    return void 0;
  }
}
