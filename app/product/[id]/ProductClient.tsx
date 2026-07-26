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


import type {Product} from "@/lib/products";



export default function ProductClient({

 product

}:{
 product:Product

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

}=await supabase

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




// 1. 优先找进行中

const running = data.find(

item =>
item.status === "进行中"

);



if(running){


setCurrentStage(
running.stage
);


return;

}




// 2. 找最后一个完成阶段

const completedIndexes = data

.filter(
item=>item.status==="已完成"
)

.map(item=>{

return stages.indexOf(
item.stage
);

})

.filter(
i=>i>=0
);





if(completedIndexes.length){


const lastIndex =
Math.max(
...completedIndexes
);



setCurrentStage(

stages[
Math.min(
lastIndex+1,
stages.length-1
)
]

);


return;


}




// 3. 都没有 默认企划

setCurrentStage(
"企划"
);



}



loadCurrentStage();



return ()=>{

active=false;

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

retailPrice={product.retailPrice}

targetCost={product.targetCost}

/>





<ProductWorkspace

product={product}

/>



</>

)

}