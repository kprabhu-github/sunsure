import Image from 'next/image';
import { photo, type PhotoKey } from './data';

/** Fills its (position:relative) parent. Crop is controlled with `pos`; no layout shift as the parent owns the aspect ratio. */
export function Photo({ k, pos = '50% 50%', sizes = '100vw', priority, className, style }: { k: PhotoKey; pos?: string; sizes?: string; priority?: boolean; className?: string; style?: React.CSSProperties }) {
  const p = photo[k];
  return <Image src={p.src} alt={p.alt} fill sizes={sizes} priority={priority} className={className} style={{ objectFit: 'cover', objectPosition: pos, ...style }} />;
}
