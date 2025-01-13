import { Controller, Get, Post, Delete, Body, Param, NotFoundException, Patch, Query } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { IdParamDto } from './dto/idParam.dto';
import { PropertyService } from './provider/property.service';
import { PaginationDto } from './dto/pagination.dto';

@Controller('properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  async create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertyService.create(createPropertyDto);
  }

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.propertyService.findAll(paginationDto);
  }

  @Get(':id')
  async findOne(@Param() params: IdParamDto) {
    return this.propertyService.findOne(+params.id);
  }

  @Patch(':id')
  async update(@Param() params: IdParamDto, @Body() updatePropertyDto: UpdatePropertyDto) {
    return this.propertyService.update(+params.id, updatePropertyDto);
  }

  @Delete(':id')
  async delete(@Param() params: IdParamDto) {
    await this.propertyService.delete(+params.id);
    return { message: 'Property deleted successfully' };
  }
}

