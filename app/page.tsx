
import Link from 'next/link';
import './main.css';

// Background dial jam
function WatchDial() {
  const ticks = Array.from({ length: 60 }, (_, i) => i);

  return (
    <svg
      className="watch-bg"
      viewBox="-200 -200 400 400"
      aria-hidden="true"
    >
      <circle r="196" fill="none" stroke="#4f6b4a" strokeWidth="1" />
      <circle
        r="150"
        fill="none"
        stroke="#d9622b"
        strokeWidth="0.6"
        strokeDasharray="2 5"
      />
      <circle r="110" fill="none" stroke="#4f6b4a" strokeWidth="0.6" />

      {ticks.map((i) => {
        const major = i % 5 === 0;

        return (
          <line
            key={i}
            x1="0"
            y1="-190"
            x2="0"
            y2={major ? -168 : -180}
            stroke={major ? '#d9622b' : '#4f6b4a'}
            strokeWidth={major ? 2 : 1}
            transform={`rotate(${i * 6})`}
          />
        );
      })}

      {/* Jarum jam dan menit */}
      <line
        x1="0"
        y1="0"
        x2="-45"
        y2="-60"
        stroke="#4f6b4a"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="0"
        y1="0"
        x2="70"
        y2="-95"
        stroke="#4f6b4a"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Jarum detik */}
      <g className="watch-second">
        <line
          x1="0"
          y1="20"
          x2="0"
          y2="-150"
          stroke="#d9622b"
          strokeWidth="1.2"
        />
      </g>

      <circle r="5" fill="#d9622b" />
    </svg>
  );
}

export default function App() {
  return (
    <>
      <section className="hero">
        <WatchDial />

        <svg
          className="contours"
          viewBox="0 0 1180 420"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M-20 60 Q 300 10 600 60 T 1200 40"
            fill="none"
            stroke="#d9622b"
            strokeWidth="1"
            opacity="0.25"
          />
          <path
            d="M-20 120 Q 300 70 600 120 T 1200 100"
            fill="none"
            stroke="#4f6b4a"
            strokeWidth="1"
            opacity="0.25"
          />
          <path
            d="M-20 340 Q 300 290 600 340 T 1200 320"
            fill="none"
            stroke="#4f6b4a"
            strokeWidth="1"
            opacity="0.2"
          />
          <path
            d="M-20 390 Q 300 350 600 390 T 1200 370"
            fill="none"
            stroke="#d9622b"
            strokeWidth="1"
            opacity="0.2"
          />
        </svg>

        <div className="wrap hero-grid">
          {/* SISI KIRI */}
          <div className="hero-content">
            <div className="hero-kicker">
              <span className="kicker-dot" />
              SECOND SPORTWATCH SPECIALIST
            </div>

            <h1 className="headline">
              Jual Beli
              <br />
              Sportwatch
              <br />
              Tanpa Drama di
              <br />
              <span className="accent">Gent.watchid</span>
            </h1>

            <p className="lede">
              Temukan sportwatch second berkualitas dengan harga
              bersahabat. Setiap unit diperiksa sebelum sampai
              ke tanganmu.
            </p>

            <div className="hero-tags">
              <span>✓ Unit terverifikasi</span>
              <span>✓ Kondisi transparan</span>
            </div>
          </div>

          {/* SISI KANAN */}
          <div className="hero-action">
            <div className="action-heading">
              <span className="action-label">MULAI DI SINI</span>
              <span className="action-number">01 — 04</span>
            </div>

            <p className="action-description">
              Mau mencari jam baru, menjual unit, atau sekadar
              bertanya? Pilih kebutuhanmu.
            </p>

            <div className="brandline">
              <Link href="/main" className="btn btn-primary">
                <span>Lihat Katalog</span>
                <span className="btn-arrow">↗</span>
              </Link>

              <Link href="/jual" className="btn btn-outline">
                <span>Jual Unit</span>
                <span className="btn-arrow">↗</span>
              </Link>

              <Link
                href="https://shopee.co.id/thedonzzO"
                className="btn btn-outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Kunjungi Shopee</span>
                <span className="btn-arrow">↗</span>
              </Link>

              <Link href="/panduan" className="btn btn-outline">
                <span>Panduan Beli / Jual</span>
                <span className="btn-arrow">↗</span>
              </Link>

              <Link
                href="https://wa.me/6289524895412"
                className="btn btn-contact"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Hubungi Admin Gent.watchid</span>
                <span className="btn-arrow">↗</span>
              </Link>
            </div>

            <div className="action-footer">
              <span>Gent.watchid</span>
              <span>YOUR SPORTWATCH PARTNER</span>
            </div>
          </div>
        </div>

        <div className="hero-bottom-note">
          <span>EST. FOR SPORTWATCH ENTHUSIASTS</span>
          <span>GARMIN · COROS </span>
        </div>
      </section>
    </>
  );
}
