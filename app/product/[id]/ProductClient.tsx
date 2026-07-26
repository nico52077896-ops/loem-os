"use client";


import {
  useEffect,
  useState
} from "react";


import {
  supabase
} from "@/lib/supabase";


import ProductHeader from "@/components/product/ProductHeader";

import ProductWorkspace from "@/components/product/ProductWorkspace";


import type { Product } from "@/lib/products";



export default function ProductClient({

  product

}: {

  product: Product

}){


  const [currentStage,setCurrentStage] = useState(
    "企划"
  );



  useEffect(()=>{


    let active = true;



    async function loadCurrentStage(){


      const {

        data,

        error

      } = await supabase

        .from("timeline")

        .select("*")

        .eq(
          "product_id",
          product.id
        );




      if(error || !data || !active){

        return;

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





      // 找进行中的阶段

      const running = data.find(

        item => item.status === "进行中"

      );



      if(running){


        setCurrentStage(
          running.stage
        );


        return;

      }





      // 找最后完成阶段

      const completedIndexes = data

        .filter(

          item => item.status === "已完成"

        )

        .map(

          item => stages.indexOf(item.stage)

        )

        .filter(

          i => i >= 0

        );




      if(completedIndexes.length){


        const lastIndex = Math.max(
          ...completedIndexes
        );



        setCurrentStage(

          stages[
            Math.min(
              lastIndex + 1,
              stages.length - 1
            )
          ]

        );


        return;

      }




      setCurrentStage(
        "企划"
      );



    }



    loadCurrentStage();



    return ()=>{

      active = false;

    };


  },[product.id]);





  return (

    <>

      <ProductHeader

        id={product.id}

        name={product.name}

        productCode={product.product_code}

        launchSeason={product.launch_season}

        owner={product.owner}

        category={product.category}

        retailPrice={product.retail_price}

        targetCost={product.target_cost}

      />



      <ProductWorkspace

        product={product}

      />


    </>

  )

}