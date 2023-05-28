export class BaseResponsePost {
  // @ApiResponseProperty({
  //   example: '200',
  //   format: 'number',
  //   type: Number,
  // })
  status: number;

  // @ApiResponseProperty({
  //   example: 'success',
  //   format: 'string',
  //   type: String,
  // })
  message: string;

  data: any;
}
