import ViewShows from "../_components/ViewShows";

export default function Dates() {
  return (
    <div className="container mx-auto px-4">
      <div className="w-full max-w-6xl mx-auto p-4 bg-zinc-800 rounded-lg shadow-md min-h-[60vh]">
        <ViewShows pageName="Próximos shows" isAdmin={false} />
      </div>
    </div>
  );
}
