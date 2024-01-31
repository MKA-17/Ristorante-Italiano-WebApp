"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useFileUploader } from "@/custom/useFileUploader";

export default function AddProductPage() {
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    colour: "None",
    image: "",
    price: 0.0,
    isFeatured: false,
    options: [],
    categorySlug: "",
  });
  const [options, setOptions] = useState({ price: 0.0, title: "" });
  const { data: session, status } = useSession();
  const router = useRouter();
  const { uploadPercent, fileURL, setFile, file: imgFile } = useFileUploader();

  useEffect(() => {
    // Handle initial unauthenticated state
    if (status === "unauthenticated") {
      router.push("/");
      return;
    }

    // Check for admin status only when session data is available
    if (session && !session.user?.isAdmin) {
      router.push("/");
    }
  }, [session, status]);

  useEffect(() => {
    // if (imgFile)
    //  UploadFileToFirebase(imgFile, "image");
    console.log("uploading file info: ", [uploadPercent, fileURL]);
  }, [uploadPercent, fileURL]);

  let {
    data: getCategorysData,
    isLoading: categoryIsLoading,
    isError: categoryIsError,
    refetch: getCategoryRefetch,
  } = useQuery({
    queryKey: ["categoryData"],
    queryFn: async () => {
      let resp = await fetch(`/api/category`, {
        method: "GET",
        cache: "no-store",
      });

      return resp.json();
    },
  });

  useEffect(() => {
    if (fileURL)
      setProductData((prev) => ({
        ...prev,
        image: fileURL,
      }));
    // console.log("catData: ", getCategorysData?.categories)
  }, [fileURL]);

  const addProductMutation = useMutation({
    mutationFn: async (variables) => {
      return (
        await fetch(`/api/product`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Setting the Content-Type header to JSON
          },
          body: JSON.stringify(variables),
          cache: "no-cache",
        })
      ).json();
    },
    onSuccess: (data, variables, context) => {
      console.log("Inside Add product mutation: ", data, variables);
      toast.success(data.message);
    },
    onError: (error, variables, context) => {
      console.log("error: ", error.message);
      toast.error("Some Error has been occurred");
    },
  });

  const handleFeaturedChange = (event) => {
    setProductData((prev) => ({
      ...prev,
      isFeatured: event.target.value === "true",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data: ", productData);
    console.log("image: ", imgFile);
    if (
      productData.title &&
      productData.description &&
      productData.options.length &&
      productData.price &&
      productData.categorySlug
    )
      addProductMutation.mutate(productData);
    else toast.error("Fill the form completely to add the new product.");
  };
  return (
    <div className="container mx-auto   m-4">
      <Toaster position="top-center" reverseOrder={true} />
      <form
        className="flex flex-col w-full p-4 gap-4 rounded-lg shadow-md ring-1 ring-red-500"
        action=""
      >
        <h1 className="text-2xl font-semibold text-center mb-4">
          Add New Product
        </h1>

        <div className="w-full flex flex-col gap-2 text-lg">
          <label htmlFor="">Title</label>
          <input
            className="ring-1 ring-red-300 rounded"
            type="text"
            name="title"
            id=""
            value={productData.title}
            onChange={(e) =>
              setProductData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>
        <div className="w-full flex flex-col gap-4 mb-4">
          <div className="w-full flex flex-col gap-4 mb-4">
            <label
              htmlFor="featuredItem"
              className="block text-lg font-medium mb-2"
            >
              Is Item Featured?
            </label>
            <div className="flex items-center gap-4">
              <label htmlFor="yesOption" className="flex items-center">
                <input
                  type="radio"
                  name="featuredItem"
                  id="yesOption"
                  value="true"
                  checked={productData.isFeatured}
                  onChange={handleFeaturedChange}
                  className="w-4 h-4 text-red-500 border-gray-300 focus:ring-red-500 rounded"
                />
                <span className="ml-2 text-lg">Yes</span>
              </label>
              <label htmlFor="noOption" className="flex items-center">
                <input
                  type="radio"
                  name="featuredItem"
                  id="noOption"
                  value="false"
                  checked={!productData.isFeatured}
                  onChange={handleFeaturedChange}
                  className="w-4 h-4 text-red-500 border-gray-300 focus:ring-red-500 rounded"
                />
                <span className="ml-2 text-lg">No</span>
              </label>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2 text-lg">
          <label htmlFor="">Description</label>
          <textarea
            className="ring-1 ring-red-300 rounded"
            type="text"
            name="description"
            id=""
            value={productData.description}
            onChange={(e) =>
              setProductData((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
        </div>
        <div className="w-full flex flex-col gap-2 text-lg">
          <label htmlFor="">price</label>
          <input
            className="ring-1 ring-red-300 rounded"
            type="number"
            name="price"
            id=""
            value={productData.price}
            onChange={(e) =>
              setProductData((prev) => ({
                ...prev,
                price: parseFloat(e.target.value),
              }))
            }
          />
        </div>
        <div className="w-full flex flex-col gap-2 text-lg">
          <label htmlFor="category">Category</label>
          <select
            className="ring-1 ring-red-300 rounded w-full p-2"
            id="category"
            name="category"
            value={productData.categorySlug}
            onChange={(e) =>
              setProductData((prev) => ({
                ...prev,
                categorySlug: e.target.value,
              }))
            }
          >
            <option value="">Select a Category</option>
            {!!getCategorysData?.categories &&
              getCategorysData?.categories.map((e) => (
                <option key={e.id} value={e.slug}>
                  {e.title}
                </option>
              ))}
          </select>
        </div>

        <div className="w-full flex flex-col gap-2 text-lg ">
          <label htmlFor="">Options</label>
          <div className="w-full flex flex-col gap-4 md:flex-row">
            <div className="w-full md:w-4/5">
              <div className="flex flex-wrap gap-2">
                <div className="w-full md:w-1/3">
                  <input
                    className="w-full p-2 rounded-md border border-red-300 focus:ring-red-500 focus:border-red-500"
                    type="text"
                    name="opt"
                    id="opt"
                    value={options.title}
                    onChange={(e) =>
                      setOptions((prev) => ({ ...prev, title: e.target.value }))
                    }
                  />
                </div>
                <div className="w-full md:w-1/3">
                  <input
                    className="w-full p-2 rounded-md border border-red-300 focus:ring-red-500 focus:border-red-500"
                    type="number"
                    name="optPrice"
                    id="optPrice"
                    value={options.price}
                    onChange={(e) =>
                      setOptions((prev) => ({
                        ...prev,
                        price: parseFloat(e.target.value),
                      }))
                    }
                  />
                </div>
                <div className="w-full md:w-1/3">
                  <button
                    className="w-full p-2 bg-red-500 hover:bg-red-400 text-white font-bold rounded-md"
                    onClick={(e) => {
                      e.preventDefault();
                      setProductData((prev) => ({
                        ...prev,
                        options: [...prev.options, options],
                      }));
                      console.log("data: ", options);
                      setOptions(() => ({ price: 0.0, title: "" }));
                    }}
                  >
                    Add Option
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-2">
            {productData.options.map((e, i) => (
              <span
                key={i}
                className="text-black ring-1 ring-red-400 rounded hover:bg-red-500 hover:text-white p-1 hover:cursor-pointer"
                onClick={() =>
                  setProductData((prev) => ({
                    ...prev,
                    options: prev.options.filter((el) => el.title !== e.title),
                  }))
                }
              >
                {e.title} ${e.price}
              </span>
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col gap-2 text-lg">
          <label htmlFor="">Image</label>
          <input
            className="ring-1 ring-red-300 rounded"
            type="file"
            name="image"
            id=""
            onChange={(e) => setFile(() => e.target.files[0])}
          />
          {imgFile && (
            <Image
              src={URL.createObjectURL(imgFile)}
              width={200}
              height={200}
              alt="img"
            />
          )}
          {!!uploadPercent && <span>Uploading Status: {uploadPercent}</span>}
        </div>

        <button
          className="w-full px-4 py-2 bg-red-500 hover:bg-red-400 text-white font-bold rounded-md mt-4"
          onClick={handleSubmit}
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
