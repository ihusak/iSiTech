import { AbstractControl } from "@angular/forms";
import { UserInterface } from "../../user-list.service";

const userNameValidator = (users: UserInterface[]) => {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const findSameUserName = users.find((user: UserInterface) => user.userName === control.value);
    if (control.dirty && findSameUserName) {
      return { 'notUniq': true };
    }
    return null;
  }
}
const textValidator = (control: AbstractControl): {[key: string]: any} | null => {
  if(control.dirty && !control.value.length) {
    return { 'notValid': true };
  }
  return null
}

const emailValidator = (control: AbstractControl): {[key: string]: any} | null => {
  const email = control.value;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (control.dirty && !emailPattern.test(email)) {
    return { 'invalidEmail': true };
  }
  return null;
}

const passwordValidator = (control: AbstractControl): {[key: string]: any} | null => {
  const password = control.value;
  // min length
  if (password.length < 8) {
    return {notSecurePass: true};
  }

  // one digit
  if (!/\d/.test(password)) {
    return {notSecurePass: true};
  }

  // one upperCase
  if (!/[A-Z]/.test(password)) {
    return {notSecurePass: true};
  }

  // one lowerCase
  if (!/[a-z]/.test(password)) {
    return {notSecurePass: true};
  }
  return null;
}

const confirmPasswordValidator = (control: AbstractControl): {[key: string]: any} | null => {
  const password = control.root.value.password;
  return control.value === password
  ? null
  : { PasswordNoMatch: true };
};

export {userNameValidator, textValidator, emailValidator, passwordValidator, confirmPasswordValidator}