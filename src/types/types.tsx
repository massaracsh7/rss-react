export interface DataForm {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: Gender;
  accept: boolean;
  picture: string;
  country: string;
}

export type Gender = 'unknown' | 'Female' | 'Male' | 'Genderless';
