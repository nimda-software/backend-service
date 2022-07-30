import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TranslateService } from './translate.service';
import { CreateTranslateRequest } from './request/create-translate.request';
import { UpdateTranslateRequest } from './request/update-translate.request';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Translate')
@Controller('translate')
export class TranslateController {
  constructor(private readonly translateService: TranslateService) {}

  @Post()
  create(@Body() createTranslateDto: CreateTranslateRequest) {
    return this.translateService.create(createTranslateDto);
  }

  @Get()
  findAll() {
    return this.translateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.translateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTranslateDto: UpdateTranslateRequest) {
    return this.translateService.update(+id, updateTranslateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.translateService.remove(+id);
  }
}
