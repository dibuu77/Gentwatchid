
"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./katalog.module.css";

function WatchDial() {
  const ticks = Array.from({ length: 60 }, (_, i) => i);

  return (
    <svg
      className={styles.watchBg}
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
            stroke={major ? "#d9622b" : "#4f6b4a"}
            strokeWidth={major ? 2 : 1}
            transform={`rotate(${i * 6})`}
          />
        );
      })}

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

      <g className={styles.watchSecond}>
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

function KatalogContent() {
  const [produk, setProduk] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorfetch, setErrorFetch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Semua");

  const searchParams = useSearchParams();

  useEffect(() => {
    const queryFromUrl = searchParams.get("search");

    if (queryFromUrl) {
      setSearchQuery(queryFromUrl);
    }
  }, [searchParams]);

  const fetchProduk = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/katalog");
      const resdata = await res.json();

      if (resdata.success) {
        setProduk(resdata.data);
      } else {
        setErrorFetch(
          resdata.message || resdata.massage || "Gagal memuat data"
        );
      }
    } catch (error) {
      setErrorFetch("Terjadi kesalahan koneksi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduk();
  }, []);

  // Deteksi produk yang tidak tersedia
  const isUnavailable = (item) => {
    const status = String(item.status || "").toLowerCase().trim();

    return (
      item.isAvailable === false ||
      item.available === false ||
      [
        "terjual",
        "tidak tersedia",
        "unavailable",
        "sold",
      ].includes(status)
    );
  };

  // Filter pencarian dan kategori
  const filteredProduk = produk.filter((item) => {
    const query = searchQuery.toLowerCase();

    const nameMatch = item.name?.toLowerCase().includes(query);
    const brandMatch = item.brand?.toLowerCase().includes(query);

    const matchesSearch = nameMatch || brandMatch;
    const unavailable = isUnavailable(item);

    let matchesFilter = false;

    if (activeFilter === "Unavailable") {
      matchesFilter = unavailable;
    } else if (activeFilter === "Semua") {
      matchesFilter = !unavailable;
    } else {
      matchesFilter =
        !unavailable &&
        item.brand?.toUpperCase() === activeFilter.toUpperCase();
    }

    return matchesSearch && matchesFilter;
  });

  // Render kartu produk
  const renderProduct = (item) => {
    let firstImage = null;

    if (Array.isArray(item.images) && item.images.length > 0) {
      firstImage = item.images[0];
    } else if (
      typeof item.images === "string" &&
      item.images.trim() !== ""
    ) {
      firstImage = item.images.split(",")[0].trim();
    }

    const unavailable = isUnavailable(item);

    return (
      <Link
        href={`/main/${item.id}`}
        key={item.id}
        className={styles["card-link"]}
      >
        <div
          className={`${styles.card} ${
            unavailable ? styles["card-unavailable"] : ""
          }`}
        >
          <div
            className={`${styles.thumb} ${
              unavailable ? styles["thumb-unavailable"] : ""
            }`}
          >
            {firstImage ? (
              <img
                src={firstImage}
                alt={item.name}
                className={
                  unavailable ? styles["image-unavailable"] : ""
                }
              />
            ) : (
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--ink-dim)"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="12" r="8" />
                <path
                  d="M12 8v4l2.5 2.5"
                  strokeLinecap="round"
                />
              </svg>
            )}

            {unavailable && (
              <span className={styles["unavailable-badge"]}>
                UNAVAILABLE
              </span>
            )}
          </div>

          <div className={styles.body}>
            <span className={styles.brand}>{item.brand}</span>
            <h3 className={styles.name}>{item.name}</h3>

            <div className={styles["price-row"]}>
              <span className={styles.price}>
                Rp{Number(item.price || 0).toLocaleString("id-ID")}
              </span>

  
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className={styles.page}>
      <Header onSearchChange={setSearchQuery} />

      {/* HERO */}
<section className={styles.hero}>
  <WatchDial />

  <svg
    className={styles.contours}
    viewBox="0 0 1180 420"
    preserveAspectRatio="none"
  >
    <path d="M-20 60 Q 300 10 600 60 T 1200 40"
      fill="none" stroke="#d9622b" strokeWidth="1" opacity="0.25" />
    <path d="M-20 120 Q 300 70 600 120 T 1200 100"
      fill="none" stroke="#4f6b4a" strokeWidth="1" opacity="0.25" />
    <path d="M-20 340 Q 300 290 600 340 T 1200 320"
      fill="none" stroke="#4f6b4a" strokeWidth="1" opacity="0.2" />
    <path d="M-20 390 Q 300 350 600 390 T 1200 370"
      fill="none" stroke="#d9622b" strokeWidth="1" opacity="0.2" />
  </svg>

  <div className={`${styles.wrap} ${styles["hero-grid"]}`}>
    <div className={styles["hero-watches"]}>
      <img
        src="/images/watch/hero-watches.png"
        alt="Sportwatch Garmin dan Coros"
      />
    </div>

    <div className={styles["hero-content"]}>
      <h1 className={`${styles.headline} ${styles.display}`}>
        Sportwatch
        <br />
        Pilihan
        <br />
        <span className={styles.accent}>Harga Bersahabat</span>
      </h1>

      <p className={styles.lede}>
        Jual beli sportwatch second berkualitas — setiap unit
        diperiksa untuk memastikan fungsi dan kondisinya
      </p>
    </div>
  </div>
</section>

      {/* TRUST READOUT */}
      <div className={styles.readout}>
        <div className={styles.track}>
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className={styles.item}>
              <span><b>50+</b> TRANSAKSI</span>
              <span><b>Harga</b> Terbaik</span>
              <span><b>Jaminan</b> Produk</span>
              <span><b>Admin</b> Responsif</span>
            </div>
          ))}
        </div>
      </div>

      {/* PRODUCTS */}
      <section className={styles.products}>
        <div className={styles.wrap}>
          <div className={styles["prod-head"]}>
            <div>
              <div className={`${styles["sec-title"]} ${styles.display}`}>
                Produk unggulan
              </div>

              <div className={styles["sec-sub"]}>
                Update stok terbaru minggu ini
              </div>
            </div>

            {/* 4 TOMBOL FILTER */}
            <div className={styles['filter-tabs']}>
  {["Semua", "GARMIN", "COROS", "Unavailable"].map((filter) => (
    <button
      key={filter}
      type="button"
      className={activeFilter === filter ? styles.on : ""}
      onClick={() => setActiveFilter(filter)}
    >
      {filter}
    </button>
  ))}
</div>
          </div>

          {/* PRODUCT GRID */}
          {loading ? (
            <p className={styles["status-msg"]}>
              Memuat data produk...
            </p>
          ) : errorfetch ? (
            <p className={styles["error-msg"]}>{errorfetch}</p>
          ) : (
            <div className={styles["grid-produk"]}>
              {filteredProduk.length === 0 ? (
                <p className={styles["status-msg"]}>
                  {activeFilter === "Unavailable"
                    ? "Tidak ada produk unavailable."
                    : "Belum ada produk yang tersedia."}
                </p>
              ) : (
                filteredProduk.map(renderProduct)
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function MainPage() {
  return (
    <Suspense fallback={<div>Memuat halaman...</div>}>
      <KatalogContent />
    </Suspense>
  );
}
