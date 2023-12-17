import {Component, Input} from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-pages-content',
  templateUrl: './pages-content.component.html',
  styleUrls: ['./pages-content.component.css'],
  standalone: true,
  imports: [MatToolbarModule, MatCardModule, NgIf]
})
export class PagesContentComponent {

  @Input()tittle: string = '';

}
