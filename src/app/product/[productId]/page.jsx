import { getAuthSession } from "@/app/api/auth/[...nextauth]/options";
import DeleteButton from "@/components/SingleProductPage/DeleteButton";
import Details from "@/components/SingleProductPage/Details";
import Image from "next/image";


const fetchProduct = async (productId) => {
  try {
    const response = await fetch(
      `${process.env.Domain_Name}/api/product/${productId}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return "Failed to fetch products";
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return  error;
  }
};

export async function generateMetadata(
  { params, searchParams } ){
  // read route params
  const id = params.id
 
  // fetch data
  const { product } = await fetchProduct(params.productId);
 
  // optionally access and extend (rather than replace) parent metadata
  
  return {
    title: `${product?.title||"product"}`,
    description: `${product?.title||'product'}`,
  
  }
}


export default async function ProductPage({ params: { productId } }) {
  const { product } = await fetchProduct(productId);
  const session = await getAuthSession();

  console.log("productId: ", product);

  return (
    <>

      {
      !!product?.id && (
        <>
          {!!session?.user?.isAdmin && <DeleteButton productId={productId} />}
          <div className="flex flex-col md:flex-row justify-center items-center m-10">
            <div className="flex-1 md:w-1/2">
              <Image
                src={product?.image}
                alt="img"
                layout="responsive"
                width={300}
                height={300}
                objectFit="cover"
              />
            </div>
            {/* text container */}
            <div className="flex-1 flex flex-col   p-6 text-red-500 gap-5 bg-red-100 ">
              <h1 className="text-4xl text-bold uppercase md:text-5xl">
                {product?.title}
              </h1>
              <p className="text-slate-500">{product?.description}</p>
              <Details {...product} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
