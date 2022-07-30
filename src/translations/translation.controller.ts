import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TranslationService } from './translation.service';
import { CreateTranslationRequest } from './request/create-translation.request';
import { UpdateTranslationRequest } from './request/update-translation.request';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Translation')
@Controller('translation')
export class TranslationController {
  constructor(private readonly translateService: TranslationService) {}

  @Post()
  create(@Body() createTranslateDto: CreateTranslationRequest) {
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
  update(@Param('id') id: string, @Body() updateTranslateDto: UpdateTranslationRequest) {
    return this.translateService.update(+id, updateTranslateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.translateService.remove(+id);
  }
}
