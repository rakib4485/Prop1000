export default function Logo({ className = '', isRequiresText = true }) {
  return (
    <span className={`flex items-center space-x-2 ${className}`}>
      <span className="flex items-center rounded-md border border-slate-700/80 bg-black p-1 px-1.5 shadow-sm">
        <span className="text-lg font-black leading-none tracking-tight text-white">P</span>
        <span className="-ml-1 mt-3 flex space-x-[1px]">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-1 w-1 rounded-full bg-gold" />
          ))}
        </span>
      </span>
        {isRequiresText && (
      <span className="flex items-center text-xl font-extrabold tracking-tight">
        <span className="text-white">PROP</span>
        <span className="gold-text ml-0.5">1000</span>
      </span>)}
    </span>
  );
}