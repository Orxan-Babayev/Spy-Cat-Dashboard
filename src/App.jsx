import CatList from "./components/CatList";
import CatForm from "./components/CatForm";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Spy Cats Dashboard
        </h1>
        <CatForm />
        <CatList />
      </div>
    </div>
  );
}

export default App;
