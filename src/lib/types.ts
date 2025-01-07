export interface Tenant {
  id: string;
  name: string;
  address: string;
}
export interface PriceConfiguration {
  [key: string]: {
    priceType: "base" | "aditional";
    availableOptions: string[];
  };
}

export interface ProductPriceConfiguration {
  [key: string]: {
    priceType: "base" | "aditional";
    availableOptions: {
      [key: string]: number;
    };
  };
}
export interface Attribute {
  name: string;
  widgetType: "switch" | "radio";
  defaultValue: string;
  availableOptions: string[];
}

export interface Category {
  _id: string;
  name: string;
  priceConfiguration: PriceConfiguration;
  attributes: Attribute[];
  hasToppings: boolean;
}

export type ProductAttribute = {
  name: string;
  value: string | boolean;
};

export type Product = {
  _id: string;
  name: string;
  image: string;
  description: string;
  category: Category;
  priceConfiguration: ProductPriceConfiguration;
  attributes: ProductAttribute[];
  isPublish: boolean;
  createdAt: string;
};

export type Topping = {
  id: string;
  name: string;
  price: number;
  image: string;
  isAvailable: boolean;
};

export enum SEARCH_PARAMS {
  TENANT_ID = "tenantId",
}
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: "admin" | "customer" | "manager";
}

export interface Session {
  user: User;
}

export interface Address {
  text: string;
  isDefault: boolean;
}
export interface Customer {
  _id:string
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  addresses: Address[];
  createdAt: Date;
  updatedAt: Date;
}