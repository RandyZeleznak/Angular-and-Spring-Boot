import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[];
  currentCategoryId: number;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
    this.listProducts();
  });  
  }

  listProducts() {

    // check to see if the 'id' parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId){
      //get 'id' string and convert to number
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    } else{
      //set catergoryId to default of '1'
      this.currentCategoryId = 1;
    }

  // Now get products for captured 'id'
    this.productService.getProductList(this.currentCategoryId).subscribe((data) => {
      this.products = data;
    });
  }
}
