import { formatWeight } from '@/lib/utils';
import type { Product } from '@/types';

export function ProductSpecsTable({ product }: { product: Product }) {
  const rows: Array<[string, string | undefined]> = [
    ['Cut type', product.cutType],
    ['Cut style', product.cutStyle],
    [
      'Average weight per piece',
      product.averageWeightKg ? formatWeight(product.averageWeightKg) : undefined,
    ],
    ['Pieces per case', product.piecesPerCase ? String(product.piecesPerCase) : undefined],
    ['Case weight', product.caseWeightKg ? formatWeight(product.caseWeightKg) : undefined],
    ['Packaging', product.packaging],
    ['IQF available', product.iqfAvailable ? 'Yes' : 'No'],
    ['Origin', product.origin],
    ['Storage temperature', product.storageTempC],
    [
      'Shelf life (frozen)',
      product.shelfLifeFrozenMonths ? `${product.shelfLifeFrozenMonths} months` : undefined,
    ],
    ['Minimum order quantity', product.minimumOrderQty],
    ['HS code', product.hsCode],
  ].filter(([, v]) => v !== undefined && v !== '') as Array<[string, string]>;

  return (
    <table className="w-full text-sm">
      <tbody>
        {rows.map(([label, value]) => (
          <tr key={label} className="border-b border-neutral-200 last:border-b-0">
            <th className="w-1/2 py-2.5 text-left font-medium text-neutral-600">{label}</th>
            <td className="py-2.5 text-neutral-900">{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
