import {NgModule} from '@angular/core';
import {HomeLanding} from './components/landing/landing';


@NgModule({

  imports: [HomeLanding],
  declarations: [],
  providers: [],
  exports: [HomeLanding]
})
export class HomeModule {
}
