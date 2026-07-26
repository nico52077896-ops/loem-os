"use client";


import {
useEffect,
useState
} from "react";


import {
products
} from "@/lib/products";


import {
getProducts
} from "@/lib/productStore";


import {
supabase
} from "@/lib/supabase";




const stages=[

"企划",
"设计",
"面料",
"打版",
"样衣",
"成本",
"生产",
"上市"

];




export default function ProductDetailClient({

id

}:{

id:string;

}){


const [product,setProduct]=useState<any>(null);


const [timeline,setTimeline]=useState<any[]>([]);





useEffect(()=>{


const localProducts=getProducts();



const result=[

...products,

...localProducts

].find(

p=>p.id===id

);



setProduct(result);



if(result){

loadTimeline(
result.id
);

}



},[id]);









async function loadTimeline(productId:string){



const {

data,

error

}=await supabase

.from("timeline")

.select("*")

.eq(
"product_id",
productId
);




if(!error){


setTimeline(
data || []
);


}


}










function getProductStatus(){



const running = timeline.find(

item=>

item.status==="进行中"

);





if(running){



switch(running.stage){



case "设计":

return "Design";



case "面料":

case "打版":

case "样衣":

return "Development";



case "成本":

return "Costing";



case "生产":

return "Production";



case "上市":

return "Launching";



default:

return "Planning";


}



}








const launched = timeline.find(

item=>

item.stage==="上市"

&&

item.status==="已完成"

);





if(launched){

return "Launched";

}





return "Planning";



}







const productStatus=getProductStatus();








if(!product){


return (

<div className="p-10">

Loading...

</div>

)

}







return (

<div

className="
space-y-6
"

>



{/* 产品头部 */}

<div

className="
flex
items-center
justify-between
"

>


<div>


<h1

className="
text-4xl
font-bold
"

>

{product.name}

</h1>


<p

className="
mt-2
text-white/40
"

>

{product.category}

</p>


</div>







{/* 自动状态 */}

<div

className="
rounded-full
border
border-white/10
px-5
py-2
text-sm
text-white/60
"

>

{productStatus}

</div>





</div>







{/* 这里继续放你的原详情页组件 */}







</div>

)


}