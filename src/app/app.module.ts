import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent }  from './app.component';
import { HttpModule,JsonpModule  } from '@angular/http';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import{RouterModule}from "@angular/router";
import { hourComponent }    from './hour_weather/hourly.component';
import { routing } from './routes';
import { cityComponent }    from './city/city.component';


@NgModule({
  imports: [ HttpModule,FormsModule, BrowserModule,JsonpModule , routing],
  declarations: [ AppComponent ,
  hourComponent,cityComponent],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
