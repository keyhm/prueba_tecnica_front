import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  public mostrarAdvertencia(mensaje: string, titulo?: string) {
    return this.mostrarIcono(mensaje, titulo, 'warning');
  }
  public mostrarExistoso(mensaje: string, titulo?: string) {
    return this.mostrarIcono(mensaje, titulo, 'success');
  }

  private mostrarIcono(mensaje: string, titulo?: string, tipoMensaje?: SweetAlertIcon){
    return Swal.fire(titulo?.toUpperCase(), mensaje.toUpperCase(), tipoMensaje);
  }
}
