import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListProductComponent } from './containers/list-product/list-product.component'


const routes: Routes = [{
  path: '',
  component: ListProductComponent,
  children: [
    {
      path: 'list-product',
      component: ListProductComponent
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }