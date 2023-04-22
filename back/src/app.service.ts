import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './city.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) {}

  async getCitiesList(): Promise<City[]> {
    const cityList = await this.cityRepository.find();

    return Promise.resolve(cityList);
  }

  async getCityData(name: string): Promise<City> {
    const city = await this.cityRepository.findOneBy({
      name,
    });

    return Promise.resolve(city);
  }
}
