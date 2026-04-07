import CarouselImages from "../CarouselImages";

type EventImagesProps = {
  images: string[];
};

export default function EventImages({ images }: EventImagesProps) {
  return <CarouselImages images={images} />;
}
