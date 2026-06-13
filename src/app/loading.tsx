export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF7F2]">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-[#C8A23D]/30 border-t-[#C8A23D] rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-[#A39D93] font-body uppercase tracking-wider">
          Loading...
        </p>
      </div>
    </div>
  );
}
