import { Component } from '@angular/core';
import { FlightsService } from './services/flights.service';
import Swal from 'sweetalert2'
import { AmountRequest } from './Models/AmountRequest';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NewShore Flights';
  listOrigin: any;
  listDestination: any;
  origin: string="-1";
  destination: string="-1";
  titleTable: string;
  flights: any;
  tipoVuelo: string;
  priceCop: number;
  constructor(private flightsServices: FlightsService){}

  ngOnInit()
  {
    this.obtenerListasRutas();
  }
  obtenerListasRutas()
  {
     this.flightsServices.GetCities().subscribe(data =>{
      
      this.listOrigin = data.result.origins;
      this.listDestination = data.result.destinations;
     })
  }
  buscarVuelos()
  {
    if(this.origin === "-1")
    {
      Swal.fire( "Error","El campo origen es obligatorio", "error");
    }
    if(this.destination === "-1")
    {
      Swal.fire( "Error","El campo destino es obligatorio", "error");
    }
    this.flightsServices.GetRoutes(this.origin, this.destination).subscribe(data =>{
      if(data.status)
      {
        Swal.fire( "Consulta completa",data.message, "success");
        this.titleTable = data.message;
        this.flights = data.result;
        this.tipoVuelo = this.flights.flights.length > 1 ? "Escala": "Directo";
        let requestAmount = new AmountRequest();
        requestAmount.amount = this.flights.price;
        requestAmount.from = "USD";
        requestAmount.to = "COP";
        this.flightsServices.ChangeCurrency(requestAmount).subscribe(data => {
          this.priceCop = data.result.result;
        })
      }
       
    })
  }
}
