import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms'
import {AlternativeValidationDirective} from 'angular-alternative-validation'
import {IAlternativeValidationConfig} from 'angular-alternative-validation/struct/alternative-validation-config'

@Component({
  selector: 'basic-usage',
  templateUrl: './basic-usage.component.html',
  styleUrls: ['./basic-usage.component.scss']
})
export class BasicUsageComponent implements OnInit, AfterViewInit {


  basicFormGroup: FormGroup;
  altInput: FormControl;
  avNameConfig: IAlternativeValidationConfig;

  @ViewChild(AlternativeValidationDirective)
  ref

  constructor(private fb: FormBuilder) {
    this.basicFormGroup = this.fb.group(
      {
        alt: ['initial', [Validators.required, Validators.minLength(3)]]
      }
    );

    this.avNameConfig = {
      validator: [
        {name: 'validName'}
      ]
    };
  }

  ngOnInit() {
    this.altInput = this.basicFormGroup.get('alt') as FormControl
  }

  ngAfterViewInit() {
    console.log('Reference to the directive', this.ref);
  }

  getControlFeedbackName(formControl: AbstractControl, altControl: AbstractControl): string {
    if (formControl.disabled) {
      return '';
    }
    if (formControl.invalid) {
      return 'danger';
    } else if (altControl.invalid) {
      return 'warning';
    } else {
      return 'success';
    }
  }

  toggleDisabled(control: AbstractControl) {
    if (!control.disabled) {
      control.disable();
    } else {
      control.enable();
    }
  }

  resetWithValue(value) {
    this.basicFormGroup.reset({
      alt: 'reset'
    })
  }

}
