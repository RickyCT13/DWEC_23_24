import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../firestore.service';
import { Product } from 'src/app/product';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  productList: any = [
    {
      id: '',
      data: {} as Product,
    },
  ];

  constructor(
    private firestoreService: FirestoreService
  ) { }

  ngOnInit(): void {
    
  }

  getProductList() {
    this.firestoreService
    .getAll('Products')
    .subscribe((result) => {
      this.productList = [];
      result.forEach((data: any) => {
        this.productList.push(
          {
            id: data.payload.doc.id,
            data: data.payload.doc.data(),
          }
        );
      });
    });
  }

}
