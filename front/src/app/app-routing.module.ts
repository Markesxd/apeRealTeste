import { DadosComponent } from './pages/dados/dados.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MunicipioComponent } from './pages/municipio/municipio.component';

const routes: Routes = [
  {path: '', component: DadosComponent},
  {path: 'municipio', component: MunicipioComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
