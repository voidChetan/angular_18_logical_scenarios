import { Routes } from '@angular/router';
import { ModalPopupComponent } from './pages/modal-popup/modal-popup.component';
import { ProductsComponent } from './machine_test/products/products.component';

export const routes: Routes = [
    {
        path:'moddal-popup',
        component: ModalPopupComponent
    },
    {
        path:'products',
        component: ProductsComponent
    }
];
