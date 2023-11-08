import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FetchDictionaryResponse } from '../dictionary/response/fetch-dictionary.response';
import { DictionaryService } from '../dictionary/dictionary.service';
import { SearchDictionaryRequestParam } from './request/search-dictionary.request';
import { ApiBadRequestResponse } from '/common/decorators/open-api-bad-request.decorator';

@ApiTags('Search')
@Controller('search')
export class SearchController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @Get()
  @ApiBadRequestResponse()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns OK when successful',
    type: FetchDictionaryResponse,
    isArray: true,
  })
  async searchByKeyword(@Query() query: SearchDictionaryRequestParam): Promise<FetchDictionaryResponse[]> {
    const records = await this.dictionaryService.searchByKeyword(query.keyword, query.language);

    return FetchDictionaryResponse.from(records);
  }
}
