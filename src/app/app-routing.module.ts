import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CampDefinitionComponent } from './camp-definition/camp-definition.component';
import { CampComponent } from './camp/camp.component';

export const routes: Routes = [
  { path: '', redirectTo: 'def', pathMatch: 'full' },
  { path: 'def', component: CampDefinitionComponent },
  { path: 'camp', component: CampComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
