import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FavoriteDocument = Favorite & Document;

@Schema({
    collection: "favorite",
})
export class Favorite {
    @Prop({ required: true, unique: true })
    id: string;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    authors: [string];

    @Prop({ required: true })
    averageRating: number;

    @Prop({ required: true })
    thumbnail: string;
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);