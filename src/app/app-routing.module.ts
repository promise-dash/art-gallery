import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: "", component: HomeComponent, canActivate: [AuthGuard]},
  {path: "register", component: RegisterComponent},
  {path: "login", component: LoginComponent},
  {path: "artwork/:id", component: DetailsComponent, canActivate: [AuthGuard]},
  {path: "wishlist", component: WishlistComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
