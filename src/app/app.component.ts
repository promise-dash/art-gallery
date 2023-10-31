import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms"
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'artwork';

  searchForm: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService){
    this.searchForm = this.fb.group({
      searchTerm: ''
    });

    this.searchForm.valueChanges.subscribe(value => {
      this.api.emitMyValue(value.searchTerm);
    });
  }
}
