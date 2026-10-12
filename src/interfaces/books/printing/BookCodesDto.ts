import type { BarcodeType } from "@/enums/books/BarcodeType";

export interface BookCodesDto {
  bookId: number;
  bookUrl: string;
  barcodeValue: string;
  barcodeType: BarcodeType;
  qrImage: string;
  barcodeImage: string;
}
