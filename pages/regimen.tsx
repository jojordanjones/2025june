import { useState } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import CommandPalette from '../components/CommandPalette'

interface Week {
  week: number
  morning: number
  midday: number
  total: number
  feelings: string
}

const weeks: Week[] = [
  { week: 1, morning: 15, midday: 15, total: 30, feelings: 'slight afternoon lethargy; NAC may reduce irritability; sleep improves from Mg.' },
  { week: 2, morning: 15, midday: 15, total: 30, feelings: 'slight afternoon lethargy; NAC may reduce irritability; sleep improves from Mg.' },
  { week: 3, morning: 10, midday: 15, total: 25, feelings: 'earlier natural wake-up; monitor BP; cravings surge late afternoon—use walk + sparkling water.' },
  { week: 4, morning: 10, midday: 15, total: 25, feelings: 'earlier natural wake-up; monitor BP; cravings surge late afternoon—use walk + sparkling water.' },
  { week: 5, morning: 10, midday: 10, total: 20, feelings: 'more vivid dreams; energy dips around 15:00—caffeine ≤ 100 mg green tea OK before 13:00.' },
  { week: 6, morning: 10, midday: 10, total: 20, feelings: 'more vivid dreams; energy dips around 15:00—caffeine ≤ 100 mg green tea OK before 13:00.' },
  { week: 7, morning: 5, midday: 10, total: 15, feelings: 'expect short focus lapses; use Pomodoro timer; Vitamin C helps clear lingering stim.' },
  { week: 8, morning: 5, midday: 10, total: 15, feelings: 'expect short focus lapses; use Pomodoro timer; Vitamin C helps clear lingering stim.' },
  { week: 9, morning: 5, midday: 5, total: 10, feelings: 'baseline mood stabilising; light exercise feels easier; melatonin may be reduced to 0.5 mg.' },
  { week: 10, morning: 5, midday: 5, total: 10, feelings: 'baseline mood stabilising; light exercise feels easier; melatonin may be reduced to 0.5 mg.' },
  { week: 11, morning: 5, midday: 0, total: 5, feelings: 'natural dopamine pathways recalibrate; keep hydration high; keep Mg & NAC 4–6 wks longer.' },
  { week: 12, morning: 0, midday: 0, total: 0, feelings: 'natural dopamine pathways recalibrate; keep hydration high; keep Mg & NAC 4–6 wks longer.' },
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
      'Acidifies urine → increased amphetamine clearance and may blunt late-day rebound; antioxidant in withdrawal.',
    safety:
      'Large (>1 g) doses can cut doxycycline AUC; give ≥ 2 h after doxy. Safe in tumour unless on kidney-oxalate watch list.',
    verdict: 'OK (keep 500 mg, time-separate from doxy)'
  },
  {
    nutrient: 'N-Acetyl-Cysteine',
    dose: '600 mg BID',
    evidence:
      'Meta-analysis shows modest craving reduction in stimulant & cocaine users.',
    safety:
      'No interaction with FTC/TDF, doxy, or tadalafil; well-tolerated. Caution if severe asthma or on nitroglycerin.',
    verdict: 'OK'
  },
  {
    nutrient: 'Magnesium glycinate / bisglycinate',
    dose: '300–400 mg elemental qHS',
    evidence: 'Small RCTs show decreased sleep latency & blood pressure.',
    safety:
      'Chelates tetracyclines: give ≥ 2 h after doxy bedtime dose. No issues with FTC/TDF or tadalafil.',
    verdict: 'OK'
  },
  {
    nutrient: 'Melatonin',
    dose: '0.5–3 mg 30 min before lights out',
    evidence: 'Best-studied non-Rx aid for withdrawal insomnia.',
    safety: 'No interactions.',
    verdict: 'OK'
  }
]

const daily = [
  '06:00 wake, hydrate 500 mL water, light stretching.',
  '06:15 L-Tyrosine 500 mg with protein snack (Weeks 1-4 only).',
  '06:30 first Adderall dose (per taper schedule below).',
  '07:00 breakfast, doxycycline 100 mg.',
  '09:30 Vitamin C 500 mg (≥ 2 h after doxy).',
  '11:00 second Adderall dose (last stimulant of day).',
  '12:30 lunch, NAC 600 mg.',
  '14:00 5-min sunlight break + 250 mL water (supports circadian anchoring).',
  '17:30 dinner.',
  '20:00 Magnesium glycinate 300–400 mg (≥ 2 h after doxy); NAC 600 mg.',
  '20:30 journal 3 lines (energy, mood, sleep cues).',
  '21:30 digital-off, low light.',
  '22:00 Melatonin 0.5–3 mg → lights out.'
]

const tips = [
  'BP & HR – measure 3×/wk; pause taper pace if resting systolic < 100 or > 150.',
  'Sleep log – track latency & night-wakings; adjust melatonin downward if groggy AM.',
  'Hydration – 2.5 L/day helps Adderall clearance and supports Mg absorption.',
  'Doxy spacing – always separate Vitamin C & Mg by ≥ 2 h to protect antibiotic levels.',
  'Magnesium – loose stool = too much; drop to 300 mg elemental.',
  'Tyrosine – stop after Week 4 to let endogenous synthesis normalise.',
  'NAC – rare headache / nausea; halve dose if bothersome.',
  'Tadalafil – no direct clash; but watch BP if combined with Mg (both mildly lower BP).',
  'PrEP – FTC/TDF not affected by these supplements.',
  'Caffeine – cap at 100 mg before 13:00 to avoid sleep interference as natural drive returns.',
  'Exercise – 20 min brisk walk at 14‑15 h blunts craving spikes and lifts BDNF.',
  'Sunlight – 5–10 min within 1 h of waking calibrates cortisol rhythm.',
  'Evening screens – blue-block or off by 21:00 to let melatonin rise.',
  'Alcohol – avoid; it enhances stimulant craving and depletes Mg.',
  'High-tyramine foods – watch blood pressure with tyrosine days (Week 1‑4).',
  'Kidney stones – keep Vitamin C ≤ 1 g/day unless urolithiasis history cleared.',
  'Liver – NAC supports glutathione; labs at baseline and Week 6 if prior hepatic issues.',
  'Mood – if PHQ-9 rises ≥ 10 for two weeks, pause taper and consult prescriber.',
  'Driving – during Weeks 5‑8 attention may dip; plan heavy driving for mornings.',
  'Follow-up – share this schedule with prescribing NP to document OTC choices.'
]

const bottomLine =
  'The regimen, at these doses and times, is consistent with current clinical pharmacology data and your neurologist\'s avoid-list. By spacing Vitamin C and magnesium away from doxycycline, avoiding omega-3/fish-oil, herbs, D and E, and finishing stimulants by 11 am, you minimise interaction and maximise sleep recovery.'

export default function Regimen() {
  const [week, setWeek] = useState(1)
  const info = weeks[week - 1]

  return (
    <>
      <Head>
        <title>Stimulant Taper Regimen</title>
      </Head>
      <Header />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <section>
          <h2 className="text-3xl font-semibold mb-4">Evidence Check</h2>
          <div className="space-y-2">
            {evidence.map(ev => (
              <details key={ev.nutrient} className="border rounded">
                <summary className="cursor-pointer px-4 py-2 bg-accent/20">
                  {ev.nutrient} — {ev.dose}
                </summary>
                <div className="p-4 space-y-2">
                  <p>
                    <strong>Evidence:</strong> {ev.evidence}
                  </p>
                  <p>
                    <strong>Safety:</strong> {ev.safety}
                  </p>
                  <p className="font-semibold">Verdict: {ev.verdict}</p>
                </div>
              </details>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-3xl font-semibold mb-4">Daily Schedule</h2>
          <ol className="list-decimal pl-5 space-y-1">
            {daily.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ol>
        </section>
        <section>
          <h2 className="text-3xl font-semibold mb-4">Week-by-Week Regimen</h2>
          <input
            type="range"
            min={1}
            max={12}
            value={week}
            onChange={e => setWeek(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="mt-4 space-y-1">
            <p className="font-semibold">Week {info.week}</p>
            {info.total > 0 ? (
              <p>
                Adderall: {info.morning} mg 06:30{' '}
                {info.midday > 0 && `+ ${info.midday} mg 11:00`} = {info.total} mg/day
              </p>
            ) : (
              <p>No stimulants</p>
            )}
            <p>{info.feelings}</p>
          </div>
        </section>
        <section>
          <h2 className="text-3xl font-semibold mb-4">Watch-outs & Tips</h2>
          <ol className="list-decimal pl-5 space-y-1">
            {tips.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ol>
        </section>
        <section>
          <h2 className="text-3xl font-semibold mb-4">Bottom line</h2>
          <p>{bottomLine}</p>
        </section>
      </main>
      <CommandPalette />
    </>
  )
}
