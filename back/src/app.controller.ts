import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('cities_list')
  async getCitiesList(): Promise<string> {
    return this.appService.getCitiesList();
  }

  @Get('city_data/:name')
  async getCityData(@Param('name') name: string): Promise<string> {
    return this.appService.getCityData(name);
  }
}
