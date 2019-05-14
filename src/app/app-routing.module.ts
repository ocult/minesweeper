import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CampDefinitionComponent } from './camp-definition/camp-definition.component';

const routes: Routes = [
  { path: 'def', component: CampDefinitionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
