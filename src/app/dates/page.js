import ViewShows from "../_components/ViewShows";

export default function Dates() {
  

  return (
    <div className="min-w-md max-w-6xl mx-auto p-4 bg-zinc-800 rounded-lg shadow-md">
      <ViewShows pageName="Próximos shows" isAdmin={false} />
    </div>
  );
}
