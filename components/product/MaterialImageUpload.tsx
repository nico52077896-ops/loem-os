"use client";

import {useState} from "react";

import {
supabase
} from "@/lib/supabase";


export default function MaterialImageUpload({

images = [],

onUpload

}:{

images:string[];

onUpload:(urls:string[])=>void;

}){


const [uploading,setUploading]=useState(false);



async function uploadImage(

e:React.ChangeEvent<HTMLInputElement>

){


const files =
e.target.files;


if(!files)return;



setUploading(true);



let urls = [
...images
];



for(
const file of Array.from(files)
){


const ext =
file.name
.split(".")
.pop();



const filename =
`${Date.now()}-${Math.random()
.toString(36)
.substring(2)}.${ext}`;



const {

error

}=await supabase

.storage

.from("material-images")

.upload(

filename,

file

);



if(error){

console.error(error);

continue;

}




const {

data

}=supabase

.storage

.from("material-images")

.getPublicUrl(

filename

);



urls.push(

data.publicUrl

);


}



onUpload(urls);



setUploading(false);


}





function removeImage(index:number){


const urls =
images.filter(
(_,i)=>i!==index
);


onUpload(urls);


}



return (

<div

className="
space-y-3
"

>


<div

className="
grid
grid-cols-3
gap-3
"

>


{

images.map(

(img,index)=>(


<div

key={index}

className="
relative
"

>


<img

src={img}

className="
h-24
w-full
rounded-xl
object-cover
"

/>



<button

type="button"

onClick={()=>removeImage(index)}

className="
absolute
right-1
top-1
rounded-full
bg-black/70
px-2
text-xs
text-white
"

>

×


</button>


</div>


)

)


}


</div>




<label

className="
h-32
rounded-xl
border
border-dashed
border-white/20
flex
items-center
justify-center
cursor-pointer
text-white/40
"

>


{

uploading

?

"上传中..."

:

"+ 添加面料图片"

}



<input

type="file"

multiple

accept="image/*"

onChange={uploadImage}

className="hidden"

/>


</label>



</div>


)

}