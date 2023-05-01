import { TProduct } from './product';

type TFavoriteItem = Pick<TProduct, 'id' | 'title' | 'image' | 'category'>;
