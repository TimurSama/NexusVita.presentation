// Router utility to handle base path
export function getBasePath(): string {
  // In production with GitHub Pages, base path is /NexusVita.presentation/
  if (import.meta.env.PROD) {
    return '/NexusVita.presentation';
  }
  return '';
}

export function normalizePath(path: string): string {
  const base = getBasePath();
  if (path.startsWith('/')) {
    return base + path;
  }
  return base + '/' + path;
}
