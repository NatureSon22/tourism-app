import React from "react";
import CarouselImages from "../CarouselImages";

type DiningImagesProps = {
  images: string[];
};

export default function ActivityImages({ images }: DiningImagesProps) {
  return <CarouselImages images={images} />;
}
