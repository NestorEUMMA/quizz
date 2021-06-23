import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  listEstudiantes: any[] = [
    {nombre : 'Nestor Elias', estado : 'Regular'},
    {nombre : 'Katya Maria', estado : 'Promocionado'},
    {nombre : 'Miranda Sophia', estado : 'Promocionado'},
    {nombre : 'Elias Marroquin', estado : 'Regular'},
    {nombre : 'Sophia Quinteros', estado : 'Libre'},
  ]

  mostrar = true;

  toogle() : void{
    this.mostrar = !this.mostrar
  }
}
