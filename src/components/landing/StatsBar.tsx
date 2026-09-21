export default function StatsBar() {
  return (
    <section className="border-y border-slate-200 bg-white/90 py-8 px-4 backdrop-blur-md sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-[1320px] grid-cols-2 gap-6 text-center sm:grid-cols-4 sm:gap-8">
        <div className="p-2">
          <div className="font-mono text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            500<span className="text-indigo-600">+</span>
          </div>
          <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            Homes &amp; Facilities Protected
          </div>
        </div>
        <div className="p-2">
          <div className="font-mono text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            60–80<span className="text-indigo-600">%</span>
          </div>
          <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            Diesel &amp; Grid Cost Cut
          </div>
        </div>
        <div className="p-2">
          <div className="font-mono text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            &lt;5<span className="text-indigo-600">ms</span>
          </div>
          <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            Switchover Latency
          </div>
        </div>
        <div className="p-2">
          <div className="font-mono text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            500<span className="text-indigo-600">kVA+</span>
          </div>
          <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            Modular Scalable Range
          </div>
        </div>
      </div>
    </section>
  );
}
