import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { ClienteModel} from "../models/dataClient";
import {HttpClient} from "@angular/common/http";
import {EnviromentService} from "../../../shared/services/enviroment.service";
import {createClient} from "../models/createClient.model";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private readonly http: HttpClient,
    private readonly enviromentService: EnviromentService
  ) { }

  public getClients(): Observable<ClienteModel[]> {
    return this.http.get<ClienteModel[]>(`${this.enviromentService.API}clientes`)
  }

  public  consultClient(shared_key: string): Observable<ClienteModel>{
    return this.http.get<ClienteModel>(`${this.enviromentService.API}clientes/${shared_key}`)
  }

  public  createdClient(data: createClient): Observable<ClienteModel>{
    return this.http.post<ClienteModel>(`${this.enviromentService.API}create`, data)
  }
}
