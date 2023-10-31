import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {

  id: number;
  details: any;

  constructor(private activatedRoute: ActivatedRoute, private api: ApiService){}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.api.fetchArtworkById(this.id).subscribe((response: any) => {
      this.details = response?.data;
    })
  }

  addItemToWishlist(art: any): void{
    let wishlistedItems = JSON.parse(localStorage.getItem('wishlistedItems') || '[]');
    wishlistedItems.push(art);
    localStorage.setItem('wishlistedItems', JSON.stringify(wishlistedItems));
  }

}
