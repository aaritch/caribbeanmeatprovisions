import {
  getAllProducts,
  getCertifications,
  getServiceAreas,
} from '@/lib/data';

export function TrustStrip() {
  const products = getAllProducts();
  const areas = getServiceAreas();
  const portCount = areas.reduce((acc, a) => acc + a.ports.length, 0);
  const certs = getCertifications().slice(0, 5);

  const stats = [
    { value: '20+', label: 'Years of Caribbean trade' },
    { value: `${areas.length}+`, label: 'Countries served' },
    { value: `${portCount}+`, label: 'Ports served' },
    { value: `${products.length}+`, label: 'Products in catalog' },
  ];

  return (
    <section className="bg-brand-cream">
      <div className="container-x py-10">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center md:text-left">
              <p className="font-serif text-h2 leading-none text-brand-primary">{s.value}</p>
              <p className="mt-1 text-sm text-neutral-700">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-neutral-200 pt-6 md:justify-between">
          <p className="text-xs uppercase tracking-wider text-neutral-500">Certifications</p>
          <ul className="flex flex-wrap items-center gap-3">
            {certs.map((c) => (
              <li
                key={c.slug}
                className="rounded border border-neutral-300 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-700"
              >
                {c.shortName}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
