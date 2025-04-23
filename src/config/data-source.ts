import { registerAs } from '@nestjs/config';
import { subscribe } from 'diagnostics_channel';
import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config({path:'.env.development'}); // Asegura que se carguen las variables antes de usarlas

const typeOrmConfig = {
    type: 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    synchronize: true,
    autoLoadEntities: false,
    logging: false,
    Logger: 'advanced-console',
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
    subscribers: [],
    ssl: false,
    dropShema:true
};

export default registerAs('postgres', ()=> typeOrmConfig);

export const connectionSource = new DataSource(typeOrmConfig as DataSourceOptions)