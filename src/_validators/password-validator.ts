import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function passwordStrengthValidator():ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const value = control.value;

    if(!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]+/.test(value);

    const hasLowerCase = /[a-z]+/.test(value);

    const hasNumeric = /[0-9]+/.test(value);

    const hasSpecialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);

    const hasMinimumLength = value.length >= 8;

    const hasNonAlphaNumeric = /[^a-zA-Z]+/.test(value);

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialCharacters && hasMinimumLength && hasNonAlphaNumeric;

    return !passwordValid ? {passwordStrength:true}: null;
  }
}

export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {

  const arePasswordsMatching = control.value.password === control.value.passwordConfirmation;
  if(!arePasswordsMatching) control.get('passwordConfirmation')?.setErrors({passwordMismatch: true});
  else delete control.get('passwordConfirmation')?.errors?.['passwordMismatch'];

  return !arePasswordsMatching ? {passwordMismatch:true}: null;
};
