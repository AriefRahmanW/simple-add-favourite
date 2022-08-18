import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Favorite, FavoriteDocument } from './entities/favorite.entity';
import { Model } from 'mongoose';

let formattedResponse: Favorite[] = []

@Injectable()
export class AppService {

  constructor(
    @InjectModel(Favorite.name) private favoriteModel: Model<FavoriteDocument>
  ){}

  async getBookList(q: string): Promise<any> {
    const { data, status }= await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${q}`)
    
    formattedResponse = data.items.map((item: any) => {
      return {
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors,
        averageRating: item.volumeInfo.averageRating,
        thumbnail: item.volumeInfo.imageLinks.thumbnail,
      }
    });

    return formattedResponse
  }

  async addFavorite(id: string): Promise<any> {
    const favorite = formattedResponse.filter((item: Favorite) => {
      return item.id === id
    })
    await this.favoriteModel.create(favorite)
    return favorite
  }
}
