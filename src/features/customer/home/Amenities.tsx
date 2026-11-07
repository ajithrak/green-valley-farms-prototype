import { Icon } from '@/components/ui/Icon';
import { AMENITIES } from '@/data';
import { SectionHeading } from './SectionHeading';

export function Amenities() {
  return (
    <section className="bg-[#F0F6F3] py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Inside the project" title="Everything your farmland needs, built in" />
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {AMENITIES.map((a) => (
            <li key={a.title} className="bg-white rounded-xl border border-[#DCE4DE] p-5 flex gap-4">
              <span className="w-11 h-11 shrink-0 rounded-xl bg-[#E5F0EA] text-[#1E4A3B] flex items-center justify-center">
                <Icon name={a.icon} className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-bold text-[#0F261E]">{a.title}</h3>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">{a.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
