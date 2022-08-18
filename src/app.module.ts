import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService, ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { Favorite, FavoriteSchema } from './entities/favorite.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      cache: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
          uri: configService.get<string>("MONGO_URI")
      }),
      inject: [ConfigService]
    }),
    MongooseModule.forFeature([{ name: Favorite.name, schema: FavoriteSchema }])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
