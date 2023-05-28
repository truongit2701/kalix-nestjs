export class ProductResponse {
  name: string;
  info: string;
  price: string;
  // size: SizeResponse[];
  id: number;
  image: string;
  code: string;
  // feedback: FeedbackResponse[];

  constructor(data: any) {
    this.name = data.name;
    this.info = data.info;
    this.price = data.price;
    // this.size = data.product_size ? SizeResponse.MaptoList(data.product_size) : [];
    this.id = data.id;
    this.code = data.code;
    this.image = data.image;
    // this.feedback = data.feedback ? FeedbackResponse.MaptoList(data.feedback) : {}
  }

  static MaptoList(data: any) {
    return data.map((item) => {
      return new ProductResponse(item);
    });
  }
}

export class SizeResponse {
  id: number;
  name: string;
  ngang: string;
  doc: string;

  constructor(data: any) {
    this.name = data?.size_name;
    this.id = data?.id;
    this.ngang = data?.ngang;
    this.doc = data?.doc;
  }

  static MaptoList(data: any) {
    return data.map((item) => {
      return new SizeResponse(item.size);
    });
  }
}

export class FeedbackResponse {
  id: number;
  title: string;
  comment: string;
  rating: number;

  constructor(data: any) {
    this.title = data?.title;
    this.id = data?.id;
    this.comment = data?.comment;
    this.rating = data?.rating;
  }

  static MaptoList(data: any) {
    return data.map((item) => {
      return new FeedbackResponse(item);
    });
  }
}
