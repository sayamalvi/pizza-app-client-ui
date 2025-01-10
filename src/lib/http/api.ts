import axios from "axios";
import { APIErrorResponse, Customer, VerifyCouponResponse } from "../types";
import { AxiosError } from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

const ORDER_SERVICE = "/api/order";

export const getCustomer = async (): Promise<Customer> => {
  const response = await api.get<{ customer: Customer }>(
    `${ORDER_SERVICE}/customer`
  );
  return response.data.customer;
};

export const addAddress = async (customerId: string, address: string) => {
  return await api.patch(`${ORDER_SERVICE}/customer/addresses/${customerId}`, {
    address,
  });
};

export const verifyCoupon = async (code: string) => {
  const response = await api.post<VerifyCouponResponse>(
    `${ORDER_SERVICE}/coupons/verify`,
    { code }
  );
  return response.data;
};
