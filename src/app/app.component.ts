import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms"
import { ApiService } from './services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'artwork';

  searchForm: FormGroup;
  userlogStatus: Boolean;

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router){
    this.userlogStatus = api.isUserLoggedIn;
    this.searchForm = this.fb.group({
      searchTerm: ''
    });

    this.searchForm.valueChanges.subscribe(value => {
      this.api.emitMyValue(value.searchTerm);
    });
  }

  handleLogout(){
    localStorage.removeItem('user');
    this.api.isUserLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
