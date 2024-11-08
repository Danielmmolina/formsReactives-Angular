import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { validatorsService } from '../../../shared/service/validators.service';
import { EmailValidator } from '../../../shared/validators/email-vaildator.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  public myForm : FormGroup = this.fb.group({
    name: ['', [Validators.required], Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)],
    email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)], [ this.emailValidator ]],
    username: ['', [Validators.required, this.validatorsService.cantBeStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
  }, {
    validators: [
      this.validatorsService.isFieldOneEqualFieldTwo('password', 'password2')
    ]
  });

  constructor (
    private fb: FormBuilder,
    private validatorsService: validatorsService,
    private emailValidator: EmailValidator
  ){}

  insValidField( field: string ){
    return this.validatorsService.isValidField( this.myForm, field );
  }

  onSumbit() {
    this.myForm.markAllAsTouched();
    return;
  }



}
