import { products } from "@/lib/products";
import DocumentDetail from "@/components/product/DocumentDetail";


export default async function Page({
  params,
}:{
  params:{
    id:string;
    name:string;
  }
}){


const product = products.find(
  p=>p.id === params.id
);


if(!product){
 return null;
}


return (

<main
className="
min-h-screen
bg-black
p-10
text-white
"
>

<DocumentDetail
 product={product}
 documentName={params.name}
/>

</main>

);


}