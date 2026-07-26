"use client";


import Link from "next/link";

import {
useEffect,
useState
} from "react";


import {
getProducts
} from "@/lib/productStore";

import {
supabase
} from "@/lib/supabase";


const filters=[

"全部产品"

];





export default function ProductStudioPage(){



const [products,setProducts]=useState<any[]>([]);
const [search,setSearch]=useState("");

const [createOpen,setCreateOpen] = useState(false);
const [deleteProduct,setDeleteProduct] = useState<any>(null);
const [newName,setNewName] = useState("");

const [newOwner,setNewOwner] = useState("");
async function handleDelete(){


if(!deleteProduct){

return;

}



const {error}=await supabase

.from("products")

.delete()

.eq(
"id",
deleteProduct.id
);



if(error){

alert(error.message);

return;

}



setDeleteProduct(null);



const data = await getProducts();

setProducts(data);


}

useEffect(()=>{


async function load(){


const data=await getProducts();


setProducts(data);



}


load();


},[]);



// 搜索过滤
const filteredProducts = products.filter(product=>{

const keyword = search.toLowerCase();


return (

(product.name || "")
.toLowerCase()
.includes(keyword)

||

(product.product_code || "")
.toLowerCase()
.includes(keyword)

);


});









return (

<main

className="
min-h-screen
bg-black
px-8
py-10
text-white
"

>



<header

className="
flex
items-start
justify-between
border-b
border-white/10
pb-8
"

>


<div>


<Link

href="/"

className="
mb-6
inline-block
text-sm
text-white/40
"

>

← 返回首页

</Link>



<h1

className="
text-4xl
font-semibold
"

>

Product Studio

</h1>


<p

className="
mt-2
text-sm
text-white/40
"

>

产品研发中心

</p>



</div>




<button
  onClick={()=>setCreateOpen(true)}
  className="
  rounded-xl
  bg-white
  px-5
  py-3
  text-sm
  font-medium
  text-black
  "
>
  + 新建产品
</button>



</header>







<section

className="
mt-8
flex
justify-between
items-center
"

>


<div

className="
flex
gap-2
"

>


{

filters.map(

(item,index)=>(


<button

key={item}

className={

index===0

?

`
rounded-full
bg-white
px-4
py-2
text-sm
text-black
`

:

`
rounded-full
border
border-white/10
px-4
py-2
text-sm
text-white/50
`

}

>


{item}


</button>



)

)



}


</div>




<input

value={search}

onChange={
e=>setSearch(e.target.value)
}

placeholder="
搜索款号或产品名称
"

className="
h-10
w-64
rounded-xl
border
border-white/10
bg-white/[0.03]
px-4
text-sm
outline-none
placeholder:text-white/30
"

/>




</section>







<section

className="
mt-8
grid
gap-5
md:grid-cols-2
xl:grid-cols-3
"

>



{

filteredProducts.map(product=>(



<Link

key={product.id}

href={`/product/${product.id}`}

>


<article

className="
rounded-3xl
border
border-white/10
bg-white/[0.025]
p-6
transition
hover:border-white/30
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
text-white/35
"

>

{

product.product_code || product.id

}


</p>



<h2

className="
mt-3
text-xl
font-semibold
"

>

{

product.name

}


</h2>


</div>


<div>


<button

onClick={(e)=>{


e.preventDefault();

setDeleteProduct(product);


}}

className="
text-xs
text-white/30
hover:text-red-400
"

>

删除

</button>


</div>


</div>







<div

className="
mt-8
grid
grid-cols-2
gap-6
"

>


<Field

label="品类"

value={
product.category
}

/>



<Field

label="上市季度"

value={
product.launch_season
}

/>



<Field

label="负责人"

value={
product.owner
}

/>



<Field

label="开发来源"

value={
product.source
}

/>



<Field

label="目标零售价"

value={
product.retail_price
?
`¥${product.retail_price}`
:
"-"
}

/>



<Field

label="当前成本"

value={
product.current_cost
?
`¥${product.current_cost}`
:
"-"
}

/>



</div>








<div

className="
mt-8
"

>


<div

className="
flex
justify-between
text-xs
"

>


<span className="text-white/30">

开发进度

</span>


<span>

{

product.progress || 0

}%

</span>


</div>




<div

className="
mt-2
h-1.5
rounded-full
bg-white/10
"

>


<div

className="
h-full
rounded-full
bg-white
"

style={{

width:`${product.progress || 0}%`

}}

/>


</div>



</div>






<div

className="
mt-6
text-right
text-sm
text-white/40
"

>

查看产品 →

</div>



</article>



</Link>


))


}



      </section>


{
createOpen && (

<div
className="
fixed
inset-0
z-50
flex
items-center
justify-center
bg-black/70
"
>


<div
className="
w-full
max-w-md
rounded-3xl
border
border-white/10
bg-[#0b0b0b]
p-8
"
>


<h2 className="
text-xl
font-semibold
">

新建产品

</h2>


<p className="
mt-2
text-sm
text-white/40
">

创建基础信息，其他信息进入产品页完善

</p>


<div className="
mt-8
space-y-5
">


<input

placeholder="产品名称"

value={newName}

onChange={
e=>setNewName(e.target.value)
}

className="
w-full
rounded-xl
border
border-white/10
bg-white/[0.03]
px-4
py-3
outline-none
"

/>



<input

placeholder="负责人"

value={newOwner}

onChange={
e=>setNewOwner(e.target.value)
}

className="
w-full
rounded-xl
border
border-white/10
bg-white/[0.03]
px-4
py-3
outline-none
"

/>


<div className="
flex
gap-3
">


<button

onClick={async()=>{


const res = await fetch(
"/api/products/create",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

name:newName,

owner:newOwner

})

}

);



if(res.ok){


const product = await res.json();



window.location.href =
`/product/${product.id}`;



}else{


alert("创建失败");


}


}}

className="
flex-1
rounded-xl
bg-white
py-3
text-black
"

>

创建

</button>


</div>


</div>


</div>


</div>

)

}

{
deleteProduct && (

<div

className="
fixed
inset-0
z-50
flex
items-center
justify-center
bg-black/70
"

>


<div

className="
w-full
max-w-sm
rounded-3xl
border
border-white/10
bg-[#0b0b0b]
p-8
"

>


<h2
className="
text-xl
font-semibold
"
>

确认删除？

</h2>


<p

className="
mt-3
text-sm
text-white/40
"

>

删除后产品资料无法恢复。

</p>



<div

className="
mt-8
flex
gap-3
"

>


<button

onClick={()=>setDeleteProduct(null)}

className="
flex-1
rounded-xl
border
border-white/10
py-3
"

>

取消

</button>




<button

onClick={handleDelete}

className="
flex-1
rounded-xl
bg-red-500
py-3
"

>

确认删除

</button>



</div>


</div>


</div>

)
}


    </main>
  );
}





function Field({

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
text-sm
text-white/70
"

>

{

value || "-"

}


</p>



</div>


)


}