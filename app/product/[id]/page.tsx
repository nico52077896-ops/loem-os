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


    // snake_case 转 camelCase
    productCode:
      rawProduct.product_code,


    launchSeason:
      rawProduct.launch_season,


    retailPrice:
      rawProduct.retail_price,


    targetCost:
      rawProduct.target_cost,


    currentCost:
      rawProduct.current_cost,


    coverImage:
      rawProduct.cover_image,


    aiInsights:
      rawProduct.ai_insights,


    // 如果数据库没有，补默认值
    designer:
      rawProduct.designer ?? "",


    factory:
      rawProduct.factory ?? "",

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