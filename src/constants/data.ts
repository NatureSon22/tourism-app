import { ListingDetailed } from "../types/baseListing";

export const SAMPLE_ACCOMMODATION_DETAIL: ListingDetailed = {
  id: "1",
  title: "Ace Water Spa",
  thumbnail:
    "https://www.acewaterspa.com.ph/wp-content/uploads/2013/03/Banner-06-scaled-570x570.jpg",
  base_price: 1500,
  module_id: "d2222222-2222-2222-2222-222222222222",
  main_category_id: "1",
  status: "Active",
  highlights:
    "Enjoy a relaxing and rejuvenating array of Hydrotherapy Massages at Ace Water Spa. Book this activity now and enjoy a 4-hour access to swimming pools and saunas.",
  email: "acewaterspa@gmail.com",
  images: [
    {
      id: "1",
      alt: "Ace Water Spa - Main Pool",
      src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/54/e6/68/ace-water-spa.jpg?w=900&h=500&s=1",
      type: "image",
    },
    {
      id: "2",
      alt: "Ace Water Spa - Sauna Area",
      src: "https://res.klook.com/images/w_1200,h_630,c_fill,q_65/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/hthmchmvax67twpiwufh/AceWaterSpaExperienceinPasig-KlookPhilippines.jpg",
      type: "image",
    },
    {
      id: "3",
      alt: "Ace Water Spa - Relaxation Area",
      src: "https://res.klook.com/images/w_1200,h_630,c_fill,q_65/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/axnqeaqfv9kiswgrgggl/Ace%20Water%20Spa%20Experience%20in%20Pasig.jpg",
      type: "image",
    },
  ],
  main_category: {
    id: "1",
    name: "Accommodation",
    type: "PRIMARY",
  },
  categories: [
    {
      id: "1",
      name: "Resort",
      type: "SECONDARY",
    },
    {
      id: "2",
      name: "Private Resort",
      type: "SECONDARY",
    },
    {
      id: "3",
      name: "Entertaining",
      type: "SECONDARY",
    },
    {
      id: "4",
      name: "Free-Wifi",
      type: "AMMENITY",
    },
    {
      id: "4",
      name: "Spa",
      type: "AMMENITY",
    },
    {
      id: "5",
      name: "Park",
      type: "Parking Space",
    },
  ],
  addresses: {
    id: "1",
    listing_id: "1",
    lat: 14.5808,
    lng: 121.0605,
    formatted: "123 Main St, Pasig City, Metro Manila",
    region: "Metro Manila",
    region_code: "MM",
    province: "Metro Manila",
    province_code: "MM",
    city: "Pasig City",
    city_code: "PC",
    barangay: "Barangay San Antonio",
    street: "123 Main St",
    postal_code: "1600",
    is_primary: true,
  },
  contacts: [
    {
      id: "1",
      listing_id: "1",
      type: "landline", // landline | phone
      number: "02 8123 4567",
    },
    {
      id: "2",
      listing_id: "1",
      type: "phone", // landline | phone
      number: "+63 912 345 6789",
    },
    {
      id: "3",
      listing_id: "1",
      type: "phone",
      number: "+63 923 456 7890",
    },
    {
      id: "4",
      listing_id: "1",
      type: "landline",
      number: "02 8765 4321",
    },
  ],
  additional_info: [
    {
      id: "1",
      listing_id: "1",
      key: "General Information",
      title: "General Information",
      content_blocks: [
        {
          id: "1",
          listing_info_id: "1",
          type: "subheading",
          body_text: "Overview",
          body_html: "<h2>Overview</h2>",
          order: 1,
        },
        {
          id: "2",
          listing_info_id: "1",
          type: "paragraph",
          body_text:
            "Ace Water Spa is a premier water-themed leisure destination located in Pasig City, Metro Manila. It offers a unique blend of relaxation and fun with its various pools, saunas, and hydrotherapy massages. The spa is designed to provide a rejuvenating experience for visitors of all ages, making it an ideal spot for families, couples, and solo travelers alike.",
          body_html:
            "<p>Ace Water Spa is a premier water-themed leisure destination located in Pasig City, Metro Manila. It offers a unique blend of relaxation and fun with its various pools, saunas, and hydrotherapy massages. The spa is designed to provide a rejuvenating experience for visitors of all ages, making it an ideal spot for families, couples, and solo travelers alike.</p>",
          order: 2,
        },
        {
          id: "3",
          listing_info_id: "1",
          type: "list",
          body_text:
            "- Hydrotherapy Massages\n- Sauna Access\n- Swimming Pools\n- Relaxation Areas",
          body_html:
            "<ul><li>Hydrotherapy Massages</li><li>Sauna Access</li><li>Swimming Pools</li><li>Relaxation Areas</li></ul>",
          order: 3,
        },
        {
          id: "4",
          listing_info_id: "1",
          type: "subheading",
          body_text: "Additional Information",
          body_html: "<h2>Additional Information</h2>",
          order: 4,
        },
        {
          id: "5",
          listing_info_id: "1",
          type: "list",
          body_text:
            "- Open daily from 9:00 AM to 10:00 PM\n- Last admission at 8:00 PM\n- Children under 3 years old enter for free\n- Free parking available",
          body_html:
            "<ul><li>Open daily from 9:00 AM to 10:00 PM</li><li>Last admission at 8:00 PM</li><li>Children under 3 years old enter for free</li><li>Free parking available</li></ul>",
          order: 4,
        },
      ],
    },
    {
      id: "2",
      listing_id: "1",
      title: "Terms & Conditions",
      key: "Terms & Conditions",
      content_blocks: [
        {
          id: "6",
          listing_info_id: "2",
          type: "subheading",
          body_text: "Eligibility",
          body_html: "<h2>Eligibility</h2>",
          order: 1,
        },
        {
          id: "7",
          listing_info_id: "2",
          type: "list",
          body_text:
            "- Guests must be at least 18 years old to avail of hydrotherapy massages.\n- Children under 12 years old must be accompanied by an adult at all times.\n- Pregnant women are advised to consult with their doctor before availing of any hydrotherapy services.",
          body_html:
            "<ul><li>Guests must be at least 18 years old to avail of hydrotherapy massages.</li><li>Children under 12 years old must be accompanied by an adult at all times.</li><li>Pregnant women are advised to consult with their doctor before availing of any hydrotherapy services.</li></ul>",
          order: 2,
        },
        {
          id: "8",
          listing_info_id: "2",
          type: "subheading",
          body_text: "Confirmation",
          body_html: "<h2>Confirmation</h2>",
          order: 3,
        },
        {
          id: "9",
          listing_info_id: "2",
          type: "list",
          body_text:
            "- A confirmation email will be sent within 24 hours of booking.\n- Please present the confirmation email at the entrance for verification.",
          body_html:
            "<ul><li>A confirmation email will be sent within 24 hours of booking.</li><li>Please present the confirmation email at the entrance for verification.</li></ul>",
          order: 4,
        },
      ],
    },
    {
      id: "3",
      listing_id: "1",
      title: "What to expect",
      key: "What to expect",
      content_blocks: [
        {
          id: "10",
          listing_info_id: "3",
          type: "paragraph",
          body_text:
            "Upon arrival at Ace Water Spa, guests will be greeted by a serene and inviting atmosphere. The spa features a variety of pools, including a main pool with water jets, a relaxation pool with warm water, and a kids' pool. The sauna area offers both dry and wet saunas for ultimate relaxation. Guests can also indulge in hydrotherapy massages that target specific muscle groups to relieve tension and promote overall well-being.",
          body_html:
            "<p>Upon arrival at Ace Water Spa, guests will be greeted by a serene and inviting atmosphere. The spa features a variety of pools, including a main pool with water jets, a relaxation pool with warm water, and a kids' pool. The sauna area offers both dry and wet saunas for ultimate relaxation. Guests can also indulge in hydrotherapy massages that target specific muscle groups to relieve tension and promote overall well-being.</p>",
          order: 1,
          media: [
            {
              id: "4",
              content_block_id: "8",
              media: {
                id: "4",
                alt: "Ace Water Spa - Hydrotherapy Massage",
                type: "image",
                src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhPdSjJgBU4uEToPIBhNfZ119Va1N0pID2_gdaAMLw0iVV6CUPVd8YYwRKXLXRFr8DvBZapcECAJ7sqlDguQDIcACfhyFFfijnbjOfdBsr5DgaWYynLRYohKuN_rI4FcTZbDpTd2AHt7bHh/s1600/Ace+Hotel+%2526+Suites+Ace+Water+Spa+SKY+Garden+hotel+restaurant.jpg",
              },
            },
          ],
        },
        {
          id: "11",
          listing_info_id: "3",
          type: "paragraph",
          body_text:
            "Upon arrival at Ace Water Spa, guests will be greeted by a serene and inviting atmosphere. The spa features a variety of pools, including a main pool with water jets, a relaxation pool with warm water, and a kids' pool. The sauna area offers both dry and wet saunas for ultimate relaxation. Guests can also indulge in hydrotherapy massages that target specific muscle groups to relieve tension and promote overall well-being.",
          body_html:
            "<p>Upon arrival at Ace Water Spa, guests will be greeted by a serene and inviting atmosphere. The spa features a variety of pools, including a main pool with water jets, a relaxation pool with warm water, and a kids' pool. The sauna area offers both dry and wet saunas for ultimate relaxation. Guests can also indulge in hydrotherapy massages that target specific muscle groups to relieve tension and promote overall well-being.</p>",
          order: 1,
          media: [
            {
              id: "4",
              content_block_id: "8",
              media: {
                id: "4",
                alt: "Ace Water Spa - Hydrotherapy Massage",
                type: "image",
                src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhPdSjJgBU4uEToPIBhNfZ119Va1N0pID2_gdaAMLw0iVV6CUPVd8YYwRKXLXRFr8DvBZapcECAJ7sqlDguQDIcACfhyFFfijnbjOfdBsr5DgaWYynLRYohKuN_rI4FcTZbDpTd2AHt7bHh/s1600/Ace+Hotel+%2526+Suites+Ace+Water+Spa+SKY+Garden+hotel+restaurant.jpg",
              },
            },
          ],
        },
      ],
    },
  ],
};

export const SAMPLE_TRANSPORTATION_DETAIL: ListingDetailed = {
  id: "2",
  title: "Victory Liner Bus Terminal",
  thumbnail:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Victory_Liner_Bus.jpg/1200px-Victory_Liner_Bus.jpg",
  base_price: 350,
  module_id: "d3333333-3333-3333-3333-333333333333",
  main_category_id: "2",
  status: "Active",
  highlights:
    "Travel comfortably across Luzon with Victory Liner's air-conditioned buses. Book your seat now and enjoy hassle-free travel with multiple daily departures from Pasay City to major destinations.",
  email: "reservations@victoryliner.com",
  images: [
    {
      id: "1",
      alt: "Victory Liner - Main Terminal",
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Victory_Liner_Bus.jpg/1200px-Victory_Liner_Bus.jpg",
      type: "image",
    },
    {
      id: "2",
      alt: "Victory Liner - Bus Interior",
      src: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=900&h=500&fit=crop",
      type: "image",
    },
    {
      id: "3",
      alt: "Victory Liner - Waiting Area",
      src: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=900&h=500&fit=crop",
      type: "image",
    },
  ],
  main_category: {
    id: "2",
    name: "Transportation",
    type: "PRIMARY",
  },
  categories: [
    {
      id: "6",
      name: "Bus",
      type: "SECONDARY",
    },
    {
      id: "7",
      name: "Inter-City",
      type: "SECONDARY",
    },
    {
      id: "8",
      name: "Point-to-Point",
      type: "SECONDARY",
    },
    {
      id: "9",
      name: "Air-Conditioned",
      type: "AMMENITY",
    },
    {
      id: "10",
      name: "Free Wi-Fi",
      type: "AMMENITY",
    },
    {
      id: "11",
      name: "Parking Space",
      type: "Parking Space",
    },
  ],
  addresses: {
    id: "2",
    listing_id: "2",
    lat: 14.5393,
    lng: 120.9822,
    formatted: "Edsa corner New York St, Pasay City, Metro Manila",
    region: "Metro Manila",
    region_code: "MM",
    province: "Metro Manila",
    province_code: "MM",
    city: "Pasay City",
    city_code: "PSY",
    barangay: "Barangay 183",
    street: "Edsa corner New York St",
    postal_code: "1300",
    is_primary: true,
  },
  contacts: [
    {
      id: "5",
      listing_id: "2",
      type: "landline",
      number: "02 8833 5000",
    },
    {
      id: "6",
      listing_id: "2",
      type: "phone",
      number: "+63 917 123 4567",
    },
  ],
  additional_info: [
    {
      id: "4",
      listing_id: "2",
      key: "General Information",
      title: "General Information",
      content_blocks: [
        {
          id: "11",
          listing_info_id: "4",
          type: "subheading",
          body_text: "Overview",
          body_html: "<h2>Overview</h2>",
          order: 1,
        },
        {
          id: "12",
          listing_info_id: "4",
          type: "paragraph",
          body_text:
            "Victory Liner is one of the Philippines' most trusted bus companies, operating daily routes across Luzon. Departing from their main terminal in Pasay City, passengers can travel to key destinations including Baguio, Olongapo, Dagupan, and more. All buses are air-conditioned and equipped with modern amenities for a comfortable journey.",
          body_html:
            "<p>Victory Liner is one of the Philippines' most trusted bus companies, operating daily routes across Luzon. Departing from their main terminal in Pasay City, passengers can travel to key destinations including Baguio, Olongapo, Dagupan, and more. All buses are air-conditioned and equipped with modern amenities for a comfortable journey.</p>",
          order: 2,
        },
        {
          id: "13",
          listing_info_id: "4",
          type: "subheading",
          body_text: "Departure Schedule",
          body_html: "<h2>Departure Schedule</h2>",
          order: 3,
        },
        {
          id: "14",
          listing_info_id: "4",
          type: "table",
          body_text:
            "Destination | Departure Time | Duration | Fare\nBaguio City | 6:00 AM | 6 hrs | ₱650\nBaguio City | 10:00 AM | 6 hrs | ₱650\nBaguio City | 11:00 PM | 6 hrs | ₱750\nOlongapo City | 5:30 AM | 3 hrs | ₱350\nOlongapo City | 12:00 PM | 3 hrs | ₱350\nOlongapo City | 8:00 PM | 3 hrs | ₱400\nDagupan City | 7:00 AM | 5 hrs | ₱550\nDagupan City | 2:00 PM | 5 hrs | ₱550\nSan Fernando | 6:30 AM | 2.5 hrs | ₱280\nSan Fernando | 3:00 PM | 2.5 hrs | ₱280",
          body_html: `
            <table>
              <thead>
                <tr>
                  <th>Destination</th>
                  <th>Departure Time</th>
                  <th>Duration</th>
                  <th>Fare</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Baguio City</td><td>6:00 AM</td><td>6 hrs</td><td>₱650</td></tr>
                <tr><td>Baguio City</td><td>10:00 AM</td><td>6 hrs</td><td>₱650</td></tr>
                <tr><td>Baguio City</td><td>11:00 PM</td><td>6 hrs</td><td>₱750</td></tr>
                <tr><td>Olongapo City</td><td>5:30 AM</td><td>3 hrs</td><td>₱350</td></tr>
                <tr><td>Olongapo City</td><td>12:00 PM</td><td>3 hrs</td><td>₱350</td></tr>
                <tr><td>Olongapo City</td><td>8:00 PM</td><td>3 hrs</td><td>₱400</td></tr>
                <tr><td>Dagupan City</td><td>7:00 AM</td><td>5 hrs</td><td>₱550</td></tr>
                <tr><td>Dagupan City</td><td>2:00 PM</td><td>5 hrs</td><td>₱550</td></tr>
                <tr><td>San Fernando</td><td>6:30 AM</td><td>2.5 hrs</td><td>₱280</td></tr>
                <tr><td>San Fernando</td><td>3:00 PM</td><td>2.5 hrs</td><td>₱280</td></tr>
              </tbody>
            </table>
          `,
          order: 4,
        },
        {
          id: "15",
          listing_info_id: "4",
          type: "subheading",
          body_text: "Included in the Fare",
          body_html: "<h2>Included in the Fare</h2>",
          order: 5,
        },
        {
          id: "16",
          listing_info_id: "4",
          type: "list",
          body_text:
            "- Air-conditioned bus seat\n- Free Wi-Fi on board\n- One checked baggage (up to 10kg)\n- Travel insurance coverage",
          body_html:
            "<ul><li>Air-conditioned bus seat</li><li>Free Wi-Fi on board</li><li>One checked baggage (up to 10kg)</li><li>Travel insurance coverage</li></ul>",
          order: 6,
        },
      ],
    },
    {
      id: "5",
      listing_id: "2",
      title: "Terms & Conditions",
      key: "Terms & Conditions",
      content_blocks: [
        {
          id: "17",
          listing_info_id: "5",
          type: "subheading",
          body_text: "Booking & Cancellation",
          body_html: "<h2>Booking & Cancellation</h2>",
          order: 1,
        },
        {
          id: "18",
          listing_info_id: "5",
          type: "list",
          body_text:
            "- Tickets must be booked at least 2 hours before departure.\n- Cancellations made 24 hours before departure are fully refundable.\n- No-show tickets are non-refundable.\n- Rescheduling is allowed up to 1 hour before departure.",
          body_html:
            "<ul><li>Tickets must be booked at least 2 hours before departure.</li><li>Cancellations made 24 hours before departure are fully refundable.</li><li>No-show tickets are non-refundable.</li><li>Rescheduling is allowed up to 1 hour before departure.</li></ul>",
          order: 2,
        },
        {
          id: "19",
          listing_info_id: "5",
          type: "subheading",
          body_text: "Passenger Guidelines",
          body_html: "<h2>Passenger Guidelines</h2>",
          order: 3,
        },
        {
          id: "20",
          listing_info_id: "5",
          type: "list",
          body_text:
            "- Passengers must present a valid ID upon boarding.\n- Arrive at the terminal at least 30 minutes before departure.\n- Prohibited items include flammable materials, firearms, and live animals.\n- Children below 3 years old ride for free when not occupying a seat.",
          body_html:
            "<ul><li>Passengers must present a valid ID upon boarding.</li><li>Arrive at the terminal at least 30 minutes before departure.</li><li>Prohibited items include flammable materials, firearms, and live animals.</li><li>Children below 3 years old ride for free when not occupying a seat.</li></ul>",
          order: 4,
        },
      ],
    },
    {
      id: "6",
      listing_id: "2",
      title: "What to Expect",
      key: "What to expect",
      content_blocks: [
        {
          id: "21",
          listing_info_id: "6",
          type: "paragraph",
          body_text:
            "Upon arrival at the Victory Liner terminal, passengers will find a clean and organized boarding area with clearly marked bays for each destination. Staff are stationed to assist with ticketing, baggage handling, and boarding. Buses depart promptly on schedule and feature comfortable reclining seats, overhead storage, and personal reading lights. Rest stops are scheduled along longer routes for passenger comfort.",
          body_html:
            "<p>Upon arrival at the Victory Liner terminal, passengers will find a clean and organized boarding area with clearly marked bays for each destination. Staff are stationed to assist with ticketing, baggage handling, and boarding. Buses depart promptly on schedule and feature comfortable reclining seats, overhead storage, and personal reading lights. Rest stops are scheduled along longer routes for passenger comfort.</p>",
          order: 1,
          media: [
            {
              id: "5",
              content_block_id: "21",
              media: {
                id: "5",
                alt: "Victory Liner - Bus Interior Seats",
                type: "image",
                src: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&h=630&fit=crop",
              },
            },
          ],
        },
      ],
    },
  ],
};
