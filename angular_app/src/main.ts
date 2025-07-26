import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideMatomo, withRouter } from 'ngx-matomo-client';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideMatomo(
      {
        siteId: 1, 
        trackerUrl: 'http://localhost:8080/', 
      },
      withRouter() // tracks route changes automatically
    ),
  ],
}).catch((err) => console.error(err));
