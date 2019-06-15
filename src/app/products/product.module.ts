import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {ListProductEffects} from '../store/effects/list-product.effects';
import {ProductEffects} from '../store/effects/product.effects';
import * as fromProduct from '../store/reducers';
import {ProductService} from '../products/services/product.service';
import { Routes, RouterModule } from '@angular/router';
import { ProductRoutingModule} from './product-routing.module';
import {ListProductComponent} from './containers/list-product/list-product.component';
//zorrro modules
import { NzInputModule, NzSelectModule, NzDatePickerModule,NzButtonModule, NzGridModule,NzTableModule, NzSwitchModule, NzModalModule } from 'ng-zorro-antd';



@NgModule({
  declarations: [ListProductComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ProductRoutingModule,
    StoreModule.forFeature('product', fromProduct.reducers),
    EffectsModule.forFeature([
      ListProductEffects,
      ProductEffects
    ]),
    FormsModule,
    NzInputModule,
    NzSelectModule,
    NzDatePickerModule,
    NzButtonModule,
    NzGridModule,
    NzTableModule,
    NzSwitchModule,
    NzModalModule
  ],
  providers:[ProductService]
})
export class ProductModule { }
