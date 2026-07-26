"use client";


import {
useState
} from "react";


import {
supabase
} from "@/lib/supabase";



export default function SampleImageUpload({

images=[],

onUpload

}:{

images:string[];

onUpload:(images:string[])=>void;

}){


const [uploading,setUploading]=useState(false);




async function uploadImages(
e:React.ChangeEvent<HTMLInputElement>
){


const files =
Array.from(
e.target.files || []
);



if(!files.length)
return;



setUploading(true);



let urls=[...images];




for(const file of files){


const ext =
file.name.split(".").pop();


const filename =
`sample-${Date.now()}.${ext}`;





const {

error

}=await supabase.storage

.from("materials")

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

}=supabase.storage

.from("materials")

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


const newImages =
images.filter(
(_,i)=>i!==index
);


onUpload(newImages);


}





return (

<div className="
space-y-3
">


<div className="
grid
grid-cols-4
gap-3
">


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
"

>

×


</button>


</div>


)

)


}



<label

className="
h-24
rounded-xl
border
border-dashed
border-white/20
flex
items-center
justify-center
cursor-pointer
text-xs
text-white/40
"

>


{

uploading

?

"上传中..."

:

"+ 添加图片"

}



<input

type="file"

multiple

accept="image/*"

onChange={uploadImages}

className="hidden"

/>


</label>


</div>


</div>


)

}