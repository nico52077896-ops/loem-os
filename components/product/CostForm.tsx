"use client";


import {
useState
} from "react";


import {
supabase
} from "@/lib/supabase";



export default function CostForm({

productId,

onClose,

onSaved

}:{

productId:string;

onClose:()=>void;

onSaved:()=>void;

}){



const [form,setForm]=useState({

category:"面料",

name:"",

amount:"",

unit:"",

supplier:"",

notes:""

});



const [saving,setSaving]=useState(false);





function updateField(

key:string,

value:string

){

setForm(prev=>({

...prev,

[key]:value

}));

}







async function saveCost(){


if(!form.name){

alert("请输入成本名称");

return;

}



setSaving(true);



const {

error

}=await supabase

.from("costs")

.insert({

product_id:productId,

category:form.category,

name:form.name,

amount:Number(form.amount),

unit:form.unit,

supplier:form.supplier,

notes:form.notes

});





if(error){

console.error(
"成本保存失败:",
error
);

alert(
"保存失败:\n" + error.message
);

setSaving(false);

return;

}





setSaving(false);


onSaved();


}









return (

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
max-w-lg
rounded-3xl
border
border-white/10
bg-black
p-6
space-y-4
"

>


<h2

className="
text-xl
font-semibold
"

>

添加成本

</h2>








<select

value={form.category}

onChange={e=>

updateField(
"category",
e.target.value
)

}

className="
w-full
rounded-xl
border
border-white/10
bg-white/[0.03]
p-3
"

>


<option>
面料
</option>


<option>
辅料
</option>


<option>
加工
</option>


<option>
包装
</option>


<option>
运输
</option>


<option>
其他
</option>


</select>








<input

placeholder="成本名称"

value={form.name}

onChange={e=>

updateField(
"name",
e.target.value
)

}

className="
w-full
rounded-xl
border
border-white/10
bg-white/[0.03]
p-3
"

/>







<input

placeholder="金额"

type="number"

value={form.amount}

onChange={e=>

updateField(
"amount",
e.target.value
)

}

className="
w-full
rounded-xl
border
border-white/10
bg-white/[0.03]
p-3
"

/>








<input

placeholder="单位（米/件/kg）"

value={form.unit}

onChange={e=>

updateField(
"unit",
e.target.value
)

}

className="
w-full
rounded-xl
border
border-white/10
bg-white/[0.03]
p-3
"

/>








<input

placeholder="供应商"

value={form.supplier}

onChange={e=>

updateField(
"supplier",
e.target.value
)

}

className="
w-full
rounded-xl
border
border-white/10
bg-white/[0.03]
p-3
"

/>









<textarea

placeholder="备注"

value={form.notes}

onChange={e=>

updateField(
"notes",
e.target.value
)

}

className="
w-full
rounded-xl
border
border-white/10
bg-white/[0.03]
p-3
"

/>









<button

onClick={saveCost}

disabled={saving}

className="
w-full
rounded-xl
bg-white
py-3
text-black
font-medium
"

>

{

saving

?

"保存中..."

:

"保存"

}


</button>









<button

onClick={onClose}

className="
w-full
rounded-xl
border
border-white/10
py-3
"

>

取消

</button>






</div>


</div>

)

}