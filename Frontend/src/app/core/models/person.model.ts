export interface CreatePersonRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDay: string;
  occupationId: number;
  profile: string;
  sex: string;
}

export interface SavePersonResponse {
  id: number;
  message: string;
}

export interface Occupation {
  id: number;
  name: string;
}
