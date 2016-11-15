// Import component decorator
import { Component, OnInit } from '@angular/core';


import { Observable } from 'rxjs/Observable';

import { HttpModule,JsonpModule  } from '@angular/http';
import {Http, Response, RequestOptions, Headers} from '@angular/http';



import {Subject} from 'rxjs/Subject'
@Component({
  template: `
    

 
 <div class="image">
 
      <h1 *ngFor="let s of weather">{{s.name}} {{s.temp}} </h1>
  </div>
    `

   
})
// Component class
export class cityComponent implements OnInit{
  city:{lat: string, lon :string}[] =[{lat:'41.878114',lon:'-87.629798'},{lat:'34.052234',lon:'-118.243685'} ,{lat:'37.774929',lon:'-122.419416'}];
  items:Array<string> =[];
  state:string;
  data : any;
  weather: {name : string,
             temp : string,
             humidity: string,
             pressure: string
               }[] =[];
  index:number = 0;
  a:number = 0;
constructor(private http: Http) {
   //s:Array<string> = ;
        //console.log(this.checkCity(this.city));
      this.makeRequest( this.city);
   
  }
   ngOnInit(){
     
    }
   makeRequest(  val:{lat: string, lon :string}[]): void {
  
  
    for( var x = 0; x < val.length; x++){
         this.http.request('https://api.openweathermap.org/data/2.5/weather?lat='+val[x].lat+ '&lon=' +val[x].lon+'&APPID=5a231059585708240fec9e8006f37248' )
    //this.http.request('http://api.openweathermap.org/data/2.5/forecast/city?q='+ val[x]+ '&APPID=5a231059585708240fec9e8006f37248')
    //this.http.request('http://api.wunderground.com/api/23ef06bc47cbce1b/conditions/hourly/q/'+ this.state+'/'+val[x] + '.json')
    //this.http.request('http://api.wunderground.com/api/23ef06bc47cbce1b/hourly/q/CA/San_Francisco.json')
      .subscribe((res: Response) => {
         console.log("xxxxxxxxxx");
          console.log( res.json());
      //   this.weather[0].name = "sss";
           var ts = parseInt(res.json().main.temp)-273.15;
        // this.data = res.json();
         let t = ts+ '℃';
        // let city = val[this.a];
        this.weather.push( { name : res.json().name  ,temp: t.substring(0,4) +'℃', humidity:res.json().humidity, pressure : res.json().pressure });
         //this.weather[this.a].temp =  res.json().hourly_forecast[0].temp.metric+ '℃';

      this.a++;
        //this.loading = false;

      });
      console.log(this.weather);
    }
  }

// checkCity(val:Array<string>):Array<string> {
 

//     for( let x of val){
     
//  this.http.request('http://maps.googleapis.com/maps/api/geocode/json?address='+ x +'&sensor=false')
//       .subscribe((res: Response) => {
//          // console.log(res.json());
          
//           var num = res.json().results[0].address_components.length;
//           // console.log(res.json().results[0].address_components.length);
//            if(num == 4)
//            this.state[this.index] = res.json().results[0].address_components[2].short_name;
//           //  this.state[0] = "asdas";
//            else{
//               this.state[this.index] = res.json().results[0].address_components[1].short_name;
//            }
//          // this.state = res.json().results[0].state;
//          // console.log(this.state);
//   this.index++;

//       });

    
//     }
  
//     //console.log(this.state);
//     return this.state;
    
//   }

}