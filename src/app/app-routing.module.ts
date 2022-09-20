import { OrdersComponent } from './orders/orders.component';
import { AuthGuard } from './auth.guard';
import { ProductComponent } from './product/product.component';
import { ShopComponent } from './shop/shop.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminBrandsComponent } from './admin-brands/admin-brands.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    component: ThankyouComponent,
    path:'thankyou',
    canActivate: [AuthGuard]
  },
  {
    component: HomeComponent,
    path:'home',
  },
  {
    component: LoginComponent,
    path:'login'
  },
  {
    component: OrdersComponent,
    path:'orders',
    canActivate: [AuthGuard]
    // [4] add canactivate method that i created in auth guard ,
    // if the user is logged in and has token it will return true so everything goes well
    // if the user isn't logged in and doesn't has token he will redirected to login page to login
    // so what if the user put a fake token in application to access the pages
    // we will create a service fo token and create interceptor to check the token , go to interceptor-token.service.ts
  },
  {
    component: SignupComponent,
    path:'signup'
  },
  {
    component: CheckoutComponent,
    path:'checkout',
    canActivate: [AuthGuard]
  },
  {
    component: HomeComponent,
    path:'search/:searchWord',
    canActivate: [AuthGuard]
  },
  {
    component: CartComponent,
    path:'cart',
    canActivate: [AuthGuard]
  },
  {
    component: AdminOrdersComponent,
    path:'adminOrders',
    canActivate: [AuthGuard]
  },
  {
    component: StatisticsComponent,
    path:'stats',
    canActivate: [AuthGuard]
  },
  {
    component: ShopComponent,
    path:'shop',
    canActivate: [AuthGuard]
  },
  {
    component: ProductComponent,
    path:'product/:id'
  },
  {
    component: ConfirmEmailComponent,
    path:'confirmEmail',
    canActivate: [AuthGuard]
  },
  {
    component:AdminDashboardComponent,
    path:"adminManageProduct",
    canActivate:[AuthGuard]
  },
  {
    component:AdminBrandsComponent,
    path:"adminBrand",
    canActivate:[AuthGuard]
  },
  {
    component:AdminUsersComponent,
    path:"adminUsers",
    canActivate:[AuthGuard]
  },
  
  {
    component:AdminCategoryComponent,
    path:"adminCategory",
    canActivate:[AuthGuard]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
