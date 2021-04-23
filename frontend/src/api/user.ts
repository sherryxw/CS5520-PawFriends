import client from "./client";

export interface IUserMetadata {
  user_name: string;
  phone_number: string;
  role: "BUYER" | "DEALER";
}

export const get = async (id: string) => {
  const response = await client.get(`/users/${id}`);
  return response.data as IUserMetadata;
};
