// Imports
// Deprecated import
// import { provideRouter, RouterConfig } from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { hourRoutes }    from './hour_weather/hourly.routes';
import { AppComponent }  from './app.component';
import { hourComponent }    from './hour_weather/hourly.component';
import { cityComponent }    from './city/city.component';

// Route Configuration
export const routes: Routes = [
 { path: '', component: hourComponent },
 { path: 'city', component: cityComponent },
    // Add dog routes form a different file
  // ...hourRoutes,
  
];

// Deprecated provide
// export const APP_ROUTER_PROVIDERS = [
//   provideRouter(routes)
// ];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);