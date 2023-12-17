import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatIconModule} from "@angular/material/icon";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {MatDividerModule} from "@angular/material/divider";
import {CustomDateAdapter, MY_DATE_FORMATS} from "../../models/dateformat";
import {ClientService} from "../../services/client.service";
import {createClient} from "../../models/createClient.model";
import {AlertService} from "../../../../shared/services/alert.service";
import {isNumber} from "@ng-bootstrap/ng-bootstrap/util/util";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-created-new-client',
  templateUrl: './created-new-client.component.html',
  styleUrls: ['./created-new-client.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule,
    MatDividerModule,
    NgIf,
  ],
  providers: [
    {provide: MAT_DIALOG_DATA, useValue: {}},
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: DateAdapter, useClass: CustomDateAdapter, deps: [MAT_DATE_LOCALE] },
  ]
})
export class CreatedNewClientComponent implements OnInit {

  public minStartDate: Date;
  public minEndDate: Date;

  public formGroup: FormGroup = new FormGroup({
    business_id: new FormControl(''),
    email: new FormControl('', [Validators.email]),
    phone: new FormControl('', [Validators.minLength(10),
      Validators.maxLength(10), Validators.pattern('^[0-9]*$')])
  })
  constructor(
      public service: ClientService,
    public alert: AlertService,
    public dialogRef: MatDialogRef<CreatedNewClientComponent>) {
    const todayDate: Date = new Date();
    this.minStartDate = this.minEndDate = todayDate
  }

  ngOnInit(): void {
    this.minStartDate = new Date(this.minStartDate.getFullYear(), this.minStartDate.getMonth(), this.minStartDate.getDate());
    this.minEndDate = new Date(this.minEndDate.getFullYear(), this.minEndDate.getMonth(), this.minEndDate.getDate());
  }


  public addClient(): void {
    if (this.formGroup.dirty) {
      let payload: createClient = {
        business_id: this.formGroup.get('business_id')?.value,
        email: this.formGroup.get('email')?.value,
        phone: this.formGroup.get('phone')?.value
      };
      this.service.createdClient(payload).subscribe(
          (res: any): void => {
            if (res && res.includes('Cliente creado con éxito') && res.includes('201')) {
              this.alert.mostrarExistoso('CLIENT ADD').then(() => {
                this.dialogRef.close();
              });
            } else {
              console.error('Error en la solicitud');
            }
          }
      );
    }
  }


  public haveError(key: string, type: string): boolean{
    const control: AbstractControl<any, any> | null = this.formGroup.get(key);
    if(control !== null) {
      return !!control.getError(type);
    }
    return true;
  }

}
