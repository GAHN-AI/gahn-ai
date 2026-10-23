import type { CanvasBlock } from "@/lib/tutor/progression";
// Teaching content is read-only. React escapes all text; HTML, scripts and embeds are not accepted.
export default function TeachingCanvas({ blocks }: { blocks: CanvasBlock[] }) {
  return (
    <div className="space-y-6" aria-live="polite" aria-atomic="false">
      {blocks.map((block, index) => (
        <section key={`${index}-${block.title}`}>
          <h3 className="mb-3 text-sm font-semibold text-[#213D5E]">
            {block.title}
          </h3>
          {block.type === "text" ? (
            <p className="whitespace-pre-wrap text-sm leading-7 text-[#4F627B]">
              {block.text}
            </p>
          ) : null}
          {block.type === "steps" ? (
            <ol className="space-y-3">
              {block.items.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-sm leading-6 text-[#4F627B]"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#EEF3FA] text-xs font-semibold text-[#4A6B93]">
                    {i + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          ) : null}
          {block.type === "code" ? (
            <div className="overflow-hidden rounded-lg bg-[#152B43]">
              <p className="border-b border-white/10 px-4 py-2 text-[10px] uppercase tracking-widest text-[#A8BDD6]">
                {block.language}
              </p>
              <pre className="overflow-x-auto p-4 text-xs leading-7 text-[#DAE8F7]">
                <code>{block.code}</code>
              </pre>
            </div>
          ) : null}
          {block.type === "equation" ? (
            <div className="space-y-3 rounded-lg border border-[#DFE7F0] bg-[#F7F9FC] p-5">
              {block.lines.map((line, i) => (
                <p
                  key={i}
                  className="whitespace-pre-wrap break-words font-mono text-base leading-7 text-[#264B76]"
                >
                  {line}
                </p>
              ))}
            </div>
          ) : null}
          {block.type === "table" ? (
            <div className="overflow-x-auto rounded-lg border border-[#DDE5EF]">
              <table className="w-full text-left text-xs leading-6">
                <caption className="sr-only">{block.title}</caption>
                <thead className="bg-[#F1F5FA]">
                  <tr>
                    {block.headers.map((header, i) => (
                      <th
                        scope="col"
                        key={i}
                        className="px-4 py-2 font-semibold text-[#355273]"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, i) => (
                    <tr key={i} className="border-t border-[#E7EDF5]">
                      {row.map((cell, j) => (
                        <td key={j} className="px-4 py-2 text-[#53657D]">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </section>
      ))}
    </div>
  );
}
