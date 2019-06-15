import { createAction, props, union } from '@ngrx/store';
import {Product} from '../../models/product';



export const loadProduct = createAction(
    '[Product] Load Product',
    props<{product: Product;}>()
);

const all = union({
    loadProduct,
});

export type ProductActionsUnion = typeof all;
