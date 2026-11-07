import React, { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { formatInr } from '@/utils/currency';
import { useApp } from '@/context/AppContext';

export function PlotMapPage() {
  const { setCustomerPage, setActivePlotNumber, plots, selectedPlot, setSelectedPlot, plotZoom, setPlotZoom } =
    useApp();
  const [view, setView] = useState<'map' | 'grid'>(() =>
    typeof window !== 'undefined' && window.innerWidth < 640 ? 'grid' : 'map',
  );
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="bg-[#0F261E] text-white p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold block">Interactive Map</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold">40 Farmland Plots Layout</h2>
            <p className="text-xs text-emerald-200 mt-1">
              Tap any plot rectangle to view size, facing, and direct transparent price.
            </p>
          </div>
          <div className="flex gap-4 text-xs bg-[#1E4A3B] p-3 rounded-xl border border-emerald-800">
            <div>
              <span className="text-emerald-300 block">Total Plots</span>
              <strong className="text-base text-white">40</strong>
            </div>
            <div className="border-l border-emerald-800 pl-4">
              <span className="text-emerald-300 block">Available</span>
              <strong className="text-base text-emerald-300">
                {plots.filter((p) => p.status === 'available').length}
              </strong>
            </div>
          </div>
        </div>

        {/* Pan & Zoom Controls + SVG Layout Map */}
        <div className="bg-white rounded-2xl border-2 border-[#DCE4DE] overflow-hidden shadow-md p-4 space-y-3">
          <div className="flex justify-between items-center bg-gray-50 p-2 rounded-xl border">
            <span className="text-xs font-bold text-gray-600 flex items-center gap-1.5">
              <Icon name="compass" className="w-4 h-4 text-[#1E4A3B]" />
              Interactive Map Canvas (Pan & Zoom)
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPlotZoom((prev) => Math.min(prev + 0.15, 1.6))}
                className="p-2 border rounded-lg bg-white shadow-xs hover:bg-gray-100"
                title="Zoom In"
                aria-label="Zoom In"
              >
                <Icon name="zoomIn" className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPlotZoom((prev) => Math.max(prev - 0.15, 0.75))}
                className="p-2 border rounded-lg bg-white shadow-xs hover:bg-gray-100"
                title="Zoom Out"
                aria-label="Zoom Out"
              >
                <Icon name="zoomOut" className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPlotZoom(1)}
                className="p-2 border rounded-lg bg-white shadow-xs hover:bg-gray-100"
                title="Reset Zoom"
                aria-label="Reset Zoom"
              >
                <Icon name="rotateCcw" className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold text-gray-700" aria-label="Map legend">
            {[
              ['#2E6B55', '● Available'],
              ['#D69E2E', '◆ Reservation pending'],
              ['#2B6CB0', '■ Booked'],
              ['#C53030', '✕ Sold'],
              ['#718096', '– Blocked'],
            ].map(([c, l]) => (
              <span key={l} className="inline-flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm" style={{ background: c }} />
                {l}
              </span>
            ))}
          </div>
          <div
            className="inline-flex rounded-xl border p-1 bg-gray-50 text-xs font-bold"
            role="group"
            aria-label="Plot view"
          >
            {(['grid', 'map'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                aria-pressed={view === v}
                className={`px-4 py-2 rounded-lg min-h-[40px] capitalize ${view === v ? 'bg-[#1E4A3B] text-white' : 'text-gray-700'}`}
              >
                {v === 'grid' ? 'List view' : 'Map view'}
              </button>
            ))}
          </div>
          {view === 'grid' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {plots.map((plot) => (
                <button
                  key={plot.id}
                  onClick={() => setSelectedPlot(plot)}
                  className="text-left p-3 rounded-xl border bg-white hover:border-[#1E4A3B] space-y-1.5 min-h-[88px]"
                >
                  <div className="flex items-center justify-between gap-2">
                    <strong className="text-sm text-[#0F261E]">{plot.number}</strong>
                    <span className="text-[10px] text-gray-500">{plot.sizeAcres}</span>
                  </div>
                  <StatusBadge type="plot" status={plot.status} size="sm" />
                  <span className="block text-xs font-semibold text-gray-700">{formatInr(plot.priceInr)}</span>
                </button>
              ))}
            </div>
          )}
          <div className={`${view === 'map' ? '' : 'hidden'} overflow-auto max-h-[780px] border rounded-xl`}>
            <div className="mx-auto" style={{ width: `${Math.round(860 * plotZoom)}px` }}>
              <svg
                viewBox="0 0 860 920"
                className="block w-full h-auto bg-white rounded-xl shadow-inner select-none"
                role="img"
                aria-label="Interactive plot layout map"
              >
                <rect x="0" y="0" width="860" height="35" fill="#D8DFDA" />
                <text x="350" y="22" fontSize="13" fontWeight="bold" fill="#1E4A3B">
                  33ft MAIN HIGHWAY AVENUE
                </text>
                <rect x="0" y="190" width="860" height="24" fill="#E2E8E4" />
                <text x="360" y="206" fontSize="11" fontWeight="bold" fill="#5A635E">
                  30ft INTERNAL ROAD
                </text>
                <rect x="0" y="390" width="860" height="24" fill="#E2E8E4" />
                <text x="340" y="406" fontSize="11" fontWeight="bold" fill="#5A635E">
                  33ft CLUBHOUSE AVENUE
                </text>
                <rect x="0" y="620" width="860" height="24" fill="#E2E8E4" />
                <text x="340" y="636" fontSize="11" fontWeight="bold" fill="#5A635E">
                  40ft BOUNDARY BOULEVARD
                </text>

                <rect
                  x="730"
                  y="572"
                  width="120"
                  height="42"
                  rx="14"
                  fill="#BEE3F8"
                  stroke="#3182CE"
                  strokeWidth="1.5"
                />
                <text x="740" y="597" fontSize="10" fontWeight="bold" fill="#2B6CB0">
                  SWEET WATER POND
                </text>
                <rect x="0" y="834" width="860" height="20" fill="#E2E8E4" />
                <text x="350" y="848" fontSize="10" fontWeight="bold" fill="#5A635E">
                  24ft SERVICE ROAD
                </text>

                {plots.map((plot) => {
                  const isSelected = selectedPlot?.id === plot.id;
                  let fill = '#2E6B55';
                  if (plot.status === 'pending') fill = '#D69E2E';
                  if (plot.status === 'booked') fill = '#2B6CB0';
                  if (plot.status === 'sold') fill = '#C53030';
                  if (plot.status === 'blocked') fill = '#718096';
                  if (isSelected) fill = '#ECC94B';

                  return (
                    <g key={plot.id} onClick={() => setSelectedPlot(plot)} className="cursor-pointer">
                      <rect
                        x={plot.x}
                        y={plot.y}
                        width={plot.width}
                        height={plot.height}
                        rx="6"
                        fill={fill}
                        stroke={isSelected ? '#1A211D' : '#FFFFFF'}
                        strokeWidth={isSelected ? 3 : 1.5}
                      />
                      <text
                        x={plot.x + plot.width / 2}
                        y={plot.y + (plot.height > 80 ? 28 : 24)}
                        textAnchor="middle"
                        fontSize="13"
                        fontWeight="bold"
                        fill={isSelected ? '#1A211D' : '#FFFFFF'}
                      >
                        {plot.number}
                      </text>
                      <text
                        x={plot.x + plot.width / 2}
                        y={plot.y + (plot.height > 80 ? 46 : 42)}
                        textAnchor="middle"
                        fontSize="10"
                        fill={isSelected ? '#262A28' : '#F7FAFC'}
                      >
                        {plot.sizeAcres}
                      </text>
                      {plot.height > 60 && (
                        <text
                          x={plot.x + plot.width / 2}
                          y={plot.y + plot.height - 10}
                          textAnchor="middle"
                          fontSize="10"
                          fontWeight="bold"
                          fill={isSelected ? '#262A28' : '#FFFFFF'}
                        >
                          {
                            (
                              {
                                available: '● Open',
                                pending: '◆ Pending',
                                booked: '■ Booked',
                                sold: '✕ Sold',
                                blocked: '– Blocked',
                              } as Record<string, string>
                            )[plot.status]
                          }
                        </text>
                      )}
                      <title>
                        {plot.number} · {plot.status}
                      </title>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>

        {/* Selected Plot Sheet */}
        {selectedPlot && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl border shadow-xl overflow-hidden">
              <div className="p-5 border-b flex items-center justify-between bg-[#F0F6F3]">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-[#1E4A3B] text-white font-serif font-bold text-lg flex items-center justify-center">
                    {selectedPlot.number}
                  </span>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#0F261E]">Plot {selectedPlot.number}</h3>
                    <StatusBadge type="plot" status={selectedPlot.status} size="sm" />
                  </div>
                </div>
                <button onClick={() => setSelectedPlot(null)} className="p-2 text-gray-500 hover:text-gray-700">
                  <Icon name="x" className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5 space-y-4 text-sm">
                <div className="bg-[#DDE9E2]/60 p-4 rounded-xl border flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase font-bold text-gray-600 block">Transparent Price</span>
                    <strong className="text-2xl font-bold text-[#0F261E]">{formatInr(selectedPlot.priceInr)}</strong>
                  </div>
                  <span className="text-xs text-gray-500">All Inclusive</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-500 block">Area:</span>
                    <strong className="text-sm font-bold text-gray-800">
                      {selectedPlot.sizeSqYards} sq.yd ({selectedPlot.sizeAcres})
                    </strong>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-500 block">Facing:</span>
                    <strong className="text-sm font-bold text-gray-800">{selectedPlot.facing} Facing</strong>
                  </div>
                </div>
              </div>

              <div className="p-5 border-t bg-white flex gap-2">
                {selectedPlot.status === 'available' ? (
                  <React.Fragment>
                    <button
                      onClick={() => {
                        const n = selectedPlot.number;
                        setSelectedPlot(null);
                        setActivePlotNumber(n);
                        setCustomerPage('reserve');
                      }}
                      className="flex-1 py-3 rounded-xl bg-[#1E4A3B] text-white font-bold text-sm min-h-[48px]"
                    >
                      Request 7-Day Hold
                    </button>
                    <button
                      onClick={() => {
                        const n = selectedPlot.number;
                        setSelectedPlot(null);
                        setActivePlotNumber(n);
                        setCustomerPage('enquiry');
                      }}
                      className="py-3 px-4 rounded-xl border font-bold text-sm min-h-[48px]"
                    >
                      Book Visit
                    </button>
                  </React.Fragment>
                ) : (
                  <button
                    onClick={() => setSelectedPlot(null)}
                    className="w-full py-3 rounded-xl bg-gray-800 text-white font-bold text-sm min-h-[48px]"
                  >
                    Close
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
