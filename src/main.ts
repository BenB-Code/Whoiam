import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

console.log('TEST de hook pre-commit');

bootstrapApplication(App, appConfig).catch(err => console.error(err));
