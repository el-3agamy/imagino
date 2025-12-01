import Link from "next/link";

export default function PricingCard({
  title,
  price,
  description,
  features,
  highlight,
}: {
  title: string;
  price: string;
  description?: string;
  features: string[];
  highlight?: boolean;
}) {
  return (
    <div
      className={`
        flex flex-col justify-between 
        h-full 
        rounded-xl p-8 shadow-sm border
        ${
          highlight
            ? "bg-main border-yellow-400"
            : "bg-card border-border"
        }
      `}
    >
      <div>
        <h2 className="text-xl font-semibold mb-2">{title}</h2>

        <p className="text-4xl font-bold mb-1">{price}</p>

        {description && (
          <p className="text-sm text-muted-foreground mb-6">{description}</p>
        )}

        <ul className="space-y-3">
          {features.map((item, i) => (
            <li key={i} className="flex items-center gap-2 text-sm">
              <span className="text-green-600">✔</span> {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10">
        <Link href={`checkout`}>
          <button
          
          className={`
            w-full py-3 rounded-lg font-medium  cursor-pointer
            ${
              highlight
                ? "bg-black text-white hover:bg-gray-900"
                : "bg-black text-white hover:bg-gray-900"
            }
          `}
        >
          Subscribe Now.
        </button>
        </Link>
      </div>
    </div>
  );
}
