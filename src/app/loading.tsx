export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-warm-black">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-cream/40 font-accent uppercase tracking-wider">
          Loading...
        </p>
      </div>
    </div>
  );
}
