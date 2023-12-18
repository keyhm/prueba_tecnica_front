import {AfterViewInit, ChangeDetectorRef, Component, Inject, Injectable, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {PagesContentComponent} from "../../shared/pages-content/pages-content.component";
import {MatInputModule} from "@angular/material/input";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatTooltipModule} from "@angular/material/tooltip";
import {AdvancedSearchDialogComponent} from "../other-items/advanced-shared/advanced-shared.component";
import { CreatedNewClientComponent } from './components/created-new-client/created-new-client.component';
import {EditClientComponent} from "./components/edit-client/edit-client.component";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import { ClienteModel} from "./models/dataClient";
import {ClientService} from "./services/client.service";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {CustomDateAdapter, MY_DATE_FORMATS} from "./models/dateformat";
import {AlertService} from "../../shared/services/alert.service";


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    PagesContentComponent,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatDialogModule,
    MatPaginatorModule,
  ],
  providers: [
    {provide: MAT_DIALOG_DATA, useValue: {}},
  ]
})
export class ClientComponent implements AfterViewInit, OnInit{

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  public displayedColumns: string[] = ['Shared Key', 'Business ID', 'E-mail', 'Phone', 'Data Added', 'actions'];
  public dataSource: MatTableDataSource<ClienteModel> = new MatTableDataSource<ClienteModel>([]);
  public clients: ClienteModel[] | undefined;

  public readonly formGroup: FormGroup = new FormGroup({
    shared_key: new FormControl('')
  })


  constructor(
      @Inject(MAT_DIALOG_DATA) public data: ClienteModel,
      public alert: AlertService,
      public dialog: MatDialog,
      private readonly service: ClientService,
      private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.loadDataClient();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public loadDataClient(): void {
    this.service.getClients().subscribe( res => {
      this.dataSource = new MatTableDataSource<ClienteModel>(res);
      this.dataSource.paginator = this.paginator;
    });
  }

  public openAddClient(): void {
    const options: {heigth: string, width: string} = {heigth:'auto', width:'40%'}
    const dialogRef = this.dialog.open(CreatedNewClientComponent, options);

    dialogRef.afterClosed().subscribe(
        (action: boolean) => {
          if(action){
            this.loadDataClient();
          }
        });
  }


  public openAdvancedSearchDialog(): void {
    const dialogRef = this.dialog.open(AdvancedSearchDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public openEditClient(data: ClienteModel) {
    console.log(data)
    const options: {heigth: string, width: string} = {heigth:'auto', width:'50%'}
    const dialogRef= this.dialog.open(EditClientComponent, {data, ...options});

    dialogRef.afterClosed().subscribe(
      (action: boolean) => {
        if(action){
      this.loadDataClient();
        }
    });
  }

  public consultClient(): void {
    const sharedKey = this.formGroup.controls['shared_key'].value;

    this.service.consultClient(sharedKey).subscribe(
        (res: ClienteModel): void => {
          this.handleSuccessfulResponse(res);
          this.reloadTable();
        },
        (error) => {
          if (error.status === 404) {
            const message: string = 'Usuario no encontrado';
            this.alert.mostrarAdvertencia(message);
          } else {
            console.error('Error en la solicitud:', error);
          }
          this.reloadTable();
        }
    );
  }

  private handleSuccessfulResponse(cliente: ClienteModel): void {
    if (!cliente || Object.keys(cliente).length === 0) {
      const message: string = 'Usuario no encontrado';
      this.alert.mostrarAdvertencia(message);
    } else {
      console.log('Datos del cliente:', cliente);
      this.dataSource = new MatTableDataSource<ClienteModel>([cliente]);
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    }
  }

  public onInputChange(): void {
    const sharedKey = this.formGroup.controls['shared_key'].value;
    if (!sharedKey) {
      this.consultClient();
    }
  }


  private reloadTable(): void {
    this.dataSource.data = [...this.dataSource.data];
    this.cdr.detectChanges();
  }


}
