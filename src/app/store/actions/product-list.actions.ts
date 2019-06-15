
import { createAction, props, union } from '@ngrx/store';

import { Product } from '../../models/product';


export const listProducts = createAction(
  '[List Product Page] List Products',
  props<{
    shop_Id:number;
    query:any;
  }>()
);

export const listProductsSuccess = createAction(
  '[List Product Page] List Products Success',
  props<{
    products: Product[];
    count: number;
  }>()
);

export const listProductsFailure = createAction(
  '[List Product Page] List Products Failure',
  props<{ error: string; }>()
);

const all = union({
  listProducts,
  listProductsSuccess,
  listProductsFailure
});

export type ProductListActionsUnion = typeof all;
