import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { AxiosResponse } from 'axios';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('cities_list')
  async getCitiesList(): Promise<string> {
    return this.appService.getCitiesList();
  }

  @Get('city_data/:id')
  async getCityData(@Param('id') id): Promise<string> {
    console.log(id);
    return this.appService.getCityData(id);
  }
}
