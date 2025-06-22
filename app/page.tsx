import Header from "./components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="container py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-6">
            Your travel companion for memorable journeys
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            Plan, organize, and share your travel experiences with friends and
            family.
          </p>
          <div className="h-80 bg-slate-100 rounded-lg flex items-center justify-center">
            <p className="text-slate-500">Travel imagery will go here</p>
          </div>
        </div>
      </main>
    </>
  );
}
