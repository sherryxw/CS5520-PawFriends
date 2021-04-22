import client from "./client";

export const getMakeList = async () => {
  const response = await client.get("/manufacture");
  return response.data.makeList as string[];
};

export const getModelList = async (make: string) => {
  const response = await client.get(`/manufacture/${make}`);
  return response.data.modelList as string[];
};
