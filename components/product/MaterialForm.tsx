"use client";


import {
useState
} from "react";


import {
supabase
} from "@/lib/supabase";


import MaterialImageUpload from "./MaterialImageUpload";



export default function MaterialForm({

productId,

editData,

onClose,

onSaved

}:{

productId:string;

editData?:any;

onClose:()=>void;

onSaved:()=>void;

}){



const [form,setForm]=useState({

name:editData?.name || "",

role:editData?.role || "主面料",

type:editData?.type || "",

composition:editData?.composition || "",

weight:editData?.weight || "",

color:editData?.color || "",

supplier:editData?.supplier || "",

price:editData?.price || "",

notes:editData?.notes || "",


image:
editData?.image || "",


images:
editData?.images || []

});




const [loading,setLoading]=useState(false);





function updateField(

key:string,

value:string

){


setForm(prev=>({

...prev,

[key]:value

}));


}






// ======================
// 删除图片
// ======================

function removeImage(index:number){


setForm(prev=>{


const newImages =
prev.images.filter(
(_:string,i:number)=>i!==index
);



return {


...prev,


images:newImages,


image:
newImages[0] || ""


};


});


}








// ======================
// AI识别料卡
// ======================

async function analyzeCard(

e:any

){


const file =
e.target.files?.[0];


if(!file)return;



setLoading(true);




try{


// 上传料卡图片

const filename =

`material-${Date.now()}.jpg`;



const {

error

}=await supabase.storage


.from("materials")


.upload(

filename,

file

);



if(error){

throw error;

}




const {

data

}=supabase.storage


.from("materials")


.getPublicUrl(

filename

);



const imageUrl =
data.publicUrl;





// 加入图片库

setForm(prev=>({


...prev,


image:imageUrl,


images:[

...prev.images,

imageUrl

]


}));







// 转base64给千问

const reader =
new FileReader();



reader.onload = async()=>{


const base64 =
reader.result;



const res =
await fetch(

"/api/material-vision",

{

method:"POST",

headers:{


"Content-Type":
"application/json"

},


body:JSON.stringify({

image:base64

})


}

);



const result =
await res.json();



console.log(
"千问识别:",
result
);



if(result.data){


setForm(prev=>({


...prev,


name:
result.data.name || prev.name,


type:
result.data.type || prev.type,


composition:
result.data.composition || prev.composition,


weight:
result.data.weight || prev.weight,


color:
result.data.color || prev.color,


supplier:
result.data.supplier || prev.supplier


}));



alert(
"面料信息识别完成"
);


}



};



reader.readAsDataURL(file);



}

catch(error){


console.error(
error
);


alert(
"识别失败"
);



}

finally{


setLoading(false);


}



}








// ======================
// 保存
// ======================


async function saveMaterial(){



if(!form.name){


alert(
"请输入面料名称"
);


return;


}





const saveData={


...form,


price:Number(form.price),


image:
form.images[0] || form.image



};







if(editData){



const {

error

}=await supabase


.from("materials")


.update(saveData)


.eq(

"id",

editData.id

);



if(error){

console.error(error);

return;

}



}else{



const {

error

}=await supabase


.from("materials")


.insert({

product_id:productId,


...saveData


});



if(error){

console.error(error);

return;

}


}



onSaved();

onClose();


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
space-y-4
"

>


<h2

className="
text-xl
font-semibold
"

>

{

editData

?

"编辑面料"

:

"添加面料"

}


</h2>





<label

className="
block
rounded-xl
border
border-dashed
border-white/20
p-4
text-center
cursor-pointer
text-white/50
"

>


{

loading

?

"AI正在识别..."

:

"📷 拍摄料卡 AI识别"

}



<input

type="file"

accept="image/*"

capture="environment"

onChange={analyzeCard}

className="hidden"

/>


</label>







{/* 多图片区域 */}

<MaterialImageUpload

images={form.images}

onUpload={(urls)=>{


setForm(prev=>({


...prev,


images:urls,


image:
urls[0] || ""


}));


}}

/>







<select

value={form.role}

onChange={e=>

updateField(

"role",

e.target.value

)

}


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

主面料

</option>

<option>

辅料

</option>

<option>

里料

</option>

<option>

填充

</option>

<option>

饰品

</option>


</select>









{

[


["name","面料名称"],


["type","类型"],


["composition","成分"],


["weight","克重"],


["color","颜色"],


["supplier","供应商"],


["price","价格"],


["notes","备注"]


].map(([key,label])=>(


<input

key={key}

placeholder={label}

value={(form as any)[key]}

onChange={e=>

updateField(

key,

e.target.value

)

}


className="
w-full
rounded-xl
border
border-white/10
bg-white/[0.03]
p-3
"


/>


))


}







<button

onClick={saveMaterial}

className="
w-full
rounded-xl
bg-white
py-3
text-black
font-medium
"

>


保存


</button>





<button

onClick={onClose}

className="
w-full
rounded-xl
border
border-white/10
py-3
text-white/70
"

>


取消


</button>





</div>

</div>


)

}