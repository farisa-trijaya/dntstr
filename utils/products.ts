export type ItemCart = {
  sku: string;
  name: string;
  images?: string[] | null;
  description: string;
  quantity: number;
  price: number;
  shortDesc?: string | null;
  rating?: string | null;
  oldPrice?: string | null;
  percent?: string | null;
  brand?: string | null;
};
export type ShippingInfo = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  address_1: string;
  address_2?: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
};
export const productStore = {
  sku: "i5b1g92y",
  images: [
    "https://media.sellfy.store/images/0xbTRoya/9BRm/whatsapp_image_2024-01-27_at_14.06.28.jpeg",
    "https://media.sellfy.store/images/0xbTRoya/8WvR/whatsapp_image_2024-01-27_at_14.06.28_2.jpeg",
    "https://media.sellfy.store/images/0xbTRoya/cnFw/whatsapp_image_2024-01-27_at_14.06.28_1.jpeg",
    "https://ae-pic-a1.aliexpress-media.com/kf/Sd4223410a97343d389647e588ef24b69N/Clear-Dental-Overdenture-Inferior-Model-Locator-Denture-Model-with-4-Implants-Demo-Model-Dentistry-Teaching-Study.jpg_.webp",
    "https://ae-pic-a1.aliexpress-media.com/kf/S288e4a60d11143afbeec598aada5c52eA/Clear-Dental-Overdenture-Inferior-Model-Locator-Denture-Model-with-4-Implants-Demo-Model-Dentistry-Teaching-Study.jpg_.webp",
    "https://ae-pic-a1.aliexpress-media.com/kf/Sa834bd1f0ee947c6ad762a4b4fdd4e94M/Clear-Dental-Overdenture-Inferior-Model-Locator-Denture-Model-with-4-Implants-Demo-Model-Dentistry-Teaching-Study.jpg_.webp",
  ],
  name: "Dental Implant Model Removable Interior Mandibular Demo Overdenture Superior Upper/Lower Jaw With 4",
  shortDesc:
    "The best cotton black branded shirt. The best cotton black branded shirt. The best cotton black branded shirt. The best cotton black branded shirt. The best cotton black branded shirt.",
  rating: "5",
  description:
    "A type of veneer that offers numerous benefits and features. Dental veneer are primarily made of pressed ceramic, which makes them highly durable.It is made from a single block of lithium disilicate ceramic. This is top grade material which has been harvested for its toughness, durability and opaque qualities which makes it a highly prized crown. This considered to be the best match with your own natural teeth.",
  price: 59,
  oldPrice: "$75",
  percent: "21%",
  brand: "MAC Veneers",
};
export const reviewStore = [
  {
    id: 1,
    name: "Paola DeJesus",
    date: "July 31, 2024",
    avatar:
      "https://i.pinimg.com/280x280_RS/b2/2b/a9/b22ba9b73c907f181059fc40fcf3d23a.jpg",
    like: "42",
    reviews:
      "These dentures are amazing! They fit well and are suitable for both men and women. I have worn them to weddings, parties, and interviews, and they have never let me down. Highly recommend for anyone looking to regain their confident smile.",
    images: [
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgNSzZujqyh5nV_GPvLdooMOaaoxLUSrEL_OZ4R_A2-hdCOex0YJXKW6Kmh4ei33vGU1O721IaFZmsRwlUA1Iq9eqEAlCV8-cijf6C1nEjrz8JIakeSSv4zuCLcYI7NM5CfKCsM7x9qBCcOf8tMNaqJRIDYTzHQCJg4JWW5MgRaPQ6C8xz4A0nb_iokMBns/s16000/svsv.png",
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiw03ceXJNLHSO8wNvOeez14nzTxmFyW2CejHFsNYiEsI6pC7AeY52aWUerYW-mYaoTkbhyVkevoVWsHITiyLJD9gJ9QAoaXtDy9lTROAL-lhrlv-Z2X5sGNMK0zm8fyAsCdFNjQfSuuopqI8mN4Sx76vFvBNkS2pAanKTKCCsfb_dfj8SWZprFsMVTuvNv/s16000/svsvsv.png",
    ],
  },
  {
    id: 2,
    name: "Alana Fidler",
    date: "August 27, 2024",
    avatar:
      "https://tributecenteronline.s3-accelerate.amazonaws.com/Obituaries/27678868/Thumbnail.jpg",
    like: "38",
    reviews:
      "Works really good, I had a tooth pulled and this helped me have a temporary tooth I can eat and drink with it and I can remove it to keep it clean",
    images: [
      "https://m.media-amazon.com/images/I/71HVpi4OQAL._SY88.jpg",
      "https://m.media-amazon.com/images/I/710TESCMtoL._SY88.jpg",
    ],
  },
  {
    id: 3,
    name: "Mary Downs-Young",
    date: "July 17, 2024",
    avatar:
      "https://i.pinimg.com/736x/2f/15/f2/2f15f2e8c688b3120d3d26467b06330c.jpg",
    like: "32",
    reviews:
      "Don't miss out on this amazing product! These Aimery Fake Teeth have truly boosted my confidence. I had stained and broken teeth that made me hesitant to smile or talk in social gatherings. But with these fake teeth,I can confidently show off a natural-looking smile.The inner surface imprint is so well-designed that even my curious tongue can't tell the difference. These temporary veneers have become my go-to for parties!",
  },
  {
    id: 4,
    name: "Rocky J",
    date: "July 21, 2024",
    avatar:
      "https://i.pinimg.com/736x/2f/15/f2/2f15f2e8c688b3120d3d26467b06330c.jpg",
    like: "24",
    reviews:
      "I used these temporary fake teeth for a job interview and they worked wonders. They made me feel more confident and helped me nail the interview!",
    images: [
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgJ0d8SoS4Re0y17JC61cOUT_hOf31XmiZRs8eHhlQ0HVRFLMwpCtv57oNZJDGETAO0iXTYKHjlW3-DXDoG5q7hKQ7NwaCT-gBy4qaheRfe4SG-FVGCwVNL1cvZ1IEGOEqW0dHvYy7yLOLmVKPvHpX3RPiT9NiMMZd6appHEZnhkDnoLVYhyphenhyphenFrEcptqeUcp/s16000/svsvsvsv.png",
    ],
  },
  {
    id: 5,
    name: "Elias Lopez",
    date: "August 9, 2024",
    avatar:
      "https://pbs.twimg.com/profile_images/427715655769788416/EO-2PDmC_400x400.jpeg",
    like: "19",
    reviews:
      "Ok I never wright a review. This will be my first. This product is a lifesaver until i get teeth implants . This is the best way to use these if you want them tight on . 1. First get a big glass of water with cubed ice on standby. 2. instead of the gel thats inside the teeth use InstaMorph Thermoplastic Beads , those are the strongest. 3. Once you boil and melt InstaMorph put it in the inside of the teeth. 4. Mold it to your mouth then drink the cold glass of water and swirl it around the inside of your mouth until everything gets hard fast. Perfect your done",
    images: ["https://m.media-amazon.com/images/I/51mmdfx+2CL._SY250_.jpg"],
  },
  {
    id: 6,
    name: "Reginald Miller",
    date: "August 14, 2024",
    avatar:
      "https://m.media-amazon.com/images/S/amazon-avatars-global/cf6437e9-d0b8-4c24-a263-c4d2027e7e8f._CR0%2C0%2C500%2C500_SX460_.jpg",
    like: "15",
    reviews:
      "Perfect Fit. My dentures broke so I was limited to soft foods for the next few weeks, but these got me back into the burger habit in no time! I got what I wanted and overall I'm very happy with this. I'm so glad I bought these.",
  },
  {
    id: 7,
    name: "lynn C",
    date: "August 14, 2024",
    avatar:
      "https://i.pinimg.com/736x/2f/15/f2/2f15f2e8c688b3120d3d26467b06330c.jpg",
    like: "12",
    reviews:
      "This denture repair kit has made my life better! The materials are top notch and ensure that my new dentures will last. Not only does it fit perfectly, but it looks great too!",
  },
  {
    id: 8,
    name: "Connor Shurley",
    date: "May 24, 2024",
    avatar:
      "https://i.pinimg.com/736x/2f/15/f2/2f15f2e8c688b3120d3d26467b06330c.jpg",
    like: "10",
    reviews:
      "I was able to quickly and temporarily fix my tooth before going to the dentist. I patiently adjusted this denture and it looks fine when I speak. This purchasing experience is quite good. I am amazed at how well these dentures work. It's easy to use and they're great and look great, great quality.",
  },
  {
    id: 9,
    name: "Mike Marson",
    date: "August 27, 2024",
    avatar:
      "https://i.pinimg.com/736x/2f/15/f2/2f15f2e8c688b3120d3d26467b06330c.jpg",
    like: "8",
    reviews:
      "used to make temp dental appliance for missing front teeth. This is not an easy application but that is not the fault of the product. The PRODUCT IS PERFECT. If you are willing to take the plunge, like I did, you will be well rewarded by saving +$2000. By the way it took me two attempts to get it right, so I was glad two sets of teeth were part of the package.",
  },
  {
    id: 10,
    name: "Michael Porraro",
    date: "August 14, 2023",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW_UOYIhA1_J_Ben8twZcDfwEtrcSC3SnPjg&s",
    like: "5",
    reviews:
      "This denture repair kit has made my life better! The materials are top notch and ensure that my new dentures will last. Not only does it fit perfectly, but it looks great too!",
  },
];
export type User = {
  name: string;
  email: string;
};

export type Transaction = {
  sku: string;
  orderID: string;
  name: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  postal_code: string;
  address_1: string;
  address_2?: string | null;
  amount: number;
  quantity: number;
  payerID: string;
  paymentID: string;
  paymentSource: string;
};

export type responseData = {
  orderID: string;
  payerID: string;
  paymentID: string;
  paymentSource: string;
};
