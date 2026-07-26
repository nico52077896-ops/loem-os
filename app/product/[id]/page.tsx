import ProductClient from "./ProductClient";
import { getProducts } from "@/lib/productStore";


type Props = {
  params: Promise<{
    id:string;
  }>;
};


export default async function ProductDetailPage({
  params,
}:Props){


const {id}=await params;


// 从数据库读取
const products = await getProducts();


const product = products.find(
  p=>p.id===id
);



if(!product){

return(
<main className="
min-h-screen
bg-black
p-10
text-white
">
Product Not Found
</main>
)

}



return (

<main
className="
min-h-screen
bg-black
px-6
py-10
text-white
md:px-10
"
>

<ProductClient
product={product}
/>

</main>

)

}