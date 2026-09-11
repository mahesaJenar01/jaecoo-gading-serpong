import { ScrollTable } from "@/components/ui/ScrollTable";

/**
 * Tabel di dalam artikel. Selalu bisa digeser di dalam wadahnya sendiri,
 * jadi tabel selebar apa pun tidak pernah membuat body ikut bergeser.
 */
export function DataTable({
  caption,
  kolom,
  baris,
  minWidth = 560,
  catatan,
}: {
  caption: string;
  kolom: string[];
  baris: string[][];
  minWidth?: number;
  catatan?: string;
}) {
  return (
    <figure className="wide my-8">
      <ScrollTable caption={caption} minWidth={minWidth} stickyFirstCol>
        <thead>
          <tr>
            {kolom.map((k) => (
              <th key={k} scope="col">
                {k}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {baris.map((row, i) => (
            <tr key={i}>
              {row.map((sel, j) =>
                j === 0 ? (
                  <th key={j} scope="row">
                    {sel}
                  </th>
                ) : (
                  <td key={j}>{sel}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </ScrollTable>
      {catatan ? (
        <figcaption className="t-small mt-2 text-muted">{catatan}</figcaption>
      ) : null}
    </figure>
  );
}
