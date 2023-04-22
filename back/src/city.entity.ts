import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  temperature: number;

  @Column()
  windspeed: number;

  @Column()
  pressure: number;

  @Column()
  clouds: number;

  @Column()
  rain: number;

  @Column()
  snow: number;
}
