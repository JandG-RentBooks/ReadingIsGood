import { Component } from '@angular/core';

@Component({
  selector: 'app-error-auth',
  templateUrl: './error-auth.component.html',
  styleUrls: ['./error-auth.component.scss']
})
export class ErrorAuthComponent {
    constructor() {}

    close(): void {
        location.href = '/login'
    }
}
