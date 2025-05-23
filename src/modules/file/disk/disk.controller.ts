import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { BaseController } from '@modules/common/base/admin.controller';

import { AuthGuard } from '@modules/auth/guard/auth.guard';
import { Response } from 'express';
import { join } from 'path';

import { messages } from 'src/messages/messages';
import { DiskService } from '@modules/file/disk/disk.service';

@Controller('disk')
export class DiskController extends BaseController {
  constructor(private readonly diskService: DiskService) {
    super();
  }

  @UseGuards(AuthGuard)
  @Get('create')
  async createDisk(@Res() res: Response) {
    try {
      const filePath = join(process.cwd(), 'uploads');
      const response = await this.diskService.diskCreate(filePath);
      this.createdResponse(res, messages.successCreateDisk, response);
    } catch (error) {
      this.badRequestResponse(res, error?.message, error?.error);
    }
  }
}
