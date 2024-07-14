import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: (configService: ConfigService) => {
    cloudinary.config({
      cloud_name: configService.get('CLOUD_NAME'),
      api_key: configService.get('API_KEY'),
      api_secret: configService.get('API_SECRET'),
    });
    return cloudinary;
  },
  inject: [ConfigService],
};
