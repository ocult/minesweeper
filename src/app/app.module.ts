import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefinitionComponent } from './definition/definition.component';
import { PlayComponent } from './play/play.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppComponent,
    DefinitionComponent,
    PlayComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
