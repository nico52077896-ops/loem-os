"use client";


import {
useState
} from "react";


import {
supabase
} from "@/lib/supabase";



export default function ProductDocumentUpload({

product

}:{

product:any

}){


const [uploading,setUploading]=useState(false);



async function uploadFile(

e:React.ChangeEvent<HTMLInputElement>

){


const file =
e.target.files?.[0];


if(!file)return;



setUploading(true);




const fileName =

`${Date.now()}-${file.name}`;





const {

data,

error

}=await supabase

.storage

.from("product-files")

.upload(

fileName,

file

);





if(error){

console.log(error);

setUploading(false);

return;

}





const {

data:url

}=supabase

.storage

.from("product-files")

.getPublicUrl(

data.path

);






const newDocument={


name:file.name,


type:file.type,


url:url.publicUrl,


description:"产品开发文件"


};





const oldDocuments =

product.documents || [];





await supabase

.from("products")

.update({

documents:[

...oldDocuments,

newDocument

]

})

.eq(

"id",

product.id

);





setUploading(false);



location.reload();


}





return (

<label

className="
inline-flex
cursor-pointer
rounded-xl
bg-white
px-5
py-3
text-black
text-sm
"

>


{
uploading
?
"上传中..."
:
"上传文档"
}



<input

type="file"

className="hidden"

onChange={uploadFile}

/>



</label>


)


}