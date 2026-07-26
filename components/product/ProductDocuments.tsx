"use client";


import {
useEffect,
useState
} from "react";


import {
supabase
} from "@/lib/supabase";


import DocumentUpload from "./DocumentUpload";



export default function ProductDocuments({

product

}:{
product:any
}){


const [documents,setDocuments]=useState<any[]>([]);

const [loading,setLoading]=useState(true);

const [showUpload,setShowUpload]=useState(false);




useEffect(()=>{

loadDocuments();

},[]);





async function loadDocuments(){


const {

data,
error

}=await supabase

.from("documents")

.select("*")

.eq(
"product_id",
product.id
)

.order(
"created_at",
{
ascending:false
}
);



if(!error){

setDocuments(data || []);

}


setLoading(false);


}






async function deleteDocument(id:string){


if(!confirm("确定删除文件？"))
return;



await supabase

.from("documents")

.delete()

.eq(
"id",
id
);



loadDocuments();


}






function getIcon(type:string){


if(!type)
return "📄";


if(type.includes("pdf"))
return "📕";


if(type.includes("image"))
return "🖼️";


if(type.includes("spreadsheet") || type.includes("excel"))
return "📊";


if(type.includes("word"))
return "📘";


return "📄";


}






function openFile(url:string){


window.open(
url,
"_blank"
);


}





function downloadFile(url:string,name:string){


const a=document.createElement("a");

a.href=url;

a.download=name;

a.click();


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
items-center
"

>


<div>

<h2 className="
text-xl
font-semibold
">

文件管理

</h2>


<p className="
text-sm
text-white/40
mt-1
">

Product Documents

</p>


</div>




<button

onClick={()=>setShowUpload(true)}

className="
rounded-full
border
border-white/10
px-4
py-2
text-xs
"

>

+ 上传文件

</button>


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


documents.length===0 ?


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

暂无文件

</div>



:


<div

className="
mt-8
grid
grid-cols-2
gap-5
"

>


{


documents.map(item=>(


<div

key={item.id}

className="
rounded-2xl
border
border-white/10
p-5
hover:bg-white/[0.03]
transition
"

>


<div

className="
flex
justify-between
"

>


<div

className="
flex
gap-4
"

>


<div

className="
text-3xl
"

>

{
getIcon(item.file_type)
}

</div>



<div>


<p

className="
text-xs
text-white/40
"

>

{
item.category || "其他"
}

</p>


<h3

className="
mt-2
font-medium
"

>

{
item.name
}

</h3>



</div>


</div>





<button

onClick={()=>deleteDocument(item.id)}

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
text-sm
text-white/40
space-y-2
"

>


<p>

类型：
{
item.file_type || "-"
}

</p>



<p>

大小：
{
item.size || "-"
}

</p>


</div>







<div

className="
mt-5
flex
gap-3
"

>


<button

onClick={()=>openFile(item.file_url)}

className="
flex-1
rounded-xl
border
border-white/10
py-2
text-xs
"

>

查看

</button>





<button

onClick={()=>downloadFile(
item.file_url,
item.name
)}

className="
flex-1
rounded-xl
bg-white
text-black
py-2
text-xs
"

>

下载

</button>


</div>






</div>


))


}



</div>


}



{


showUpload &&


<DocumentUpload

productId={product.id}

onClose={()=>setShowUpload(false)}

onSaved={()=>{

setShowUpload(false);

loadDocuments();

}}


/>


}



</div>


)

}