import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromProducts from './products.reducer';
import * as fromProductList from './product-list.reducer';

export interface ProductState {
    products: fromProducts.State;
    listProduct: fromProductList.State;
}

export const reducers: ActionReducerMap<ProductState> = {
    products: fromProducts.reducer,
    listProduct: fromProductList.reducer,
}

export const getProductState = createFeatureSelector<ProductState>('product');

//product
export const getProductEntitiesState = createSelector(
    getProductState,
    state => state.products
)

export const getSelectedProductId = createSelector(
    getProductEntitiesState,
    fromProducts.getSelectedId
)

export const {
    selectIds: getProductIds,
    selectEntities: getProductEntities,
    selectAll: getAllProduct,
    selectTotal: getTotalProduct,
} = fromProducts.adapter.getSelectors(getProductEntitiesState);

export const getSelectedProduct = createSelector(
    getProductEntities,
    getSelectedProductId,
    (entities, selectedId) => {
        return selectedId && entities[selectedId];
    }
);

export const getListProductState = createSelector(
    getProductState,
    state => state.listProduct
);

export const getListProductLoading = createSelector(
    getListProductState,
    fromProductList.getLoading
);

export const getListProductIds = createSelector(
    getListProductState,
    fromProductList.getIds
);

export const getListProductCount = createSelector(
    getListProductState,
    fromProductList.getCount
);

export const getListProductResults = createSelector(
    getProductEntities,
    getListProductIds,
    (products, ids) => {
        return ids.map(id => products[id])
    }
);