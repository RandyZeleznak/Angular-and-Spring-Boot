import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { Routes, RouterModule } from '@angular/router';

const routes = [
  {path:'category/id', component: ProductListComponent },
  {path:'category', component: ProductListComponent },
  {path:'products', component: ProductListComponent },
  {path:'', redirectTo: '/products', pathMatch: 'full' },
  {path:'**', reDirectTo: '/products', pathMatch: 'full' }
];

@NgModule({
  declarations: [AppComponent, ProductListComponent],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule, 
    HttpClientModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent],
})
export class AppModule {}