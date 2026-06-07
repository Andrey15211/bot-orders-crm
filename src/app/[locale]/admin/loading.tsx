export default function AdminLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 w-56 rounded bg-slate-200" />
      <div className="mt-3 h-4 w-80 max-w-full rounded bg-slate-200" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-32 rounded-xl bg-slate-200" />
        ))}
      </div>
      <div className="mt-6 h-[460px] rounded-xl bg-slate-200" />
    </div>
  );
}
