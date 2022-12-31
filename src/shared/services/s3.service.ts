import { PutObjectCommand, S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';

@Injectable()
export class S3Service {
  private bucket_name: string;
  private region: string;
  private client: S3Client;

  constructor(private config: ConfigService) {
    this.bucket_name = this.config.get('AWS_S3_BUCKET_NAME');
    this.region = this.config.get('AWS_REGION');
    const accessKeyId = this.config.get('AWS_ACCESS_KEY');
    const secretAccessKey = this.config.get('AWS_SECRET_ACCESS_KEY');

    //Initializing the client
    const clientOptions: S3ClientConfig = {
      region: this.region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    };

    this.client = new S3Client(clientOptions);
  }

  async uploadFileToS3(file: Express.Multer.File): Promise<{ url: string }> {
    const uniqueId = uuid();
    const extension = this.getFileExtension(file);
    const filename = `${uniqueId}.${extension}`;

    const command = new PutObjectCommand({
      Bucket: this.bucket_name,
      Key: filename,
      Body: file.buffer,
    });

    await this.client.send(command);
    const url = `https://${this.bucket_name}.s3.${this.region}.amazonaws.com/${filename}`;
    return { url };
  }

  private getFileExtension(file: Express.Multer.File): string {
    return `${file.mimetype.split('/')[1] || 'png'}`;
  }
}
