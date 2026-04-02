import { useState } from "react";
import { TbCopy } from "react-icons/tb";
import { TbCopyCheckFilled } from "react-icons/tb";

const Tooltip = ({ copyValue }: { copyValue: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleCopy = () => {
    if (!copyValue) return;

    navigator.clipboard.writeText(copyValue);
    setIsCopied(true);
    setShowTooltip(true);
    setTimeout(() => setIsCopied(false), 2000);
    setTimeout(() => setShowTooltip(false), 1500);
  };

  return (
    <div className="relative inline-flex items-center group w-fit">
      <button
        onClick={handleCopy}
        className={`transition-all active:scale-95 cursor-pointer`}
      >
        {!showTooltip ? (
          <TbCopy className="text-blue-300" size={18} />
        ) : (
          <TbCopyCheckFilled className="text-green-400" size={18} />
        )}
      </button>

      <span
        className={`
          absolute z-50 px-2 py-1 rounded text-[10px] font-bold whitespace-nowrap
          transition-all duration-200 pointer-events-none shadow-xl border border-white/10
          opacity-0 group-hover:opacity-100 -top-8 left-1/2 -translate-x-1/2
          ${showTooltip ? "bg-green-400 opacity-100 text-black" : "bg-gray-900 text-white"}
        `}
      >
        {isCopied ? "copied" : `copy ${copyValue.length > 15 ? copyValue.substring(0, 15) + "..." : copyValue}`}

        <span
          className={`
          absolute left-1/2 -translate-x-1/2 border-4 border-transparent
          top-full border-t-inherit  
        `}
          style={{ borderTopColor: isCopied ? "#18b753" : "#111827" }}
        ></span>
      </span>
    </div>
  );
};

export default Tooltip;
