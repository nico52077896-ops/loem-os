import { supabase } from "./supabase";
import type { Product } from "./products";



export async function getProducts(){


  // 先获取产品
  const {

    data:products,

    error

  } = await supabase

  .from("products")

  .select(`

    id,

    name,

    product_code,

    launch_season,

    season,

    category,

    source,

    owner,

    stage,

    retail_price,

    target_cost,

    current_cost,

    cover_image,

    ai_insights

  `)

  .order(
    "created_at",
    {
      ascending:false
    }
  );




  if(error){

    console.error(error);

    return [];

  }



  const stages = [

    "企划",

    "设计",

    "面料",

    "打版",

    "样衣",

    "成本",

    "生产",

    "上市"

  ];





  // 给每个产品读取 timeline

  const result = await Promise.all(

    (products || []).map(async(product)=>{


      const {

        data:timeline

      } = await supabase

      .from("timeline")

      .select("*")

      .eq(
        "product_id",
        product.id
      );



      const completed =

      (timeline || []).filter(

        item=>

        item.status==="已完成"

      ).length;



      const progress = Math.round(

        completed / stages.length * 100

      );




      return {

        ...product,

        progress,

      };



    })


  );




  return result;


}





export async function createProduct(

product:Product

){


const {

data,

error

}=await supabase

.from("products")

.insert(product)

.select()

.single();



if(error){

console.error(error);

throw error;

}



return data;


}