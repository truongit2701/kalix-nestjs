export class LoginUserResponse {
  user_id: string;
  email: string;
  access_token: string;
  address: string;
  is_admin: number;

  constructor(data?: any) {
    (this.user_id = data?.user_id),
      (this.email = data?.email),
      (this.access_token = data?.access_token),
      (this.address = data?.address);
  }

  static mapToList(data?: any) {
    return new LoginUserResponse(data);
  }
}
