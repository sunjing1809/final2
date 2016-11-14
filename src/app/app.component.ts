import {
    Component,
    ElementRef,
    AfterViewInit,
    OnDestroy,
    ViewChild
} from '@angular/core';



import { HttpModule,JsonpModule  } from '@angular/http';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormControl
} from '@angular/forms';
const Highcharts = require('highcharts/highcharts.src');
import 'highcharts/adapters/standalone-framework.src';

@Component({
  selector: 'app-root',
 template: `
    
  <h2>Temperature check</h2>
  <form>
          <input type="text"
               id="skuInput"
               placeholder="City Name"
              [(ngModel)]=" paramter"
              (change) ="checkCity(paramter)"
              name="parameter"
              />
              <button type="button" (click)="makeRequest()">Search</button>
  </form>
  <nav>
     <a [routerLink]="['/']">Home</a>
     <a [routerLink]="['/city']">You may be Interested</a>
  </nav>
  <router-outlet></router-outlet>

 
  <div *ngIf="loading">loading...</div>
   

  <div *ngIf ="finish">
  <img src = "{{weather.image}}"> 
  <h1>{{weather.name}}</h1>
   <h2>{{weather.temp}} Feels Like:{{weather.fl}} </h2>{{weather.time }}</div>
  <div>
            <div #chart></div>
  </div>
   
`
  
})
export class AppComponent { 
  @ViewChild('chart') public chartEl: ElementRef;
  

  private _chart: any;
  paramter:string;
  tempList: number[] = [];
  dateList: string[] = [];
  data: Object;
  loading: boolean;
  weather = {name : '',
             time :'',
             temp : '',
             fl :'',
             image:''};
  list :{name : '', temp : ''}[];
  state : string;
  finish:boolean = false;


  constructor(private http: Http) {
      this.paramter = "";
  }
  
  chartInit() {
    let opts: any = {
        title: {
            text: 'Recent Temperature (℃)',
            x: -20 //center
        },
        xAxis: {
            categories:this.dateList
        },
        series: [{
            name: this.weather.name,
            data: this.tempList
        }]
    };
    console.log(this.tempList);
    if (this.chartEl && this.chartEl.nativeElement) {
        opts.chart = {
            type: 'line',
            renderTo: this.chartEl.nativeElement
        };

        this._chart = new Highcharts.Chart(opts);
    }
  }
  
  public ngOnDestroy() {
    this._chart.destroy();
  }


  makeRequest(): void {
    this.loading = true;
    this.checkCity(this.paramter);
    //this.http.request('http://api.openweathermap.org/data/2.5/forecast/city?q='+ this.paramter+ '&mode=xml&APPID=5a231059585708240fec9e8006f37248')
    this.http.request('http://api.wunderground.com/api/23ef06bc47cbce1b/conditions/hourly/q/'+ this.state+'/'+this.paramter+ '.json')
    //this.http.request('http://api.wunderground.com/api/23ef06bc47cbce1b/hourly/q/CA/San_Francisco.json')
      .subscribe((res: Response) => {
          console.log(res.json());
        //   var t = parseInt(res.json().list[0].main.temp)-273.15;
        // this.data = res.json();
        this.weather.name = res.json().current_observation.display_location.city;
         this.weather.time = res.json().current_observation.observation_time;
         this.weather.temp =  res.json().hourly_forecast[0].temp.metric+ '℃';
         this.weather.fl =res.json().hourly_forecast[0].feelslike.metric+ '℃';
          this.weather.image =res.json().hourly_forecast[0].icon_url;
         this.testLoop(res.json());
        this.loading = false;
        this.finish = true;

      });
      
  }
checkCity(val: any): void {

 this.http.request('http://maps.googleapis.com/maps/api/geocode/json?address='+val +'&sensor=false')
      .subscribe((res: Response) => {
          console.log(res.json());
          var num = res.json().results[0].address_components.length;
           console.log(res.json().results[0].address_components.length);
           if(num == 4)
           this.state = res.json().results[0].address_components[2].short_name;
           else{
              this.state = res.json().results[0].address_components[1].short_name;
           }
         // this.state = res.json().results[0].state;
          console.log(this.state);


      });


  }



  testLoop( val: any ){
   
    var i = 0;
    do {
        
          this.tempList[i] = parseInt(val.hourly_forecast[i].temp.metric);
          this.dateList[i] = val.hourly_forecast[i].FCTTIME.pretty;
      //console.log(this.tempList[i] );
          // console.log(this.dateList[i]);
       i++;
    }
    while (i < 36);
    this.chartInit();
  }





}

