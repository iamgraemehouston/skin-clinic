import {
  ArrowRight,
  Check,
  Clock,
  Code,
  Heart,
  Layout,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/buttons/button";

export default function Home() {
  return (
    <main className="mx-auto max-w-[1240px] px-4 py-8">
      <div className="mb-12 border-b border-black/10 pb-8">
        <h1 className="mb-6 text-[40px] font-extrabold font-integral">
          SKIN CLINIC
        </h1>
        <p className="text-xl max-w-3xl">
          A modern ecommerce demo built with Next.js 15, React Query, and
          Storybook 9. Showcasing accessible, testable, and component-driven
          React development.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">Implemented Features</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {[
            {
              title: "Category Page",
              description:
                "Responsive product grid with Add to Cart functionality",
              icon: <Layout className="h-5 w-5" />,
              link: "/products",
            },
            {
              title: "Product Detail",
              description:
                "Gallery, pricing with discounts, ratings, quantity selector",
              icon: <Heart className="h-5 w-5" />,
              link: "/products/fragrances/7-chanel-coco-noir-eau-de-parfum",
            },
            {
              title: "Shopping Cart",
              description:
                "Line items, quantity updates, order summary with discounts",
              icon: <ShoppingBag className="h-5 w-5" />,
              link: "/cart",
            },
            {
              title: "Component Library",
              description:
                "Storybook 9 with interaction tests for UI components",
              icon: <Code className="h-5 w-5" />,
              link: "https://68ac4b80e20f6f104bf1619b-pmhusqholp.chromatic.com/?path=/docs/layout-breadcrumb--docs",
            },
          ].map((feature, index) => (
            <li key={index} className="rounded-xl border border-black/10 p-6">
              <div className="mb-3 flex items-center gap-2">
                <div className="rounded-full bg-black/5 p-2">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium">{feature.title}</h3>
              </div>
              <p className="mb-4 text-black/60">{feature.description}</p>
              <Link href={feature.link}>
                <Button
                  className="w-full"
                  icon={<ArrowRight />}
                  iconPosition="right"
                >
                  View {feature.title}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <section className="rounded-xl border border-black/10 p-6">
          <h2 className="mb-4 text-2xl font-semibold">
            Development Priorities
          </h2>
          <ul className="space-y-3">
            {[
              "Modern React features: Suspense, React Query, App Router",
              "Accessibility: semantic HTML, ARIA roles, schema.org",
              "Component-first development with Storybook",
              "Clean code and testability over pixel-perfect fidelity",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span
                  className="inline-flex h-[20px] w-[20px] items-center justify-center rounded-full bg-green-600 text-white"
                  role="img"
                  aria-label="Verified purchase"
                  title="Verified purchase"
                >
                  <Check strokeWidth={2.5} size={12} aria-hidden="true" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-black/10 p-6">
          <h2 className="mb-4 text-2xl font-semibold">Future Roadmap</h2>
          <ul className="space-y-3">
            {[
              "Full homepage with marketing sections",
              "Persistent cart state (localStorage or server)",
              "Complete review submission flow",
              "Enhanced mobile experience and responsive design",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="mt-1 rounded-full bg-gray-100 p-1">
                  <Clock className="h-4 w-4 text-gray-600" />
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="rounded-xl border border-black/10 bg-black/5 p-8 text-center">
        <p className="text-xl">
          Built as a demo showcasing modern React development practices.
          <br />
          <span className="text-black/60">
            Focused on quality and accessibility over completeness.
          </span>
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link href="/products">
            <Button icon={<ShoppingBag />}>Browse Products</Button>
          </Link>
          <Link href="/cart">
            <Button variant="secondary" icon={<ShoppingBag />}>
              View Cart
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
