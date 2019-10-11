import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './components/form.component';
import { WelcomeComponent } from './components/welcome.component';
import { ConfirmComponent } from './components/confirm.component';

const ROUTES: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'transact', component: FormComponent },
  { path: 'confirm', component: ConfirmComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
