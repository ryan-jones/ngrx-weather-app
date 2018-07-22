import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgxEchartsModule } from 'ngx-echarts';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MenuNavComponent } from './components/menu-nav/menu-nav.component';
import { ChartComponent } from './components/chart/chart';

import { environment } from '../environments/environment';

import { StoreEffects } from './store/weatherStore/weather.effects';

import { reducers } from './store/app.store';

import { CapitalizeFirstLetterPipe } from './pipes/capitalize-first-letter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuNavComponent,
    ChartComponent,
    CapitalizeFirstLetterPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxEchartsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([StoreEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [CapitalizeFirstLetterPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
