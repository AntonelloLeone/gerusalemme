import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { AppComponent } from './app.component';
import { MainComponent } from './shared/components/main/main.component';
import { MostraTableComponent } from './shared/components/showTable/showtable.component';
import { NgModule } from '@angular/core';
import { UserDetailComponent } from './shared/components/user-detail-component/user-detail-component.component';
import { DynamicComponentLoaderComponent } from './shared/components/dynamic-component-loader/dynamic-component-loader.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: ``,
    component: LoginComponent,
    title: 'Login Page',
  
  },
  {
    path: `main`,
    component: MainComponent,
    title: 'Main Page',
    children: [
        // {
        //   path: 'add/:tableName',
        //   component: AddformComponent,
        //   outlet: 'secondColumn'
        // },
        {
          path: 'table/:tableName',
          component: MostraTableComponent,
          outlet: 'secondColumn'
        },
        {
          path: 'details/:componentName/:id',
          component: DynamicComponentLoaderComponent,
          outlet: 'secondColumn'
        }
      ]
  },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}