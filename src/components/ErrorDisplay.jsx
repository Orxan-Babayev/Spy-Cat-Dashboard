function ErrorDisplay({ message, onRetry }) {
  if (!message) return null;
  return (
    <div className="mt-4 p-4 bg-red-100 text-red-700">
      <p>Error: {message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 bg-red-500 text-white px-2 py-1 rounded"
        >
          Retry
        </button>
      )}
    </div>
  );
}

export default ErrorDisplay;
