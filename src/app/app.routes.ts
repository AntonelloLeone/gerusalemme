import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { AppComponent } from './app.component';
import { MainComponent } from './shared/components/main/main.component';
import { MostraTableComponent } from './shared/components/showTable/showtable.component';
import { NgModule } from '@angular/core';

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
        }
      ]
  },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}