import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductListActions, ProductApiAction } from 'src/app/store/actions';
import * as fromProduct from 'src/app/store/reducers';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {
  selectedOS = null;
  pageIndex = 1;
  pageSize = 10;
  onValueChange(value: Date): void {
    console.log(`Current value: ${value}`);
  }

  onPanelChange(change: { date: Date; mode: string }): void {
    console.log(`Current value: ${change.date}`);
    console.log(`Current mode: ${change.mode}`);
  }

  isLoadingResults$ = this.store.select(fromProduct.getListProductLoading);
  resultsLength$ = this.store.select(fromProduct.getListProductCount);
  products$ = this.store.select(fromProduct.getListProductResults);
  products: any;
  getProducts() {
    this.products$ = this.store.select(fromProduct.getListProductResults);
  }

  constructor(
    private store: Store<fromProduct.ProductState>,
    private modalService: NzModalService
  ) { }

  ngOnInit() {
    this.loadData();
    this.getProducts();
  }

  loadData() {
    const query: any = {
      offset: (this.pageIndex - 1) * this.pageSize,
      limit: this.pageSize
    };

    this.store.dispatch(ProductListActions.listProducts({
      shop_Id:2,
      query,
    }));  
  }
  //Datepicker
  startValue: Date | null = null;
  endValue: Date | null = null;
  endOpen = false;

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() > this.endValue.getTime();
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
  };

  onStartChange(date: Date): void {
    this.startValue = date;
  }

  onEndChange(date: Date): void {
    this.endValue = date;
  }

  handleStartOpenChange(open: boolean): void {
    if (!open) {
      this.endOpen = true;
    }
  }

  handleEndOpenChange(open: boolean): void {
    console.log(open);
    this.endOpen = open;
  }
  //end datepicker
  // show and hide State
  switchValue = true;
  //delete and update modal 
  showConfirm(): void {
    this.modalService.confirm({
      nzTitle: '<i>Sửa thông tin sản phẩm?</i>',
      nzContent: '<b>Some descriptions</b>',
      nzOnOk: () => console.log('OK')
    });
  }

  showDeleteConfirm(id): void {
    this.modalService.confirm({
      nzTitle: 'Bạn có chắc muốn xóa sản phẩm này?',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.store.dispatch(ProductApiAction.deleteProduct(
          { shopProductId: id }
        ));
      },
      nzCancelText: 'No',
    });
  }


}
