"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// Import component decorator
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var cityComponent = (function () {
    function cityComponent(http) {
        this.http = http;
        this.city = [{ lat: '41.878114', lon: '-87.629798' }, { lat: '34.052234', lon: '-118.243685' }, { lat: '37.774929', lon: '-122.419416' }];
        this.items = [];
        this.weather = [];
        this.index = 0;
        this.a = 0;
        //s:Array<string> = ;
        //console.log(this.checkCity(this.city));
        this.makeRequest(this.city);
    }
    cityComponent.prototype.ngOnInit = function () {
    };
    cityComponent.prototype.makeRequest = function (val) {
        var _this = this;
        for (var x = 0; x < val.length; x++) {
            this.http.request('http://api.openweathermap.org/data/2.5/weather?lat=' + val[x].lat + '&lon=' + val[x].lon + '&APPID=5a231059585708240fec9e8006f37248')
                .subscribe(function (res) {
                console.log("xxxxxxxxxx");
                console.log(res.json());
                //   this.weather[0].name = "sss";
                var ts = parseInt(res.json().main.temp) - 273.15;
                // this.data = res.json();
                var t = ts + '℃';
                // let city = val[this.a];
                _this.weather.push({ name: res.json().name, temp: t.substring(0, 4) + '℃', humidity: res.json().humidity, pressure: res.json().pressure });
                //this.weather[this.a].temp =  res.json().hourly_forecast[0].temp.metric+ '℃';
                _this.a++;
                //this.loading = false;
            });
            console.log(this.weather);
        }
    };
    cityComponent = __decorate([
        core_1.Component({
            template: "\n    \n\n \n <div class=\"image\">\n \n      <h1 *ngFor=\"let s of weather\">{{s.name}} {{s.temp}} </h1>\n  </div>\n    "
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], cityComponent);
    return cityComponent;
}());
exports.cityComponent = cityComponent;
//# sourceMappingURL=city.component.js.map