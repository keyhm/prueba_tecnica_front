import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";


@Component({
  selector: 'app-advanced-shared',
  templateUrl: './advanced-shared.component.html',
  styleUrls: ['./advanced-shared.component.css'],
  standalone: true,
  imports: [FormsModule, ]
})


export class AdvancedSearchDialogComponent implements OnInit {

  filtro = {
    nombre: '',
    telefono: '',
    email: '',
    fecha: ''
  };


  constructor(public dialogRef: MatDialogRef<AdvancedSearchDialogComponent>) { }

  ngOnInit() {
    // Puedes realizar acciones de inicialización si es necesario
  }

  buscar(): void {
    // Implementa la lógica de búsqueda aquí (puedes cerrar el diálogo después)
    console.log('Realizando búsqueda con filtro:', this.filtro);

    // Cierra el cuadro de diálogo después de realizar la búsqueda
    this.dialogRef.close();
  }

  cerrarDialogo(): void {
    // Cierra el cuadro de diálogo sin realizar la búsqueda
    this.dialogRef.close();
  }


}
