import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = "https://api.artic.edu/api/v1";

  searchedSubject = new Subject<string>();

  // wishlistedItems: Array<number> = [];

  searchedArtworks: Array<any> = [];

  constructor(private http: HttpClient) {}

  fetchArtworks(currentPage: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/artworks?page=${currentPage}`);
  }

  fetchArtworkById(id: number){
    return this.http.get<any[]>(`${this.baseUrl}/artworks/${id}`); 
  }

  fetchArtworkBySearchTerm(input: string){
    return this.http.get<any[]>(`https://api.artic.edu/api/v1/artworks/search?q=${input}&fields=image_id,title,id`);
  }

  emitMyValue(str: string){
    console.log(str);
    this.searchedSubject.next(str);
  }
}
