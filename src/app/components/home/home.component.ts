import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  artworks: Array<any> = []; 

  currentPage = 1;
  pageSize = 0;
  total = 0;
  totalPages = Math.ceil(10267 / this.pageSize);
  pages = this.generatePageNumbers();

  searchValue = '';

  constructor(private api: ApiService){}

  ngOnInit(): void {
    this.getData();
    this.api.searchedSubject.subscribe((response) => {
      if(response === ''){
        this.getData();
      }
      else{
        this.api.fetchArtworkBySearchTerm(response).subscribe((res: any) => {
          this.artworks = res.data;
        });
      }
    })
  }

  getData(): void{
    this.api.fetchArtworks(this.currentPage).subscribe((response: any) => {
      this.pageSize = response.limit;
      this.total = response.pagination.total;
      this.totalPages = response.pagination.total_pages;
      this.artworks = response?.data;

      console.log(response);
      this.api.searchedArtworks = this.artworks;
    });
  }

  generatePageNumbers(): number[] {
    const maxPages = 10;
    const middlePage = this.currentPage;
    let startPage = Math.max(1, middlePage - Math.floor(maxPages / 2));
    let endPage = Math.min(this.totalPages, startPage + maxPages - 1);
  
    if (endPage - startPage < maxPages - 1) {
      startPage = Math.max(1, endPage - maxPages + 1);
    }
  
    let pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      console.log(`Navigating to page ${this.currentPage}`);
      this.getData();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      console.log(`Navigating to page ${this.currentPage}`);
      this.getData();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      console.log(`Navigating to page ${this.currentPage}`);
      this.getData();
    }
  }
}   
