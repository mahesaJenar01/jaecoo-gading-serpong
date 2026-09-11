/**
 * Menyisipkan structured data dari server component.
 * Tidak ada JavaScript yang dikirim ke browser: isinya hanya tag script
 * bertipe application/ld+json.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify aman di sini karena datanya berasal dari berkas data
      // milik situs sendiri, bukan dari masukan pengguna.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
