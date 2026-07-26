import type { Product } from "@/lib/products";


export default function DocumentDetail({
  product,
  documentName,
}:{
  product:Product;
  documentName:string;
}){


const doc = product.documents.find(
  item=>item.name===documentName
);


if(!doc){
 return null;
}


return (

<section
className="
rounded-3xl
border
border-white/10
bg-white/[0.025]
p-6
"
>


<div>

<h2 className="text-xl font-semibold">
{doc.name}
</h2>

<p className="mt-2 text-sm text-white/40">
{doc.type} · {doc.date}
</p>


</div>



<div
className="
mt-8
rounded-2xl
border
border-white/10
p-5
"
>

<h3 className="text-sm font-medium">
文件信息
</h3>


<div className="mt-4 space-y-3 text-sm">


<p>
类型：
<span className="text-white/50">
 {doc.type}
</span>
</p>


<p>
版本：
<span className="text-white/50">
{doc.version}
</span>
</p>


<p>
上传人：
<span className="text-white/50">
{doc.uploadedBy}
</span>
</p>


<p>
状态：
<span className="text-white/50">
 {doc.status}
</span>
</p>


</div>


</div>



<div
className="
mt-6
rounded-2xl
border
border-white/10
p-5
"
>

<h3 className="text-sm font-medium">
AI Analysis
</h3>


<ul
className="
mt-4
space-y-3
text-sm
text-white/60
"
>

<ul
className="
mt-4
space-y-3
text-sm
text-white/60
"
>

{
doc.aiCheck.map((item)=>(
<li key={item}>
✓ {item}
</li>
))
}

</ul>

<li>
✓ 产品信息匹配完成
</li>

<li>
⚠ 缺少包装规范
</li>


</ul>


</div>



</section>

);


}