import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { validatorsService } from '../../../shared/service/validators.service';

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent  {

  public myForm: FormGroup = new FormGroup({
    name: new FormControl('', [ Validators.required, Validators.minLength(3) ]),
    price: new FormControl(0, [ Validators.required, Validators.min(0)]),
    inStorage: new FormControl(0, [ Validators.required, Validators.min(0)]),
  });

  constructor( private validatorsService: validatorsService) {}


  isValidField( field: string ): boolean | null {
   return this.validatorsService.isValidField( this.myForm, field);
  }

  getFieldError( field: string): string | null{

    if( !this.myForm.controls[field]  ) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch( key ) {
        case 'required': return 'Este campo es requerido';
        case 'minlength': return `Mínimo ${ errors['minlength'].requiredLength} caracters`
      }
    }

    return null;
  }

  onSave(): void {

    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);

    this.myForm.reset({ price: 0, inStorage: 0});

  }



}
