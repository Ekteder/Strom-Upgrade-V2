"use client";

import React, { useState, useEffect } from "react";
import { wixClientServer } from "@/lib/wixClientServer";
import Image from "next/image";
import Link from "next/link";

// Define a type for the category item
type Category = {
  _id: string;
  slug: string;
  media?: {
    mainMedia?: {
      image?: {
        url: string;
      };
    };
  };
  name: string;
};

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const wixClient = await wixClientServer();
        const fetchedCategories = await wixClient.collections
          .queryCollections()
          .find();
        setCategories(
          fetchedCategories.items.map((item: any) => ({
            _id: item._id || "",
            slug: item.slug,
            media: item.media,
            name: item.name,
          }))
        );
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleShowAll = () => {
    setShowAll(true);
  };

  return (
    <div className="px-4 overflow-x-scroll scrollbar-hide md:ml-[100px] ml-0">
      <div className="mb-4 mt-4 md:ml-[150px] ml-0">
        {!showAll && visibleCount < categories.length && (
          <button onClick={handleShowAll} className="w-36 text-base rounded-3xl ring-1 ring-lama text-lama py-2 px-4 hover:bg-lama hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:ring-0 disabled:text-white disabled:ring-none">
            Show All
          </button>
        )}
      </div>
      <div className="flex flex-wrap justify-center gap-3 md:gap-6">
        {categories
          .slice(0, showAll ? categories.length : visibleCount)
          .map((item: Category) => (
            <Link
              href={`/list?cat=${item.slug}`}
              className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/5"
              key={item._id}
            >
              <div className="relative bg-slate-100 w-42.5 h-40 md:w-85 md:h-80">
                <Image
                  src={item.media?.mainMedia?.image?.url || "cat.png"}
                  alt=""
                  fill
                  sizes="10vw md:sizes=20vw"
                  className="absolute object-cover rounded-md"
                />
              </div>
              <h1 className="mt-8  text-xl tracking-wide ">
                {item.name}
              </h1>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default CategoryList;
