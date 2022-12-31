import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import toStream from 'buffer-to-stream';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';

/**
 * @deprecated
 */
@Injectable()
export class CloudinaryService {
  constructor(private config: ConfigService) {
    cloudinary.config({
      cloud_name: this.config.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.config.get('CLOUDINARY_API_KEY'),
      api_secret: this.config.get('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream((error, result) => {
        if (error) reject(error);

        resolve(result);
      });

      toStream(file.buffer).pipe(upload);
    });
  }
}
