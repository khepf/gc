import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './pages/landing/landing.component';
import { AboutComponent } from './pages/about/about.component';
import { CardsComponent } from './pages/cards/cards.component';
import { ContactComponent } from './pages/contact/contact.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { AddCardComponent } from './pages/addcard/addcard.component';
import { EditCardComponent } from './pages/editcard/editcard.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'about', component: AboutComponent },
  { path: 'cards', component: CardsComponent, canActivate: [AuthGuard] },
  { path: 'addcard', component: AddCardComponent, canActivate: [AuthGuard] },
  { path: 'editcard/:id', component: EditCardComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactComponent },
  // {path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
