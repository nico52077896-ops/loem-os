"use client";

import { useState } from "react";

import ProductOverview from "./ProductOverview";
import ProductCost from "./ProductCost";
import ProductMaterials from "./ProductMaterials";
import ProductTimeline from "./ProductTimeline";
import ProductSamples from "./ProductSamples";
import ProductDocuments from "./ProductDocuments";


export default function ProductWorkspace({
 product
}:{
 product:any;
}){


const [active,setActive]=useState("overview");


const tabs=[
{
id:"overview",
name:"Overview"
},
{
id:"timeline",
name:"Timeline"
},
{
id:"materials",
name:"Materials"
},
{
id:"samples",
name:"Samples"
},
{
id:"cost",
name:"Cost"
},
{
id:"documents",
name:"Documents"
}
];



return (

<div>


{/* Tabs */}

<div
className="
flex
gap-8
border-b
border-white/10
mb-8
"
>


{
tabs.map(tab=>(


<button

key={tab.id}

onClick={()=>setActive(tab.id)}

className={`
pb-4
text-sm
transition

${
active===tab.id
?
"text-white border-b border-white"
:
"text-white/40 hover:text-white"
}

`}

>

{tab.name}

</button>


))

}


</div>





{/* 内容 */}

{

active==="overview" &&

<ProductOverview
product={product}
/>

}



{

active==="timeline" &&

<ProductTimeline
product={product}
/>

}



{

active==="materials" &&

<ProductMaterials
product={product}
/>

}



{

active==="samples" &&

<ProductSamples
product={product}
/>

}



{

active==="cost" &&

<ProductCost
product={product}
/>

}



{

active==="documents" &&

<ProductDocuments
product={product}
/>

}



</div>

)

}