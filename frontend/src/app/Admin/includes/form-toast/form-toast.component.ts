import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-toast',
  templateUrl: './form-toast.component.html',
  styleUrls: ['./form-toast.component.scss']
})
export class FormToastComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  close(): void {
      // @ts-ignore
      document.getElementById('SaveSuccessToast').classList.remove('show')
  }

}
