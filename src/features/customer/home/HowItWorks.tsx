import { Icon } from '@/components/ui/Icon';
import { STEPS } from '@/data';
import { SectionHeading } from './SectionHeading';

export function HowItWorks() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <SectionHeading eyebrow="How it works" title="From first visit to registered owner in four steps" />
      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STEPS.map((s, i) => (
          <li key={s.title} className="relative bg-white rounded-2xl border border-[#DCE4DE] p-6 shadow-sm">
            <span className="absolute -top-3 left-6 w-7 h-7 rounded-full bg-[#1E4A3B] text-white text-sm font-bold flex items-center justify-center">
              {i + 1}
            </span>
            <Icon name={s.icon} className="w-7 h-7 text-[#1E4A3B] mb-3" />
            <h3 className="font-serif text-lg font-bold text-[#0F261E]">{s.title}</h3>
            <p className="text-sm text-gray-600 mt-1 leading-relaxed">{s.desc}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
