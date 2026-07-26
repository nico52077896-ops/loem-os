"use client";


import {
useEffect,
useState
} from "react";


import {
supabase
} from "@/lib/supabase";


import MaterialForm from "./MaterialForm";



export default function ProductMaterials({

product

}:{
product:any

}){


const [materials,setMaterials]=useState<any[]>([]);


const [loading,setLoading]=useState(true);


const [showForm,setShowForm]=useState(false);


const [editData,setEditData]=useState<any>(null);


const [analyzing,setAnalyzing]=useState<string|null>(null);





useEffect(()=>{

loadMaterials();

},[]);





async function loadMaterials(){


const {

data,
error

}=await supabase


.from("materials")

.select("*")


.eq(
"product_id",
product.id
)


.order(
"created_at",
{
ascending:false
}

);



if(!error){

setMaterials(data || []);

}


setLoading(false);


}







function openAdd(){


setEditData(null);

setShowForm(true);

}




function openEdit(item:any){


setEditData(item);

setShowForm(true);


}







async function deleteMaterial(id:string){


if(!confirm("确定删除这个面料吗？"))
return;



await supabase

.from("materials")

.delete()

.eq(
"id",
id
);



loadMaterials();


}







async function analyzeMaterial(item:any){

console.log("开始AI分析",item);


try{


const res = await fetch(
"/api/material-analysis",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
material:item
})
}
);



const data = await res.json();



console.log("AI返回:",data);



await supabase

.from("materials")

.update({

ai_analysis:data.analysis

})

.eq(
"id",
item.id
);



loadMaterials();



}catch(error){


console.error(
"AI分析错误",
error
);


}


}







return (

<div

className="
rounded-3xl
border
border-white/10
bg-white/[0.03]
p-6
"

>


<div

className="
flex
justify-between
items-center
"

>


<div>

<h2 className="text-xl font-semibold">

面料管理

</h2>


<p className="
mt-1
text-sm
text-white/40
">

Material Intelligence

</p>

</div>



<button

onClick={openAdd}

className="
rounded-full
border
border-white/10
px-4
py-2
text-xs
"

>

+ 添加面料

</button>


</div>







{
loading ?


<div className="mt-8 text-white/40">

加载中...

</div>



:


materials.length===0 ?


<div className="
mt-8
rounded-xl
border
border-white/10
p-5
text-white/40
">

暂无面料信息

</div>



:


<div className="
mt-8
grid
grid-cols-1
md:grid-cols-2
gap-5
">


{

materials.map(item=>(


<div

key={item.id}

className="
rounded-2xl
border
border-white/10
p-4
bg-white/[0.02]
"

>





{
(item.images?.length || item.image) && (

<MaterialGallery
images={
item.images?.length
?
item.images
:
[item.image]
}
/>

)
}





<div className="
flex
justify-between
">


<div>


<span className="
rounded-full
border
border-white/10
px-3
py-1
text-xs
text-white/50
">

{item.role || "面料"}

</span>



<h3 className="
mt-3
text-lg
">

{item.name}

</h3>


<p className="
mt-2
text-sm
text-white/50
">

{item.composition || "-"}

</p>


</div>





<div className="
flex
gap-4
">


<button

onClick={()=>analyzeMaterial(item)}

className="
text-xs
text-blue-400
"

>

{

analyzing===item.id

?

"分析中..."

:

"AI分析"

}


</button>



<button

onClick={()=>openEdit(item)}

className="
text-xs
text-white/50
"

>

编辑

</button>




<button

onClick={()=>deleteMaterial(item.id)}

className="
text-xs
text-red-400
"

>

删除

</button>


</div>



</div>









<div className="
mt-5
grid
grid-cols-2
gap-2
">


<Item
label="类型"
value={item.type}
/>


<Item
label="克重"
value={item.weight}
/>


<Item
label="颜色"
value={item.color}
/>


<Item
label="供应商"
value={item.supplier}
/>


<Item
label="价格"
value={
item.price
?
`¥${item.price}`
:
"-"
}
/>


</div>







{
item.ai_analysis &&

<AIAnalysis 
data={item.ai_analysis}
/>

}





{
item.notes &&


<div className="
mt-5
rounded-xl
border
border-white/10
p-3
">


<p className="
text-xs
text-white/40
">

备注

</p>


<p className="
mt-2
text-sm
">

{item.notes}

</p>


</div>


}



</div>


))


}


</div>


}





{

showForm &&


<MaterialForm

productId={product.id}

editData={editData}

onClose={()=>{

setShowForm(false);

setEditData(null);

}}

onSaved={loadMaterials}

/>


}



</div>

)

}







function Item({

label,

value

}:{
label:string;
value:string;

}){


return (

<div

className="
rounded-xl
border
border-white/10
p-4
"

>

<p className="
text-xs
text-white/40
">

{label}

</p>


<p

className="
mt-2
text-sm
text-white/90
"

>

{value || "-"}

</p>



</div>

)

}
function AIItem({

label,

value

}:{

label:string;

value:string;

}){


return (

<div

className="
rounded-xl
border
border-white/10
p-4
"

>

<p

className="
text-xs
text-white/40
"

>

{label}

</p>


<p

className="
mt-2
text-sm
text-white
"

>

{value || "-"}

</p>


</div>

)

}
function AIAnalysis({

data

}:{

data:any

}){


let analysis:any=data;



try{


if(typeof data==="string"){

analysis=JSON.parse(data);

}


}catch{

return null;

}





return (

<div

className="
mt-3
rounded-2xl
border
border-blue-500/30
bg-blue-500/[0.05]
p-3
"

>


<p

className="
text-xs
text-blue-400
mb-4
"

>

LOĒM AI

</p>




<div

className="
grid
grid-cols-2
gap-4
"

>


<AIItem

label="等级"

value={analysis.level}

/>



<AIItem

label="适用品类"

value={analysis.usage}

/>



<AIItem

label="优势"

value={analysis.strength}

/>



<AIItem

label="风险"

value={analysis.risk}

/>



<AIItem

label="开发建议"

value={analysis.suggestion}

/>



</div>



</div>

)


}
function MaterialGallery({

images

}:{

images:string[]

}){


const [active,setActive]=useState(0);



return (

<div className="
mb-5
space-y-3
">


<div

className="
h-64
w-full
rounded-2xl
bg-white/[0.03]
flex
items-center
justify-center
overflow-hidden
"

>


<img

src={images[active]}

className="
max-h-full
max-w-full
object-contain
"

/>


</div>





<div className="
grid
grid-cols-5
gap-3
">


{

images.map(
(img,index)=>(


<button

key={index}

onClick={()=>setActive(index)}

className={`
rounded-xl
overflow-hidden
border
${active===index
?
"border-blue-400"
:
"border-white/10"
}

`}

>


<img

src={img}

className="
h-16
w-full
object-cover
"

/>


</button>


)

)

}


</div>



</div>

)


}