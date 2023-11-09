export class BaseResponse {

  constructor(status: Number, message: string, data: any = null) {
    this.status = status;
    this.message = message;
    this.data = data;
  }

  status: Number;
  message: string;
  data: any;
}
