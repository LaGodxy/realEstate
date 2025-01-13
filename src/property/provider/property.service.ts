import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from '../property.entity';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { PaginationDto } from '../dto/pagination.dto';
import { DEFAULT_PAGE_SIZE } from 'src/utils/constants';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
  ) {}

  public async create(createPropertyDto: CreatePropertyDto) {
    const newProperty = this.propertyRepository.create(createPropertyDto);
    return this.propertyRepository.save(newProperty);
  }

  public async findAll(paginationDto: PaginationDto) {
    return await this.propertyRepository.find({
      skip:paginationDto.skip,
      take: paginationDto.limit ?? DEFAULT_PAGE_SIZE
    });
  }

  public async findOne(id: number) {
    const property = await this.propertyRepository.findOne({ where: { id } });
    if (!property) {
      throw new NotFoundException(`Property with ID "${id}" not found`);
    }
    return property;
  }

  public async update(id: number, updatePropertyDto: UpdatePropertyDto) {
    const property = await this.findOne(id);
    const updatedProperty = this.propertyRepository.merge(property, updatePropertyDto);
    return this.propertyRepository.save(updatedProperty);
  }

  public async delete(id: number): Promise<void> {
    const result = await this.propertyRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Property with ID "${id}" not found`);
    }
  }
}

