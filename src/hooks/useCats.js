import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const fetchCats = async () => {
  const { data } = await axios.get("http://127.0.0.1:8000/api/cats/");
  return data;
};

const createCat = async (catData) => {
  console.log("Creating cat with data:", catData);
  const { data } = await axios.post("http://127.0.0.1:8000/api/cats/", catData);
  return data;
};

const fetchBreeds = async () => {
  const { data } = await axios.get("http://127.0.0.1:8000/api/spycat/breeds/");
  return data;
};

const updateCat = async ({ id, salary }) => {
  const { data } = await axios.patch(`http://127.0.0.1:8000/api/cats/${id}/`, {
    salary,
  });
  return data;
};

export const useBreeds = () => {
  return useQuery({
    queryKey: ["breeds"],
    queryFn: fetchBreeds,
    retry: 1,
  });
};

const deleteCat = async (id) => {
  await axios.delete(`http://127.0.0.1:8000/api/cats/${id}/`);
};

export const useCats = () => {
  return useQuery({
    queryKey: ["cats"],
    queryFn: fetchCats,
    retry: 1,
  });
};

export const useCreateCat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCat,
    onSuccess: () => queryClient.invalidateQueries(["cats"]),
    onError: (error) => {
      throw new Error(error.response?.data?.error || "Failed to create cat");
    },
  });
};

export const useUpdateCat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCat,
    onSuccess: () => queryClient.invalidateQueries(["cats"]),
    onError: (error) => {
      throw new Error(error.response?.data?.error || "Failed to update cat");
    },
  });
};

export const useDeleteCat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCat,
    onSuccess: () => queryClient.invalidateQueries(["cats"]),
    onError: (error) => {
      throw new Error(error.response?.data?.error || "Failed to delete cat");
    },
  });
};
