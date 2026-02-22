import React from "react";

const BaseCard = ({
  icon: Icon,
  iconRotate = 0,
  title,
  subtitle,
  badges = [],
  mainContent,
  price,
  priceLabel,
  actionLabel,
  onAction,
  footerContent,
  showFooter = true,
  className = "",
  image,
  topBadge,
  layout = "horizontal",
}) => {
  const isVertical = layout === "vertical";

  if (isVertical) {
    return (
      <div
        className={`bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col hover:shadow-lg transition-shadow group ${className}`}
      >
        {image && (
          <div className="relative w-full h-50 overflow-hidden">
            <img
              src={image}
              alt={title || "Image"}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {topBadge && (
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-blue-700 px-2.5 py-1 rounded-lg font-bold text-sm flex items-center shadow-sm">
                {topBadge}
              </div>
            )}
          </div>
        )}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-base font-bold text-slate-900 truncate">
            {title}
          </h3>
          <div className="mt-1">{subtitle}</div>
          <div className="mt-2 flex-1">{mainContent}</div>

          <div className="mt-auto pt-3 border-t border-slate-100 flex items-end justify-between">
            <div>
              <p className="text-[11px] text-slate-400">{priceLabel}</p>
              <p className="text-xl font-extrabold text-slate-900">
                ₹{price.toLocaleString("en-IN")}
              </p>
            </div>
            <button
              onClick={onAction}
              className="bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-2 px-5 rounded-full transition-colors shadow-md text-sm"
            >
              {actionLabel}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200/80 overflow-hidden hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 ${className}`}
    >
      <div className="p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div className="flex items-center space-x-3 mb-4 sm:mb-0 w-full sm:w-[22%]">
            <div className="w-11 h-11 rounded-xl bg-linear-to-br from-slate-800 to-slate-900 flex items-center justify-center shadow-lg shadow-slate-800/20">
              {Icon && (
                <Icon
                  className={`w-5 h-5 text-blue-400 ${iconRotate ? `rotate-${iconRotate}` : ""}`}
                />
              )}
            </div>
            <div>
              <div className="font-bold text-slate-800">{title}</div>
              <div className="text-xs text-slate-400 font-medium">
                {subtitle}
              </div>
            </div>
          </div>

          <div className="w-full sm:w-[46%] px-0 sm:px-6 mb-4 sm:mb-0">
            {mainContent}
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-[28%] border-t sm:border-t-0 sm:border-l border-slate-100 pt-4 sm:pt-0 sm:pl-6">
            <div>
              <div className="text-2xl font-extrabold text-slate-900">
                ₹{price.toLocaleString("en-IN")}
              </div>
              <div className="text-[11px] text-slate-400 font-medium">
                {priceLabel}
              </div>
            </div>
            <button
              onClick={onAction}
              className="bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-2.5 px-7 rounded-xl transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 text-sm mt-0 sm:mt-3"
            >
              {actionLabel}
            </button>
          </div>
        </div>

        {badges.length > 0 && (
          <div className="flex items-center gap-2 mt-2.5 ml-14">
            {badges.map((badge, idx) => (
              <span
                key={idx}
                className={`flex items-center gap-0.5 px-2 py-0.5 text-[11px] font-bold rounded-md border ${badge.className}`}
              >
                {badge.icon && <badge.icon className="w-3 h-3" />} {badge.label}
              </span>
            ))}
          </div>
        )}
      </div>

      {showFooter && footerContent && (
        <div className="px-5 sm:px-6 py-3 bg-linear-to-r from-blue-50 to-slate-50 border-t border-blue-100/80 flex items-center justify-between">
          {footerContent}
        </div>
      )}
    </div>
  );
};

export default React.memo(BaseCard);
