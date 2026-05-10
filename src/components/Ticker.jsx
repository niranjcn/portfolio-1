import { siteContent } from '../data/content.js'

function Ticker() {
  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-ink/10 bg-cream/80 py-2">
      <div className="ticker font-mono text-[10px] uppercase tracking-[0.3em]">
        <span>{siteContent.hero.ticker}</span>
        <span>{siteContent.hero.ticker}</span>
      </div>
    </div>
  )
}

export default Ticker
