import Link from "next/link";


export default function ProductHeader({

  id,

  name,

  productCode,

  launchSeason,

  owner,

  category,

  retailPrice,

  targetCost,

}:{

  id:string;

  name:string;

  productCode?:string;

  launchSeason?:string;

  owner?:string;

  category?:string;

  retailPrice?:number;

  targetCost?:number;

}){


return (

<header className="pb-10">


<Link

href="/product"

className="
text-white/40
hover:text-white
transition
"

>

← 返回 Product Studio

</Link>




<div className="
mt-8
">


<h1 className="
text-5xl
font-semibold
tracking-tight
">

{name}

</h1>





<div className="
mt-6
flex
gap-12
flex-wrap
">


<div>

<p className="
text-xs
text-white/30
">

产品编号

</p>


<p className="
mt-2
text-sm
text-white/80
">

{productCode || "-"}

</p>


</div>





<div>

<p className="
text-xs
text-white/30
">

上市季度

</p>


<p className="
mt-2
text-sm
text-white/80
">

{launchSeason || "-"}

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
text-sm
text-white/80
">

{owner || "-"}

</p>


</div>






<div>

<p className="
text-xs
text-white/30
">

品类

</p>


<p className="
mt-2
text-sm
text-white/80
">

{category || "-"}

</p>


</div>






<div>

<p className="
text-xs
text-white/30
">

目标零售价

</p>


<p className="
mt-2
text-sm
text-white/80
">

{
retailPrice
?
`¥${retailPrice}`
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

目标成本

</p>


<p className="
mt-2
text-sm
text-white/80
">

{
targetCost
?
`¥${targetCost}`
:
"-"
}

</p>


</div>




</div>


</div>




</header>

)

}