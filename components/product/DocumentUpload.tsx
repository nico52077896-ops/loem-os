"use client";


import {
useState
} from "react";


import {
supabase
} from "@/lib/supabase";



export default function DocumentUpload({

productId,

onClose,

onSaved

}:{

productId:string;

onClose:()=>void;

onSaved:()=>void;

}){


const [file,setFile]=useState<File|null>(null);

const [category,setCategory]=useState("技术资料");

const [loading,setLoading]=useState(false);



async function upload(){


if(!file){

alert("请选择文件");

return;

}


setLoading(true);



try{


const path = 
`${productId}/${Date.now()}-${file.name}`;



// 上传 storage

const {

error:uploadError

}=await supabase


.storage

.from("documents")

.upload(
path,
file
);



if(uploadError)
throw uploadError;




const {

data:urlData

}=supabase


.storage

.from("documents")

.getPublicUrl(path);



const url =
urlData.publicUrl;





// 写入数据库

const {

error

}=await supabase


.from("documents")

.insert({

product_id:productId,

name:file.name,

category,

file_url:url,

file_type:file.type,

size:
`${(file.size/1024/1024).toFixed(2)} MB`

});




if(error)
throw error;



onSaved();


}catch(e){

console.error(e);

alert("上传失败");


}finally{


setLoading(false);


}



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
space-y-5
"

>


<h2 className="
text-xl
font-semibold
">

上传文件

</h2>





<select

value={category}

onChange={e=>setCategory(e.target.value)}

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
技术资料
</option>

<option>
供应链资料
</option>

<option>
测试报告
</option>

<option>
设计文件
</option>

<option>
图片资料
</option>

<option>
其他
</option>


</select>





<input

type="file"

onChange={e=>

setFile(
e.target.files?.[0] || null
)

}

className="
w-full
text-sm
"

/>





<button

onClick={upload}

disabled={loading}

className="
w-full
rounded-xl
bg-white
py-3
text-black
"

>

{

loading
?

"上传中..."

:

"上传"

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