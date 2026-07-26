"use client";


import {
useEffect,
useState
} from "react";


import {
supabase
} from "@/lib/supabase";


import SampleForm from "./SampleForm";



export default function ProductSamples({

product

}:{
product:any
}){


const [samples,setSamples]=useState<any[]>([]);

const [loading,setLoading]=useState(true);

const [showForm,setShowForm]=useState(false);

const [editData,setEditData]=useState<any>(null);





useEffect(()=>{

loadSamples();

},[]);






async function loadSamples(){


const {

data,
error

}=await supabase


.from("samples")

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

setSamples(data || []);

}


setLoading(false);


}








function addSample(){


setEditData(null);

setShowForm(true);


}





function editSample(item:any){


setEditData(item);

setShowForm(true);


}







async function deleteSample(id:string){


if(!confirm("确定删除这个样衣吗？"))
return;



await supabase

.from("samples")

.delete()

.eq(
"id",
id
);



loadSamples();


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

<h2 className="
text-xl
font-semibold
">

样衣管理

</h2>


<p className="
text-sm
text-white/40
mt-1
">

Sample Development

</p>

</div>




<button

onClick={addSample}

className="
rounded-full
border
border-white/10
px-4
py-2
text-xs
"

>

+ 添加打样

</button>


</div>







{

loading ?

<div className="
mt-8
text-white/40
">

加载中...

</div>



:


samples.length===0 ?


<div

className="
mt-8
rounded-xl
border
border-white/10
p-5
text-white/40
"

>

暂无样衣

</div>



:


<div

className="
mt-8
grid
grid-cols-2
gap-5
"

>


{

samples.map(item=>(


<div

key={item.id}

className="
rounded-2xl
border
border-white/10
p-5
"

>




{

item.images?.[0] &&


<img

src={item.images[0]}

className="
h-56
w-full
rounded-xl
object-cover
"

 />



}





<div className="
mt-4
flex
justify-between
">


<div>


<span

className="
rounded-full
border
border-white/10
px-3
py-1
text-xs
text-white/50
"

>

{item.status}

</span>



<h3 className="
mt-3
text-lg
">

{item.name}

</h3>



<p className="
text-sm
text-white/50
mt-2
">

{item.version}

</p>



</div>





<div className="
flex
gap-3
"

>


<button

onClick={()=>editSample(item)}

className="
text-xs
text-white/50
"

>

编辑

</button>



<button

onClick={()=>deleteSample(item.id)}

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
gap-3
">


<div className="
rounded-xl
border
border-white/10
p-3
">

<p className="
text-xs
text-white/40
">

工厂

</p>


<p className="
mt-2
">

{item.factory || "-"}

</p>


</div>





<div className="
rounded-xl
border
border-white/10
p-3
">

<p className="
text-xs
text-white/40
">

版本

</p>


<p className="
mt-2
">

{item.version || "-"}

</p>


</div>



</div>






</div>


))


}


</div>



}





{

showForm &&


<SampleForm

productId={product.id}

editData={editData}

onClose={()=>{

setShowForm(false);

setEditData(null);

}}

onSaved={loadSamples}

/>


}



</div>


)

}