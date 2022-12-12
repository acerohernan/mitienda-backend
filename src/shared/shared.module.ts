import { Module } from '@nestjs/common';
import { CloudinaryService } from './services/cloudinary.service';
import { EmailService } from './services/email.service';

@Module({
  providers: [EmailService, CloudinaryService],
  exports: [EmailService, CloudinaryService],
})
export class SharedModule {}
