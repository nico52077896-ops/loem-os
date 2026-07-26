"use client";


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


export default function TimelineProgress({

items=[],

onStageClick


}:{

items?:any[];

onStageClick?:(stage:string,item?:any)=>void;

}){



return (

<div className="w-full mt-10 mb-10">


<div className="flex items-start w-full">


{

stages.map((stage,index)=>{



const item =
items.find(
i=>i.stage===stage
);



const status=item?.status;



return (

<div
key={stage}
className="flex items-start flex-1"
>



<div

className="
flex
flex-col
items-center
"

>


<div

onClick={()=>{

onStageClick?.(
stage,
item
)

}}

className={`
w-6
h-6
rounded-full
border
shrink-0
transition-all

${

status==="已完成"

?

"bg-white border-white"

:

status==="进行中"

?

"bg-blue-500 border-blue-500"

:

"bg-black border-white/40"

}


${

item

?

"cursor-pointer hover:scale-110"

:

""

}

`}

/>



<span

className={`

mt-4

text-sm

whitespace-nowrap


${

item

?

"text-white"

:

"text-white/40"

}

`}

>

{stage}

</span>



</div>





{

index!==stages.length-1 &&


<div

className="
flex-1
h-[1px]
bg-white/20
mt-3
mx-3
"

/>


}




</div>



)

})

}



</div>


</div>

)

}