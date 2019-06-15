import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { ProductListActions, ProductApiAction } from 'src/app/store/actions';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { map, mergeMap, catchError, tap, switchMap, withLatestFrom } from 'rxjs/operators';
import { ProductService } from 'src/app/products/services/product.service';
import { NzMessageService } from 'ng-zorro-antd';




@Injectable()
export class ProductEffects {
    @Effect()
    deleteProduct$: Observable<Action> = this.actions$.pipe(
        ofType(ProductApiAction.deleteProduct.type),
        mergeMap(action => {
            return this.productservice.destroy(action.shopProductId).pipe(
                switchMap(product => [
                    ProductApiAction.deleteProductSuccess({ product }),
                ]),
                catchError(err =>
                    of(ProductApiAction.deleteProductFailure({ error: err }))
                )
            )
        })
    );

    @Effect({dispatch: false})
    deleteProductSuccess$ = this.actions$.pipe(
        ofType(ProductApiAction.deleteProductSuccess.type),
        map(action => action.product),
        tap(product => {
            this.message.create('info', `Đã xóa sản phẩm: "${product.name}"`);
        })
    )


    constructor(
        private actions$: Actions<ProductApiAction.ProductsApiActionsUnion>,
        private productservice: ProductService,
        private message: NzMessageService){ }
}


