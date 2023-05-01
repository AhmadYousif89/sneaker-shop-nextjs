import { TProduct } from './product';

type THistoryItem = Pick<TProduct, 'id' | 'title' | 'image'>;
