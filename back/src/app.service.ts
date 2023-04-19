import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async getCitiesList(): Promise<string> {
    const res = await this.httpService.axiosRef.get(
      'https://worldweather.wmo.int/ru/json/full_city_list.txt'
    );

    return Promise.resolve(res.data);
  }

  async getCityData(id): Promise<string> {
    try {
      const res = await this.httpService.axiosRef.get(
        `https://api.gismeteo.net/v2/weather/current/${id}/`,
        {
          headers: {
            'X-Gismeteo-Token': '56b30cb255.3443075',
          },
        },
      );

      console.log(res);

      return JSON.stringify({
        name: 'Москва',
        temperature: 16,
        windSpeed: 5,
        pressure: 752,
      });
    } catch (e) {
      return JSON.stringify({
        name: '-',
        temperature: '-',
        windSpeed: '-',
        pressure: '-',
      });
    }
  }
}
