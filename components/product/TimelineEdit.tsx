"use client";


import {
useState
} from "react";


import {
supabase
} from "@/lib/supabase";



export default function TimelineEdit({

item,

onClose,

onSaved

}:{

item:any;

onClose:()=>void;

onSaved:()=>void;

}){





const today = new Date()
.toISOString()
.split("T")[0];





const [title,setTitle]=useState(
item.title || ""
);



const [status,setStatus]=useState(
item.status || "未开始"
);



const [owner,setOwner]=useState(
item.owner || ""
);



const [startDate,setStartDate]=useState(
item.start_date || ""
);



const [endDate,setEndDate]=useState(
item.end_date || ""
);



const [notes,setNotes]=useState(
item.notes || ""
);



const [saving,setSaving]=useState(false);









async function save(){


setSaving(true);





let finalEndDate=endDate || null;





// 状态变成完成时，自动记录完成时间

if(
status==="已完成"
&&
!finalEndDate
){

finalEndDate=today;

}






const {

error

}=await supabase

.from("timeline")

.update({



title,



status,



owner:
owner || null,



start_date:
startDate || null,



end_date:
finalEndDate,



notes:
notes || null



})

.eq(
"id",
item.id
);







if(error){


console.error(
"更新失败:",
error
);



alert(
error.message
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
bg-black/70
flex
items-center
justify-center
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



<h2

className="
text-xl
font-semibold
"

>

编辑：

{item.stage}

</h2>










{/* 状态 */}

<select

value={status}

onChange={
e=>setStatus(e.target.value)
}

className="
w-full
rounded-xl
bg-white/[0.03]
border
border-white/10
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









{/* 节点名称 */}

<input


placeholder="节点名称"


value={title}


onChange={

e=>setTitle(e.target.value)

}


className="
w-full
rounded-xl
bg-white/[0.03]
border
border-white/10
p-3
"

/>









{/* 开始时间 */}

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

value={startDate}

onChange={
e=>setStartDate(e.target.value)
}

className="
w-full
rounded-xl
bg-white/[0.03]
border
border-white/10
p-3
"

/>


</div>









{/* 结束时间 */}

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

value={endDate}

onChange={
e=>setEndDate(e.target.value)
}

className="
w-full
rounded-xl
bg-white/[0.03]
border
border-white/10
p-3
"

/>


</div>









{/* 负责人 */}

<input

placeholder="负责人"

value={owner}

onChange={
e=>setOwner(e.target.value)
}

className="
w-full
rounded-xl
bg-white/[0.03]
border
border-white/10
p-3
"

/>









{/* 备注 */}

<textarea

placeholder="备注"

value={notes}

onChange={
e=>setNotes(e.target.value)
}

className="
w-full
rounded-xl
bg-white/[0.03]
border
border-white/10
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
text-black
py-3
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