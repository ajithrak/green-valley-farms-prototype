import { CONNECTIVITY } from '@/data';
import { SectionHeading } from './SectionHeading';

export function Location() {
  return (
    <section className="bg-[#F0F6F3] py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Location"
          title="Peaceful farmland, reachable in under an hour from the city ring road"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <svg
            viewBox="0 0 400 260"
            className="w-full h-auto rounded-2xl border border-[#DCE4DE] bg-white"
            role="img"
            aria-label="Schematic location map: Outer Ring Road, Chevella Highway and the project site"
          >
            <rect width="400" height="260" fill="#F7FAF8" />
            <path d="M-10 70 Q120 40 210 90 T410 60" fill="none" stroke="#C9D3CD" strokeWidth="10" />
            <text x="18" y="48" fontSize="11" fill="#5A635E" fontWeight="600">
              Outer Ring Road
            </text>
            <path d="M210 90 L300 230" fill="none" stroke="#9AA79F" strokeWidth="8" />
            <text x="262" y="166" fontSize="11" fill="#5A635E" fontWeight="600" transform="rotate(62 262 166)">
              Chevella Highway
            </text>
            <circle cx="210" cy="90" r="6" fill="#718096" />
            <text x="220" y="84" fontSize="11" fill="#2D3A33">
              ORR exit
            </text>
            <circle cx="300" cy="230" r="11" fill="#1E4A3B" />
            <circle cx="300" cy="230" r="20" fill="#1E4A3B" opacity="0.18" />
            <text x="316" y="226" fontSize="12" fontWeight="700" fill="#0F261E">
              Green Valley
            </text>
          </svg>
          <ul className="bg-white rounded-2xl border border-[#DCE4DE] divide-y">
            {CONNECTIVITY.map((c) => (
              <li key={c.place} className="flex items-center justify-between gap-4 p-4 sm:p-5 text-sm">
                <span className="text-gray-700">{c.place}</span>
                <strong className="text-[#1E4A3B] shrink-0">{c.distance}</strong>
              </li>
            ))}
            <li className="p-4 sm:p-5 text-xs text-gray-500">
              Distances are approximate sample values for this prototype.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
