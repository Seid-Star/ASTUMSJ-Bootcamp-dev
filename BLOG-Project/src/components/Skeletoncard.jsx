function SkeletonCard() {
  return (
    <div className="p-5 border border-white/20 rounded-xl bg-white/10 backdrop-blur-xl shadow-lg animate-pulse">
      <div className="w-full h-48 bg-white/20 rounded-lg mb-4"></div>
      <div className="h-6 bg-white/20 rounded w-4/5 mb-4"></div>
      <div className="flex gap-2 flex-wrap mb-4">
        <div className="h-6 w-16 bg-white/20 rounded-full"></div>
        <div className="h-6 w-20 bg-white/20 rounded-full"></div>
        <div className="h-6 w-14 bg-white/20 rounded-full"></div>
      </div>
      <div className="flex gap-5">
        <div className="h-4 w-20 bg-white/20 rounded"></div>
        <div className="h-4 w-24 bg-white/20 rounded"></div>
      </div>
    </div>
  );
}

export default SkeletonCard;
