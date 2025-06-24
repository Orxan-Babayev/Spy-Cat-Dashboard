import { useForm } from "react-hook-form";
import { useCreateCat } from "../hooks/useCats";
import { useBreeds } from "../hooks/useCats";
import { useState } from "react";
import ErrorDisplay from "./ErrorDisplay";

function CatForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { mutate: createCat, isLoading } = useCreateCat();
  const {
    data: breeds,
    isLoading: breedsLoading,
    error: breedsError,
  } = useBreeds();

  const [apiError, setApiError] = useState(null);

  const onSubmit = (data) => {
    createCat(
      {
        name: data.name,
        yearsOfExperience: parseInt(data.yearsOfExperience),
        breed: data.breed,
        salary: parseFloat(data.salary),
      },
      {
        onSuccess: () => {
          reset();
          setApiError(null);
        },
        onError: (error) => {
          setApiError(error.message);
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded shadow"
    >
      <h2 className="text-xl font-semibold mb-4">Add New Spy Cat</h2>
      <ErrorDisplay message={apiError} />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            {...register("name", { required: "Name is required" })}
            className="mt-1 border p-2 rounded w-full"
            placeholder="Enter cat name"
            disabled={isLoading}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Years of Experience
          </label>
          <input
            type="number"
            {...register("yearsOfExperience", {
              required: "Experience is required",
              min: {
                value: 1,
                message: "Experience must be at least 1 year",
              },
            })}
            className="mt-1 border p-2 rounded w-full"
            placeholder="Enter years"
            disabled={isLoading}
          />

          {errors.yearsOfExperience && (
            <p className="text-red-500 text-sm">
              {errors.yearsOfExperience.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Breed
          </label>
          {breedsLoading && <p>Loading breeds...</p>}
          {breedsError && <p className="text-red-500">Failed to load breeds</p>}
          {!breedsLoading && breeds && (
            <select
              {...register("breed", { required: "Breed is required" })}
              className="mt-1 border p-2 rounded w-full"
              disabled={isLoading}
              defaultValue=""
            >
              <option value="" disabled>
                Select breed
              </option>
              {breeds.map((breed) => (
                <option key={breed.id} value={breed.value}>
                  {breed.label}
                </option>
              ))}
            </select>
          )}
          {errors.breed && (
            <p className="text-red-500 text-sm">{errors.breed.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Salary
          </label>
          <input
            type="number"
            step="0.01"
            {...register("salary", {
              required: "Salary is required",
              min: {
                value: 100,
                message: "Salary must be at least $100",
              },
            })}
            className="mt-1 border p-2 rounded w-full"
            placeholder="Enter salary"
            disabled={isLoading}
          />

          {errors.salary && (
            <p className="text-red-500 text-sm">{errors.salary.message}</p>
          )}
        </div>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
      >
        {isLoading ? "Adding..." : "Add Spy Cat"}
      </button>
    </form>
  );
}

export default CatForm;
