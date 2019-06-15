import { Action } from '@ngrx/store';
import { ProductListActions,ProductApiAction } from '../actions';
import * as models from '../../models/product';


export interface State {
    loading: boolean;
    ids: number[];
    count: number;
    list: {
        [k: string]: {
            count: number;
            ids: number[];
        }
    }
}

export const initialState: State = {
    loading: false,
    ids: [],
    count: 0,
    list: {}
};

export function reducer(
    state = initialState,
    action:
        | ProductListActions.ProductListActionsUnion
        | ProductApiAction.ProductsApiActionsUnion
): State {
    switch (action.type) {
        case ProductListActions.listProducts.type:
            return {
                ...state,
                loading: true,
            };

        case ProductListActions.listProductsSuccess.type:
            console.log(action.products);
            return {
                ...state,
                loading: false,
                ids: action.products.map(product => product.id),
                count: action.count,

            };
        case ProductApiAction.deleteProductSuccess.type:
            return {
                ...state,
                loading: false,
                ids: deleteIdSlect(state.ids, action.product.id),
            }

        default:
            return state;
    }
}

function deleteIdSlect(ids, id) {
    const index = ids.findIndex(x => x == id);
    index > -1 ? ids.splice(index, 1) : {};
    return ids
  }

export const getLoading = (state: State) => state.loading;

export const getIds = (state: State) => state.ids;

export const getCount = (state: State) => state.count;