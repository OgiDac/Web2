export class EditProfileModel {
    constructor(obj) {
      this.username = obj.username;
      this.password = obj.password;
      this.newPassword = obj.newPassword;
      this.email = obj.email;
      this.fullName = obj.fullName;
      this.birthday = obj.birthday;
      this.address = obj.address;
      this.image = obj.image;
      this.imageFile = obj.imageFile;
    }
  }
  

  export class UserModel {
    constructor(obj) {
      this.id = obj.id;
      this.username = obj.username;
      this.email = obj.email;
      this.fullName = obj.fullName;
      this.birthday = obj.birthday;
      this.address = obj.address;
      this.type = obj.type;
      this.image = obj.image;
    }
  }

  export class SellerModel {
    constructor(obj) {
     this.fullName = obj.fullName;
     this.email = obj.email;
   }
 }
 
 
 export class ProductModel {
   constructor(obj) {
     this.id = obj.id;
     this.name = obj.name;
     this.price = obj.price;
     this.amount = obj.amount;
     this.description = obj.description;
     this.image = obj.image;
     this.imageFile = obj.imageFile;
     this.sellerId = obj.sellerId;
     this.seller = new SellerModel(obj.seller);
   }
 }
 
 export class ItemModel {
    constructor(obj) {
      this.amount = obj.amount;
      this.name = obj.name;
      this.price = obj.price;
      this.productId = obj.productId;
    }
  }
  
  export class OrderModel {
    constructor(obj) {
      this.id = obj.id;
      this.deliveryAddress = obj.deliveryAddress;
      this.comment = obj.comment;
      this.orderTime = obj.orderTime;
      this.deliveryTime = obj.deliveryTime;
      this.isCancelled = obj.isCancelled;
      this.orderPrice = obj.orderPrice;
      this.items = obj.items.map((o) => new ItemModel(o));
    }
  }
  