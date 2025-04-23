import { Module } from '@nestjs/common';
import { CloudinaryConfigService } from './cloudinary-config.service';
import { v2 as cloudinary} from 'cloudinary'

@Module({
  providers: [CloudinaryConfigService,
    {
      provide: 'CLOUDINARY',
      useFactory: (cfg: CloudinaryConfigService) => {
        const { cloudName, apiKey, apiSecret } = cfg.config;
        cloudinary.config({cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret});
        return cloudinary;       
      },
      inject: [CloudinaryConfigService],
    },
  ],
  exports: ['CLOUDINARY']
})
export class CloudinaryModule {}
