import { FAQS } from '@/data';
import { SectionHeading } from './SectionHeading';

export function Faq() {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <SectionHeading eyebrow="Questions" title="Answers before you visit" />
      <div className="space-y-3">
        {FAQS.map((f) => (
          <details key={f.q} className="group bg-white rounded-xl border border-[#DCE4DE] p-4 sm:p-5">
            <summary className="cursor-pointer font-bold text-[#0F261E] list-none flex items-center justify-between gap-4 min-h-[32px]">
              {f.q}
              <span aria-hidden className="text-[#1E4A3B] text-xl transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="text-sm text-gray-600 mt-3 leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
