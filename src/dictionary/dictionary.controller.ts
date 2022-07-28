import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { CreateDictionaryRequest } from './request/create-dictionary.request';
import { UpdateDictionaryRequest } from './request/update-dictionary.request';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Dictionary')
@Controller('dictionary')
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @Post()
  create(@Body() createDictionaryDto: CreateDictionaryRequest) {
    return this.dictionaryService.create(createDictionaryDto);
  }

  @Get()
  findAll() {
    return this.dictionaryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dictionaryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDictionaryDto: UpdateDictionaryRequest) {
    return this.dictionaryService.update(+id, updateDictionaryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dictionaryService.remove(+id);
  }
}
