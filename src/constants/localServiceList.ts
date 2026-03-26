export type LocalServiceList = {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
  province: string;
  distanceFromCityCenter: number; // in kilometers
};

const PHILIPPINE_LOCAL_SERVICE: LocalServiceList[] = [
  {
    id: "1",
    name: "Metro Rizal Doctors Hospital",
    location: "Cabrera Road, Brgy. Dolores, Hilltop Tikling, Taytay, Rizal",
    imageUrl:
      "https://dhznbxi9ccb8w.cloudfront.net/news/1246cad5442e49ca8df289da9b1211d8.jpg",
    province: "Rizal",
    distanceFromCityCenter: 2.1, // Near Tikling Junction
  },
  {
    id: "2",
    name: "Manila East Medical Center",
    location: "Manila East Road, Brgy. San Juan, Taytay, Rizal",
    imageUrl:
      "https://dhznbxi9ccb8w.cloudfront.net/news/1246cad5442e49ca8df289da9b1211d8.jpg",
    province: "Rizal",
    distanceFromCityCenter: 0.8, // Very close to the municipal hall/market
  },
  {
    id: "3",
    name: "Taytay Doctors Multispecialty Hospital",
    location: "6 Rizal Avenue, Brgy. San Isidro, Taytay, Rizal",
    imageUrl:
      "https://dhznbxi9ccb8w.cloudfront.net/news/1246cad5442e49ca8df289da9b1211d8.jpg",
    province: "Rizal",
    distanceFromCityCenter: 1.2,
  },
  {
    id: "4",
    name: "SM City Taytay",
    location: "Manila East Road, Brgy. San Juan, Taytay, Rizal",
    imageUrl:
      "https://dhznbxi9ccb8w.cloudfront.net/news/1246cad5442e49ca8df289da9b1211d8.jpg",
    province: "Rizal",
    distanceFromCityCenter: 0.5,
  },
  {
    id: "5",
    name: "Clinica Antipolo Hospital & Wellness Center",
    location: "Sen. L. Sumulong Memorial Circle, Antipolo City, Rizal",
    imageUrl:
      "https://dhznbxi9ccb8w.cloudfront.net/news/1246cad5442e49ca8df289da9b1211d8.jpg",
    province: "Rizal",
    distanceFromCityCenter: 6.8,
  },
  {
    id: "6",
    name: "Antipolo Doctors Hospital",
    location: "M.L. Quezon Ext, Brgy. San Roque, Antipolo City, Rizal",
    imageUrl:
      "https://dhznbxi9ccb8w.cloudfront.net/news/1246cad5442e49ca8df289da9b1211d8.jpg",
    province: "Rizal",
    distanceFromCityCenter: 5.5,
  },
  {
    id: "7",
    name: "Cainta Municipal Hospital",
    location: "A. Bonifacio Ave, Brgy. Sto. Domingo, Cainta, Rizal",
    imageUrl:
      "https://dhznbxi9ccb8w.cloudfront.net/news/1246cad5442e49ca8df289da9b1211d8.jpg",
    province: "Rizal",
    distanceFromCityCenter: 3.4,
  },
  {
    id: "8",
    name: "Robinsons Place Antipolo",
    location:
      "Sumulong Highway cor. Circumferential Road, Antipolo City, Rizal",
    imageUrl:
      "https://dhznbxi9ccb8w.cloudfront.net/news/1246cad5442e49ca8df289da9b1211d8.jpg",
    province: "Rizal",
    distanceFromCityCenter: 7.2,
  },
  {
    id: "9",
    name: "Ortigas Hospital and Healthcare Center",
    location: "Km. 16 Ortigas Ave Ext, Cainta, Rizal",
    imageUrl:
      "https://dhznbxi9ccb8w.cloudfront.net/news/1246cad5442e49ca8df289da9b1211d8.jpg",
    province: "Rizal",
    distanceFromCityCenter: 4.1,
  },
  {
    id: "10",
    name: "Rizal Provincial Capitol",
    location: "Circumferential Road, Brgy. San Roque, Antipolo City, Rizal",
    imageUrl:
      "https://dhznbxi9ccb8w.cloudfront.net/news/1246cad5442e49ca8df289da9b1211d8.jpg",
    province: "Rizal",
    distanceFromCityCenter: 5.9,
  },
];

export default PHILIPPINE_LOCAL_SERVICE;
