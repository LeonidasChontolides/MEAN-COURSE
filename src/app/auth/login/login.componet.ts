import { Component } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LogInComponent {

  isLoading = false;

  onLogin(form: NgForm) {
console.log(form.value);

  }


}
