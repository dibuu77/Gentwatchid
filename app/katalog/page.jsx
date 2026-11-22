
"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./katalog.module.css";

function KatalogContent() {
  const [produk, setProduk] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorfetch, setErrorFetch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [availabilityFilter, setAvailabilityFilter] = useState(["available"]);
  const [sortByPrice, setSortByPrice] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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
      setErrorFetch("");

      const res = await fetch("/api/katalog");
      const resdata = await res.json();

      if (resdata.success) {
        setProduk(resdata.data);
      } else {
        setErrorFetch(
          resdata.massage || resdata.message || "Gagal memuat data"
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

  // Deteksi status produk
  const isUnavailable = (item) => {
    const status = String(item.status || "")
      .trim()
      .toUpperCase()
      .replace(/[_-]/g, " ");

    return (
      item.isAvailable === false ||
      item.available === false ||
      [
        "UNAVAILABLE",
        "TIDAK TERSEDIA",
        "TERJUAL",
        "SOLD",
        "NOT AVAILABLE",
      ].includes(status)
    );
  };

  // Daftar merek
  const availableBrands = [
    ...new Set(produk.map((item) => item.brand).filter(Boolean)),
  ];

  // Toggle filter merek
  const toggleBrand = (brand) => {
    setSelectedBrands((current) =>
      current.includes(brand)
        ? current.filter((item) => item !== brand)
        : [...current, brand]
    );
  };

  // Toggle filter ketersediaan
  const toggleAvailability = (value) => {
    setAvailabilityFilter((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  };

  // Reset semua filter
  const resetFilters = () => {
    setSelectedBrands([]);
    setAvailabilityFilter(["available"]);
    setSortByPrice("");
  };

  // Filter produk
  const filteredProduk = produk.filter((item) => {
    const query = searchQuery.toLowerCase();

    const nameMatch = item.name?.toLowerCase().includes(query);
    const brandMatch = item.brand?.toLowerCase().includes(query);
    const matchesSearch = nameMatch || brandMatch;

    const matchesBrand =
      selectedBrands.length === 0 ||
      selectedBrands.some(
        (brand) => item.brand?.toUpperCase() === brand.toUpperCase()
      );

    const unavailable = isUnavailable(item);

    const matchesAvailability =
      (availabilityFilter.includes("available") && !unavailable) ||
      (availabilityFilter.includes("unavailable") && unavailable);

    return matchesSearch && matchesBrand && matchesAvailability;
  });

  // Sorting harga
  const sortedAndFilteredProduk = [...filteredProduk].sort((a, b) => {
    const priceA = Number(a.price || 0);
    const priceB = Number(b.price || 0);

    if (sortByPrice === "low-to-high") {
      return priceA - priceB;
    }

    if (sortByPrice === "high-to-low") {
      return priceB - priceA;
    }

    return 0;
  });

  return (
    <div className={styles.page}>
      <Header onSearchChange={setSearchQuery} />

      <section className={styles.products}>
        <div className={styles.wrap}>
          <div className={styles["catalog-layout"]}>

            {/* TOMBOL FILTER MOBILE */}
            <button
              type="button"
              className={styles["mobile-filter-button"]}
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              aria-expanded={showMobileFilters}
            >
              <span>Filter Produk</span>
              <span className={styles["filter-arrow"]}>
                {showMobileFilters ? "▲" : "▼"}
              </span>
            </button>

            {/* SIDEBAR FILTER */}
            <aside
              className={`${styles["filter-sidebar"]} ${
                showMobileFilters ? styles["filter-sidebar-open"] : ""
              }`}
            >
              <div className={styles["filter-heading"]}>
                <h3>Filter Produk</h3>
                <button type="button" onClick={resetFilters}>
                  Reset
                </button>
              </div>

              {/* FILTER HARGA */}
              <div className={styles["filter-section"]}>
                <h4>Urutkan Harga</h4>

                <label className={styles["filter-option"]}>
                  <input
                    type="radio"
                    name="sortPrice"
                    checked={sortByPrice === ""}
                    onChange={() => setSortByPrice("")}
                  />
                  <span>Default</span>
                </label>

                <label className={styles["filter-option"]}>
                  <input
                    type="radio"
                    name="sortPrice"
                    checked={sortByPrice === "low-to-high"}
                    onChange={() => setSortByPrice("low-to-high")}
                  />
                  <span>Harga terendah</span>
                </label>

                <label className={styles["filter-option"]}>
                  <input
                    type="radio"
                    name="sortPrice"
                    checked={sortByPrice === "high-to-low"}
                    onChange={() => setSortByPrice("high-to-low")}
                  />
                  <span>Harga tertinggi</span>
                </label>
              </div>

              {/* FILTER MEREK */}
              <div className={styles["filter-section"]}>
                <h4>Merek</h4>

                {availableBrands.length > 0 ? (
                  availableBrands.map((brand) => (
                    <label
                      key={brand}
                      className={styles["filter-option"]}
                    >
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                      />
                      <span>{brand}</span>
                    </label>
                  ))
                ) : (
                  <p className={styles["filter-empty"]}>
                    Belum ada merek
                  </p>
                )}
              </div>

              {/* FILTER KETERSEDIAAN */}
              <div className={styles["filter-section"]}>
                <h4>Ketersediaan</h4>

                <label className={styles["filter-option"]}>
                  <input
                    type="checkbox"
                    checked={availabilityFilter.includes("available")}
                    onChange={() => toggleAvailability("available")}
                  />
                  <span>Available</span>
                </label>

                <label className={styles["filter-option"]}>
                  <input
                    type="checkbox"
                    checked={availabilityFilter.includes("unavailable")}
                    onChange={() => toggleAvailability("unavailable")}
                  />
                  <span>Unavailable</span>
                </label>
              </div>
            </aside>

            {/* AREA KATALOG */}
            <main className={styles["catalog-main"]}>
              <div className={styles["prod-head"]}>
                <div>
                  <div className={`${styles["sec-title"]} ${styles.display}`}>
                    Katalog Produk
                  </div>

                  {searchQuery ? (
                    <div
                      className={styles["sec-sub"]}
                      style={{ color: "#d9622b", fontWeight: "bold" }}
                    >
                      Hasil Pencarian Produk: &quot;{searchQuery}&quot;
                    </div>
                  ) : (
                    <div className={styles["sec-sub"]}>
                      Daftar stok unit sportwatch terbaru
                    </div>
                  )}
                </div>

                <span className={styles["product-count"]}>
                  {sortedAndFilteredProduk.length} produk
                </span>
              </div>

              {/* DAFTAR PRODUK */}
              <div className={styles["grid-produk"]}>
                {loading ? (
                  <p className={styles["status-msg"]}>
                    Memuat data produk...
                  </p>
                ) : errorfetch ? (
                  <p className={`${styles["status-msg"]} ${styles["error-msg"]}`}>
                    {errorfetch}
                  </p>
                ) : sortedAndFilteredProduk.length === 0 ? (
                  <p className={styles["status-msg"]}>
                    {availabilityFilter.length === 0
                      ? "Pilih ketersediaan produk terlebih dahulu."
                      : "Tidak ada produk yang sesuai dengan filter."}
                  </p>
                ) : (
                  sortedAndFilteredProduk.map((item) => {
                    const unavailable = isUnavailable(item);

                    let firstImage = null;

                    if (Array.isArray(item.images) && item.images.length > 0) {
                      firstImage = item.images[0];
                    } else if (
                      typeof item.images === "string" &&
                      item.images.trim() !== ""
                    ) {
                      firstImage = item.images.split(",")[0].trim();
                    }

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
                                  unavailable
                                    ? styles["image-unavailable"]
                                    : ""
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
                                Rp
                                {Number(item.price || 0).toLocaleString("id-ID")}
                              </span>

                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })
                )}
              </div>
            </main>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function KatalogPage() {
  return (
    <Suspense fallback={<div>Memuat halaman...</div>}>
      <KatalogContent />
    </Suspense>
  );
}
