"use client";

const tabs = [
  "Overview",
  "Timeline",
  "Materials",
  "Samples",
  "Cost",
  "Documents",
];


export default function ProductTabs({
  active,
  setActive,
}:{
  active:string;
  setActive:(value:string)=>void;
}) {


return (

<div
className="
flex
gap-8
"
>

{
tabs.map(tab=>(

<button
key={tab}
onClick={()=>setActive(tab)}
className={
active===tab
?
"border-b-2 border-white pb-4 text-white text-sm"
:
"pb-4 text-white/40 text-sm"
}
>
{tab}
</button>

))
}

</div>

)

}