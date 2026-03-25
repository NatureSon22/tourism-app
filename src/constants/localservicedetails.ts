import forumData, { ForumPost } from "./forum";

export type Hotline = {
  landline: string[];
  mobile: string[];
};

export type Fields = {
  field: string;
  members: string[];
};

type LocalServiceDetail = {
  id: string;
  images: string[];
  title: string;
  tags: string[];
  location: string;
  forums: ForumPost[];
  team: Fields[];
  hotlines: Hotline;
};

export const LOCALSERVICE_DETAIL: LocalServiceDetail = {
  id: "localservice-ph-001",
  images: [
    "https://ocbarchitects.com/wp-content/uploads/2015/09/binangonan.jpg",
    "https://images.real.ph/real/uploads/listings/large/listing_66cd8e8a47a4f7_1724747402.jpg",
    "https://static.wixstatic.com/media/81e04c_184b0e2452b041cab44af36e8cf5c537~mv2.png/v1/fill/w_640,h_520,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/81e04c_184b0e2452b041cab44af36e8cf5c537~mv2.png",
  ],
  title: "Binangonan Lakeview Hospital",
  tags: [
    "Healthcare",
    "Hospital",
    "Emergency Services",
    "24/7 Service",
    "General Medicine",
    "Specialty Care",
  ],
  location: "Brgy. San Juan, Binangonan, Rizal",
  forums: forumData,
  team: [
    {
      field: "OB Gynecology",
      members: [
        "https://s3-eu-west-1.amazonaws.com/intercare-web-public/wysiwyg-uploads%2F1698752331464-pexels-tessy-agbonome-18828741-min.jpg",
        "https://www.hamburg.com/resource/image/19894/landscape_ratio16x9/1240/697/90af38e5f27e7292a6659e66458307d6/71139CE93B092B394E4C11C8F94220A2/doctors-img.jpg",
        "https://s48097.pcdn.co/wp-content/uploads/Blog-Feature-Smiling-Doctor.jpg.optimal.jpg",
        "https://www.thedoctorclinics.co.uk/wp-content/uploads/2025/10/Private-GP-Manchester-Dr-Portrait-The-Doctor-Clinics-1024x683.webp",
        "https://s48097.pcdn.co/wp-content/uploads/Blog-Feature-Smiling-Doctor.jpg.optimal.jpg",
        "https://www.thedoctorclinics.co.uk/wp-content/uploads/2025/10/Private-GP-Manchester-Dr-Portrait-The-Doctor-Clinics-1024x683.webp",
        "https://s48097.pcdn.co/wp-content/uploads/Blog-Feature-Smiling-Doctor.jpg.optimal.jpg",
        "https://www.thedoctorclinics.co.uk/wp-content/uploads/2025/10/Private-GP-Manchester-Dr-Portrait-The-Doctor-Clinics-1024x683.webp",
        "https://s48097.pcdn.co/wp-content/uploads/Blog-Feature-Smiling-Doctor.jpg.optimal.jpg",
        "https://www.thedoctorclinics.co.uk/wp-content/uploads/2025/10/Private-GP-Manchester-Dr-Portrait-The-Doctor-Clinics-1024x683.webp",
      ],
    },
    {
      field: "Pediatrics",
      members: [
        "https://s3-eu-west-1.amazonaws.com/intercare-web-public/wysiwyg-uploads%2F1698752331464-pexels-tessy-agbonome-18828741-min.jpg",
        "https://www.hamburg.com/resource/image/19894/landscape_ratio16x9/1240/697/90af38e5f27e7292a6659e66458307d6/71139CE93B092B394E4C11C8F94220A2/doctors-img.jpg",
        "https://s48097.pcdn.co/wp-content/uploads/Blog-Feature-Smiling-Doctor.jpg.optimal.jpg",
        "https://www.thedoctorclinics.co.uk/wp-content/uploads",
      ],
    },
  ],
  hotlines: {
    landline: ["(02) 1234-5678", "(02) 8765-4321"],
    mobile: ["0917-123-4567", "0928-765-4321"],
  },
};
