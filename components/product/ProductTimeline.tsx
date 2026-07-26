"use client";


import TimelineProgress from "./TimelineProgress";
import TimelineEdit from "./TimelineEdit";

import {
useEffect,
useState
} from "react";


import {
supabase
} from "@/lib/supabase";


import TimelineForm from "./TimelineForm";



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



// 计算耗时
function calculateDays(
start:string,
end:string
){

const startDate =
new Date(start);


const endDate =
new Date(end);



const diff =
endDate.getTime()
-
startDate.getTime();



return Math.ceil(
diff /
(
1000 *
60 *
60 *
24
)
);


}





export default function ProductTimeline({

product

}:{
product:any

}){


const [timeline,setTimeline]=useState<any[]>([]);

const [loading,setLoading]=useState(true);

const [showForm,setShowForm]=useState(false);

const [editItem,setEditItem]=useState<any>(null);

const [defaultStage,setDefaultStage]=useState("企划");





useEffect(()=>{

loadTimeline();

},[]);






async function loadTimeline(){


const {

data,

error

}=await supabase

.from("timeline")

.select("*")

.eq(
"product_id",
product.id
)

.order(
"sort_order",
{
ascending:true
}
);



console.log(
"timeline:",
data,
error
);



if(!error){

setTimeline(data || []);

}


setLoading(false);

}










// 当前阶段

function getCurrentStage(){


const completed = timeline

.filter(
item=>item.status==="已完成"
)

.sort(
(a,b)=>

stages.indexOf(b.stage)
-
stages.indexOf(a.stage)

);



if(completed.length){

return completed[0].stage;

}




const processing = timeline.find(

item=>

item.status==="进行中"

);



if(processing){

return processing.stage;

}



return "企划";


}



const currentStage=getCurrentStage();









function handleStageClick(

stage:string,

item?:any

){



if(item){

setEditItem(item);

}

else{


setDefaultStage(stage);

setShowForm(true);


}


}









async function deleteItem(

e:any,

id:string

){


e.stopPropagation();



if(!confirm("删除该节点？")){

return;

}




const {

error

}=await supabase

.from("timeline")

.delete()

.eq(
"id",
id
);



if(error){

console.error(error);

alert("删除失败");

return;

}



loadTimeline();


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
items-start
"

>


<div>


<h2 className="
text-xl
font-semibold
">

开发时间线

</h2>


<p className="
text-sm
text-white/40
mt-1
">

Product Timeline

</p>


</div>





<button

onClick={()=>{

setDefaultStage("企划");

setShowForm(true);

}}

className="
rounded-full
border
border-white/10
px-4
py-2
text-xs
"

>

+ 添加节点

</button>



</div>









<div className="
mt-10
">


<TimelineProgress

items={timeline}

onStageClick={handleStageClick}

/>


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


timeline.filter(
item=>item.title
).length===0 ?



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

暂无开发记录

</div>





:


<div

className="
mt-8
space-y-6
"

>


{

timeline

.filter(
item=>item.title
)

.map(item=>(



<div

key={item.id}

onClick={()=>setEditItem(item)}

className="
cursor-pointer
relative
pl-8
"

>


<div

className="
absolute
left-0
top-8
w-3
h-3
rounded-full
bg-white
"

/>







<div

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


<p className="
text-xs
text-white/40
">

{item.stage}

</p>


<h3 className="
mt-2
text-lg
">

{item.title}

</h3>


</div>





<button

onClick={(e)=>
deleteItem(e,item.id)
}

className="
text-xs
text-red-400
"

>

删除

</button>



</div>









<div

className="
mt-5
grid
grid-cols-4
gap-6
text-sm
"

>



<div>

<p className="
text-xs
text-white/30
">

开始时间

</p>


<p className="
mt-2
text-white/80
">

{
item.start_date || "-"
}

</p>

</div>








<div>

<p className="
text-xs
text-white/30
">

结束时间（预估/实际）

</p>


<p className="
mt-2
text-white/80
">

{
item.end_date || "-"
}

</p>

</div>









<div>

<p className="
text-xs
text-white/30
">

耗时

</p>


<p className="
mt-2
text-white/80
">

{

item.start_date && item.end_date

?

calculateDays(
item.start_date,
item.end_date
)
+
"天"

:

"-"

}


</p>

</div>









<div>

<p className="
text-xs
text-white/30
">

负责人

</p>


<p className="
mt-2
text-white/80
">

{
item.owner || "-"
}

</p>

</div>



</div>









<div className="mt-5">


<span
className={`
inline-flex
rounded-full
px-3
py-1
text-xs

${
item.status==="已完成"

?

"bg-white text-black"

:

item.status==="进行中"

?

"bg-blue-500 text-white"

:

"border border-white/20 text-white/50"

}

`}
>

{item.status}

</span>


</div>








{

item.notes &&


<p

className="
mt-3
text-sm
text-white/50
"

>

{item.notes}

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


<TimelineForm


productId={product.id}


defaultStage={defaultStage}


onClose={()=>setShowForm(false)}


onSaved={()=>{

setShowForm(false);

loadTimeline();

}}


/>


}








{
editItem &&


<TimelineEdit


item={editItem}


onClose={()=>setEditItem(null)}


onSaved={()=>{


setEditItem(null);

loadTimeline();


}}


/>


}



</div>

)

}