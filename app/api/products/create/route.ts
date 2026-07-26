import {supabase} from "@/lib/supabase";


export async function POST(
req:Request
){


const body = await req.json();



const {
data,
error
}=await supabase

.from("products")

.insert({

id:crypto.randomUUID(),

name:body.name,

owner:body.owner,


stage:"Planning",

progress:0,


product_code:"",

launch_season:"",


category:"",

source:"原创设计",


retail_price:0,

target_cost:0,

current_cost:0


})

.select()

.single();



if(error){

return Response.json(
{
error:error.message
},
{
status:500
}
)

}



return Response.json(data);


}