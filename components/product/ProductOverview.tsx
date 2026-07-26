"use client";


import {
useState,
useEffect
} from "react";


import ProductImageUpload from "./ProductImageUpload";

import {
supabase
} from "@/lib/supabase";



export default function ProductOverview({

product

}:{
product:any

}){


const [analyzing,setAnalyzing]=useState(false);

const [timeline,setTimeline]=useState<any[]>([]);

const [currentCost,setCurrentCost]=useState(
  product.current_cost || 0
);

const [editing,setEditing]=useState(false);


const [saving,setSaving]=useState(false);

const [previewImage,setPreviewImage]=useState<string|null>(null);

const [info,setInfo]=useState({

product_name:product.name || "",

product_code:product.product_code || "",

collection:product.collection || "",

category:product.category || "",

start_date:product.start_date || "",

launch_season:product.launch_season || "",

owner:product.owner || "",

source:product.source || "",

target_cost:product.target_cost || 0,

current_cost:product.current_cost || 0,

retail_price:product.retail_price || 0

});




function updateInfo(
key:string,
value:any
){

setInfo(prev=>({

...prev,

[key]:value

}));

}



async function saveInfo(){


setSaving(true);



const {

error

}=await supabase

.from("products")

.update({

name:info.product_name,

product_code:info.product_code,

collection:info.collection,

category:info.category,

start_date:info.start_date,

launch_season:info.launch_season,

owner:info.owner,

source:info.source,

target_cost:info.target_cost,

current_cost:currentCost,

retail_price:info.retail_price

})

.eq(
"id",
product.id
);




if(error){

console.log(error);

alert(error.message);

setSaving(false);

return;

}



setSaving(false);

setEditing(false);


window.location.reload();


}



const stages=[

{
key:"Planning",
name:"企划"
},

{
key:"Design",
name:"设计"
},

{
key:"Material",
name:"面料"
},

{
key:"Pattern",
name:"打版"
},

{
key:"Sample",
name:"样衣"
},

{
key:"Costing",
name:"成本"
},

{
key:"Production",
name:"生产"
},

{
key:"Launch",
name:"上市"
}

];





useEffect(()=>{

loadTimeline();

},[]);

useEffect(()=>{


async function loadProduct(){


const {
data,
error
}=await supabase

.from("products")

.select("*")

.eq(
"id",
product.id
)

.single();



if(!error && data){


setInfo({

product_name:data.name || "",

product_code:data.product_code || "",

collection:data.collection || "",

category:data.category || "",

start_date:data.start_date || "",

launch_season:data.launch_season || "",

owner:data.owner || "",

source:data.source || "",

target_cost:data.target_cost || 0,

current_cost:data.current_cost || 0,

retail_price:data.retail_price || 0

});


setCurrentCost(
data.current_cost || 0
);


}


}



loadProduct();


},[product.id]);


useEffect(()=>{


async function loadCurrentCost(){


const {

data,

error

}=await supabase

.from("products")

.select("current_cost")

.eq(
"id",
product.id
)

.single();



if(!error && data){


setCurrentCost(
data.current_cost || 0
);


}



}



loadCurrentCost();


},[product.id]);


async function loadTimeline(){


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



if(!error){

setTimeline(
data || []
);

}


}







function getStageIndex(stage:string){


return stages.findIndex(

s=>

s.key===stage ||

s.name===stage

);


}







const currentIndex = timeline.length

?

Math.max(

...timeline.map(item=>

getStageIndex(item.stage)

)

)

:

-1;








async function analyzeProduct(){


try{


setAnalyzing(true);



const res = await fetch(

"/api/product-analysis",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

product

})

}

);



const data = await res.json();



await supabase

.from("products")

.update({

ai_insights:data.analysis

})

.eq(
"id",
product.id
);



window.location.reload();



}

catch(error){

console.log(error);

}

finally{

setAnalyzing(false);

}


}






return (

<section
className="
"
>


<div

className="
grid
gap-6
lg:grid-cols-12
"

>





{/* 产品图像 */}

<div

className="
lg:col-span-3
rounded-2xl
border
border-white/10
p-5
"

>


<div

className="
flex
justify-between
items-center
"

>

<h2 className="font-semibold">

产品图像

</h2>



</div>





<div
className="
mt-5
aspect-square
rounded-2xl
border
border-white/10
overflow-hidden
bg-white/[0.02]
flex
items-center
justify-center
cursor-pointer
"
onClick={()=>{

if(product.cover_image){

setPreviewImage(product.cover_image)

}

}}
>


{

product.cover_image


?


<img

src={product.cover_image}

alt="product"

className="
w-full
h-full
object-cover
hover:scale-105
transition
"

/>


:


<div

className="
text-sm
text-white/30
"

>

暂无产品图

</div>


}


</div>





{/* 上传按钮 */}

<ProductImageUpload

productId={product.id}

image={product.cover_image}

hidePreview

onUpdate={()=>{

window.location.reload();

}}

/>


</div>






{/* 产品信息 */}

<div

className="
lg:col-span-6
rounded-2xl
border
border-white/10
p-5
"

>


<div className="flex justify-between items-center">


<h2 className="font-semibold">

产品信息

</h2>



<button

onClick={()=>{

if(editing){

saveInfo();

}else{

setEditing(true);

}

}}

className="
rounded-full
border
border-white/10
px-4
py-1
text-xs
text-white/50
"

>

{

saving

?

"保存中..."

:

editing

?

"保存"

:

"编辑"

}


</button>



</div>





<div

className="
mt-8
grid
grid-cols-2
gap-8
"

>

<EditItem

edit={editing}

label="产品名称"

value={info.product_name}

onChange={v=>updateInfo("product_name",v)}

/>


<EditItem

edit={editing}

label="产品编号"

value={info.product_code}

onChange={v=>updateInfo("product_code",v)}

/>

<EditItem

edit={editing}

label="系列"

value={info.collection}

onChange={v=>updateInfo("collection",v)}

 />

<EditItem

edit={editing}

label="品类"

value={info.category}

onChange={v=>updateInfo("category",v)}

 />


<EditItem

edit={editing}

label="启动时间"

type="date"

value={info.start_date}

onChange={v=>updateInfo("start_date",v)}

 />




<EditItem

edit={editing}

label="计划上市季度"

value={info.launch_season}

onChange={v=>updateInfo("launch_season",v)}

 />








<EditItem

edit={editing}

label="负责人"

value={info.owner}

onChange={v=>updateInfo("owner",v)}

 />



<EditItem

edit={editing}

label="开发来源"

value={info.source}

onChange={v=>updateInfo("source",v)}

 />







<div>

<p className="
text-xs
text-white/30
">

当前成本

</p>


<p className="
mt-2
text-white/80
">

¥{currentCost || 0}

</p>


</div>



<EditItem

edit={editing}

label="目标零售价"

value={info.retail_price}

number

onChange={v=>updateInfo("retail_price",Number(v))}

 />


</div>









{/* Mini Timeline */}

<div className="mt-10">


<div className="
flex
justify-between
">


<p className="
text-xs
text-white/30
">

开发进度

</p>



<span className="
text-xs
text-white/50
">

{
timeline.filter(
i=>i.status==="已完成"
).length
}

/{stages.length}

</span>


</div>







<div

className="
mt-6
flex
items-start
w-full
"

>


{

stages.map((item,index)=>{


const statusRank:any={

"未开始":0,

"进行中":1,

"已完成":2

};



const timelineItem = timeline

.filter(i=>

i.stage===item.key ||

i.stage===item.name

)

.sort(

(a,b)=>

statusRank[b.status]

-

statusRank[a.status]

)[0];





const status=timelineItem?.status;



const completed=status==="已完成";


const running=status==="进行中";




return (

<div

key={item.key}

className="
flex
items-start
flex-1
"

>


<div

className="
flex
flex-col
items-center
flex-1
"

>


<div

className={`

h-3
w-3
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

"border border-white/30"

}

`}

/>




<span

className={`

mt-3
text-xs


${
completed||running

?

"text-white"

:

"text-white/40"

}

`}

>

{item.name}

</span>



</div>






{

index!==stages.length-1 &&


<div

className={`

h-px
flex-1
mt-[6px]


${
index<currentIndex

?

"bg-white"

:

"bg-white/20"

}

`}

/>


}




</div>

)


})

}



</div>


</div>




</div>









{/* AI */}

<div

className="
lg:col-span-3
rounded-2xl
border
border-white/10
p-5
"

>


<h2 className="font-semibold">

LOĒM AI

</h2>


<p className="
mt-1
text-xs
text-white/40
">

Product Intelligence

</p>





<div className="mt-6 space-y-3">


{


(product.ai_insights||[]).length>0


?


product.ai_insights.map(

(item:any,index:number)=>(


<div

key={index}

className="
rounded-xl
border
border-white/10
p-4
"

>


<p className="text-sm text-white">

{item.title}

</p>



<p className="
mt-2
text-xs
text-white/40
">

{item.content}

</p>


</div>


)

)


:


<div

className="
rounded-xl
border
border-white/10
p-4
text-sm
text-white/40
"

>

暂无分析

</div>


}



</div>







<button

onClick={analyzeProduct}

disabled={analyzing}

className="
mt-6
w-full
rounded-xl
bg-white
py-3
text-black
text-sm
font-medium
"

>


{

analyzing

?

"正在分析..."

:

"分析产品"

}


</button>




</div>




</div>

{

previewImage &&


<div

className="
fixed
inset-0
z-50
bg-black/80
flex
items-center
justify-center
p-10
"

onClick={()=>setPreviewImage(null)}

>


<div

className="
relative
max-w-5xl
max-h-[90vh]
"

onClick={(e)=>e.stopPropagation()}

>


<img

src={previewImage}

className="
max-h-[90vh]
max-w-full
rounded-2xl
object-contain
"

/>


<button

onClick={()=>setPreviewImage(null)}

className="
absolute
right-4
top-4
rounded-full
bg-black/60
px-4
py-2
text-white
"

>

关闭

</button>


</div>


</div>


}

</section>

)


}





function EditItem({

label,

value,

edit,

onChange,

type="text",

number=false

}:{

label:string;

value:any;

edit:boolean;

onChange:(v:string)=>void;

type?:string;

number?:boolean;

}){


return (

<div>


<p className="
text-xs
text-white/30
">

{label}

</p>



{

edit ?


<input

type={type}

value={value ?? ""}

onChange={e=>

onChange(
e.target.value
)

}

className="
mt-2
w-full
rounded-lg
border
border-white/10
bg-white/[0.03]
px-3
py-2
text-sm
outline-none
"

/>



:


<p

className="
mt-2
text-white/80
"

>

{
number

?

`¥${value || 0}`

:

type==="date"

?

value

?

value.replaceAll("-", "/")

:

"-"

:

value || "-"

}


</p>


}



</div>

)

}