import { createAction, props, union } from '@ngrx/store';
import { Product } from '../../models/product';


export const deleteProduct = createAction(
    '[Product] Delete Product',
    props<{
        shopProductId: number;
    }>()
);

export const deleteProductSuccess = createAction(
    '[Product] Delete Product Success',
    props<{ product: Product; }>()
);

export const deleteProductFailure = createAction(
    '[Product] Delete Product Failure',
    props<{ error: string; }>()
);



const all = union({
    deleteProduct,
    deleteProductSuccess,
    deleteProductFailure
});

export type ProductsApiActionsUnion = typeof all;
