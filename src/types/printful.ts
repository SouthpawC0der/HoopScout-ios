export interface PrintfulProductImage {
  id: number;
  src: string;
  is_default: boolean;
}

export interface PrintfulSyncVariant {
  id: number;
  name: string;
  retail_price: string;
  currency: string;
  is_ignored: boolean;
}

export interface PrintfulSyncProduct {
  id: number;
  external_id: string;
  name: string;
  variants: number;
  synced: number;
  thumbnail_url: string;
  is_ignored: boolean;
}

export interface PrintfulStoreProduct {
  id: number;
  name: string;
  thumbnail_url: string;
  price: string;
  currency: string;
  variants: PrintfulSyncVariant[];
}
