import ProductClient from "./ProductClient";
import { getProducts } from "@/lib/productStore";


type Props = {
  params: Promise<{
    id: string;
  }>;
};


export default async function ProductDetailPage({
  params,
}: Props) {


  const { id } = await params;


  // 从数据库读取
  const products = await getProducts();


  const rawProduct = products.find(
    p => p.id === id
  );



  if (!rawProduct) {

    return (
      <main
        className="
        min-h-screen
        bg-black
        p-10
        text-white
        "
      >
        Product Not Found
      </main>
    );

  }



  // 数据库字段转换为 Product 类型
  const product = {


    id: rawProduct.id,


    name: rawProduct.name ?? "",


    product_code:
      rawProduct.product_code ?? "",


    launch_season:
      rawProduct.launch_season ?? "",


    season:
      rawProduct.season ?? "",


    category:
      rawProduct.category ?? "",



    source:
      rawProduct.source ?? "原创设计",



    stage:
      rawProduct.stage ?? "Planning",



    progress:
      rawProduct.progress ?? 0,



    owner:
      rawProduct.owner ?? "",



    designer:
      rawProduct.designer ?? "",



    factory:
      rawProduct.factory ?? "",



    retailPrice:
      rawProduct.retail_price ?? 0,


    targetCost:
      rawProduct.target_cost ?? 0,


    currentCost:
      rawProduct.current_cost ?? 0,



    costs: {

      material:
        rawProduct.costs?.material ?? 0,

      trims:
        rawProduct.costs?.trims ?? 0,

      manufacturing:
        rawProduct.costs?.manufacturing ?? 0,

      packaging:
        rawProduct.costs?.packaging ?? 0,

      shipping:
        rawProduct.costs?.shipping ?? 0,

    },



    materials:
      rawProduct.materials ?? [],



    samples:
      rawProduct.samples ?? [],



    documents:
      rawProduct.documents ?? [],



    timeline:
      rawProduct.timeline ?? [],



    aiInsights:
      rawProduct.ai_insights ?? [],


  };




  return (

    <main
      className="
      min-h-screen
      bg-black
      px-6
      py-10
      text-white
      md:px-10
      "
    >

      <ProductClient
        product={product}
      />

    </main>

  );

}