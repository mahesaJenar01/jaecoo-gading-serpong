"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { IconWhatsapp } from "@/components/icons";
import type { OpsiUnit } from "@/data/models";
import { normalizeWaNumber, waContext, waLink } from "@/lib/wa";

/**
 * Formulir pengajuan test drive.
 *
 * Situs ini tidak punya server, database, maupun API route. Formulir bekerja
 * sepenuhnya di sisi klien: isian dirangkai menjadi satu pesan WhatsApp yang
 * rapi, lalu tombol kirim membuka wa.me dengan pesan tersebut sudah terisi.
 * Tidak ada data yang dikirim ke mana pun selain ke WhatsApp pemilik situs.
 *
 * Seluruh label, opsi, dan teks statis tetap ada di HTML awal karena
 * komponen client tetap dirender di server saat build.
 */

const WAKTU = ["Pagi", "Siang", "Sore"] as const;
const LAINNYA = "Lainnya";

type Errors = Partial<
  Record<
    "nama" | "nomor" | "unit" | "lokasi" | "lokasiLain" | "tanggal" | "waktu",
    string
  >
>;

export function TestDriveForm({
  unitOptions,
  areaOptions,
}: {
  unitOptions: OpsiUnit[];
  areaOptions: readonly string[];
}) {
  const [nama, setNama] = useState("");
  const [nomor, setNomor] = useState("");
  const [unit, setUnit] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [lokasiLain, setLokasiLain] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [waktu, setWaktu] = useState("");
  const [catatan, setCatatan] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [minTanggal, setMinTanggal] = useState("");

  // Tanggal minimum dihitung setelah komponen terpasang di browser, supaya
  // hasil render di server dan di browser tidak berbeda karena zona waktu.
  useEffect(() => {
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    setMinTanggal(
      `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`,
    );
  }, []);

  const lokasiFinal = lokasi === LAINNYA ? lokasiLain.trim() : lokasi;

  const pesan = useMemo(() => {
    return [
      "Halo Mahesa, saya mau ajukan test drive.",
      `Nama: ${nama.trim() || "-"}`,
      `WhatsApp: ${nomor.trim() ? normalizeWaNumber(nomor) : "-"}`,
      `Unit: ${unit || "-"}`,
      `Lokasi: ${lokasiFinal || "-"}`,
      `Tanggal: ${tanggal || "-"}`,
      `Waktu: ${waktu || "-"}`,
      `Catatan: ${catatan.trim() || "-"}`,
      "(dikirim dari halaman Test Drive)",
    ].join("\n");
  }, [nama, nomor, unit, lokasiFinal, tanggal, waktu, catatan]);

  function validate(): Errors {
    const e: Errors = {};
    if (nama.trim().length < 2) e.nama = "Isi nama lengkap Anda.";

    const digits = normalizeWaNumber(nomor).replace(/\D/g, "");
    if (!nomor.trim()) e.nomor = "Isi nomor WhatsApp Anda.";
    else if (digits.length < 10)
      e.nomor = "Nomor WhatsApp sepertinya kurang lengkap.";

    if (!unit) e.unit = "Pilih unit yang ingin Anda coba.";
    if (!lokasi) e.lokasi = "Pilih lokasi test drive.";
    if (lokasi === LAINNYA && !lokasiLain.trim())
      e.lokasiLain = "Tuliskan lokasi yang Anda inginkan.";
    if (!tanggal) e.tanggal = "Pilih tanggal yang Anda inginkan.";
    if (!waktu) e.waktu = "Pilih rentang waktu yang Anda inginkan.";
    return e;
  }

  function onSubmit(ev: FormEvent<HTMLFormElement>) {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) {
      ev.preventDefault();
      const pertama = document.querySelector<HTMLElement>("[aria-invalid='true']");
      pertama?.focus();
      return;
    }
    // Valid: biarkan tautan pada tombol kirim yang membuka WhatsApp.
    ev.preventDefault();
    window.open(waLink(pesan), "_blank", "noopener");
  }

  const err = (key: keyof Errors) => errors[key];
  const describedBy = (key: keyof Errors, extra?: string) =>
    [err(key) ? `${key}-error` : null, extra].filter(Boolean).join(" ") ||
    undefined;

  return (
    <form onSubmit={onSubmit} noValidate className="mt-8">
      <div className="flex flex-col gap-6">
        <Field
          label="Nama lengkap"
          htmlFor="nama"
          error={err("nama")}
          wajib
        >
          <input
            id="nama"
            name="nama"
            type="text"
            autoComplete="name"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            aria-invalid={err("nama") ? true : undefined}
            aria-describedby={describedBy("nama")}
            className={inputClass(!!err("nama"))}
          />
        </Field>

        <Field
          label="Nomor WhatsApp"
          htmlFor="nomor"
          error={err("nomor")}
          hint="Contoh 0813 1323 2519. Awalan 0 otomatis diubah menjadi 62."
          wajib
        >
          <input
            id="nomor"
            name="nomor"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={nomor}
            onChange={(e) => setNomor(e.target.value)}
            aria-invalid={err("nomor") ? true : undefined}
            aria-describedby={describedBy("nomor", "nomor-hint")}
            className={inputClass(!!err("nomor"))}
          />
        </Field>

        <Field label="Unit yang ingin dicoba" htmlFor="unit" error={err("unit")} wajib>
          <select
            id="unit"
            name="unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            aria-invalid={err("unit") ? true : undefined}
            aria-describedby={describedBy("unit", "unit-hint")}
            className={inputClass(!!err("unit"))}
          >
            <option value="">Pilih unit</option>
            {unitOptions.map((o) => (
              <option key={o.value} value={o.value} disabled={!o.tersedia}>
                {o.tersedia ? o.label : `${o.label} (${o.catatan.toLowerCase()})`}
              </option>
            ))}
          </select>

          <ul id="unit-hint" className="t-small mt-2 flex flex-col gap-1 text-muted">
            {unitOptions
              .filter((o) => !o.tersedia)
              .map((o) => (
                <li key={o.value}>
                  {o.label}: {o.catatan}
                </li>
              ))}
          </ul>

          <a
            href={waLink(waContext.testDriveUnitLain)}
            target="_blank"
            rel="noopener"
            aria-label="Chat WhatsApp Mahesa Jenar untuk menanyakan jadwal unit yang belum tersedia"
            className="t-small mt-2 inline-flex min-h-[44px] items-center font-semibold text-brand underline underline-offset-2 hover:text-brand-hover"
          >
            Unit yang Anda cari belum tersedia? Tanya jadwalnya
          </a>
        </Field>

        <Field label="Lokasi test drive" htmlFor="lokasi" error={err("lokasi")} wajib>
          <select
            id="lokasi"
            name="lokasi"
            value={lokasi}
            onChange={(e) => setLokasi(e.target.value)}
            aria-invalid={err("lokasi") ? true : undefined}
            aria-describedby={describedBy("lokasi")}
            className={inputClass(!!err("lokasi"))}
          >
            <option value="">Pilih lokasi</option>
            {areaOptions.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
            <option value={LAINNYA}>{LAINNYA}</option>
          </select>
        </Field>

        {lokasi === LAINNYA ? (
          <Field
            label="Tuliskan lokasi yang Anda inginkan"
            htmlFor="lokasiLain"
            error={err("lokasiLain")}
            wajib
          >
            <input
              id="lokasiLain"
              name="lokasiLain"
              type="text"
              autoComplete="address-level2"
              value={lokasiLain}
              onChange={(e) => setLokasiLain(e.target.value)}
              aria-invalid={err("lokasiLain") ? true : undefined}
              aria-describedby={describedBy("lokasiLain")}
              className={inputClass(!!err("lokasiLain"))}
            />
          </Field>
        ) : null}

        <Field
          label="Tanggal yang diinginkan"
          htmlFor="tanggal"
          error={err("tanggal")}
          wajib
        >
          <input
            id="tanggal"
            name="tanggal"
            type="date"
            min={minTanggal || undefined}
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            aria-invalid={err("tanggal") ? true : undefined}
            aria-describedby={describedBy("tanggal")}
            className={inputClass(!!err("tanggal"))}
          />
        </Field>

        <fieldset>
          <legend className="t-body font-semibold">
            Rentang waktu yang diinginkan{" "}
            <span className="text-brand" aria-hidden="true">
              *
            </span>
          </legend>
          <div className="mt-3 flex flex-wrap gap-3">
            {WAKTU.map((w) => (
              <label
                key={w}
                className={`inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-btn border px-4 ${
                  waktu === w ? "border-brand bg-brand-soft" : "border-line bg-bg"
                }`}
              >
                <input
                  type="radio"
                  name="waktu"
                  value={w}
                  checked={waktu === w}
                  onChange={() => setWaktu(w)}
                  aria-describedby={describedBy("waktu")}
                  className="h-4 w-4 accent-[var(--brand)]"
                />
                {w}
              </label>
            ))}
          </div>
          {err("waktu") ? (
            <p id="waktu-error" className="t-small mt-2 text-brand">
              {err("waktu")}
            </p>
          ) : null}
        </fieldset>

        <Field label="Catatan tambahan" htmlFor="catatan" hint="Opsional.">
          <textarea
            id="catatan"
            name="catatan"
            rows={3}
            value={catatan}
            onChange={(e) => setCatatan(e.target.value)}
            aria-describedby="catatan-hint"
            className={inputClass(false)}
          />
        </Field>
      </div>

      {/* Pratinjau pesan: menaikkan kepercayaan sebelum pengunjung menekan kirim. */}
      <section aria-labelledby="pratinjau" className="mt-8">
        <h2 id="pratinjau" className="t-h3">
          Pesan yang akan terkirim
        </h2>
        <p className="t-small mt-1 text-muted">
          Isi kotak ini mengikuti apa yang Anda ketik. Tidak ada data yang
          dikirim ke mana pun selain ke WhatsApp Mahesa.
        </p>
        <pre
          aria-live="polite"
          className="t-small mt-3 overflow-x-auto rounded-card border border-line bg-surface p-4 font-sans whitespace-pre-wrap text-ink"
        >
          {pesan}
        </pre>
      </section>

      <div className="safe-bottom sticky bottom-0 z-30 mt-6 border-t border-line bg-bg pt-3">
        <a
          href={waLink(pesan)}
          target="_blank"
          rel="noopener"
          onClick={(e) => {
            const errs = validate();
            setErrors(errs);
            if (Object.keys(errs).length > 0) e.preventDefault();
          }}
          aria-label="Kirim pengajuan test drive lewat WhatsApp"
          className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-btn bg-brand px-6 font-semibold text-white transition-colors duration-150 hover:bg-brand-hover"
        >
          <IconWhatsapp width={18} height={18} />
          Kirim lewat WhatsApp
        </a>
        <p className="t-small mt-2 pb-2 text-muted">
          Jadwal baru pasti setelah dikonfirmasi lewat WhatsApp.
        </p>
      </div>
    </form>
  );
}

function inputClass(invalid: boolean) {
  return `min-h-[48px] w-full rounded-btn border bg-bg px-3 py-2 ${
    invalid ? "border-brand" : "border-line"
  }`;
}

function Field({
  label,
  htmlFor,
  error,
  hint,
  wajib = false,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  wajib?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="t-body font-semibold">
        {label}{" "}
        {wajib ? (
          <span className="text-brand" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      {hint ? (
        <p id={`${htmlFor}-hint`} className="t-small mt-1 text-muted">
          {hint}
        </p>
      ) : null}
      <div className="mt-2">{children}</div>
      {error ? (
        <p id={`${htmlFor}-error`} className="t-small mt-2 font-semibold text-brand">
          {error}
        </p>
      ) : null}
    </div>
  );
}
