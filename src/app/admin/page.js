import ViewShows from "../components/ViewShows";

export default function AdminPage() {
  

  return (
    <div className="min-w-md max-w-6xl mx-auto p-4  bg-zinc-800 rounded-lg shadow-md">
      <ViewShows pageName="Admin" isAdmin={true} />
    </div>
  );
}
