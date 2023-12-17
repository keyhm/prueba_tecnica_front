import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {CustomDateAdapter, MY_DATE_FORMATS} from "../../models/dateformat";
import {ClienteModel} from "../../models/dataClient";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ClientService} from "../../services/client.service";

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDividerModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: MAT_DIALOG_DATA, useValue: {}},
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: DateAdapter, useClass: CustomDateAdapter, deps: [MAT_DATE_LOCALE] },
  ]
})
export class EditClientComponent implements OnInit {

  public minStartDate: Date;
  public minEndDate: Date;
  public actualData: ClienteModel[] | undefined;

  public formGroup: FormGroup = new FormGroup({
    shared_key: new FormControl('', ),
    business_id: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    data_added: new FormControl('')
  })

  constructor(
      private readonly service: ClientService,
      @Inject(MAT_DIALOG_DATA) public data: ClienteModel,
      public dialogRef: MatDialogRef<EditClientComponent>
  ) {
    const todayDate: Date = new Date();
    this.minStartDate = this.minEndDate = todayDate
  }

  ngOnInit() {
    this.loadDataClient();
    this.listData();
    this.minStartDate = new Date(this.minStartDate.getFullYear(), this.minStartDate.getMonth(), this.minStartDate.getDate());
    this.minEndDate = new Date(this.minEndDate.getFullYear(), this.minEndDate.getMonth(), this.minEndDate.getDate());
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public addClient(): void {
    this.dialogRef.close();
  }

  private loadDataClient(): void{
    console.log(this.data)
    if(this.data && Object.keys(this.data).length > 0) {
      const listClient = this.data;
      this.formGroup.setValue({
        shared_key: listClient.shared_key,
        business_id: listClient.business_id,
        email: listClient.email,
        phone: listClient.phone,
        data_added: listClient.data_added
      });
    }
  }

  private listData(): void {
    this.service.getClients().subscribe(res => {
      this.actualData = res;
    });
  }
}
