import { ExternalLink } from 'lucide-react'
import BlurImage from './BlurImage'

const cobaltBlur =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeDI9IjEiIHkxPSIwIiB5Mj0iMSI+PHN0b3Agc3RvcC1jb2xvcj0iIzA1MDUwNSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzJENUJGRiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg=='

const portfolio = [
  {
    title: 'Restaurant Growth Engine',
    niche: 'Bookings, menus, reviews, WhatsApp',
    image: '/assets/portfolio-restaurant.png',
    hoverImage: '/assets/portfolio-restaurant-hover.png',
    metric: '2.4x more booking clicks',
    className: 'lg:col-span-2 h-[400px]',
  },
  {
    title: 'Boutique Commerce Story',
    niche: 'Catalogs, arrivals, local delivery',
    image: '/assets/portfolio-boutique.png',
    hoverImage: '/assets/portfolio-boutique-hover.png',
    metric: '31% more inquiry intent',
    className: 'lg:col-span-1 h-[500px]',
  },
]

export default function PortfolioSection() {
  return (
    <section id="services" className="px-container py-section">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase text-accent">Services and portfolio</p>
            <h2 className="mt-4 max-w-[920px] font-display text-[clamp(2.4rem,6vw,6rem)] font-semibold leading-none">
              Built around the buying moments your local customers already have.
            </h2>
          </div>
          <p className="max-w-[410px] text-body-md leading-7 text-muted">
            Each niche gets a custom path: search-ready pages, persuasive service sections, fast
            WhatsApp access, and visual polish that feels bigger than a template.
          </p>
        </div>

        <div className="grid items-start gap-4 lg:grid-cols-3">
          {portfolio.map((item) => (
            <article
              key={item.title}
              className={`reveal group relative overflow-hidden rounded-[8px] border border-white/10 bg-surface ${item.className}`}
            >
              <BlurImage
                src={item.image}
                alt={item.title}
                placeholder={cobaltBlur}
                wrapperClassName="absolute inset-0"
              />
              <img
                src={item.hoverImage}
                alt=""
                className="absolute inset-0 h-full w-full scale-105 object-cover opacity-0 blur-[2px] transition duration-500 ease-out group-hover:scale-100 group-hover:opacity-100"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 z-10 p-[clamp(1rem,3vw,2rem)]">
                <p className="mb-3 font-mono text-xs uppercase text-accent">{item.niche}</p>
                <div className="flex items-end justify-between gap-5">
                  <div>
                    <h3 className="font-display text-[clamp(1.6rem,3vw,3.2rem)] font-semibold leading-none">
                      {item.title}
                    </h3>
                    <p className="mt-4 font-mono text-xs text-muted">{item.metric}</p>
                  </div>
                  <span className="grid size-12 translate-y-3 place-items-center rounded-full bg-white text-primary opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <ExternalLink className="size-5" />
                  </span>
                </div>
              </div>
              <div className="absolute inset-0 z-20 grid place-items-center bg-black/25 opacity-0 transition duration-500 group-hover:opacity-100">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/50 px-5 py-3 text-sm font-semibold backdrop-blur-md">
                  View Demo
                  <ExternalLink className="size-4" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
