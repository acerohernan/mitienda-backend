import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateStoreSocialDTO {
  @ApiProperty()
  @IsOptional()
  facebook?: string | null;

  @ApiProperty()
  @IsOptional()
  instagram?: string | null;

  @ApiProperty()
  @IsOptional()
  pinterest?: string | null;

  @ApiProperty()
  @IsOptional()
  twitter?: string | null;

  @ApiProperty()
  @IsOptional()
  tiktok?: string | null;

  @ApiProperty()
  @IsOptional()
  youtube?: string | null;
}
