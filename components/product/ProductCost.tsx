"use client";


import {
useEffect,
useState
} from "react";


import {
supabase
} from "@/lib/supabase";


import CostForm from "./CostForm";



export default function ProductCost({

product

}:{
product:any

}){


const [costs,setCosts]=useState<any[]>([]);

const [loading,setLoading]=useState(true);


const [showForm,setShowForm]=useState(false);





useEffect(()=>{

loadCosts();

},[]);







async function syncCurrentCost(list:any[]){


const total=list.reduce(

(sum,item)=>

sum + Number(item.amount || 0)

,0);



await supabase

.from("products")

.update({

current_cost:total

})

.eq(

"id",

product.id

);



}








async function loadCosts(){


const {

data,

error

}=await supabase

.from("costs")

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


const list=data || [];


setCosts(list);


// 同步 Overview 当前成本

await syncCurrentCost(list);


}



setLoading(false);


}







const total = costs.reduce(

(sum,item)=>

sum + Number(item.amount || 0)

,0);







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


<h2

className="
text-xl
font-semibold
"

>

成本管理

</h2>


<p

className="
text-sm
text-white/40
mt-1
"

>

Cost Management

</p>


</div>





<button

onClick={()=>setShowForm(true)}

className="
rounded-full
border
border-white/10
px-4
py-2
text-xs
"

>

+ 添加成本

</button>


</div>









<div

className="
grid
grid-cols-3
gap-5
mt-8
"

>


<Card

title="成本总计"

value={`¥${total.toFixed(2)}`}

/>


<Card

title="成本项目"

value={`${costs.length} 项`}

/>


<Card

title="目标成本"

value={
product.target_cost
?
`¥${product.target_cost}`
:
"-"
}

/>


</div>









<h3

className="
mt-10
font-semibold
"

>

成本明细

</h3>








{

loading ?


<div

className="
mt-5
text-white/40
"

>

加载中...

</div>



:


costs.length===0 ?


<div

className="
mt-5
rounded-xl
border
border-white/10
p-5
text-white/40
"

>

暂无成本记录

</div>



:


<div

className="
mt-5
grid
grid-cols-2
gap-5
"

>


{

costs.map(item=>(


<div

key={item.id}

className="
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
"

>


<div>


<p

className="
text-xs
text-white/40
"

>

{item.category || "成本"}

</p>



<h4

className="
mt-2
text-lg
"

>

{item.name}

</h4>


</div>





<p

className="
text-lg
"

>

¥{item.amount}

</p>



</div>








<div

className="
mt-4
text-sm
text-white/40
space-y-1
"

>


<p>

单位：{item.unit || "-"}

</p>


<p>

供应商：{item.supplier || "-"}

</p>


{

item.notes &&

<p>

备注：{item.notes}

</p>

}



</div>



</div>


))


}


</div>


}





{


showForm &&


<CostForm


productId={product.id}


onClose={()=>setShowForm(false)}


onSaved={()=>{


setShowForm(false);


loadCosts();


}}


/>


}





</div>

)

}








function Card({

title,

value

}:{

title:string;

value:string;

}){


return (

<div

className="
rounded-2xl
bg-white/[0.03]
p-5
"

>


<p

className="
text-xs
text-white/40
"

>

{title}

</p>



<p

className="
mt-3
text-2xl
"

>

{value}

</p>


</div>

)

}