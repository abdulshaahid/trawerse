export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-accent">404</h1>
        <p className="mt-4 text-xl text-white/80">Page not found</p>
        <a href="/" className="mt-6 inline-block text-accent hover:underline">
          Go back home
        </a>
      </div>
    </div>
  );
}
