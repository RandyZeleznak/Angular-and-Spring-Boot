import { Component, OnInit } from '@angular/core';
import { SalesPerson } from './sales-person';

@Component({
  selector: 'app-sales-person-list',
  templateUrl: './sales-person-list-bootstrap.component.html',
  styleUrls: ['./sales-person-list.component.css'],
})
export class SalesPersonListComponent implements OnInit {
  // create an array of objects
  salesPersonList: SalesPerson[] = [
    new SalesPerson('Joe', 'Bonamassa', 'joe.bonamassa@gmail.com', 2500),
    new SalesPerson('Eric', 'Johnson', 'eric.johnson@gmail.com', 3000),
    new SalesPerson('Rik', 'Emmett', 'rik.emmett@gmail.com', 1500),
    new SalesPerson('Steve', 'Morse', 'steve.morse@gmail.com', 4000),
  ];

  constructor() {}

  ngOnInit(): void {}
}
