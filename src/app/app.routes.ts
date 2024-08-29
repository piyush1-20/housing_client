import { RouterModule, Routes } from '@angular/router';
import { BuyComponent } from './buy/buy.component';
import { SellComponent } from './sell/sell.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ErrorComponent } from './error/error.component';
import { NgModule } from '@angular/core';
import { PropertyListComponent } from './property/property-list/property-list.component';
import { PropertyDetailComponent } from './property/property-detail/property-detail.component';
import { AddPropertyComponent } from './property/add-property/add-property.component';
import { PropertyDetailResolver } from './property/property-detail/property-detail-resolver.service';
export const routes: Routes = [{
        path:'',
        component: PropertyListComponent
    },{
    path:'buy',
    component: BuyComponent
},{
    path:'rent',
    component: PropertyListComponent
},{
    path:'login',
    component: LoginComponent
},{
    path:'add-property',
    component: AddPropertyComponent
},{
    path:'register',
    component: RegisterComponent
},{
    path:"property/:id",
    component: PropertyDetailComponent,
    resolve:{property:PropertyDetailResolver}
},{
    path:'**',
    component: ErrorComponent
}];


