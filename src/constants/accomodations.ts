export type Accommodation = {
  id: string;
  name: string;
  location: string;
  pricePerNight: number;
  rating: number;
  reviews: number;
  imageUrl: string;
  distanceFromCityCenter: number; // in kilometers
};

const IMAGE_URL =
  "https://cf.bstatic.com/xdata/images/hotel/max1024x768/21866833.jpg?k=1b237330d5606ffba7470a57eae7500c79232c81a2a3a618eee01442611ad2bc&o=";

const accomodations: Accommodation[] = [
  {
    id: "1",
    name: "Diamond Hotel Philippines",
    location: "Roxas Boulevard, Manila",
    pricePerNight: 8500.0,
    rating: 4.5,
    reviews: 1500,
    imageUrl: IMAGE_URL,
    distanceFromCityCenter: 2.5,
  },
  {
    id: "2",
    name: "Shangri-La The Fort",
    location: "30th Street, Bonifacio Global City, Taguig",
    pricePerNight: 15500.0,
    rating: 4.9,
    reviews: 2100,
    imageUrl: IMAGE_URL,
    distanceFromCityCenter: 0.5,
  },
  {
    id: "3",
    name: "Okada Manila",
    location: "New Seaside Drive, Entertainment City, Parañaque",
    pricePerNight: 12500.0,
    rating: 4.8,
    reviews: 3200,
    imageUrl: IMAGE_URL,
    distanceFromCityCenter: 7.2,
  },
  {
    id: "4",
    name: "The Manila Hotel",
    location: "One Rizal Park, Ermita, Manila",
    pricePerNight: 6200.0,
    rating: 4.6,
    reviews: 1850,
    imageUrl: IMAGE_URL,
    distanceFromCityCenter: 1.8,
  },
  {
    id: "5",
    name: "Fairmont Makati",
    location: "1 Raffles Drive, Makati Avenue, Makati City",
    pricePerNight: 9800.0,
    rating: 4.7,
    reviews: 1200,
    imageUrl: IMAGE_URL,
    distanceFromCityCenter: 0.2,
  },
  {
    id: "6",
    name: "El Nido Resorts - Pangulasian Island",
    location: "Bacuit Bay, El Nido, Palawan",
    pricePerNight: 35000.0,
    rating: 5.0,
    reviews: 450,
    imageUrl: IMAGE_URL,
    distanceFromCityCenter: 420.0, // Distance from Manila as reference
  },
  {
    id: "7",
    name: "Conrad Manila",
    location: "Seaside Boulevard, Coral Way, Pasay City",
    pricePerNight: 11200.0,
    rating: 4.7,
    reviews: 980,
    imageUrl: IMAGE_URL,
    distanceFromCityCenter: 5.5,
  },
  {
    id: "8",
    name: "Crimson Resort and Spa Boracay",
    location: "Station Zero, Boracay Island, Malay",
    pricePerNight: 14000.0,
    rating: 4.8,
    reviews: 750,
    imageUrl: IMAGE_URL,
    distanceFromCityCenter: 315.0,
  },
  {
    id: "9",
    name: "Seda BGC",
    location: "30th Street cor. 11th Avenue, BGC, Taguig",
    pricePerNight: 7500.0,
    rating: 4.4,
    reviews: 1100,
    imageUrl: IMAGE_URL,
    distanceFromCityCenter: 0.8,
  },
  {
    id: "10",
    name: "Discovery Primea",
    location: "6749 Ayala Avenue, Makati City",
    pricePerNight: 10500.0,
    rating: 4.8,
    reviews: 620,
    imageUrl: IMAGE_URL,
    distanceFromCityCenter: 0.3,
  },
];

export default accomodations;
