"use client";

import {
useState
} from "react";

import {
supabase
} from "@/lib/supabase";

import SampleImageUpload from "./SampleImageUpload";


export default function SampleForm({

productId,

editData,

onClose,

onSaved

}:{

productId:string;

editData?:any;

onClose:()=>void;

onSaved:()=>void;

}){


const [saving,setSaving]=useState(false);



const [form,setForm]=useState({

name:editData?.name || "",

version:editData?.version || "V1",

status:editData?.status || "开发中",

factory:editData?.factory || "",

images:editData?.images || [],

notes:editData?.notes || ""

});





function updateField(
key:string,
value:string
){

setForm(prev=>({

...prev,

[key]:value

}));

}




function updateImages(
images:string[]
){

setForm(prev=>({

...prev,

images

}));

}






async function saveSample(){


if(!form.name){

alert("请输入样衣名称");

return;

}



setSaving(true);



const payload={

product_id:productId,

name:form.name,

version:form.version,

status:form.status,

factory:form.factory,

images:form.images || [],

notes:form.notes

};




console.log(
"保存样衣数据:",
payload
);





let error;



if(editData){


const result =
await supabase

.from("samples")

.update(payload)

.eq(
"id",
editData.id
);


error=result.error;



}else{


const result =
await supabase

.from("samples")

.insert(payload);


error=result.error;


}





if(error){


console.error(
"保存失败:",
error
);


alert(
"保存失败:\n"+error.message
);


setSaving(false);

return;


}





alert(
"样衣保存成功"
);



setSaving(false);


onSaved();

onClose();


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
bg-black
border
border-white/10
p-6
space-y-4
"

>


<h2 className="
text-xl
font-semibold
">

{

editData

?

"编辑样衣"

:

"添加打样"

}

</h2>






<SampleImageUpload

images={form.images}

onUpload={updateImages}

/>






<input

placeholder="样衣名称"

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

placeholder="版本"

value={form.version}

onChange={e=>

updateField(
"version",
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






<select

value={form.status}

onChange={e=>

updateField(
"status",
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
开发中
</option>


<option>
已寄样
</option>


<option>
测试中
</option>


<option>
已确认
</option>


<option>
已归档
</option>


</select>







<input

placeholder="生产工厂"

value={form.factory}

onChange={e=>

updateField(
"factory",
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

onClick={saveSample}

disabled={saving}

className="
w-full
rounded-xl
bg-white
py-3
text-black
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