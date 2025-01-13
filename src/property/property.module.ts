import { Module } from '@nestjs/common';
import { PropertyService } from './provider/property.service';
import { PropertyController } from './property.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './property.entity';
import { PropertyFeature } from './propertyFeature.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Property, PropertyFeature])],
  controllers: [PropertyController],
  providers: [PropertyService],
})
export class PropertyModule {}
