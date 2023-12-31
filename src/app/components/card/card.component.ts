import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() art: any;
  currentRoute: any = '';

  constructor(private activeRoute: ActivatedRoute){}

  ngOnInit(): void{
    this.currentRoute = this.activeRoute.snapshot.routeConfig?.path;
    console.log(this.currentRoute);
  }

  addItemToWishlist(art: any): void{
    let wishlistedItems = JSON.parse(localStorage.getItem('wishlistedItems') || '[]');

    for (let i = 0; i < wishlistedItems.length; i++) {
      if (wishlistedItems[i].id === art.id) {
        alert("This artwork is already in your wishlist.");
        return;
      }
    }
    
    wishlistedItems.push(art);
    localStorage.setItem('wishlistedItems', JSON.stringify(wishlistedItems));
    alert('Artwork added to wishlist');
  }
}
