import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MenuNavComponent } from './components/menu-nav/menu-nav.component';

import { environment } from '../environments/environment';

import { StoreEffects } from './store/store.effects';

import * as  fromState from '../app/store/store.reducers';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuNavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({ state: fromState.storeReducer}),
    EffectsModule.forRoot([StoreEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
