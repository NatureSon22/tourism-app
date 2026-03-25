import React from "react";
import CarouselImages from "../CarouselImages";

type TransporationProps = {
  images: string[];
};

export default function TransportationImages({ images }: TransporationProps) {
  return <CarouselImages images={images} />;
}
