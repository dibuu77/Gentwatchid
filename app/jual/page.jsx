"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./jual.module.css";

const conditions = [
  ["BARU", "Baru"],
  ["BEKAS_SEPERTI_BARU", "Bekas seperti baru"],
  ["BEKAS_BAIK", "Bekas baik"],
  ["MINUS", "Ada minus"],
];
const brands = ["GARMIN", "AMAZFIT", "COROS", "SUUNTO", "POLAR", "OTHER"];

export default function JualPage() {
  const [formData, setFormData] = useState({
    namaPenjual: "", whatsapp: "", brand: "GARMIN", seri: "",
    condition: "BEKAS_BAIK", physicalCondition: "BEKAS_BAIK",
    screenCondition: "BEKAS_BAIK", batteryCondition: "BEKAS_BAIK",
    strapCondition: "BEKAS_BAIK", unitAge: "", batteryTest: "",
    defects: "", box: true, charger: true, manual: false,
    warrantyCard: false, invoice: false, additionalAccessories: "", price: "",
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const admin = "6289524895412";
    const accessories = [
      formData.box && "Box/Dus",
      formData.charger && "Kabel Charger",
      formData.manual && "Buku Panduan",
      formData.warrantyCard && "Kartu Garansi",
      formData.invoice && "Nota Pembelian",
    ].filter(Boolean);

    const message = `Halo Admin Gent.watchid, saya mau mengajukan penawaran jual unit sportwatch:\n\n` +
      `*Nama Penjual*: ${formData.namaPenjual}\n*No. WA*: ${formData.whatsapp}\n` +
      `*Merek*: ${formData.brand}\n*Seri / Nama Unit*: ${formData.seri}\n\n` +
      `*KONDISI UNIT:*\n*Kondisi Umum*: ${formData.condition}\n` +
      `*Kondisi Fisik*: ${formData.physicalCondition}\n*Kondisi Layar*: ${formData.screenCondition}\n` +
      `*Kondisi Baterai*: ${formData.batteryCondition}\n*Kondisi Strap*: ${formData.strapCondition}\n` +
      `*Usia Unit*: ${formData.unitAge || "-"}\n*Tes Baterai*: ${formData.batteryTest || "-"}\n` +
      `*Catatan Minus*: ${formData.defects || "Tidak ada"}\n\n*KELENGKAPAN:*\n` +
      `*Kelengkapan*: ${accessories.length ? accessories.join(", ") : "Unit saja"}\n` +
      `*Aksesori Tambahan*: ${formData.additionalAccessories || "-"}\n\n` +
      `*Ekspektasi Harga*: Rp${Number(formData.price || 0).toLocaleString("id-ID")}\n\n` +
      `Saya akan melampirkan foto unit dan kelengkapannya di obrolan ini. Terima kasih!`;

    window.open(`https://wa.me/${admin}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  const SelectField = ({ name, label }) => (
    <div className={styles.formGroup}>
      <label className={styles.label} htmlFor={name}>{label}</label>
      <select id={name} name={name} value={formData[name]} onChange={handleChange} className={styles.select}>
        {conditions.map(([value, text]) => <option key={value} value={value}>{text}</option>)}
      </select>
    </div>
  );

  return (
    <div className={styles.page}>
      <Header showSearch={false} />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.pageHeader}>
              <span className={styles.eyebrow}>Gent.watchid· SELL YOUR WATCH</span>
              <h1 className={styles.title}>Jual Sportwatch</h1>
              <p className={styles.description}>
                Isi informasi dan kondisi unit dengan lengkap. Detail penawaran akan tersusun otomatis di WhatsApp Admin.
              </p>
            </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNumber}>01</span>
                <div><h2 className={styles.sectionTitle}>Informasi Penjual & Unit</h2><p className={styles.sectionDescription}>Data kontak dan identitas sportwatch yang ingin dijual.</p></div>
              </div>
              <div className={styles.grid2}>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="namaPenjual">Nama Lengkap</label>
                  <input id="namaPenjual" name="namaPenjual" required placeholder="Contoh: Budi Santoso" value={formData.namaPenjual} onChange={handleChange} className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="whatsapp">Nomor WhatsApp</label>
                  <input id="whatsapp" type="tel" name="whatsapp" required placeholder="Contoh: 08123456789" value={formData.whatsapp} onChange={handleChange} className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="brand">Brand</label>
                  <select id="brand" name="brand" value={formData.brand} onChange={handleChange} className={styles.select}>
                    {brands.map((brand) => <option key={brand} value={brand}>{brand}</option>)}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="seri">Seri / Tipe Unit</label>
                  <input id="seri" name="seri" required placeholder="Contoh: Forerunner 265" value={formData.seri} onChange={handleChange} className={styles.input} />
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNumber}>02</span>
                <div><h2 className={styles.sectionTitle}>Kondisi Unit</h2><p className={styles.sectionDescription}>Pilih kondisi yang paling sesuai dengan keadaan unit.</p></div>
              </div>
              <div className={styles.grid2}>
                <SelectField name="condition" label="Kondisi Umum" />
                <SelectField name="physicalCondition" label="Kondisi Fisik Body" />
                <SelectField name="screenCondition" label="Kondisi Layar" />
                <SelectField name="batteryCondition" label="Kondisi Baterai" />
                <SelectField name="strapCondition" label="Kondisi Strap" />
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="unitAge">Usia Pemakaian</label>
                  <input id="unitAge" name="unitAge" placeholder="Contoh: 6 bulan / 1 tahun" value={formData.unitAge} onChange={handleChange} className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="batteryTest">Daya Tahan Baterai</label>
                  <input id="batteryTest" name="batteryTest" placeholder="Contoh: 5 hari (GPS aktif)" value={formData.batteryTest} onChange={handleChange} className={styles.input} />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="defects">Catatan Minus / Kerusakan</label>
                <textarea id="defects" name="defects" rows={3} placeholder="Contoh: Ada goresan tipis di bezel kiri bawah. Kosongkan jika tidak ada." value={formData.defects} onChange={handleChange} className={styles.textarea} />
              </div>
            </section>

            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNumber}>03</span>
                <div><h2 className={styles.sectionTitle}>Kelengkapan & Aksesori</h2><p className={styles.sectionDescription}>Centang barang yang disertakan bersama unit.</p></div>
              </div>
              <div className={styles.checkboxGrid}>
                {[
                  ["box", "Box / Dus"], ["charger", "Kabel Charger"], ["manual", "Buku Panduan"],
                  ["warrantyCard", "Kartu Garansi"], ["invoice", "Nota Pembelian"],
                ].map(([name, label]) => (
                  <label key={name} className={styles.checkboxLabel}>
                    <input type="checkbox" name={name} checked={formData[name]} onChange={handleChange} className={styles.checkboxInput} />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="additionalAccessories">Aksesori Tambahan</label>
                <input id="additionalAccessories" name="additionalAccessories" placeholder="Contoh: Extra strap, screen protector" value={formData.additionalAccessories} onChange={handleChange} className={styles.input} />
              </div>
            </section>

            <section className={styles.priceSection}>
              <div><span className={styles.priceEyebrow}>PENAWARAN HARGA</span><h2 className={styles.sectionTitle}>Ekspektasi Harga</h2><p className={styles.sectionDescription}>Masukkan harga yang kamu harapkan dalam rupiah.</p></div>
              <div className={styles.priceInputWrap}>
                <span className={styles.currency}>Rp</span>
                <input type="number" name="price" min="0" required placeholder="2500000" value={formData.price} onChange={handleChange} className={styles.priceInput} />
              </div>
            </section>

            <div className={styles.submitArea}>
              <p className={styles.submitNote}>Pastikan data sudah benar. Kamu dapat melampirkan foto unit setelah WhatsApp terbuka.</p>
              <button type="submit" className={styles.submitBtn}>Kirim Penawaran via WhatsApp <span aria-hidden="true">↗</span></button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
