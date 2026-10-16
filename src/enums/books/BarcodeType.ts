export enum BarcodeType {
  Code128 = "Code128",
}

export const barcodeTypeLabels: Record<BarcodeType, string> = {
  [BarcodeType.Code128]: "Code 128",
};
export const barcodeTypeColors: Record<BarcodeType, "blue"> = {
  [BarcodeType.Code128]: "blue",
};
