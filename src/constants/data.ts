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
          id: "6",
          listing_info_id: "2",
          type: "subheading",
          body_text: "Confirmation",
          body_html: "<h2>Confirmation</h2>",
          order: 3,
        },
        {
          id: "7",
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
          id: "8",
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
