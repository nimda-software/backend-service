import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FetchDictionaryResponse } from '../dictionary/response/fetch-dictionary.response';
import { DictionaryService } from '../dictionary/dictionary.service';
import { SearchDictionaryRequestParam } from './request/search-dictionary.request';
import { ApiBadRequestResponse } from '/common/decorators/open-api-bad-request.decorator';

@ApiTags('Search')
@Controller('search')
export class SearchController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @Get('search/by/:keyword/:language')
  @ApiBadRequestResponse()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns OK when successful',
    type: FetchDictionaryResponse,
    isArray: true,
  })
  async searchByKeyword(@Param() param: SearchDictionaryRequestParam): Promise<FetchDictionaryResponse[]> {
    const records = await this.dictionaryService.searchByKeyword(param.keyword, param.language);

    return FetchDictionaryResponse.from(records);
  }
}
