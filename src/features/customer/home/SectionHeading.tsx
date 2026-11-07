export function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
      <span className="text-xs font-bold uppercase tracking-widest text-[#1E4A3B] block mb-1">{eyebrow}</span>
      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F261E] text-balance">{title}</h2>
      {subtitle && <p className="text-sm sm:text-base text-gray-600 mt-2">{subtitle}</p>}
    </div>
  );
}
