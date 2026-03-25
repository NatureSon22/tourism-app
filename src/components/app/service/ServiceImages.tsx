import React from "react";
import CarouselImages from "../CarouselImages";

type ServiceImagesProps = {
  images: string[];
};

export default function ServiceImages({ images }: ServiceImagesProps) {
  return <CarouselImages images={images} />;
}
