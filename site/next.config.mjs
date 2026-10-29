/** Trailing slashes match the live WordPress URL structure (e.g. /about/, /solutions/re-100-solutions/). */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  // /concept-e/ is the Concept E homepage (a self-contained file); its inner pages are real routes below it.
  async rewrites() { return { beforeFiles: [{ source: '/concept-e', destination: '/concept-e-home/index.html' }], afterFiles: [], fallback: [] }; },
};
export default nextConfig;
