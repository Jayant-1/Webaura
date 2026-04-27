import { useState } from 'react'
import BentoSection from './components/BentoSection'
import ComparisonSection from './components/ComparisonSection'
import ContactDrawer from './components/ContactDrawer'
import ContactSection from './components/ContactSection'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import PortfolioSection from './components/PortfolioSection'
import PricingSection from './components/PricingSection'
import WhatsAppFab from './components/WhatsAppFab'
import { useMagnetic } from './hooks/useMagnetic'
import { useScrollReveals } from './hooks/useScrollReveals'

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  useMagnetic()
  useScrollReveals()

  return (
    <div className="min-h-screen overflow-x-hidden bg-primary text-white selection:bg-accent selection:text-white">
      <Navbar onOpenDrawer={() => setDrawerOpen(true)} />
      <main>
        <Hero onOpenDrawer={() => setDrawerOpen(true)} />
        <BentoSection />
        <PortfolioSection />
        <PricingSection onOpenDrawer={() => setDrawerOpen(true)} />
        <ComparisonSection />
        <ContactSection />
      </main>
      <ContactDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <WhatsAppFab />
    </div>
  )
}
