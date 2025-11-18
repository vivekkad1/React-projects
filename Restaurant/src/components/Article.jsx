export default function Article({ title, items = [] }) {
  return (
    <article className="bg-[#b0c4b1] p-4 md:p-15 my-6 rounded">
      <h3 className="text-xl md:text-2xl mb-4">{title}</h3>
      <ul className="space-y-3">
        {items.map((item, idx) => {
          const raw = item[0] || "";
          const dashIndex = raw.indexOf("-");
          const main =
            dashIndex === -1 ? raw.trim() : raw.slice(0, dashIndex).trim();
          const desc =
            dashIndex === -1 ? null : raw.slice(dashIndex + 1).trim();

          return (
            <li
              key={idx}
              className="flex items-center justify-between"
            >
              <div className="flex items-baseline">
                <span className="text-base md:text-lg leading-snug not-italic">
                  {main}
                </span>
                {desc && (
                  <span className="italic text-sm text-gray-800 hidden md:block">
                    - {desc}
                  </span>
                )}
              </div>

              <span className="mt-2 sm:mt-0 ml-0 sm:ml-4 whitespace-nowrap inline-block text-sm font-medium text-gray-900">
                {item[1]}
              </span>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
