import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';


//******************************************************************************
//                                  
//******************************************************************************

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // => NEcesario para las peticiones a la APi desde el componente directamente
    FormsModule, // Necesario para manejar propiedades desde Angular
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDs-hGDFmNiT0fUDKqzgFc5Fe5Ua_i6Ofk'  }) , // Necesario para la implementación de Google Maps
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
