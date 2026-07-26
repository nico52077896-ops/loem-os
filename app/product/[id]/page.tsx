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



  // 数据库字段 -> 前端 Product 类型转换
  const product = {

  ...rawProduct,


  // 字段转换
  productCode:
    rawProduct.product_code ?? "",


  launchSeason:
    rawProduct.launch_season ?? "",


  retailPrice:
    rawProduct.retail_price ?? 0,


  targetCost:
    rawProduct.target_cost ?? 0,


  currentCost:
    rawProduct.current_cost ?? 0,


  coverImage:
    rawProduct.cover_image ?? "",


  aiInsights:
    rawProduct.ai_insights ?? "",



  // Product 类型需要，但数据库暂无
  designer:
    "",


  factory:
    "",


  costs:
    [],


  materials:
    [],


  samples:
    [],


  documents:
    [],


  timeline:
    [],

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