
import type { Product } from "@/lib/products";
import { generateProductInsights } from "@/lib/aiRules";
import { generateCostAnalysis } from "@/lib/costAnalysis";

export default function ProductAI({
  product,
}: {
  product: Product;
}) {

   const insights = [
  ...generateProductInsights(product),
  ...generateCostAnalysis(product),
];

  return (

    <section
      className="
      rounded-3xl
      border
      border-white/10
      bg-white/[0.025]
      p-6
      "
    >

      <div className="flex items-center gap-3">

        <div
          className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          bg-white
          text-black
          font-bold
          "
        >
          AI
        </div>


        <div>

          <h2 className="font-semibold">
            LOĒM AI
          </h2>

          <p className="text-xs text-white/40">
            Product Intelligence
          </p>

        </div>

      </div>



      <div className="mt-8 space-y-4">


        {
        insights.map((item)=>(
            
            <div
              key={item.title}
              className="
              rounded-2xl
              border
              border-white/10
              p-4
              "
            >

              <h3 className="text-sm font-medium">
                {item.title}
              </h3>


              <p className="
                mt-2
                text-xs
                leading-5
                text-white/40
              ">
                {item.content}
              </p>


            </div>

          ))
        }


      </div>



      <button
        className="
        mt-6
        w-full
        rounded-xl
        bg-white
        py-3
        text-sm
        font-medium
        text-black
        "
      >
        分析此产品
      </button>


    </section>

  );
}