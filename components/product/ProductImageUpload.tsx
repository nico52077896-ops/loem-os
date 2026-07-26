"use client";


import {
useState
} from "react";


import {
supabase
} from "@/lib/supabase";





export default function ProductImageUpload({

productId,

image,

onUpdate,

hidePreview=false

}:{

productId:string;

image?:string;

onUpdate:(url?:string)=>void;

hidePreview?:boolean;

}){


const [uploading,setUploading]=useState(false);






async function uploadImage(

e:React.ChangeEvent<HTMLInputElement>

){


const file=e.target.files?.[0];


if(!file){

return;

}





try{


setUploading(true);





// 文件名处理

const ext =
file.name.split(".").pop();



const fileName =

`${Date.now()}.${ext}`;







// 上传 Supabase Storage

const {

data,

error

}=await supabase

.storage

.from("product-files")

.upload(

fileName,

file,

{

cacheControl:"3600",

upsert:false

}

);






if(error){


console.error(
"storage upload error:",
error
);


alert(
"图片上传失败"
);


return;

}







// 获取公开 URL

const {

data:urlData

}=supabase

.storage

.from("product-files")

.getPublicUrl(

data.path

);





const imageUrl =
urlData.publicUrl;







// 更新产品图片

const {

error:updateError

}=await supabase

.from("products")

.update({

cover_image:imageUrl

})

.eq(

"id",

productId

);







if(updateError){


console.error(
"database update error:",
updateError
);



alert(
"图片保存失败"
);



return;

}







// 通知父组件

onUpdate(imageUrl);





}

catch(error){


console.error(
error
);


alert(
"上传失败"
);


}

finally{


setUploading(false);


// 清空 input，允许重复上传同一张

e.target.value="";


}


}








return (

<div>


{/* 图片预览 */}

{

!hidePreview &&


<div

className="
mt-5
"

>


{

image ?


<img

src={image}

className="
h-56
w-full
rounded-xl
object-cover
"

/>


:


<div

className="
flex
h-56
items-center
justify-center
rounded-xl
border
border-dashed
border-white/20
text-white/40
"

>


<div

className="
text-center
"

>


<p className="text-2xl">

+

</p>


<p>

产品主图

</p>


</div>


</div>


}


</div>


}









{/* 上传按钮 */}


<label

className="

mt-4

block

cursor-pointer

rounded-xl

border

border-white/10

py-3

text-center

text-sm

text-white/70

hover:border-white/30

transition

"

>


{

uploading

?

"上传中..."

:

image

?

"更换图片"

:

"上传图片"

}





<input

type="file"

accept="image/*"

className="hidden"

disabled={uploading}

onChange={uploadImage}

/>



</label>




</div>

)


}