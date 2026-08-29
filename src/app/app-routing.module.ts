import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefinitionComponent } from './definition/definition.component';
import { PlayComponent } from './play/play.component';

export const routes: Routes = [
  { path: '', redirectTo: 'definition', pathMatch: 'full' },
  { path: 'definition', component: DefinitionComponent },
  { path: 'play', component: PlayComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
