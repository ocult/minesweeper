import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CampDefinitionComponent } from './camp-definition/camp-definition.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppComponent,
    CampDefinitionComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
