export class OrderItem {
  imageUrl: string;
  unitPrice: number;
  quanity: number;
  productId: string;

  constructor(cartItem: CartItem){
    this.imageUrl = cartItem.imageUrl;
    this.quanity = cartItem.quanity;
    this.unitPrice = cartItem,this.unitPrice;
    this.productId = cartItem.productId;
    
  }
}
