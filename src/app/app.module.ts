import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './service/auth/auth.service';
import { ChangePassService } from './service/changePassword/change-pass.service';
import { RegisterService } from './service/register/register.service';
import { AddUserService } from './service/addUser/add-user.service';
import { LoginHistoryService } from './service/loginHis/login-history.service';
import { TransactionHisService } from './service/transactionHis/transaction-his.service';
import { UpdateHisService } from './service/updateHis/update-his.service';
import { LoginInforService } from './service/loginInformation/login-infor.service';
import { GetAllPersonService } from './service/getAllPerson/get-all-person.service';
import { UpdateUserService } from './service/updateUser/update-user.service';
import { PersonDetailsService } from './service/personDetails/person-details.service';
import { TransactionByIdService } from './service/transactionHistoryById/transaction-by-id.service';
import { DeleteUserService } from './service/deleteUser/delete-user.service';
import { RoleService } from './service/role/role.service';
import { CalculateService } from './service/calculate/calculate.service';
import { TransactionTestService } from './service/transactionTest/transaction-test.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TransactionTestComponent } from './transaction-test/transaction-test.component';
import { CurrencyPipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ChangePasswordComponent,
    HomeComponent,
    AddPersonComponent,
    GetAllPersonComponent,
    LoginHistoryComponent,
    LoginInforComponent,
    PersonDetailComponent,
    CalculateMoney1Component,
    RoleComponent,
    CalculateMoney2Component,
    TransactionHistoryByIdComponent,
    TransactionHistoryComponent,
    UpdateHistoryComponent,
    UpdatePersonComponent,
    CalculateComponent,
    TransactionTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [
    AuthService,
    ChangePassService,
    RegisterService,
    AddUserService,
    LoginHistoryService,
    TransactionHisService,
    UpdateHisService,
    LoginInforService,
    GetAllPersonService,
    UpdateUserService,
    PersonDetailsService,
    TransactionByIdService,
    DeleteUserService,
    RoleService,
    CalculateService,
    TransactionTestService,
    CurrencyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
