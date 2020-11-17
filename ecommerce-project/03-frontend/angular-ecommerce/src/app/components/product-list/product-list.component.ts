import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[];
  currentCategoryId: number;
  currentCategoryName: string;
  searchMode: boolean;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
    this.listProducts();
  });  
  }

  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode){
      this.handleSearchProducts();
    }else{
      this.handleListProducts();
    }
  }

  handleSearchProducts(){

    const theKeyword: string = this.route.snapshot.paramMap.get('keyword');

    // Now search for products containing the given keyword
    this.productService.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data;
      }
    )
  }

  handleListProducts(){
// check to see if the 'id' parameter is available
const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    

if(hasCategoryId){
  //get 'id' string and convert to number
  this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
  //get Category Name for string
  this.currentCategoryName = this.route.snapshot.paramMap.get('name');
} else{
  //set catergoryId to default of '1'
  this.currentCategoryId = 1;
  this.currentCategoryName = "Books";
}

// Now get products for captured 'id'
this.productService.getProductList(this.currentCategoryId).subscribe(
  data => {
  this.products = data;
  }
)
  }
}
