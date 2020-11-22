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
  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  currentCategoryName: string = '';
  searchMode: boolean = false;

  // properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;
  






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

// Check if we have a different category then previous
// If we have a different category id, then set page number to 1
if(this.previousCategoryId != this.currentCategoryId){
  this.thePageNumber = 1;
}

this.previousCategoryId = this.currentCategoryId;

console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);


// Now get products for captured 'id'
this.productService.getProductListPaginate   (this.thePageNumber - 1,
      this.thePageSize,
      this.currentCategoryId)
      .subscribe(this.processResult());
  }

  processResult(){
    return data => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }
  
  updatePageSize(pageSize: number){
      this.thePageSize = pageSize;
      this.thePageNumber = 1;
      this.listProducts;
  }

}
