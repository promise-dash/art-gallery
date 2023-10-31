import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  wishlistedItems: Array<any> = [];
  
  constructor(){}

  ngOnInit(): void{
    const storage = localStorage.getItem('wishlistedItems');
    this.wishlistedItems = storage ? JSON.parse(storage) : [];
    console.log(this.wishlistedItems);
  }

  removeFromWishList(art: any){
    let remainingItems = this.wishlistedItems.filter((item: any) => item !== art);
    console.log(remainingItems);
    localStorage.setItem('wishlistedItems', JSON.stringify(remainingItems));
    this.wishlistedItems = remainingItems;
  }
}
