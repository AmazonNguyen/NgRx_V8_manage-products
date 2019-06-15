import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { ProductListActions } from 'src/app/store/actions';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { ProductService } from 'src/app/products/services/product.service';


@Injectable()
export class ListProductEffects {
    action: any;
    @Effect()
    listProducts$: Observable<Action> = this.actions$.pipe(
        ofType(ProductListActions.listProducts.type),
        mergeMap(action => {
            this.action = action;
            return this.productservice.list(action.shop_Id, action.query).pipe(
                switchMap(res => {
                    return [({ res, query:action.query })];
                })
            );
        }),
        map(({ res }) => {
            console.log(res);
            return ProductListActions.listProductsSuccess({
                products: res.rows,
                count: res.count,
            })
        }),
        catchError(err =>
            of(ProductListActions.listProductsFailure({ error: err }))
        )
    );


    constructor(
        private actions$: Actions<ProductListActions.ProductListActionsUnion>,
        private productservice: ProductService) { }
}

// Items is undefined when the view is bound - before the service returns. Initialize items to an empty array. Or use an Observable wrapper and the async operator in your template.