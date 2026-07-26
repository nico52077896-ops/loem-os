"use client";


import {
useEffect,
useState
} from "react";


import {
useRouter,
useParams
} from "next/navigation";


import {
supabase
} from "@/lib/supabase";


import ProductImageUpload
from "@/components/product/ProductImageUpload";





export default function EditProduct(){


const router = useRouter();

const params = useParams();

const id = params.id as string;



const [loading,setLoading]=useState(true);

const [saving,setSaving]=useState(false);


const [image,setImage]=useState("");



const [form,setForm]=useState({

name:"",
category:"",
owner:"",
source:"",
retail_price:0,
target_cost:0

});







useEffect(()=>{


loadProduct();


},[]);








async function loadProduct(){


const {

data,

error

}=await supabase

.from("products")

.select("*")

.eq(
"id",
id
)

.single();




if(error){

console.error(error);

return;

}




if(data){


setImage(
data.cover_image || ""
);



setForm({

name:data.name || "",

category:data.category || "",

owner:data.owner || "",

source:data.source || "",

retail_price:data.retail_price || 0,

target_cost:data.target_cost || 0

});


}



setLoading(false);


}









function update(
key:string,
value:any
){


setForm(prev=>({

...prev,

[key]:value

}));


}









async function save(){


setSaving(true);



const {

error

}=await supabase

.from("products")

.update({

name:form.name,

category:form.category,

owner:form.owner,

source:form.source,

retail_price:form.retail_price,

target_cost:form.target_cost,

cover_image:image

})

.eq(
"id",
id
);





if(error){


console.error(error);


alert(
error.message
);


setSaving(false);


return;


}




setSaving(false);



router.push(
`/product/${id}`
);


router.refresh();


}









if(loading){

return (

<div className="text-white/40">

加载中...

</div>

)

}









return (

<div

className="
max-w-xl
space-y-6
"

>




<button

onClick={()=>router.push(`/product/${id}`)}

className="
text-sm
text-white/40
hover:text-white
transition
"

>

← 返回产品

</button>





<h1

className="
text-3xl
font-semibold
"

>

编辑产品

</h1>








<Input

label="产品名称"

value={form.name}

onChange={
v=>update(
"name",
v
)
}

/>








<Input

label="品类"

value={form.category}

onChange={
v=>update(
"category",
v
)
}

/>








<Input

label="负责人"

value={form.owner}

onChange={
v=>update(
"owner",
v
)
}

/>








<Input

label="开发来源"

value={form.source}

onChange={
v=>update(
"source",
v
)
}

/>








<Input

label="目标售价"

value={String(form.retail_price)}

onChange={
v=>update(
"retail_price",
Number(v)
)
}

/>








<Input

label="目标成本"

value={String(form.target_cost)}

onChange={
v=>update(
"target_cost",
Number(v)
)
}

/>









{/* 产品图片 */}

<div>


<p

className="
mb-2
text-sm
text-white/40
"

>

产品主图

</p>




<ProductImageUpload


productId={id}


image={image}


onUpdate={(url)=>setImage(url || "")}


/>


</div>









<button


onClick={save}

disabled={saving}


className="

w-full

rounded-xl

bg-white

py-3

text-black

disabled:opacity-50

"


>

{

saving

?

"保存中..."

:

"保存修改"

}


</button>







</div>


)



}









function Input({

label,

value,

onChange

}:{

label:string;

value:string;

onChange:(v:string)=>void;

}){


return (

<div>


<p

className="

mb-2

text-sm

text-white/40

"

>

{label}

</p>




<input


value={value}


onChange={

e=>onChange(
e.target.value
)

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


</div>


)

}