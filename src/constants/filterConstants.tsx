export const ACCOMMODATION_FILTERS = {
  // Static ranges
  rating: [2, 3, 4, 5],

  // Levels 1 & 2: Categories and their Sub-categories
  types: [
    {
      id: 1,
      name: "Hotels",
      subtypes: [
        { id: 10, name: "Luxury Hotel" },
        { id: 11, name: "Boutique Hotel" },
        { id: 12, name: "Business Hotel" },
        { id: 13, name: "Budget/Economy" },
      ],
    },
    {
      id: 2,
      name: "Resort",
      subtypes: [
        { id: 20, name: "Beach Hotel" },
        { id: 21, name: "Mountain Resort" },
        { id: 22, name: "Spa & Wellness" },
      ],
    },
    {
      id: 3,
      name: "Vacation Rentals",
      subtypes: [], // Can be empty if no subtypes exist
    },
  ],

  // Floating Attributes (Dynamic Groups)
  attributes: [
    {
      id: 500,
      name: "Room Features",
      options: [
        { id: 501, name: "Sea View" },
        { id: 502, name: "Balcony/Terrace" },
        { id: 503, name: "Kitchenette" },
        { id: 504, name: "Air Conditioning" },
      ],
    },
    {
      id: 600,
      name: "Bed Type",
      options: [
        { id: 601, name: "King Size" },
        { id: 602, name: "Queen Size" },
        { id: 603, name: "Twin Beds" },
      ],
    },
  ],

  // Flattened Amenities (Property Level)
  amenities: [
    { id: 101, name: "Free WiFi" },
    { id: 102, name: "Private Pool" },
    { id: 103, name: "Gym/Fitness Center" },
    { id: 104, name: "Airport Shuttle" },
    { id: 105, name: "Pet Friendly" },
    { id: 106, name: "Free Parking" },
  ],
};

export const CUISINE_FILTERS = {
  // Static ranges for restaurant ratings or price levels
  rating: [2, 3, 4, 5],

  // Levels 1 & 2: Regional Categories and Specific Cuisines
  types: [
    {
      id: 1000,
      name: "Asian",
      subtypes: [
        { id: 1010, name: "Japanese" },
        { id: 1011, name: "Korean" },
        { id: 1012, name: "Chinese" },
        { id: 1013, name: "Thai" },
        { id: 1014, name: "Filipino" },
      ],
    },
    {
      id: 1100,
      name: "European",
      subtypes: [
        { id: 1110, name: "Italian" },
        { id: 1111, name: "French" },
        { id: 1112, name: "Spanish" },
        { id: 1113, name: "Greek" },
      ],
    },
    {
      id: 1200,
      name: "American",
      subtypes: [
        { id: 1210, name: "Traditional American" },
        { id: 1211, name: "Mexican" },
        { id: 1212, name: "BBQ & Grill" },
        { id: 1213, name: "Burgers" },
      ],
    },
    {
      id: 1300,
      name: "Middle Eastern",
      subtypes: [
        { id: 1310, name: "Turkish" },
        { id: 1311, name: "Lebanese" },
        { id: 1312, name: "Mediterranean" },
      ],
    },
  ],

  // Floating Attributes (Dynamic Groups for Diet and Meal Time)
  attributes: [
    {
      id: 2000,
      name: "Dietary Preferences",
      options: [
        { id: 2001, name: "Vegetarian" },
        { id: 2002, name: "Vegan" },
        { id: 2003, name: "Gluten-Free" },
        { id: 2004, name: "Halal" },
        { id: 2005, name: "Keto-Friendly" },
      ],
    },
    {
      id: 2100,
      name: "Meal Type",
      options: [
        { id: 2101, name: "Breakfast" },
        { id: 2102, name: "Brunch" },
        { id: 2103, name: "Lunch" },
        { id: 2104, name: "Dinner" },
        { id: 2105, name: "Late Night" },
      ],
    },
  ],

  // Restaurant-specific Amenities
  amenities: [
    { id: 3001, name: "Outdoor Seating" },
    { id: 3002, name: "Pet Friendly" },
    { id: 3003, name: "Free WiFi" },
    { id: 3004, name: "Live Music" },
    { id: 3005, name: "Parking Available" },
    { id: 3006, name: "Full Bar" },
    { id: 3007, name: "Family Friendly" },
    { id: 3008, name: "Reservations Accepted" },
  ],
};

export const ACTIVITY_FILTERS = {
  // Static ranges for activity ratings or guest reviews
  rating: [2, 3, 4, 5],

  // Levels 1 & 2: Broad Activity Categories and Specific Tours
  types: [
    {
      id: 4000,
      name: "Water Activities",
      subtypes: [
        { id: 4010, name: "Scuba Diving" },
        { id: 4011, name: "Snorkeling" },
        { id: 4012, name: "Island Hopping" },
        { id: 4013, name: "Surfing/Kite Surfing" },
        { id: 4014, name: "Jet Skiing" },
      ],
    },
    {
      id: 4100,
      name: "Land & Adventure",
      subtypes: [
        { id: 4110, name: "Hiking/Trekking" },
        { id: 4111, name: "ATV/Off-roading" },
        { id: 4112, name: "Caving" },
        { id: 4113, name: "Rock Climbing" },
        { id: 4114, name: "Ziplining" },
      ],
    },
    {
      id: 4200,
      name: "Culture & Sightseeing",
      subtypes: [
        { id: 4210, name: "Guided City Tour" },
        { id: 4211, name: "Museum Visit" },
        { id: 4212, name: "Cooking Class" },
        { id: 4213, name: "Historical Sites" },
      ],
    },
    {
      id: 4300,
      name: "Wellness & Nature",
      subtypes: [
        { id: 4310, name: "Yoga Retreat" },
        { id: 4311, name: "Bird Watching" },
        { id: 4312, name: "Hot Springs" },
      ],
    },
  ],

  duration: [
    {
      id: 5001,
      min: { value: 30, unit: "mins" },
      max: { value: 45, unit: "mins" },
    },
    {
      id: 5002,
      min: { value: 10, unit: "mins" },
      max: { value: 1, unit: "hrs" },
    },
    {
      id: 5003,
      min: { value: 20, unit: "mins" },
      max: { value: 55, unit: "mins" },
    },
  ],

  // Floating Attributes (Dynamic Groups for logistics)
  attributes: [
    {
      id: 5100,
      name: "Difficulty Level",
      options: [
        { id: 5101, name: "Easy (All ages)" },
        { id: 5102, name: "Moderate (Physically active)" },
        { id: 5103, name: "Challenging (Experienced)" },
      ],
    },
  ],

  // Activity-specific Amenities/Inclusions
  amenities: [
    { id: 6001, name: "Equipment Provided" },
    { id: 6002, name: "Hotel Pickup/Dropoff" },
    { id: 6003, name: "Meal Included" },
    { id: 6004, name: "Professional Guide" },
    { id: 6005, name: "Insurance Covered" },
    { id: 6006, name: "Photo/Video Service" },
    { id: 6007, name: "Small Group Only" },
    { id: 6008, name: "Entrance Fees Included" },
  ],
};

export const EVENT_FILTERS = {
  // Levels 1 & 2: Broad Event Categories and Genres
  types: [
    {
      id: 7000,
      name: "Entertainment",
      subtypes: [
        { id: 7010, name: "Concert/Live Music" },
        { id: 7011, name: "Theater & Arts" },
        { id: 7012, name: "Nightlife/Clubbing" },
        { id: 7013, name: "Comedy Show" },
        { id: 7014, name: "Festival" },
      ],
    },
    {
      id: 7100,
      name: "Professional & Learning",
      subtypes: [
        { id: 7110, name: "Conference" },
        { id: 7111, name: "Workshop/Seminar" },
        { id: 7112, name: "Networking" },
        { id: 7113, name: "Trade Show" },
      ],
    },
    {
      id: 7200,
      name: "Sports & Fitness",
      subtypes: [
        { id: 7210, name: "Live Match/Tournament" },
        { id: 7211, name: "Marathon/Race" },
        { id: 7212, name: "Yoga/Group Class" },
      ],
    },
    {
      id: 7300,
      name: "Family & Community",
      subtypes: [
        { id: 7310, name: "Charity/Fundraiser" },
        { id: 7311, name: "Kids' Workshop" },
        { id: 7312, name: "Religious/Spiritual" },
      ],
    },
  ],

  // Floating Attributes (Dynamic Groups for logistics)
  attributes: [
    {
      id: 8000,
      name: "Admission Type",
      options: [
        { id: 8001, name: "Free Entry" },
        { id: 8002, name: "Paid Tickets" },
        { id: 8003, name: "Invite Only" },
        { id: 8004, name: "Early Bird Available" },
      ],
    },
    {
      id: 8100,
      name: "Time of Day",
      options: [
        { id: 8101, name: "Morning (6AM - 12PM)" },
        { id: 8102, name: "Afternoon (12PM - 5PM)" },
        { id: 8103, name: "Evening (5PM - 9PM)" },
        { id: 8104, name: "Late Night (9PM+)" },
      ],
    },
  ],

  // Event-specific Amenities/Facilities
  amenities: [
    { id: 9001, name: "Wheelchair Accessible" },
    { id: 9002, name: "Parking on Site" },
    { id: 9003, name: "Food & Drinks Included" },
    { id: 9004, name: "VIP Lounge" },
    { id: 9005, name: "WiFi Available" },
    { id: 9006, name: "Cloakroom/Storage" },
    { id: 9007, name: "Childcare Provided" },
    { id: 9008, name: "Smoking Area" },
  ],
};

export const SERVICE_FILTERS = {
  // Levels 1 & 2: Service Industry and Specific Services
  types: [
    {
      id: 10000,
      name: "Wellness & Beauty",
      subtypes: [
        { id: 10010, name: "Massage Therapy" },
        { id: 10011, name: "Hair Styling" },
        { id: 10012, name: "Manicure & Pedicure" },
        { id: 10013, name: "Personal Training" },
      ],
    },
    {
      id: 10100,
      name: "Home Services",
      subtypes: [
        { id: 10110, name: "House Cleaning" },
        { id: 10111, name: "Plumbing" },
        { id: 10112, name: "Electrical Work" },
        { id: 10113, name: "Interior Design" },
      ],
    },
    {
      id: 10200,
      name: "Professional Services",
      subtypes: [
        { id: 10210, name: "Photography" },
        { id: 10211, name: "Legal Consultation" },
        { id: 10212, name: "Translation" },
        { id: 10213, name: "Event Planning" },
      ],
    },
  ],

  // Floating Attributes (Logic-based filters)
  attributes: [
    {
      id: 11000,
      name: "Service Location",
      options: [
        { id: 11001, name: "At My Location (Mobile)" },
        { id: 11002, name: "At Provider's Studio" },
        { id: 11003, name: "Remote / Online" },
      ],
    },
    {
      id: 11100,
      name: "Expertise Level",
      options: [
        { id: 11101, name: "Standard" },
        { id: 11102, name: "Premium / Specialist" },
        { id: 11103, name: "Executive / Luxury" },
      ],
    },
  ],
};

export const TRANSPORTATION_FILTERS = {
  // Static ranges for vehicle/driver rating
  rating: [3, 4, 5],

  // Levels 1 & 2: Vehicle Class and Specific Models/Sizes
  types: [
    {
      id: 12000,
      name: "Car Rental",
      subtypes: [
        { id: 12010, name: "Economy (Small)" },
        { id: 12011, name: "Sedan (Standard)" },
        { id: 12012, name: "SUV" },
        { id: 12013, name: "Luxury / Sports" },
        { id: 12014, name: "Van / Minibus" },
      ],
    },
    {
      id: 12100,
      name: "Private Transfer",
      subtypes: [
        { id: 12110, name: "Standard Shuttle" },
        { id: 12111, name: "VIP Black Car" },
        { id: 12112, name: "Airport Express" },
      ],
    },
    {
      id: 12200,
      name: "Motorbike & Scooter",
      subtypes: [
        { id: 12210, name: "Automatic Scooter" },
        { id: 12211, name: "Touring Bike" },
        { id: 12212, name: "Electric Bike" },
      ],
    },
  ],

  // Floating Attributes (Vehicle Specs)
  attributes: [
    {
      id: 13000,
      name: "Transmission",
      options: [
        { id: 13001, name: "Automatic" },
        { id: 13002, name: "Manual" },
      ],
    },
    {
      id: 13100,
      name: "Fuel Type",
      options: [
        { id: 13101, name: "Gasoline" },
        { id: 13102, name: "Electric" },
        { id: 13103, name: "Hybrid" },
        { id: 13104, name: "Diesel" },
      ],
    },
    {
      id: 13200,
      name: "Passenger Capacity",
      options: [
        { id: 13201, name: "2 Passengers" },
        { id: 13202, name: "4-5 Passengers" },
        { id: 13203, name: "7+ Passengers" },
      ],
    },
  ],
};
