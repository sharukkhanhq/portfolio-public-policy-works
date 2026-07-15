import React, { useState, useMemo } from "react";
import {
  Sliders,
  RefreshCw,
  Leaf,
  Coins,
  Trash2,
  ArrowUpRight,
  TrendingUp,
  Info,
  HelpCircle,
  Check,
  Sparkles,
  Percent
} from "lucide-react";

interface RecyclableMaterial {
  key: string;
  name: string;
  defaultPrice: number; // ₹/kg
  share: number; // percentage of the diverted material
  minPrice: number;
  maxPrice: number;
}

const RECYCLABLE_MATERIALS: RecyclableMaterial[] = [
  { key: "plastic_bottles", name: "Plastic Bottles", defaultPrice: 28, share: 15, minPrice: 15, maxPrice: 45 },
  { key: "milk_pouch", name: "Milk Pouch", defaultPrice: 20, share: 8, minPrice: 10, maxPrice: 35 },
  { key: "ld_1_2", name: "LD (I & II)", defaultPrice: 28, share: 12, minPrice: 15, maxPrice: 45 },
  { key: "hm_mix", name: "HM Mix", defaultPrice: 25, share: 10, minPrice: 15, maxPrice: 35 },
  { key: "non_woven", name: "Non-Woven", defaultPrice: 15, share: 5, minPrice: 8, maxPrice: 25 },
  { key: "rafiya", name: "Rafiya", defaultPrice: 22, share: 8, minPrice: 12, maxPrice: 35 },
  { key: "pp_1_2", name: "PP I & PP II", defaultPrice: 40, share: 12, minPrice: 25, maxPrice: 60 },
  { key: "cardboard", name: "Cardboard", defaultPrice: 12, share: 15, minPrice: 5, maxPrice: 25 },
  { key: "mlp", name: "Multi Layer Plastic", defaultPrice: 4, share: 10, minPrice: 1, maxPrice: 12 },
  { key: "print_pp", name: "Print PP", defaultPrice: 35, share: 5, minPrice: 20, maxPrice: 50 },
];

export default function ImpactSimulator() {
  // Base State Parameters (Defaults corresponding to typical urban ward)
  const [population, setPopulation] = useState<number>(1070000);
  const [households, setHouseholds] = useState<number>(260000);
  const [customWasteCheck, setCustomWasteCheck] = useState<boolean>(false);
  const [manualWasteTPD, setManualWasteTPD] = useState<number>(484.19);
  const [wastePerCapita, setWastePerCapita] = useState<number>(0.45); // kg/capita/day
  const [dryWasteFraction, setDryWasteFraction] = useState<number>(50); // % of MSW is dry waste
  const [diversionRate, setDiversionRate] = useState<number>(20); // % diverted to resource recovery (Resource Recovery Rate)
  const [landfillShare, setLandfillShare] = useState<number>(80); // % of total waste sent to landfills

  // Market Rates (INR per kg)
  const [dryWastePricePerKg, setDryWastePricePerKg] = useState<number>(2.08); // default average (between 1.95 and 2.20)
  
  // Custom prices for each recyclable dry waste material type
  const [materialPrices, setMaterialPrices] = useState<Record<string, number>>({
    plastic_bottles: 28,
    milk_pouch: 20,
    ld_1_2: 28,
    hm_mix: 25,
    non_woven: 15,
    rafiya: 22,
    pp_1_2: 40,
    cardboard: 12,
    mlp: 4,
    print_pp: 35,
  });

  // Waste Intensity Monitoring checklist factors
  const [employmentDensity, setEmploymentDensity] = useState<boolean>(false);
  const [commercialFloorSpace, setCommercialFloorSpace] = useState<boolean>(false);
  const [propertyTaxCrossCheck, setPropertyTaxCrossCheck] = useState<boolean>(false);
  const [electricityConsumption, setElectricityConsumption] = useState<boolean>(false);
  const [tourismFootfall, setTourismFootfall] = useState<boolean>(false);
  const [transportHubProximity, setTransportHubProximity] = useState<boolean>(false);

  // Active view inside the simulator
  const [activeSubTab, setActiveSubTab] = useState<"dry-revenue" | "landfill-diversion" | "intensity-dashboard">("dry-revenue");

  // Calculations
  const calculatedWasteTPD = useMemo(() => {
    if (customWasteCheck) {
      return manualWasteTPD;
    }
    return (population * wastePerCapita) / 1000;
  }, [population, wastePerCapita, customWasteCheck, manualWasteTPD]);

  // Waste Intensity Core Metric: Resident Population ÷ Waste Generated (TPD)
  // Expressed as persons per tonne of waste generated.
  const rawWasteIntensity = useMemo(() => {
    if (calculatedWasteTPD <= 0) return 0;
    return population / calculatedWasteTPD;
  }, [population, calculatedWasteTPD]);

  // Adjust Waste Intensity based on checked commercial monitoring parameter factors
  const adjustedWasteIntensity = useMemo(() => {
    let multiplier = 1.0;
    if (employmentDensity) multiplier -= 0.12;
    if (commercialFloorSpace) multiplier -= 0.10;
    if (propertyTaxCrossCheck) multiplier -= 0.05;
    if (electricityConsumption) multiplier -= 0.08;
    if (tourismFootfall) multiplier -= 0.15; // Major tourist zones have high waste generation compared to resident pop
    if (transportHubProximity) multiplier -= 0.08;

    return rawWasteIntensity * Math.max(0.4, multiplier);
  }, [rawWasteIntensity, employmentDensity, commercialFloorSpace, propertyTaxCrossCheck, electricityConsumption, tourismFootfall, transportHubProximity]);

  // 1. Dry Waste Financials
  const dryWasteGeneratedTPD = calculatedWasteTPD * (dryWasteFraction / 100);
  const divertedDryWasteTPD = dryWasteGeneratedTPD * (diversionRate / 100);
  const divertedDryWasteKg = divertedDryWasteTPD * 1000;

  // Daily revenue bounds based on ₹1.95 - ₹2.20 rate or selected rate
  const dryDailyRevenueINR = divertedDryWasteKg * dryWastePricePerKg;
  const dryAnnualRevenueINR = dryDailyRevenueINR * 365;

  // 2. Landfill Diversion and Recyclable Plastics Value (Plastic Composition Study)
  // Total landfilled TPD based on proportion
  const landfillWasteTPD = calculatedWasteTPD * (landfillShare / 100);
  // Diverting 20% of landfill waste (or diversionRate% which defaults to 20%)
  const divertedLandfillTPD = landfillWasteTPD * (diversionRate / 100);
  
  // Breakdown of recyclable plastics as specified in the study for all 10 materials:
  const materialRevenues = useMemo(() => {
    return RECYCLABLE_MATERIALS.map((m) => {
      const price = materialPrices[m.key] ?? m.defaultPrice;
      const tons = divertedDryWasteTPD * (m.share / 100);
      const revenue = tons * 1000 * price;
      return {
        ...m,
        price,
        tons,
        revenue,
      };
    });
  }, [divertedDryWasteTPD, materialPrices]);

  const totalDailyPlasticRevINR = useMemo(() => {
    return materialRevenues.reduce((acc, curr) => acc + curr.revenue, 0);
  }, [materialRevenues]);

  const totalAnnualPlasticRevINR = totalDailyPlasticRevINR * 365;

  // Environmental Metrics
  const carbonOffsetTonsPerYear = divertedDryWasteTPD * 1.5 * 365; // standard conversion of 1.5t CO2 saved per ton recycled

  const resetBaseline = () => {
    setPopulation(1070000);
    setHouseholds(260000);
    setCustomWasteCheck(false);
    setManualWasteTPD(484.19);
    setWastePerCapita(0.45);
    setDryWasteFraction(50);
    setDiversionRate(20);
    setLandfillShare(80);
    setDryWastePricePerKg(2.08);
    setMaterialPrices({
      plastic_bottles: 28,
      milk_pouch: 20,
      ld_1_2: 28,
      hm_mix: 25,
      non_woven: 15,
      rafiya: 22,
      pp_1_2: 40,
      cardboard: 12,
      mlp: 4,
      print_pp: 35,
    });
    setEmploymentDensity(false);
    setCommercialFloorSpace(false);
    setPropertyTaxCrossCheck(false);
    setElectricityConsumption(false);
    setTourismFootfall(false);
    setTransportHubProximity(false);
  };

  return (
    <div id="impact-simulator-container" className="bg-white rounded-xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-100 pb-6" id="sim-main-header">
        <div>
          <span className="text-[10px] font-mono font-bold tracking-wider uppercase bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded border border-indigo-100">
            Audit-Grounded Decision Tool
          </span>
          <h3 className="text-xl font-bold tracking-tight text-indigo-950 mt-2">
            Municipal Waste Audit & Recovery Simulator
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Configure municipal parameters to evaluate revenue potential, analyze landfill diversion offsets, and calculate core <strong>Waste Intensity</strong>. Grounded directly in city-wide municipal solid waste audits and material composition research.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={resetBaseline}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded text-xs font-semibold transition-all"
            title="Reset to default baseline"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Reset Baseline
          </button>
        </div>
      </div>

      {/* Simulator Navigation Subtabs */}
      <div className="flex border-b border-slate-100 p-0.5 bg-slate-50 rounded-md w-full md:w-fit" id="sim-sub-tabs">
        <button
          onClick={() => setActiveSubTab("dry-revenue")}
          className={`flex-1 md:flex-initial px-4 py-2 rounded text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeSubTab === "dry-revenue"
              ? "bg-indigo-900 text-white shadow-sm"
              : "text-slate-600 hover:text-indigo-950"
          }`}
        >
          <Coins className="h-3.5 w-3.5" />
          Dry Waste Revenue
        </button>
        <button
          onClick={() => setActiveSubTab("landfill-diversion")}
          className={`flex-1 md:flex-initial px-4 py-2 rounded text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeSubTab === "landfill-diversion"
              ? "bg-indigo-900 text-white shadow-sm"
              : "text-slate-600 hover:text-indigo-950"
          }`}
        >
          <Trash2 className="h-3.5 w-3.5" />
          Landfill Diversion (Plastics)
        </button>
        <button
          onClick={() => setActiveSubTab("intensity-dashboard")}
          className={`flex-1 md:flex-initial px-4 py-2 rounded text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeSubTab === "intensity-dashboard"
              ? "bg-indigo-900 text-white shadow-sm"
              : "text-slate-600 hover:text-indigo-950"
          }`}
        >
          <Sliders className="h-3.5 w-3.5" />
          Waste Intensity Dashboard
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: BASIC MUNICIPAL DATA INPUTS */}
        <div className="lg:col-span-5 space-y-6 bg-slate-50/50 p-6 rounded-xl border border-slate-100">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Sliders className="h-4 w-4 text-indigo-900" />
            <h4 className="text-xs font-bold tracking-wider text-slate-700 uppercase font-mono">
              Local Body Boundary Parameters
            </h4>
          </div>

          {/* Input 1: Population */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="sim-pop" className="text-xs font-bold text-slate-700">Resident Population</label>
              <span className="text-xs font-mono font-bold text-indigo-900">
                {population.toLocaleString()} residents
              </span>
            </div>
            <input
              type="range"
              id="sim-pop"
              min="20000"
              max="5000000"
              step="20000"
              value={population}
              onChange={(e) => {
                const popVal = Number(e.target.value);
                setPopulation(popVal);
                // Dynamically scale households with population roughly (ratio ~4)
                setHouseholds(Math.round(popVal / 4.1));
              }}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-900"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>20k (Small Town)</span>
              <span>5M (Mega City)</span>
            </div>
          </div>

          {/* Input 2: Households */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="sim-households" className="text-xs font-bold text-slate-700">Estimated Households</label>
              <input
                type="number"
                id="sim-households"
                value={households}
                onChange={(e) => setHouseholds(Math.max(1, Number(e.target.value)))}
                className="w-28 text-right px-2 py-1 text-xs border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-indigo-900 font-mono font-bold text-indigo-900"
              />
            </div>
            <p className="text-[10px] text-slate-400 italic">Used for estimating per-household waste contribution norms.</p>
          </div>

          {/* Input 3: Total Waste Generation Select / Slider */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Daily Waste Calculation Method</span>
              <div className="flex items-center gap-1.5">
                <input
                  type="checkbox"
                  id="custom-waste-toggle"
                  checked={customWasteCheck}
                  onChange={(e) => setCustomWasteCheck(e.target.checked)}
                  className="h-3 w-3 rounded text-indigo-900 focus:ring-indigo-900"
                />
                <label htmlFor="custom-waste-toggle" className="text-[11px] font-semibold text-slate-500 cursor-pointer">
                  Override TPD manually
                </label>
              </div>
            </div>

            {customWasteCheck ? (
              <div className="space-y-2 bg-indigo-50/40 p-3 rounded border border-indigo-100/60">
                <div className="flex items-center justify-between">
                  <label htmlFor="sim-manual-tpd" className="text-[11px] font-bold text-indigo-950">Override Total Waste (TPD)</label>
                  <span className="text-xs font-mono font-bold text-indigo-900">
                    {manualWasteTPD.toFixed(2)} TPD
                  </span>
                </div>
                <input
                  type="range"
                  id="sim-manual-tpd"
                  min="5"
                  max="1000"
                  step="5"
                  value={manualWasteTPD}
                  onChange={(e) => setManualWasteTPD(Number(e.target.value))}
                  className="w-full h-1.5 bg-indigo-100 rounded-lg appearance-none cursor-pointer accent-indigo-900"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="sim-percapita" className="text-xs font-bold text-slate-700">Waste per Capita per Day</label>
                  <span className="text-xs font-mono font-bold text-indigo-900">
                    {wastePerCapita.toFixed(2)} kg
                  </span>
                </div>
                <input
                  type="range"
                  id="sim-percapita"
                  min="0.2"
                  max="1.5"
                  step="0.05"
                  value={wastePerCapita}
                  onChange={(e) => setWastePerCapita(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-900"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>0.2 kg (Low/Rural)</span>
                  <span>1.5 kg (High/Metro)</span>
                </div>
              </div>
            )}
          </div>

          {/* Universal Variable Parameters based on study sub-selection */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <h5 className="text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono">
              Scenario Calibration
            </h5>

            {/* Dry Waste Composition % */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="sim-dry-fraction" className="text-xs font-semibold text-slate-600">Dry Waste Proportion</label>
                <span className="text-xs font-mono font-bold text-indigo-900">{dryWasteFraction}%</span>
              </div>
              <input
                type="range"
                id="sim-dry-fraction"
                min="20"
                max="70"
                step="5"
                value={dryWasteFraction}
                onChange={(e) => setDryWasteFraction(Number(e.target.value))}
                className="w-full h-1 bg-slate-200 roundedappearance-none cursor-pointer accent-indigo-900"
              />
            </div>

            {/* Resource Recovery Rate */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="sim-diversion-rate" className="text-xs font-semibold text-slate-600">Resource Recovery Rate</label>
                <span className="text-xs font-mono font-bold text-indigo-900">{diversionRate}%</span>
              </div>
              <input
                type="range"
                id="sim-diversion-rate"
                min="5"
                max="100"
                step="5"
                value={diversionRate}
                onChange={(e) => setDiversionRate(Number(e.target.value))}
                className="w-full h-1 bg-slate-200 rounded appearance-none cursor-pointer accent-indigo-900"
              />
              <p className="text-[10px] text-slate-500 italic leading-relaxed">
                <strong>Definition:</strong> If {diversionRate}% of the dry waste is diverted properly to resource recovery, then this much will be the potential cost recovery.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: DYNAMIC RESULTS SUBPANELS */}
        <div className="lg:col-span-7 space-y-6">
          {/* TOP SUMMARY STATS GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4" id="sim-metrics-top-summary">
            <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl">
              <span className="text-[9px] font-mono font-bold tracking-wider text-slate-400 uppercase">Daily MSW Generated</span>
              <div className="text-lg font-bold text-indigo-950 mt-1 font-mono">
                {calculatedWasteTPD.toFixed(2)} TPD
              </div>
              <span className="text-[10px] text-slate-500">{(calculatedWasteTPD * 1000).toLocaleString("en-IN")} kg/day</span>
            </div>

            <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl">
              <span className="text-[9px] font-mono font-bold tracking-wider text-slate-400 uppercase">Estimated Dry Waste</span>
              <div className="text-lg font-bold text-indigo-950 mt-1 font-mono">
                {dryWasteGeneratedTPD.toFixed(2)} TPD
              </div>
              <span className="text-[10px] text-slate-500">~{dryWasteFraction}% of total flow</span>
            </div>

            <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl col-span-2 sm:col-span-1">
              <span className="text-[9px] font-mono font-bold tracking-wider text-slate-400 uppercase">Diverted to Recycling</span>
              <div className="text-lg font-bold text-indigo-900 mt-1 font-mono">
                {divertedDryWasteTPD.toFixed(2)} TPD
              </div>
              <span className="text-[10px] text-emerald-600 font-medium">({diversionRate}% target achieved)</span>
            </div>
          </div>

          {/* TAB 1: DRY WASTE REVENUE SIMULATOR */}
          {activeSubTab === "dry-revenue" && (
            <div className="space-y-6 border border-slate-200 p-6 rounded-xl bg-white shadow-sm" id="sim-tab-dry-revenue">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Coins className="h-5 w-5 text-emerald-600" />
                  <h4 className="text-sm font-bold text-indigo-950">Market-Based Revenue Projections</h4>
                </div>
                <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                  ₹195 - ₹220 / 100 kg Rate
                </span>
              </div>

              {/* Slider for Specific Price Calibration */}
              <div className="space-y-2 bg-slate-50 p-4 rounded-lg border border-slate-150">
                <div className="flex items-center justify-between">
                  <label htmlFor="sim-market-price" className="text-xs font-bold text-slate-700">Market Price for Dry Waste (₹/kg)</label>
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    ₹{dryWastePricePerKg.toFixed(2)} per kg
                  </span>
                </div>
                <input
                  type="range"
                  id="sim-market-price"
                  min="1.50"
                  max="3.50"
                  step="0.05"
                  value={dryWastePricePerKg}
                  onChange={(e) => setDryWastePricePerKg(Number(e.target.value))}
                  className="w-full h-1 bg-emerald-200 rounded appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[9px] text-slate-400 font-mono">
                  <span>₹1.50 (Low Value Mix)</span>
                  <span className="text-emerald-700 font-bold">₹1.95 - ₹2.20 (Municipal Benchmark)</span>
                  <span>₹3.50 (Optimal Segregation)</span>
                </div>
              </div>

              {/* REVENUE CALCULATOR CARD */}
              <div className="bg-gradient-to-br from-indigo-950 to-indigo-900 text-white rounded-xl p-5 border border-indigo-950 flex flex-col justify-between shadow">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-wider uppercase text-indigo-300">
                    Projected Revenue Stream
                  </span>
                  <div className="p-1.5 bg-white/10 text-emerald-400 rounded-lg border border-white/5">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                </div>
                <div className="my-5 grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] text-indigo-300 block uppercase font-mono">Daily Gross Yield</span>
                    <span className="text-xl font-mono font-bold text-emerald-400">
                      ₹{Math.round(dryDailyRevenueINR).toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-indigo-300 block uppercase font-mono">Annualized Potential</span>
                    <span className="text-xl font-mono font-bold text-emerald-400">
                      ₹{(Math.round(dryAnnualRevenueINR / 100000)).toLocaleString("en-IN")} Lakh
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-indigo-200 leading-relaxed border-t border-white/10 pt-3">
                  If 100% of the daily <strong className="text-white">{dryWasteGeneratedTPD.toFixed(1)} tons</strong> of dry waste were fully diverted (no landfill dependency), the annual recovery yields would expand up to <strong className="text-white">₹{Math.round((dryWasteGeneratedTPD * 1000 * dryWastePricePerKg * 365) / 100000).toLocaleString("en-IN")} Lakh</strong> (₹{(dryWasteGeneratedTPD * 1000 * dryWastePricePerKg * 365 / 10000000).toFixed(2)} Crore).
                </div>
              </div>

              <div className="bg-emerald-50/50 rounded-lg p-4 border border-emerald-100 flex items-start gap-3">
                <Info className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-950 leading-relaxed">
                  <strong>Resource Recovery Assessment:</strong>
                  <br />
                  For a ward with 1,070,000 residents generating ~242.10 TPD of dry waste, a 20% Resource Recovery Rate results in 48.42 TPD (48,420 kg) diverted daily. At municipal benchmark rates, this potential recovery yields <strong>₹94,419</strong> to <strong>₹1,06,524</strong> daily (approx. <strong>₹3.45 Crore to ₹3.89 Crore</strong> annually).
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LANDFILL DIVERSION AND RECYCLABLE PLASTIC STREAMS */}
          {activeSubTab === "landfill-diversion" && (
            <div className="space-y-6 border border-slate-200 p-6 rounded-xl bg-white shadow-sm" id="sim-tab-plastics">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Trash2 className="h-5 w-5 text-indigo-900" />
                  <h4 className="text-sm font-bold text-indigo-950">Landfill Recyclables Composition Potential</h4>
                </div>
                <span className="text-xs text-indigo-900 font-bold bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                  Diverted Dry Recyclables Breakdown
                </span>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                Municipalities send up to <strong>80%</strong> of total solid waste streams to landfills. Composition audits verify that solid dry waste contains high-value recyclable components such as various plastics, paper/cardboard, and packaging materials that can be successfully recovered.
              </p>

              {/* Landfill parameter options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-150">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="sim-landfill-share" className="text-xs font-bold text-slate-700">Landfill Disposal Share (%)</label>
                    <span className="text-xs font-mono font-bold text-indigo-900">{landfillShare}%</span>
                  </div>
                  <input
                    type="range"
                    id="sim-landfill-share"
                    min="50"
                    max="95"
                    step="5"
                    value={landfillShare}
                    onChange={(e) => setLandfillShare(Number(e.target.value))}
                    className="w-full h-1 bg-indigo-100 rounded appearance-none cursor-pointer accent-indigo-900"
                  />
                </div>

                <div className="space-y-1 text-xs text-slate-500 pl-2 border-l border-slate-200">
                  <div className="font-bold text-slate-700 mb-1">Diverted Volume Metrics:</div>
                  <div>• Sent to Landfill: <strong>{landfillWasteTPD.toFixed(1)} TPD</strong></div>
                  <div>• Dry Waste Fraction: <strong>{dryWasteGeneratedTPD.toFixed(1)} TPD</strong></div>
                  <div>• Segregated & Diverted: <strong>{divertedDryWasteTPD.toFixed(1)} TPD</strong></div>
                </div>
              </div>

              {/* Dynamic Rates for Key Recyclables */}
              <div className="space-y-3">
                <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase block pl-1">
                  Indian Recycled Market Rates (₹/kg)
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {RECYCLABLE_MATERIALS.map((material) => (
                    <div key={material.key} className="space-y-1.5 p-2.5 bg-white border border-slate-200 rounded-lg flex flex-col justify-between">
                      <span className="text-[10px] font-bold text-slate-500 block truncate" title={material.name}>
                        {material.name} ({material.share}%)
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-slate-400">₹</span>
                        <input
                          type="number"
                          value={materialPrices[material.key] ?? material.defaultPrice}
                          min={material.minPrice}
                          max={material.maxPrice}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setMaterialPrices((prev) => ({
                              ...prev,
                              [material.key]: val,
                            }));
                          }}
                          className="w-full text-right px-1 py-0.5 text-xs border border-slate-200 rounded font-mono font-bold text-indigo-900 focus:outline-none focus:ring-1 focus:ring-indigo-900"
                        />
                      </div>
                      <span className="text-[8px] text-slate-400 block text-center">({material.minPrice}-{material.maxPrice})</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* RECYCLABLE VALUE CARD */}
              <div className="bg-indigo-50 border border-indigo-150 p-5 rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-950">Daily Recovery Yield of Recyclable Dry Waste</span>
                  <span className="text-sm font-mono font-bold text-indigo-900">
                    ₹{Math.round(totalDailyPlasticRevINR).toLocaleString("en-IN")} / day
                  </span>
                </div>

                {/* Micro-bar chart of all 10 materials */}
                <div className="space-y-2.5 text-xs max-h-60 overflow-y-auto pr-1">
                  {materialRevenues.map((m) => (
                    <div key={m.key} className="space-y-1">
                      <div className="flex justify-between items-center text-slate-600 text-[10px]">
                        <span>
                          {m.name} ({m.tons.toFixed(2)} TPD @ ₹{m.price}/kg)
                        </span>
                        <span className="font-mono font-bold text-indigo-900">
                          ₹{Math.round(m.revenue).toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-200 rounded overflow-hidden">
                        <div
                          className="bg-indigo-900 h-full transition-all"
                          style={{
                            width: `${
                              totalDailyPlasticRevINR > 0
                                ? (m.revenue / totalDailyPlasticRevINR) * 100
                                : 0
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-indigo-200/50 pt-3 flex justify-between items-center text-xs">
                  <span className="font-bold text-indigo-950">Annualized Total Recovery Potential:</span>
                  <span className="font-mono font-bold text-indigo-900 text-sm">
                    ₹{(totalAnnualPlasticRevINR / 10000000).toFixed(2)} Crore / Year
                  </span>
                </div>
              </div>

              <div className="bg-amber-50/50 p-4 border border-amber-200/50 rounded-lg flex items-start gap-3">
                <Info className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-950 leading-relaxed">
                  <strong>Challenge Warning (Over 70% MLP):</strong> Multi-Layered Plastics (MLP) dominate over 70% of the dry waste fraction, presenting a zero-recycling processing hurdle. Realizing this simulator's economic potential requires strict separation tables, integration of informal waste-picker co-operatives, and formal cement co-processing networks.
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: WASTE INTENSITY MONITORING DASHBOARD */}
          {activeSubTab === "intensity-dashboard" && (
            <div className="space-y-6 border border-slate-200 p-6 rounded-xl bg-white shadow-sm" id="sim-tab-intensity">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Sliders className="h-5 w-5 text-indigo-900" />
                  <h4 className="text-sm font-bold text-indigo-950">Waste Intensity & Zonal Monitoring Audit</h4>
                </div>
                <div className="p-1.5 bg-indigo-50 text-indigo-900 rounded-md">
                  <Percent className="h-4 w-4" />
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-xl border border-slate-150 space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                  <div>
                    <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wide">Core Metric: Waste Intensity</h5>
                    <p className="text-[11px] text-slate-500 mt-0.5">Formula: Resident Population ÷ Daily Generated Waste (Tonnes)</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-mono font-bold text-indigo-950">
                      {adjustedWasteIntensity.toFixed(1)}
                    </div>
                    <span className="text-[10px] text-slate-500 font-semibold uppercase">Persons / Tonne Generated</span>
                  </div>
                </div>

                {/* Gauge Indicator */}
                <div className="space-y-1.5">
                  <div className="h-3.5 w-full bg-slate-200 rounded-full overflow-hidden flex text-[9px] font-mono font-bold text-white text-center">
                    <div className="bg-amber-500 h-full flex items-center justify-center transition-all" style={{ width: "35%" }}>
                      High Commercial / Floating Pop (&lt;800)
                    </div>
                    <div className="bg-indigo-900 h-full flex items-center justify-center transition-all border-l border-white/20" style={{ width: "35%" }}>
                      Normal Residential (800 - 1200)
                    </div>
                    <div className="bg-emerald-600 h-full flex items-center justify-center transition-all border-l border-white/20" style={{ width: "30%" }}>
                      Low Intensity Residential (&gt;1200)
                    </div>
                  </div>
                  
                  {/* Indicator Pin */}
                  <div className="flex justify-between items-center text-xs font-semibold px-2">
                    <span className="text-amber-600">Zonal Deviation Area</span>
                    <span className="text-indigo-900 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded font-bold font-mono">
                      Current: {adjustedWasteIntensity < 800 ? "⚠️ High Non-Residential Deviation" : adjustedWasteIntensity > 1200 ? "✅ Residential Scale" : "● Standard Balanced Zone"}
                    </span>
                    <span className="text-emerald-700">Residential</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 leading-relaxed border-t border-slate-200/60 pt-3">
                  Persons per tonne ratio <strong>falls</strong> in zones where waste generation is disproportionately high relative to residents (e.g. in dense commercial areas where daytime employment, retail, and hospitality activities create high floating loads independent of the resident count).
                </p>
              </div>

              {/* Proposed Monitoring Parameters checklists to dynamically alter intensity */}
              <div className="space-y-3">
                <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase block pl-1">
                  Proposed monitoring parameters to track zonal deviations
                </span>
                <p className="text-xs text-slate-500 leading-relaxed mb-3">
                  Select parameters observed in this ward to simulate how they offset local resident expectations and reveal "floating" non-residential loads:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3" id="sim-checkbox-grid">
                  <div
                    onClick={() => setEmploymentDensity(!employmentDensity)}
                    className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-2.5 ${
                      employmentDensity ? "bg-indigo-50/50 border-indigo-200" : "bg-white border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className={`mt-0.5 h-4 w-4 rounded border flex items-center justify-center shrink-0 ${
                      employmentDensity ? "bg-indigo-900 text-white border-indigo-900" : "border-slate-300"
                    }`}>
                      {employmentDensity && <Check className="h-3 w-3" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">Employment Density</div>
                      <p className="text-[10px] text-slate-500 leading-normal mt-0.5">Jobs per km² proxies daytime working population.</p>
                    </div>
                  </div>

                  <div
                    onClick={() => setCommercialFloorSpace(!commercialFloorSpace)}
                    className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-2.5 ${
                      commercialFloorSpace ? "bg-indigo-50/50 border-indigo-200" : "bg-white border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className={`mt-0.5 h-4 w-4 rounded border flex items-center justify-center shrink-0 ${
                      commercialFloorSpace ? "bg-indigo-900 text-white border-indigo-900" : "border-slate-300"
                    }`}>
                      {commercialFloorSpace && <Check className="h-3 w-3" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">Commercial Floor Space</div>
                      <p className="text-[10px] text-slate-500 leading-normal mt-0.5">Retail and office sq. footage captures commercial activity.</p>
                    </div>
                  </div>

                  <div
                    onClick={() => setPropertyTaxCrossCheck(!propertyTaxCrossCheck)}
                    className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-2.5 ${
                      propertyTaxCrossCheck ? "bg-indigo-50/50 border-indigo-200" : "bg-white border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className={`mt-0.5 h-4 w-4 rounded border flex items-center justify-center shrink-0 ${
                      propertyTaxCrossCheck ? "bg-indigo-900 text-white border-indigo-900" : "border-slate-300"
                    }`}>
                      {propertyTaxCrossCheck && <Check className="h-3 w-3" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">Property Tax Database</div>
                      <p className="text-[10px] text-slate-500 leading-normal mt-0.5">Cross-checks declared land-use mix against actual loads.</p>
                    </div>
                  </div>

                  <div
                    onClick={() => setElectricityConsumption(!electricityConsumption)}
                    className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-2.5 ${
                      electricityConsumption ? "bg-indigo-50/50 border-indigo-200" : "bg-white border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className={`mt-0.5 h-4 w-4 rounded border flex items-center justify-center shrink-0 ${
                      electricityConsumption ? "bg-indigo-900 text-white border-indigo-900" : "border-slate-300"
                    }`}>
                      {electricityConsumption && <Check className="h-3 w-3" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">Electricity Consumption</div>
                      <p className="text-[10px] text-slate-500 leading-normal mt-0.5">Commercial/industrial connections proxy active throughput.</p>
                    </div>
                  </div>

                  <div
                    onClick={() => setTourismFootfall(!tourismFootfall)}
                    className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-2.5 ${
                      tourismFootfall ? "bg-indigo-50/50 border-indigo-200" : "bg-white border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className={`mt-0.5 h-4 w-4 rounded border flex items-center justify-center shrink-0 ${
                      tourismFootfall ? "bg-indigo-900 text-white border-indigo-900" : "border-slate-300"
                    }`}>
                      {tourismFootfall && <Check className="h-3 w-3" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">Tourism & Footfall (Hotels/Beaches)</div>
                      <p className="text-[10px] text-slate-500 leading-normal mt-0.5">Explains seasonal/visitor-driven waste spikes (e.g. Marina Beach).</p>
                    </div>
                  </div>

                  <div
                    onClick={() => setTransportHubProximity(!transportHubProximity)}
                    className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-2.5 ${
                      transportHubProximity ? "bg-indigo-50/50 border-indigo-200" : "bg-white border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className={`mt-0.5 h-4 w-4 rounded border flex items-center justify-center shrink-0 ${
                      transportHubProximity ? "bg-indigo-900 text-white border-indigo-900" : "border-slate-300"
                    }`}>
                      {transportHubProximity && <Check className="h-3 w-3" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">Transport Hub Proximity</div>
                      <p className="text-[10px] text-slate-500 leading-normal mt-0.5">Transit nodes generate concentrated waste independent of residents.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CO2 and landfill environmental offset bar footer */}
      <div className="border-t border-slate-100 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500" id="sim-footer-co2">
        <div className="flex items-center gap-2">
          <Leaf className="h-4 w-4 text-emerald-600" />
          <span>
            Diverting solid waste from open fires and unmanaged landfills results in an estimated annual offset of <strong className="text-slate-800 font-semibold">{Math.round(carbonOffsetTonsPerYear).toLocaleString()} MT CO₂ Equivalent</strong>.
          </span>
        </div>
        <div className="text-[10px] font-mono text-slate-400 bg-slate-50 border border-slate-150 px-2 py-1 rounded">
          Baseline models adjusted to standard municipal cost structures
        </div>
      </div>
    </div>
  );
}
