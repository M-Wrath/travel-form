import { Component } from '@angular/core';
import { RequestFormComponent } from './request-form/request-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RequestFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'travel-form';
}
