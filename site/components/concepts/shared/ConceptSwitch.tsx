import Link from 'next/link';
/** Review aid only: jump between the three concepts. */
export function ConceptSwitch({ current }: { current: 'a' | 'b' | 'c' | 'd' }) {
  return (
    <nav aria-label="Design concepts" className="cswitch">
      <span>Preview</span>
      {(['a', 'b', 'c', 'd'] as const).map((k) => <Link key={k} href={`/concept-${k}/`} aria-current={k === current ? 'page' : undefined}>{k.toUpperCase()}</Link>)}
    </nav>
  );
}
