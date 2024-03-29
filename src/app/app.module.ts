import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { RouterModule} from '@angular/router';
import { ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './auth/home/home.component';
import { NavigationComponent } from './auth/navigation/navigation.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from './auth/auth.guard'
import { AuthinterceptorService } from './auth/authinterceptor.service';
import { AddComponent } from './product/add/add.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    LoginComponent,
    AddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:"product", loadChildren:"../app/product/products/products.module#ProductsModule"},
      {path:"add", component: AddComponent},
      {path:"home", component: HomeComponent},
      {path:"login", component: LoginComponent},
      {path:"", redirectTo:"home", pathMatch:"full"},
      {path:"**", redirectTo:"home"},
    ])
  ],
  providers: [AuthService, CookieService, AuthGuard,{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthinterceptorService,
    multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
