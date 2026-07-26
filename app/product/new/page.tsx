"use client";


import {
useState
} from "react";


import {
supabase
} from "@/lib/supabase";


import {
useRouter
} from "next/navigation";



export default function NewProduct(){


const router=useRouter();



const [name,setName]=useState("");

const [owner,setOwner]=useState("");





async function create(){


if(!name){

alert("请输入产品名称");

return;

}




const {

data,

error

}=await supabase

.from("products")

.insert({
    id:crypto.randomUUID(),

name,


owner,


// 默认

stage:"Planning",

progress:0,


// 后续Overview编辑

product_code:"",


launch_season:"",


category:"",


collection:"",


source:"原创设计",


retail_price:0,


target_cost:0,


current_cost:0

})

.select()

.single();





if(error){

alert(error.message);

return;

}





// 初始化timeline


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



await supabase

.from("timeline")

.insert(

stages.map(stage=>({

product_id:data.id,

stage,

status:"未开始"

}))

);





router.push(

`/product/${data.id}`

);


}





return (

<main

className="
min-h-screen
bg-black
p-10
text-white
"

>


<div className="max-w-xl">


<button

onClick={()=>router.back()}

className="
text-sm
text-white/40
"

>

← 返回

</button>



<h1

className="
mt-8
text-4xl
font-semibold
"

>

新建产品

</h1>




<div className="
mt-10
space-y-6
">


<div>

<p className="
text-sm
text-white/40
">

产品名称

</p>


<input

value={name}

onChange={e=>setName(e.target.value)}

className="
mt-2
w-full
rounded-xl
border
border-white/10
bg-white/[0.03]
p-3
"

/>


</div>




<div>

<p className="
text-sm
text-white/40
">

负责人

</p>


<input

value={owner}

onChange={e=>setOwner(e.target.value)}

className="
mt-2
w-full
rounded-xl
border
border-white/10
bg-white/[0.03]
p-3
"

/>


</div>





<button

onClick={create}

className="
mt-6
w-full
rounded-xl
bg-white
py-3
text-black
"

>

创建产品

</button>


</div>


</div>


</main>

)

}