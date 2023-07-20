import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class InputService {
  private data: any = {
    login: {
      emailLengthMin: 8,
      emailLengthMax: 50,
      emailPattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$',
      passwordLengthMin: 8,
      passwordLengthMax: 16,
    },
    resetPassword: {
      passwordLengthMin: 8,
      passwordLengthMax: 20,
    },
    forget: {
      emailLengthMin: 8,
      emailLengthMax: 50,
    },
    updatePassword: {
      passwordLengthMin: 8,
      passwordLengthMax: 20,
    },
    createUser: {
      email: {
        emailLengthMin: 5,
        emailLengthMax: 50,
        emailPattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$',
      },
      prenom: {
        prenomLenghtMin: 5,
        prenomLengthMax: 20,
      },
      nom: {
        nomLenghtMin: 5,
        nomLengthMax: 20,
      }
    },
  };

  static testMatch(
    controlName: string,
    matchingControlName: string,
    match: boolean
  ) {
    return (control: AbstractControl): ValidationErrors | null => {
      const input = control.get(controlName);
      const matchingInput = control.get(matchingControlName);
      if (input === null || matchingInput === null) {
        return null;
      }

      if (matchingInput?.errors && !matchingInput.errors['match']) {
        return null;
      }

      if (
        (match && input.value !== matchingInput.value) ||
        (!match && input.value === matchingInput.value)
      ) {
        matchingInput.setErrors({ match: true });
        return { match: true };
      } else {
        matchingInput.setErrors(null);
        return null;
      }
    };
  }

  static noWhitespaceValidator(control: FormControl) {
    return (control.value && control.value.length) > 0
      ? (control.value || '').trim().length !== 0
        ? null
        : { whitespace: true }
      : null;
  }

  getInputConfig(key: string): any {
    return this.data[key];
  }
}
