// Shown before content arrives from Supabase, or when it cannot be loaded.

export function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-900" role="status">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-ink-600 border-t-accent shadow-glow"></div>
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-fg-500">Loading</span>
      </div>
    </div>
  );
}

export function ErrorScreen({ error, onRetry }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-900 px-6">
      <div className="panel max-w-md p-8 text-center">
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-accent2">Connection error</p>
        <h1 className="mb-3 text-2xl font-semibold text-fg-50">Unable to load portfolio</h1>
        <p className="mb-6 break-words text-sm text-fg-400">{error?.message}</p>
        <button
          onClick={onRetry}
          className="rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-on-accent shadow-glow transition-colors hover:bg-accent-300"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
