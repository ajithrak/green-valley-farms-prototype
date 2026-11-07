import { STATS } from '@/data';

export function StatsStrip() {
  return (
    <section aria-label="Project highlights" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <dl className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#DCE4DE] rounded-2xl overflow-hidden border border-[#DCE4DE]">
        {STATS.map((s) => (
          <div key={s.label} className="bg-white p-5 sm:p-6 text-center">
            <dd className="font-serif text-3xl sm:text-4xl font-bold text-[#1E4A3B]">{s.value}</dd>
            <dt className="text-xs sm:text-sm text-gray-600 mt-1">{s.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
