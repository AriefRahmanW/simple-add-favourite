import { Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import axios from 'axios';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getBookList(
    @Query('q') q: string,
  ): Promise<any> {
    return this.appService.getBookList(q)
  }

  @Post()
  async addFavorite(
    @Query('id') id: string,
  ): Promise<any> {
    return this.appService.addFavorite(id)
  }
}
