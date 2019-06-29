import { Component, OnInit } from '@angular/core';
import { ProductsService} from '../product/products.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers : [ProductsService]
})
export class ProductComponent implements OnInit {
  pageTitle : string = "Products - List";
  products : any = [];
  filterBy : string;

  showHideImg : boolean = true;

  constructor(private _productService : ProductsService) { }

  ngOnInit() {
    this._productService.getProducts().subscribe((data) => {
      this.products = data;
    });

  } 

  toggleImage():void {
    this.showHideImg = !this.showHideImg;
  }

  ratingFnParent(data : string){
    this.pageTitle = data;
  }


}
