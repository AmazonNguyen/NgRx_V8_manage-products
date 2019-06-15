import { Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ProductListActions, ProductActions, ProductApiAction} from '../actions';
import * as models from '../../models/product';


export interface State extends EntityState<models.Product> {
    selectedId: string | null;
}

export const adapter: EntityAdapter<models.Product> = createEntityAdapter<models.Product>({
    selectId: product => product.id,
    sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
    selectedId: null,
});

export function reducer(
    state = initialState,
    action:
        | ProductListActions.ProductListActionsUnion
        | ProductActions.ProductActionsUnion
        | ProductApiAction.ProductsApiActionsUnion
): State {
    switch (action.type) {
        case ProductListActions.listProductsSuccess.type:
            console.log(action.products);
            return adapter.upsertMany(action.products, state);

        case ProductActions.loadProduct.type:
            return adapter.addOne(action.product, state);

        case ProductApiAction.deleteProductSuccess.type:
        return adapter.removeOne(action.product.id, state)

        default:
            return state;
    }
}

export const getSelectedId = (state: State) => state.selectedId;
