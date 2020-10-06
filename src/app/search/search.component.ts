import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit,Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {


//******************************************************************************
//                   Propiedades                                  
//******************************************************************************
  norte = ''; sur = ''; este = ''; oeste = ''; // Vacías por default

  lat = 35.290950; lng = 0.653015; zoom = 12; // Valores por default pero podrían cambiarse

  ciudades: any[] = []; // Array con las ciudades que devulve la búsqueda del input
  tiempos = ''; 
  ExistCity = false; // Creada para crear ngIf y que se muestren o no los datos si los hay o no
  pointOfCity:any = ''; // Punto de estación meteorológica elegida
  temperatura: number = 50; // Por default 50 pero se cambia una vez hecha la petición para representarse en el HTML 

  ngOnInit() {
  }

  constructor(public http: HttpClient, @Inject(DOCUMENT) private _document) { 
    // HttpClient para poder hacer las peticiones a la api, @Inject para acceder al DOM y modificarlo en función de lo que necesite

  }


//******************************************************************************
//     Petición de la búsqueda escrita en el input                             
//******************************************************************************
  search(value: any) {

    let url = `http://api.geonames.org/searchJSON?q=${value}&maxRows=10&startRow=0&lang=en&isNameRequired=true&style=FULL&username=ilgeonamessample`


    this.http.get(url).subscribe(
      (resp: any) => {
        this.ciudades = resp.geonames;
        console.log(url);
        console.log(this.ciudades)
        }
    )
  }

//******************************************************************************************************************
//     Método para mostrar valores del campo que elegimos en el HTML, recuperamos los puntos cardinales 
//      y buscamos en la API esos puntos que nos devolverá la información que precisamos                             
//********************************************************************************************************************
  mostrarCiudad(value) {

    console.log(value)

    if( value.bbox == undefined) {
      alert('No hay suficientes datos')
    } else {

      this.norte = value.bbox.north;
      this.sur =value.bbox.south ;
      this.este = value.bbox.east;
      this.oeste = value.bbox.west;
      this.lat = parseFloat( value.lat);
      this.lng = parseFloat(value.lng);
      this.temperatura = value.temperature;
  
      let url = `http://api.geonames.org/weatherJSON?north=${this.norte}&south=${this.sur}&east=${this.este}&west=${this.oeste}&username=ilgeonamessample`
  
  
      this.http.get(url).subscribe(
        (resp: any) => {
          this.tiempos = resp.weatherObservations;
          console.log(url);
          console.log(this.tiempos);
          if (this.tiempos.length == 0) {
            alert('Pruebe con otra opción')
          }
        })
    }
    
}

//******************************************************************************
//     Método que nos pasa la info de la ciudad elegida y de la estación meteorológica elegida
//      y donde en función de ella la progressbar cambia de color. He utilizado la lógica de "IF" 
//      aun que también sería válida la lógica con "swich case"                       
//******************************************************************************

mostrarTiempo(value) {
  this.pointOfCity = value;
  this.temperatura = value.temperature;

  if( this.temperatura <= 15) {
  let color = 'progress-bar bg-info progress-bar-striped progress-bar-animated'
  this._document.getElementById('colorProgress').setAttribute('class', color )
  }

  if (this.temperatura >15 && this.temperatura <= 25) {
    let color = 'progress-bar bg-warning progress-bar-striped progress-bar-animated'
    this._document.getElementById('colorProgress').setAttribute('class', color )
  }

  if (this.temperatura >= 25) {
    let color = 'progress-bar bg-danger progress-bar-striped progress-bar-animated'
    this._document.getElementById('colorProgress').setAttribute('class', color )
  }

}

}
