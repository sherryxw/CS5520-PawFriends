export interface IOffer {
  _id: string;
  postId: string;
  carId: string;
  dealerId: string;
  additionalMessage?: string;
  status: OfferStatus;
}

export type OfferStatus = "PENDING" | "ACCEPT" | "DECLINE" | "CANCEL";
