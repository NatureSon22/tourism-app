import React from "react";
import CarouselImages from "../CarouselImages";

type DiningImagesProps = {
  images: string[];
};

export default function DiningImages({
  images,
}: DiningImagesProps) {
  return <CarouselImages images={images} />;
}
