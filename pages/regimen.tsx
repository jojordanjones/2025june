import { useState } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import CommandPalette from '../components/CommandPalette'

interface CheatItem {
  title: string
  text: string
}

const cheatSheet: CheatItem[] = [
  { title: 'L-Tyrosine 500 mg', text: '(amino-acid precursor) – Tops-up the raw material your brain turns into dopamine and noradrenaline.' },
  { title: 'Vitamin C 500 mg', text: '(antioxidant, urine-acidifier) – Helps clear leftover stimulant so nighttime sleep improves.' },
  { title: 'N-Acetyl-Cysteine 600 mg', text: '(glutathione precursor) – Blunts drug craving loops and supports detox.' },
  { title: 'Magnesium Glycinate 300–400 mg', text: '(night mineral) – Calms the NMDA receptor and relaxes muscles to aid sleep.' },
  { title: 'Melatonin 0.5–3 mg', text: '(sleep hormone) – Tightens circadian rhythm and shortens sleep onset.' }
]

const groundRules = [
  'Finish all Adderall by 11 AM, no exceptions.',
  'Separate doxycycline from Vitamin C and Magnesium by at least 2 hours.',
  'Limit caffeine to one cup before 2 PM.',
  'Hydrate all day: at least half your body-weight in ounces of water.',
  'Morning sunlight: 10 minutes outdoors within 60 minutes of waking.',
  'Evening digital sunset: screens dimmed or filtered by 9 PM.'
]

interface Evidence {
  nutrient: string
  dose: string
  evidence: string
  safety: string
  verdict: string
}

const evidence: Evidence[] = [
  {
    nutrient: 'L-Tyrosine',
    dose: '500 mg AM × 4 wk only',
    evidence:
      'Short-term 100–150 mg/kg boosts catecholamine synthesis and modestly improves cognitive flexibility under depletion.',
    safety:
      'No known tumour-growth effect; no CYP interaction with FTC/TDF, doxy, tadalafil. Avoid in uncontrolled HTN or thyroid disease.',
    verdict: 'OK 4-week primer only'
  },
  {
    nutrient: 'Vitamin C',
    dose: '500 mg BID',
    evidence:
      'Acidifies urine → increased amphetamine clearance and may blunt rebound; antioxidant in withdrawal.',
    safety:
      'Large (>1 g) doses can cut doxycycline AUC; give ≥ 2 h after doxy. Safe in tumour unless on kidney-oxalate watch list.',
    verdict: 'OK (time-separate)'
  },
  {
    nutrient: 'N-Acetyl-Cysteine',
    dose: '600 mg BID',
    evidence:
      'Meta-analysis shows modest craving reduction in stimulant users.',
    safety:
      'No interaction with FTC/TDF, doxy, or tadalafil; well-tolerated. Caution if severe asthma or on nitroglycerin.',
    verdict: 'OK'
  },
  {
    nutrient: 'Magnesium Glycinate',
    dose: '300–400 mg elemental qHS',
    evidence: 'Small RCTs show decreased sleep latency and blood pressure.',
    safety:
      'Chelates tetracyclines: give ≥ 2 h after doxy bedtime dose. No issues with FTC/TDF or tadalafil.',
    verdict: 'OK'
  },
  {
    nutrient: 'Melatonin',
    dose: '0.5–3 mg qHS',
    evidence: 'Best-studied non-Rx aid for withdrawal insomnia.',
    safety: 'No interactions with your listed medications.',
    verdict: 'OK'
  }
]

interface WeekInfo {
  week: number
  dose: string
  feelings: string
}

const weekData: WeekInfo[] = [
  { week: 1, dose: '15 mg (06:30) + 15 mg (11:00) = 30 mg/day', feelings: 'Slight afternoon lethargy; NAC may reduce irritability; sleep improves from Mg.' },
  { week: 2, dose: '15 mg (06:30) + 15 mg (11:00) = 30 mg/day', feelings: 'Slight afternoon lethargy; NAC may reduce irritability; sleep improves from Mg.' },
  { week: 3, dose: '10 mg (06:30) + 15 mg (11:00) = 25 mg/day', feelings: 'Earlier natural wake-up; monitor BP; cravings surge late afternoon—use walk + sparkling water.' },
  { week: 4, dose: '10 mg (06:30) + 15 mg (11:00) = 25 mg/day', feelings: 'Earlier natural wake-up; monitor BP; cravings surge late afternoon—use walk + sparkling water.' },
  { week: 5, dose: '10 mg (06:30) + 10 mg (11:00) = 20 mg/day', feelings: 'More vivid dreams; energy dips around 15:00—caffeine ≤ 100 mg green tea OK before 13:00.' },
  { week: 6, dose: '10 mg (06:30) + 10 mg (11:00) = 20 mg/day', feelings: 'More vivid dreams; energy dips around 15:00—caffeine ≤ 100 mg green tea OK before 13:00.' },
  { week: 7, dose: '5 mg (06:30) + 10 mg (11:00) = 15 mg/day', feelings: 'Expect short focus lapses; use Pomodoro timer; Vitamin C helps clear lingering stim.' },
  { week: 8, dose: '5 mg (06:30) + 10 mg (11:00) = 15 mg/day', feelings: 'Expect short focus lapses; use Pomodoro timer; Vitamin C helps clear lingering stim.' },
  { week: 9, dose: '5 mg (06:30) + 5 mg (11:00) = 10 mg/day', feelings: 'Baseline mood stabilising; light exercise feels easier; melatonin may be reduced to 0.5 mg.' },
  { week: 10, dose: '5 mg (06:30) + 5 mg (11:00) = 10 mg/day', feelings: 'Baseline mood stabilising; light exercise feels easier; melatonin may be reduced to 0.5 mg.' },
  { week: 11, dose: '5 mg single dose (06:30)', feelings: 'Natural dopamine pathways recalibrate; keep hydration high; keep Mg & NAC 4–6 wks longer.' },
  { week: 12, dose: '0 mg - Taper Complete!', feelings: 'Natural dopamine pathways recalibrate; keep hydration high; keep Mg & NAC 4–6 wks longer.' }
]

const dailySchedule = [
  '06:00 Wake, hydrate 500 mL water, light stretching.',
  '06:15 L‑Tyrosine 500 mg with protein snack (Weeks 1‑4 only).',
  '06:30 First Adderall dose (per taper schedule).',
  '07:00 Breakfast, doxycycline 100 mg.',
  '09:30 Vitamin C 500 mg (≥ 2 h after doxy).',
  '11:00 Second Adderall dose (last of day).',
  '12:30 Lunch, NAC 600 mg.',
  '14:00 5‑min sunlight break + 250 mL water.',
  '17:30 Dinner.',
  '20:00 Magnesium glycinate 300–400 mg, NAC 600 mg.',
  '20:30 Journal 3 lines (energy, mood, sleep).',
  '21:30 Digital-off, low light.',
  '22:00 Melatonin 0.5–3 mg → lights out.'
]

const tips = [
  'BP & HR – measure 3×/wk; pause taper if resting systolic < 100 or > 150.',
  'Sleep log – track latency & night-wakings; adjust melatonin downward if groggy.',
  'Hydration – 2.5 L/day helps clearance and Mg absorption.',
  'Doxy spacing – separate Vitamin C & Mg by ≥ 2 h.',
  'Magnesium – loose stool = too much; drop to 300 mg elemental.',
  'Tyrosine – stop after Week 4 to let endogenous synthesis normalise.',
  'NAC – rare headache/nausea; halve dose if bothersome.',
  'Tadalafil – watch BP if combined with Mg.',
  'PrEP – FTC/TDF not affected by these supplements.',
  'Caffeine – cap at 100 mg before 13:00 to avoid sleep interference.'
]

const afterWeek = [
  'Stay on NAC, Vitamin C, Magnesium and Melatonin for another month to lock in sleep and antioxidant balance.',
  'At 4‑week post‑taper visit, let your prescriber decide whether to continue NAC long term.'
]

const bottomLine =
  'The regimen, at these doses and times, is consistent with current clinical pharmacology data. By spacing Vitamin C and magnesium away from doxycycline and finishing stimulants by 11 am, you minimise interaction and maximise sleep recovery.'

export default function Regimen() {
  const [week, setWeek] = useState(1)
  const info = weekData.find(w => w.week === week)!

  return (
    <>
      <Head>
        <title>Stimulant Taper Plan</title>
      </Head>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-12 space-y-16 prose-custom">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Your 12-Week Stimulant Taper Plan</h1>
          <p className="mt-4 text-lg text-slate-600">A science-checked, interactive guide for your taper journey.</p>
        </header>

        <section>
          <h2 className="text-3xl font-bold mb-6 border-b pb-2">0. Supplement Cheat-Sheet</h2>
          <div className="space-y-4">
            {cheatSheet.map(item => (
              <div key={item.title}>
                <h3 className="font-semibold text-lg text-indigo-700">{item.title}</h3>
                <p className="text-slate-700 ml-4">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 border-b pb-2">1. Ground Rules</h2>
          <ul className="list-disc list-inside space-y-2 text-slate-700">
            {groundRules.map(rule => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 border-b pb-2">2. Evidence Check</h2>
          <p className="mb-4 text-slate-600">This table validates the safety and utility of each item at the proposed doses.</p>
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full text-sm divide-y divide-slate-200">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Nutrient / Drug</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Dose</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Evidence</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Safety</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Verdict</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {evidence.map(ev => (
                  <tr key={ev.nutrient}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-800">{ev.nutrient}</td>
                    <td className="px-6 py-4">{ev.dose}</td>
                    <td className="px-6 py-4">{ev.evidence}</td>
                    <td className="px-6 py-4">{ev.safety}</td>
                    <td className="px-6 py-4 font-semibold text-green-600">{ev.verdict}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-2 border-b pb-2">3. Interactive 12-Week Calendar</h2>
          <p className="mb-6 text-slate-600">Select a week to view your specific schedule and what to expect.</p>
          <div className="flex flex-wrap gap-2 mb-8" id="week-selector">
            {weekData.map(w => (
              <button
                key={w.week}
                onClick={() => setWeek(w.week)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${w.week === week ? 'bg-blue-500 text-white font-semibold' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'}`}
              >
                Week {w.week}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4 text-slate-800">Daily Schedule (All Weeks)</h3>
              <ul className="space-y-3 text-sm">
                {dailySchedule.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2 bg-blue-50 p-6 rounded-lg shadow-inner">
              <h3 className="text-xl font-bold mb-4 text-slate-800">Details for Week {week}</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-lg text-blue-800">Adderall Taper</h4>
                  <p className="text-2xl font-bold text-blue-900 mt-1">{info.dose}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-blue-800">Anticipated Feelings</h4>
                  <p className="mt-1 text-slate-700">{info.feelings}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 border-b pb-2">4. After Week 12</h2>
          <ul className="list-disc list-inside space-y-2 text-slate-700">
            {afterWeek.map(line => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 border-b pb-2">5. Watch-outs & Practical Tips</h2>
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 list-decimal list-inside">
            {tips.map((t, i) => (
              <li key={i} className="bg-white p-4 rounded-lg shadow">
                {t}
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Bottom Line</h2>
          <div className="bg-green-50 border-l-4 border-green-500 text-green-800 p-6 rounded-r-lg">
            <p>{bottomLine}</p>
          </div>
        </section>
      </main>
      <CommandPalette />
    </>
  )
}
