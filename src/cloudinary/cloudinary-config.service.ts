import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


export interface CloudinaryConfig {
    cloudName: string;
    apiKey: string;
    apiSecret: string;
}

@Injectable()
export class CloudinaryConfigService {
    constructor(
        private readonly configService: ConfigService
    ) {}

    get config(): CloudinaryConfig {
        const cfg = this.configService.get<CloudinaryConfig>('cloudinary');
        if (!cfg.cloudName || !cfg.apiKey || !cfg.apiSecret) {
            throw new Error('Faltan variables de entorno de Cloudinary');
        }
        return cfg;
    }
}
