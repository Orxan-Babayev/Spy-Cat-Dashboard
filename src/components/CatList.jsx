import { useState } from "react";
import { useCats, useDeleteCat, useUpdateCat } from "../hooks/useCats";
import Spinner from "./Spinner";
import { useForm } from "react-hook-form";
import ErrorDisplay from "./ErrorDisplay";

function CatList() {
  const { data: cats, isLoading, error: fetchError, refetch } = useCats();
  const { mutate: deleteCat, isLoading: isDeleting } = useDeleteCat();
  const { mutate: updateCat, isLoading: isUpdating } = useUpdateCat();
  const { register, handleSubmit, reset } = useForm();
  const [editingId, setEditingId] = useState(null);
  const [mutationError, setMutationError] = useState(null);

  const onSubmit = (data, id) => {
    updateCat(
      { id, salary: parseFloat(data.salary) },
      {
        onError: (error) => {
          setMutationError(error.message);
        },
        onSuccess: () => {
          setEditingId(null);
          reset();
          setMutationError(null);
        },
      }
    );
  };

  const handleDelete = (id) => {
    deleteCat(id, {
      onError: (error) => {
        setMutationError(error.message);
      },
      onSuccess: () => {
        setMutationError(null);
      },
    });
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Spy Cats List</h2>
      <ErrorDisplay
        message={fetchError?.message}
        onRetry={() => {
          refetch();
          setMutationError(null);
        }}
      />
      <ErrorDisplay message={mutationError} />
      {cats && cats.length === 0 ? (
        <p className="text-gray-500">No spy cats found.</p>
      ) : (
        <ul className="space-y-4">
          {cats?.map((cat) => (
            <li
              key={cat.id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{cat.name}</p>
                <p className="text-sm text-gray-600">Breed: {cat.breed}</p>
                <p className="text-sm text-gray-600">
                  Experience: {cat.yearsOfExperience} years
                </p>
                {editingId === cat.id ? (
                  <form
                    onSubmit={handleSubmit((data) => onSubmit(data, cat.id))}
                    className="mt-2"
                  >
                    <input
                      type="number"
                      step="0.01"
                      {...register("salary", { required: true })}
                      defaultValue={cat.salary}
                      className="border p-1 rounded"
                      placeholder="New Salary"
                      disabled={isUpdating}
                    />
                    <button
                      type="submit"
                      disabled={isUpdating}
                      className="ml-2 bg-blue-500 text-white px-2 py-1 rounded disabled:bg-gray-400"
                    >
                      {isUpdating ? "Saving..." : "Save"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="ml-2 bg-gray-500 text-white px-2 py-1 rounded"
                      disabled={isUpdating}
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <p className="text-sm text-gray-600">
                    Salary: ${Number(cat.salary).toFixed(2)}
                  </p>
                )}
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => setEditingId(cat.id)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                  disabled={isUpdating || isDeleting}
                >
                  Edit Salary
                </button>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  disabled={isDeleting || isUpdating}
                >
                  {isDeleting && editingId === cat.id
                    ? "Deleting..."
                    : "Delete"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CatList;
