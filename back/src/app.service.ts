import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

class Coords {
  lat: number;
  lon: number;

  constructor(strVal: string) {
    const strSplitted = strVal.split(' ');

    this.lon = parseInt(strSplitted[0]);
    this.lat = parseInt(strSplitted[1]);
  }
}

interface Weather {
  name: string;
  temperature: number;
  windSpeed: number;
  pressure: number;
  clouds: number;
  rain: number;
  snow: number;
}

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async getCitiesList(): Promise<string> {
    const res = await this.httpService.axiosRef.get(
      'https://worldweather.wmo.int/ru/json/full_city_list.txt'
    );

    return Promise.resolve(res.data);
  }

  async getCityCoords(name: string): Promise<Coords> {
    const reqName = name.replace(' ', '+');
    const key = process.env.YA_API_KEY;

    const { data } = await this.httpService.axiosRef.get(
      `https://geocode-maps.yandex.ru/1.x?apikey=${key}&geocode=${reqName}&format=json`,
    );

    const posStr =
      data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos;

    return Promise.resolve(new Coords(posStr));
  }

  async getCityWeather(pos: Coords): Promise<Weather> {
    const key = process.env.OPEN_API_KEY;

    const { data } = await this.httpService.axiosRef.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${pos.lat}&lon=${pos.lon}&appid=${key}`,
    );

    // Converting temperature to celsius.
    const tCelsius: number = Math.round(data.main.temp - 273.15);

    const rain: number = data.rain ? data.rain['1h'] : 0;
    const snow: number = data.snow ? data.snow['1h'] : 0;

    return Promise.resolve({
      name: '',
      temperature: tCelsius,
      windSpeed: data.wind.speed,
      pressure: data.main.pressure,
      clouds: data.clouds.all,
      rain,
      snow,
    });
  }

  async getCityData(name: string): Promise<string> {
    // 1. Getting city geolocation.
    const pos: Coords = await this.getCityCoords(name);

    // 2. Getting city weather, based on city geolocation.
    const weather: Weather = await this.getCityWeather(pos);
    weather.name = name;

    return Promise.resolve(JSON.stringify(weather));
  }
}
