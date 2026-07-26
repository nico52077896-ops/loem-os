"use client";


import {
useEffect,
useState
} from "react";


import {
supabase
} from "@/lib/supabase";


import type { Product } from "@/lib/products";



export default function ProductInfo({

product,

}:{

product:Product;

}){



const [timeline,setTimeline]=useState<any[]>([]);



const stages=[

["Planning","企划"],

["Design","设计"],

["Material","面辅料"],

["Pattern","打版"],

["Sample","样衣"],

["Costing","成本"],

["Production","生产"],

["Launch","上市"],

];





useEffect(()=>{

loadTimeline();

},[]);





async function loadTimeline(){


const {

data,

error

}=await supabase

.from("timeline")

.select("*")

.eq(
"product_id",
(product as any).id
);



if(!error){

setTimeline(data || []);

}


}





function getStageIndex(stage:string){


return stages.findIndex(

s=>

s[0]===stage ||

s[1]===stage

);


}





const statusRank:any={

"未开始":0,

"进行中":1,

"已完成":2

};





function getStageStatus(stage:any){


const items = timeline.filter(

i=>

i.stage===stage[0]

||

i.stage===stage[1]

);



if(items.length===0)

return "未开始";



return items.sort(

(a,b)=>

statusRank[b.status]-statusRank[a.status]

)[0].status;


}





const currentIndex = timeline.length

?

Math.max(

...timeline.map(

item=>

getStageIndex(item.stage)

)

)

:

-1;







const completedCount = timeline.filter(

item=>

item.status==="已完成"

).length;



const progress = Math.round(

(
completedCount +
timeline.filter(
item=>item.status==="进行中"
).length*0.5

)

/

stages.length

*

100

);





const currentStage =

stages[currentIndex]?.[1]

||

"未开始";







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


<div className="flex justify-between items-start">


<div>

<h2 className="text-lg font-semibold">

产品信息

</h2>


<p className="mt-1 text-sm text-white/40">

当前产品的核心开发数据

</p>


</div>



<button

className="
rounded-xl
border
border-white/10
px-4
py-2
text-sm
text-white/70
"

>

编辑

</button>


</div>







<div

className="
mt-8
grid
grid-cols-2
gap-8
text-sm
"

>


<InfoItem

label="负责人"

value={product.owner}

/>



<InfoItem

label="开发来源"

value={product.source}

/>



<InfoItem

label="品类"

value={product.category}

/>



<InfoItem

label="供应商"

value={(product as any).factory}

/>



<InfoItem

label="目标零售价"

value={`$${product.retailPrice || 0}`}

/>



<InfoItem

label="目标成本"

value={`$${product.targetCost || 0}`}

/>



<InfoItem

label="当前成本"

value={`$${product.currentCost || 0}`}

/>



<InfoItem

label="当前阶段"

value={currentStage}

/>


</div>









<div className="mt-10">


<div className="mb-3 flex justify-between text-sm">


<span className="text-white/40">

开发进度

</span>



<span>

{progress}%

</span>


</div>





<div

className="
h-1.5
rounded-full
bg-white/10
overflow-hidden
"

>


<div

className="
h-full
rounded-full
bg-white
"

style={{

width:`${progress}%`

}}

/>


</div>









{/* Timeline */}

<div

className="
mt-6
flex
items-center
"

>


{

stages.map((stage,index)=>{


const status=getStageStatus(stage);



const completed=
status==="已完成";


const running=
status==="进行中";



return (

<div

key={stage[0]}

className="
flex
flex-1
items-center
"

>


<div

className="
flex
flex-col
items-center
"

>


<div

className={`

h-2.5
w-2.5
rounded-full


${
completed

?

"bg-white"

:

running

?

"bg-blue-500"

:

"bg-white/20"

}

`}

/>




<span

className={`

mt-2
text-[10px]


${
completed || running

?

"text-white"

:

"text-white/35"

}

`}

>

{stage[1]}

</span>



</div>







{

index !== stages.length-1 &&


<div

className={`

mx-2
h-[1px]
flex-1


${
index < currentIndex

?

"bg-white"

:

"bg-white/10"

}

`}

/>


}



</div>

)

})

}



</div>






<div

className="
mt-5
text-xs
text-white/40
"

>


当前阶段：

<span className="ml-2 text-white">

{currentStage}

</span>


</div>



</div>





</section>


)

}






function InfoItem({

label,

value

}:{

label:string;

value:any;

}){


return (

<div>


<p

className="
text-xs
text-white/30
"

>

{label}

</p>



<p

className="
mt-1
text-white/80
"

>

{value || "-"}

</p>



</div>

)

}