"use client";


import {
useState
} from "react";


import {
supabase
} from "@/lib/supabase";



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





export default function TimelineForm({

productId,

defaultStage="企划",

onClose,

onSaved


}:{

productId:string;

defaultStage?:string;

onClose:()=>void;

onSaved:()=>void;

}){





const today = new Date()
.toISOString()
.split("T")[0];





const [form,setForm]=useState({

stage:defaultStage,

title:"",

start_date:today,

end_date:"",

status:"未开始",

owner:"",

notes:""

});




const [saving,setSaving]=useState(false);







function update(

key:string,

value:string

){

setForm(prev=>({

...prev,

[key]:value

}));

}









async function save(){



if(!form.title){

alert("请输入节点名称");

return;

}




setSaving(true);





const endDate =

form.status==="已完成"

?

(form.end_date || today)

:

null;






const {

error

}=await supabase

.from("timeline")

.insert({


product_id:productId,


stage:form.stage,


title:form.title,



start_date:

form.start_date || today,



end_date:endDate,



status:form.status,


owner:

form.owner || null,



notes:

form.notes || null,



sort_order:

stages.indexOf(form.stage)



});







if(error){


console.error(
"保存失败:",
error
);



alert(
error.message
);



setSaving(false);


return;


}







alert(
"保存成功"
);



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

添加开发节点

</h2>









<select

value={form.stage}

onChange={e=>

update(
"stage",
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


{

stages.map(stage=>(

<option

key={stage}

value={stage}

>

{stage}

</option>

))

}


</select>









<input

placeholder="节点名称"

value={form.title}

onChange={e=>

update(
"title",
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








<div>


<p className="
mb-2
text-xs
text-white/40
">

开始时间

</p>


<input

type="date"

value={form.start_date}

onChange={e=>

update(
"start_date",
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


</div>








<div>


<p className="
mb-2
text-xs
text-white/40
">

结束时间

</p>


<input

type="date"

value={form.end_date}

onChange={e=>

update(
"end_date",
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


</div>









<select

value={form.status}

onChange={e=>

update(
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


<option value="未开始">

未开始

</option>


<option value="进行中">

进行中

</option>


<option value="已完成">

已完成

</option>


</select>








<input

placeholder="负责人"

value={form.owner}

onChange={e=>

update(
"owner",
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

update(
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

onClick={save}

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