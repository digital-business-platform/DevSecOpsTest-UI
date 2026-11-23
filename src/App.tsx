import { useEffect, useState } from 'react'
import {
  BatteryFull,
  Bell,
  CaretDown,
  Car,
  CellSignalFull,
  ChatCenteredDots,
  Clock,
  Compass,
  Funnel,
  House,
  LightbulbFilament,
  MagnifyingGlass,
  MapPin,
  QrCode,
  SealCheck,
  SortAscending,
  Timer,
  UserCircle,
  WifiHigh,
  X,
  XCircle,
  type Icon,
} from '@phosphor-icons/react'

type TripStatus = 'accepted' | 'rejected' | 'pending'

type Trip = {
  id: string
  station: string
  distance: string
  plate: string
  model: string
  pickup: string
  status: TripStatus
}

const stats = [
  { label: 'ASSIGNED', value: '24' },
  { label: 'PENDING', value: '02' },
  { label: 'COMPLETED', value: '22' },
]

const trips: Trip[] = [
  {
    id: 'trip-1',
    station: 'MSIL • SEC - 15',
    distance: '4.2km • 20 mins',
    plate: 'HR 26 CJ 7823',
    model: 'Dzire LXi MT',
    pickup: 'Pick up • 21 Aug 2026 | 9am',
    status: 'accepted',
  },
  {
    id: 'trip-2',
    station: 'MSIL • SEC - 15',
    distance: '4.2km • 20 mins',
    plate: 'HR 26 CJ 7823',
    model: 'Dzire LXi MT',
    pickup: 'Pick up • 21 Aug 2026 | 9am',
    status: 'rejected',
  },
  {
    id: 'trip-3',
    station: 'MSIL • SEC - 15',
    distance: '4.2km • 20 mins',
    plate: 'HR 26 CJ 7823',
    model: 'Victoris LXi MT',
    pickup: 'Pick up • 21 Aug 2026 | 9am',
    status: 'pending',
  },
]

const statusStyles: Record<TripStatus, { label: string; className: string; icon: Icon }> = {
  accepted: { label: 'Accepted', className: 'bg-[#E3F8DA] text-[#257500]', icon: SealCheck },
  rejected: { label: 'Rejected', className: 'bg-[#F8DADA] text-[#C70F12]', icon: XCircle },
  pending: { label: 'Accept in', className: 'bg-[#FFFBEB] text-[#AC6200]', icon: Timer },
}

const ACCEPT_WINDOW_SECONDS = 30

function formatCountdown(totalSeconds: number) {
  const seconds = String(Math.max(0, totalSeconds)).padStart(2, '0')
  return `00:${seconds}`
}

function useCountdown(startSeconds: number) {
  const [remaining, setRemaining] = useState(startSeconds)

  useEffect(() => {
    if (remaining <= 0) return
    const timer = setInterval(() => setRemaining((s) => s - 1), 1000)
    return () => clearInterval(timer)
  }, [remaining])

  return remaining
}

function StatusBar() {
  return (
    <div className="flex h-[54px] items-center justify-between px-7 pt-2 text-[15px] font-bold text-ink">
      <span>9:41</span>
      <div className="flex items-center gap-1.5">
        <CellSignalFull size={16} weight="fill" />
        <WifiHigh size={16} weight="bold" />
        <BatteryFull size={22} weight="fill" />
      </div>
    </div>
  )
}

function Header() {
  return (
    <header className="flex items-center justify-between px-4 pb-3 pt-1">
      <div className="flex items-center gap-2">
        <div className="flex size-9 items-center justify-center rounded-full bg-brand text-sm font-medium text-white">
          R
        </div>
        <div className="text-left">
          <p className="text-sm font-semibold text-ink">Sector 18</p>
          <p className="flex items-center gap-1 text-[11px] font-light text-muted">
            <MapPin size={12} />
            Gurugram, Haryana, India
          </p>
        </div>
      </div>
      <button
        type="button"
        aria-label="Notifications"
        className="flex size-8 items-center justify-center rounded-full bg-white/80 text-ink"
      >
        <Bell size={18} />
      </button>
    </header>
  )
}

function Greeting() {
  return (
    <section className="px-4 text-left">
      <h1 className="text-[22px] font-normal text-ink">Hello Ramesh,</h1>
      <p className="text-xs text-muted">Here’s what your day looks like.</p>
    </section>
  )
}

function StatsCard() {
  return (
    <section className="mx-4 rounded-2xl bg-white p-4 shadow-sm">
      <div className="grid grid-cols-3 divide-x divide-slate-200 text-center">
        {stats.map((stat) => (
          <div key={stat.label} className="px-2">
            <p className="text-base font-medium text-ink">{stat.value}</p>
            <p className="text-[8px] tracking-wide text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-start gap-2 rounded-xl bg-[#FFFBEB] p-3 text-left">
        <LightbulbFilament size={16} className="mt-0.5 shrink-0 text-[#AC6200]" />
        <p className="text-[10px] leading-snug text-muted">
          Every ride brings you one step closer to reaching your goal.
        </p>
      </div>
    </section>
  )
}

function SearchBar() {
  return (
    <div className="flex items-center gap-2">
      <label className="flex h-10 flex-1 items-center gap-2 rounded-full bg-white px-4 text-muted shadow-sm">
        <MagnifyingGlass size={16} />
        <input
          type="search"
          placeholder="Search for a vehicle"
          className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted"
        />
        <X size={14} />
      </label>
      <button
        type="button"
        aria-label="Filter"
        className="flex size-10 items-center justify-center rounded-full bg-white text-ink shadow-sm"
      >
        <Funnel size={18} />
      </button>
      <button
        type="button"
        aria-label="Sort"
        className="flex size-10 items-center justify-center rounded-full bg-white text-ink shadow-sm"
      >
        <SortAscending size={18} />
      </button>
    </div>
  )
}

function FilterChips() {
  const chips = ['Upcoming', 'Pick-up', 'Tomorrow', 'All']
  return (
    <div className="flex gap-2 overflow-x-auto">
      {chips.map((chip, index) => (
        <button
          key={chip}
          type="button"
          className={`flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-xs ${
            index === 0 ? 'bg-brand text-white' : 'bg-white text-ink shadow-sm'
          }`}
        >
          {chip}
          <CaretDown size={10} />
        </button>
      ))}
    </div>
  )
}

function TripCard({ trip }: { trip: Trip }) {
  const isPending = trip.status === 'pending'
  const remaining = useCountdown(isPending ? ACCEPT_WINDOW_SECONDS : 0)
  const status = statusStyles[trip.status]
  const StatusIcon = status.icon

  return (
    <article className="flex flex-col gap-3 rounded-2xl bg-white p-4 text-left shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="flex items-center gap-1 text-[11px] font-semibold text-brand-light">
            <MapPin size={12} />
            {trip.station}
          </p>
          <p className="text-[11px] font-semibold text-muted">{trip.distance}</p>
        </div>
        <span
          className={`flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[11px] font-medium ${status.className}`}
        >
          <StatusIcon size={12} weight="fill" />
          {isPending ? `${status.label} ${formatCountdown(remaining)}` : status.label}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-base font-medium text-ink">{trip.model}</p>
          <p className="text-sm text-muted">{trip.plate}</p>
        </div>
        <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-light to-brand-dark text-white">
          <Car size={24} />
        </div>
      </div>

      <p className="flex items-center gap-1 text-[11px] text-muted">
        <Clock size={12} />
        {trip.pickup}
      </p>

      {isPending && (
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            className="rounded-full border border-brand px-4 py-2 text-sm font-medium text-brand"
          >
            Reject
          </button>
          <button
            type="button"
            className="rounded-full bg-brand px-4 py-2 text-sm font-medium text-white"
          >
            Accept
          </button>
        </div>
      )}
    </article>
  )
}

function TripsSection() {
  return (
    <section className="flex flex-col gap-3 px-4">
      <div className="text-left">
        <h2 className="text-base font-medium text-ink">My Trips</h2>
        <p className="text-xs text-muted">View all your trips for the day</p>
      </div>
      <SearchBar />
      <FilterChips />
      {trips.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}
    </section>
  )
}

function NavItem({ label, icon: Icon, active }: { label: string; icon: Icon; active: boolean }) {
  return (
    <button
      type="button"
      className={`flex w-16 flex-col items-center gap-1 text-xs font-medium ${
        active ? 'text-brand' : 'text-muted'
      }`}
    >
      <Icon size={22} weight={active ? 'fill' : 'regular'} />
      {label}
    </button>
  )
}

function BottomNav() {
  return (
    <nav className="absolute inset-x-4 bottom-4 flex h-16 items-center justify-between rounded-2xl bg-white/70 px-2 shadow-lg backdrop-blur-md">
      <NavItem label="Home" icon={House} active />
      <NavItem label="Trips" icon={Compass} active={false} />
      <button
        type="button"
        aria-label="Scan QR code"
        className="-mt-8 flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-light to-brand text-white shadow-lg"
      >
        <QrCode size={24} />
      </button>
      <NavItem label="Support" icon={ChatCenteredDots} active={false} />
      <NavItem label="Profile" icon={UserCircle} active={false} />
    </nav>
  )
}

export default function App() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-slate-300 p-4">
      <div className="relative h-[812px] w-full max-w-[375px] overflow-hidden rounded-[40px] bg-gradient-to-b from-[#7f96da] via-[#d2dbe7] to-[#f5f5f5] font-sans shadow-2xl">
        <div className="flex h-full flex-col overflow-y-auto pb-28 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <StatusBar />
          <Header />
          <div className="flex flex-col gap-4 pt-2">
            <Greeting />
            <StatsCard />
            <TripsSection />
          </div>
        </div>
        <BottomNav />
      </div>
    </main>
  )
}
