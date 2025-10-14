import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { appConfig } from './app.config';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { FR } from './common/constants';
import { translateServerLoaderFactory } from './services/translate-loader/translate-server-loader.service';

const serverConfig: ApplicationConfig = {
  providers: [
    provideTranslateService({
      lang: FR,
      fallbackLang: FR,
      loader: {
        provide: TranslateLoader,
        useFactory: translateServerLoaderFactory,
      },
    }),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
