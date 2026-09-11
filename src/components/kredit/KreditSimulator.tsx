"use client";

import { useState, type ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import { ScrollTable } from "@/components/ui/ScrollTable";
import { WaButton } from "@/components/wa/WaButton";
import { rupiah } from "@/lib/format";
import {
  ASURANSI_OPSI,
  BUNGA_PER_TENOR,
  CATATAN_ESTIMASI,
  DP_OPSI,
  DP_STANDAR,
  SKEMA_OPSI,
  TENOR_MAKS,
  TENOR_OPSI,
  TJH_PERTANGGUNGAN,
  TJH_RATE,
  simulasiKredit,
  uangMuka,
  type JenisAsuransi,
  type Skema,
  type Tenor,
} from "@/lib/kredit";

/**
 * Simulasi kredit interaktif.
 *
 * Seluruh angka dihitung oleh simulasiKredit() di src/lib/kredit.ts.
 * Komponen ini hanya menyusun pilihan dan menampilkan hasilnya. Provisi
 * sudah termasuk di angsuran dan sengaja tidak punya baris sendiri.
 *
 * Nilai awal dirender di server, jadi angka simulasi baku tetap ada di HTML
 * awal walaupun JavaScript belum jalan.
 */

export type UnitSimulasi = { label: string; hargaOtr: number };

/** 0.0208 -> "2,08%" */
const persen = (rate: number) =>
  `${Number((rate * 100).toFixed(2))}`.replace(".", ",") + "%";

export function KreditSimulator({
  units,
  sumber,
}: {
  units: UnitSimulasi[];
  /** Nama halaman asal, ikut ke pesan WhatsApp. */
  sumber: string;
}) {
  const [unitIdx, setUnitIdx] = useState(0);
  const [dp, setDp] = useState<number>(DP_STANDAR);
  const [tenor, setTenor] = useState<Tenor>(TENOR_MAKS);
  const [asuransi, setAsuransi] = useState<JenisAsuransi>("kombinasi");
  const [skema, setSkema] = useState<Skema>("ADDB");

  const unit = units[unitIdx] ?? units[0];
  const dasar = { hargaOtr: unit.hargaOtr, persenDp: dp, asuransi, skema };
  const sim = simulasiKredit({ ...dasar, tenor });
  const perTenor = TENOR_OPSI.map((t) => simulasiKredit({ ...dasar, tenor: t }));

  const labelAsuransi =
    ASURANSI_OPSI.find((a) => a.nilai === asuransi)?.label ?? asuransi;

  const pesanWa = `Halo Mahesa, saya dari website (${sumber} - simulasi kredit). Saya mau minta hitungan kredit ${unit.label}: uang muka ${dp} persen, tenor ${tenor} tahun, asuransi ${labelAsuransi.toLowerCase()}, skema ${skema}.`;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start">
      {/* Pilihan */}
      <Card className="flex flex-col gap-6 p-5 md:p-6">
        {units.length > 1 ? (
          <div>
            <label htmlFor="sim-unit" className="t-body font-semibold">
              Unit
            </label>
            <select
              id="sim-unit"
              value={unitIdx}
              onChange={(e) => setUnitIdx(Number(e.target.value))}
              className={selectClass}
            >
              {units.map((u, i) => (
                <option key={u.label} value={i}>
                  {u.label} ({rupiah(u.hargaOtr)})
                </option>
              ))}
            </select>
          </div>
        ) : null}

        <div>
          <label htmlFor="sim-dp" className="t-body font-semibold">
            Uang muka murni
          </label>
          <select
            id="sim-dp"
            value={dp}
            onChange={(e) => setDp(Number(e.target.value))}
            className={selectClass}
          >
            {DP_OPSI.map((p) => (
              <option key={p} value={p}>
                {p} persen, {rupiah(uangMuka(unit.hargaOtr, p))}
              </option>
            ))}
          </select>
        </div>

        <fieldset>
          <legend className="t-body font-semibold">Tenor</legend>
          <div className="mt-2 grid grid-cols-5 gap-2">
            {TENOR_OPSI.map((t) => (
              <label
                key={t}
                className={`flex min-h-[56px] cursor-pointer flex-col items-center justify-center rounded-btn border px-1 text-center transition-colors duration-150 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 ${
                  tenor === t
                    ? "border-brand bg-brand text-white"
                    : "border-line bg-bg hover:bg-surface"
                }`}
              >
                <input
                  type="radio"
                  name="sim-tenor"
                  value={t}
                  checked={tenor === t}
                  onChange={() => setTenor(t)}
                  className="sr-only"
                />
                <span className="font-semibold leading-5">{t} th</span>
                <span
                  className={`text-[12px] leading-4 ${
                    tenor === t ? "text-white/75" : "text-muted"
                  }`}
                >
                  bunga {persen(BUNGA_PER_TENOR[t])}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="t-body font-semibold">Asuransi kendaraan</legend>
          <div className="mt-2 grid gap-2">
            {ASURANSI_OPSI.map((a) => (
              <Pilihan
                key={a.nilai}
                name="sim-asuransi"
                terpilih={asuransi === a.nilai}
                onPilih={() => setAsuransi(a.nilai)}
                label={a.label}
                keterangan={a.keterangan}
              />
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="t-body font-semibold">Skema pembayaran</legend>
          <div className="mt-2 grid gap-2">
            {SKEMA_OPSI.map((s) => (
              <Pilihan
                key={s.nilai}
                name="sim-skema"
                terpilih={skema === s.nilai}
                onPilih={() => setSkema(s.nilai)}
                label={s.label}
                keterangan={s.keterangan}
              />
            ))}
          </div>
        </fieldset>
      </Card>

      {/* Hasil */}
      <div className="flex min-w-0 flex-col gap-5">
        <div className="grid gap-4 sm:grid-cols-2" aria-live="polite">
          <div className="flex flex-col rounded-card bg-ink-surface p-5 text-white">
            <p className="t-small text-ink-muted">Angsuran per bulan</p>
            <p className="mt-1 text-[28px] font-bold leading-9 tabular-nums tracking-tight">
              {rupiah(sim.angsuran)}
            </p>
            <p className="t-small text-ink-muted">
              {sim.jumlahAngsuran} kali angsuran, skema {skema}
            </p>
            <Rincian
              gelap
              baris={[
                ["Harga OTR", rupiah(sim.hargaOtr)],
                ["Pokok hutang", rupiah(sim.pokokHutang)],
                [
                  "Bunga flat",
                  `${persen(sim.bunga)} per tahun, ${tenor} tahun`,
                ],
                [
                  "Asuransi kendaraan",
                  skema === "ADDB" ? "Dicicil di angsuran" : "Dibayar di TDP",
                ],
              ]}
            />
          </div>

          <Card className="flex flex-col p-5">
            <p className="t-small text-muted">Total pembayaran pertama (TDP)</p>
            <p className="mt-1 text-[28px] font-bold leading-9 tabular-nums tracking-tight">
              {rupiah(sim.tdp)}
            </p>
            <p className="t-small text-muted">
              {skema === "ADDB"
                ? "Uang muka, admin, dan TJH"
                : "Seluruh biaya dan angsuran pertama"}
            </p>
            <Rincian
              baris={sim.rincianTdp.map((r) => [r.label, rupiah(r.nilai)])}
              total={["Total TDP", rupiah(sim.tdp)]}
            />
          </Card>
        </div>

        <div>
          <h3 className="t-h3">Rincian premi asuransi per tahun</h3>
          <ScrollTable
            caption={`Rincian premi asuransi ${unit.label} per tahun`}
            minWidth={560}
            className="mt-3"
          >
            <thead>
              <tr>
                <th scope="col">Tahun</th>
                <th scope="col">Pertanggungan</th>
                <th scope="col">Rate</th>
                <th scope="col">Premi kendaraan</th>
                <th scope="col">Premi TJH</th>
              </tr>
            </thead>
            <tbody>
              {sim.asuransiTahunan.map((a) => (
                <tr key={a.tahun}>
                  <th scope="row">Tahun ke-{a.tahun}</th>
                  <td>{a.jenis}</td>
                  <td className="tabular-nums">{persen(a.rate)}</td>
                  <td className="tabular-nums">{rupiah(a.premi)}</td>
                  <td className="tabular-nums">{rupiah(a.premiTjh)}</td>
                </tr>
              ))}
              <tr className="bg-surface">
                <th scope="row">Total</th>
                <td />
                <td />
                <td className="font-semibold tabular-nums">
                  {rupiah(sim.totalAsuransi)}
                </td>
                <td className="font-semibold tabular-nums">
                  {rupiah(sim.totalTjh)}
                </td>
              </tr>
            </tbody>
          </ScrollTable>
          <p className="t-small mt-2 text-muted">
            Premi kendaraan memakai batas bawah rate OJK Wilayah II (DKI
            Jakarta, Jawa Barat, Banten) dikali harga OTR. TJH dengan nilai
            pertanggungan {rupiah(TJH_PERTANGGUNGAN)}, premi{" "}
            {persen(TJH_RATE).replace("%", " persen")} per tahun.
          </p>
        </div>

        <div>
          <h3 className="t-h3">Perbandingan tenor</h3>
          <p className="t-small mt-1 text-muted">
            Uang muka {dp} persen, asuransi {labelAsuransi.toLowerCase()},
            skema {skema}.
          </p>
          <ScrollTable
            caption={`Perbandingan TDP dan angsuran ${unit.label} per tenor`}
            minWidth={480}
            className="mt-3"
          >
            <thead>
              <tr>
                <th scope="col">Tenor</th>
                <th scope="col">Bunga flat</th>
                <th scope="col">TDP</th>
                <th scope="col">Angsuran per bulan</th>
              </tr>
            </thead>
            <tbody>
              {perTenor.map((s) => {
                const aktif = s.tenor === tenor;
                return (
                  <tr
                    key={s.tenor}
                    aria-current={aktif ? "true" : undefined}
                    className={aktif ? "bg-brand-soft" : undefined}
                  >
                    <th scope="row">
                      <button
                        type="button"
                        onClick={() => setTenor(s.tenor)}
                        className="min-h-[24px] text-left font-semibold underline-offset-2 hover:underline"
                      >
                        {s.tenor} tahun
                      </button>
                    </th>
                    <td className="tabular-nums">{persen(s.bunga)} per tahun</td>
                    <td className="tabular-nums">{rupiah(s.tdp)}</td>
                    <td
                      className={`tabular-nums ${aktif ? "font-semibold" : ""}`}
                    >
                      {rupiah(s.angsuran)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </ScrollTable>
        </div>

        <div className="rounded-card border border-line bg-surface p-5">
          <p className="t-small text-muted">
            <span className="font-semibold text-ink">Perlu diketahui.</span>{" "}
            {CATATAN_ESTIMASI} Premi asuransi juga bisa berbeda antar
            perusahaan asuransi.
          </p>
          <WaButton
            context={pesanWa}
            ariaLabel={`Chat WhatsApp Mahesa untuk meminta hitungan kredit ${unit.label}`}
            className="mt-4"
          >
            Minta hitungan resmi lewat WhatsApp
          </WaButton>
        </div>
      </div>
    </div>
  );
}

const selectClass =
  "mt-2 min-h-[48px] w-full rounded-btn border border-line bg-bg px-3 py-2";

function Pilihan({
  name,
  terpilih,
  onPilih,
  label,
  keterangan,
}: {
  name: string;
  terpilih: boolean;
  onPilih: () => void;
  label: string;
  keterangan: string;
}) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-btn border p-3 transition-colors duration-150 ${
        terpilih ? "border-brand bg-brand-soft" : "border-line bg-bg hover:bg-surface"
      }`}
    >
      <input
        type="radio"
        name={name}
        checked={terpilih}
        onChange={onPilih}
        className="mt-1 h-4 w-4 shrink-0 accent-[var(--brand)]"
      />
      <span>
        <span className="block font-semibold leading-6">{label}</span>
        <span className="t-small block text-muted">{keterangan}</span>
      </span>
    </label>
  );
}

function Rincian({
  baris,
  total,
  gelap = false,
}: {
  baris: [string, ReactNode][];
  total?: [string, ReactNode];
  gelap?: boolean;
}) {
  const garis = gelap ? "border-ink-line" : "border-line";
  const muted = gelap ? "text-ink-muted" : "text-muted";
  return (
    <dl className={`mt-4 flex flex-col border-t pt-3 ${garis}`}>
      {baris.map(([k, v]) => (
        <div key={k} className="flex items-baseline justify-between gap-3 py-1">
          <dt className={`t-small ${muted}`}>{k}</dt>
          <dd className="t-small text-right tabular-nums">{v}</dd>
        </div>
      ))}
      {total ? (
        <div
          className={`mt-1 flex items-baseline justify-between gap-3 border-t pt-2 ${garis}`}
        >
          <dt className="t-small font-semibold">{total[0]}</dt>
          <dd className="t-small text-right font-semibold tabular-nums">
            {total[1]}
          </dd>
        </div>
      ) : null}
    </dl>
  );
}
