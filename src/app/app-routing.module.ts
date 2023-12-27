import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HomeComponent } from './home/home.component';
import { AddPersonComponent } from './add-person/add-person.component';
import { GetAllPersonComponent } from './get-all-person/get-all-person.component';
import { LoginHistoryComponent } from './login-history/login-history.component';
import { LoginInforComponent } from './login-infor/login-infor.component';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import { CalculateMoney1Component } from './calculate-money1/calculate-money1.component';
import { RoleComponent } from './role/role.component';
import { CalculateMoney2Component } from './calculate-money2/calculate-money2.component';
import { TransactionHistoryByIdComponent } from './transaction-history-by-id/transaction-history-by-id.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { UpdateHistoryComponent } from './update-history/update-history.component';
import { UpdatePersonComponent } from './update-person/update-person.component';
import { CalculateComponent } from './calculate/calculate.component';
import { TransactionTestComponent } from './transaction-test/transaction-test.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'transaction-test', component: TransactionTestComponent },
  { path: 'calculate', component: CalculateComponent },
  { path: 'update-person/:id', component: UpdatePersonComponent },
  { path: 'update-history', component: UpdateHistoryComponent },
  { path: 'transaction-history', component: TransactionHistoryComponent },
  { path: 'TransactionHistoryById/:id', component: TransactionHistoryByIdComponent },
  { path: 'calculate2', component: CalculateMoney2Component },
  { path: 'role', component: RoleComponent },
  { path: 'calculate1', component: CalculateMoney1Component },
  { path: 'person-detail/:id', component: PersonDetailComponent },
  { path: 'login-infor', component: LoginInforComponent },
  { path: 'get-all-person', component: GetAllPersonComponent },
  { path: 'login-history', component: LoginHistoryComponent },
  { path: 'add-person', component: AddPersonComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
