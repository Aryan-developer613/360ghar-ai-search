const { useEffect, useMemo, useRef, useState } = React;

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const DEFAULT_MODEL = "google/gemma-3-27b-it:free";

const quickQueries = [
  "2BHK in Sector 50 Gurgaon under 80 lakhs, good sunlight, near a school",
  "3BHK on Golf Course Road under 2.2 crore with metro access and VR tour",
  "Rental 2BHK near Cyber City under 55k for office commute",
  "Luxury 4BHK in DLF Phase 5 with clubhouse, pool and balcony",
  "First home under 70 lakhs near school with verified legal documents",
  "Walk to metro rental near Iffco Chowk for corporate commute",
];

const properties = [
  {
    id: "p1",
    title: "Sunlit Residences",
    bhk: 2,
    type: "Apartment",
    listing: "Buy",
    area: 1200,
    sector: "Sector 50",
    locality: "Nirvana Country, Gurgaon",
    priceLakhs: 76,
    rentK: null,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=82",
    vr: true,
    verified: true,
    sunlight: 9,
    commute: 7,
    school: "DPS International 900m",
    metro: "Sector 55-56 Metro 12 min",
    amenities: ["school", "sunlight", "balcony", "park", "security"],
    tags: ["family", "quiet", "natural light", "ready to move"],
    rm: "Rahul M.",
  },
  {
    id: "p2",
    title: "Golf Vista Heights",
    bhk: 3,
    type: "Apartment",
    listing: "Buy",
    area: 1820,
    sector: "Golf Course Road",
    locality: "DLF Phase 5, Gurgaon",
    priceLakhs: 215,
    rentK: null,
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=82",
    vr: true,
    verified: true,
    sunlight: 8,
    commute: 9,
    school: "Shiv Nadar School 8 min",
    metro: "Rapid Metro 5 min",
    amenities: ["clubhouse", "pool", "metro", "gym", "sunlight", "balcony"],
    tags: ["premium", "golf course", "low density", "family"],
    rm: "Priya S.",
  },
  {
    id: "p3",
    title: "Cyber Green Homes",
    bhk: 2,
    type: "Apartment",
    listing: "Rent",
    area: 1050,
    sector: "Cyber City",
    locality: "DLF Phase 2, Gurgaon",
    priceLakhs: 118,
    rentK: 52,
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=82",
    vr: true,
    verified: true,
    sunlight: 7,
    commute: 10,
    school: "Kunskapsskolan 14 min",
    metro: "Cyber City Rapid Metro 6 min",
    amenities: ["metro", "office", "security", "furnished", "parking"],
    tags: ["work commute", "rental", "furnished", "corporate"],
    rm: "Amit K.",
  },
  {
    id: "p4",
    title: "Aravalli Park Floors",
    bhk: 3,
    type: "Builder Floor",
    listing: "Buy",
    area: 1650,
    sector: "Sector 57",
    locality: "Sushant Lok 3, Gurgaon",
    priceLakhs: 142,
    rentK: null,
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=82",
    vr: false,
    verified: true,
    sunlight: 9,
    commute: 8,
    school: "Scottish High 10 min",
    metro: "Sector 55-56 Metro 7 min",
    amenities: ["school", "metro", "terrace", "sunlight", "parking"],
    tags: ["independent floor", "terrace", "family", "airy"],
    rm: "Sneha R.",
  },
  {
    id: "p5",
    title: "Sohna Road Skycourt",
    bhk: 2,
    type: "Apartment",
    listing: "Buy",
    area: 1325,
    sector: "Sohna Road",
    locality: "Sector 48, Gurgaon",
    priceLakhs: 88,
    rentK: 38,
    image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=82",
    vr: true,
    verified: true,
    sunlight: 8,
    commute: 7,
    school: "GD Goenka 6 min",
    metro: "Huda City Centre 15 min",
    amenities: ["school", "clubhouse", "pool", "security", "balcony"],
    tags: ["value", "society", "amenities", "family"],
    rm: "Vikram T.",
  },
  {
    id: "p6",
    title: "MG Road Urban Nest",
    bhk: 1,
    type: "Studio",
    listing: "Rent",
    area: 620,
    sector: "MG Road",
    locality: "Heritage City, Gurgaon",
    priceLakhs: 62,
    rentK: 32,
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=82",
    vr: true,
    verified: true,
    sunlight: 6,
    commute: 9,
    school: "Excelsior American 12 min",
    metro: "MG Road Metro 3 min",
    amenities: ["metro", "furnished", "security", "parking", "office"],
    tags: ["single professional", "metro", "compact", "ready"],
    rm: "Karan P.",
  },
  {
    id: "p7",
    title: "DLF Parkside Villa",
    bhk: 4,
    type: "Villa",
    listing: "Buy",
    area: 3200,
    sector: "DLF Phase 1",
    locality: "Arjun Marg, Gurgaon",
    priceLakhs: 425,
    rentK: null,
    image: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?auto=format&fit=crop&w=1200&q=82",
    vr: true,
    verified: true,
    sunlight: 10,
    commute: 8,
    school: "Shri Ram School 9 min",
    metro: "Sikanderpur Metro 8 min",
    amenities: ["garden", "clubhouse", "sunlight", "parking", "premium"],
    tags: ["luxury", "villa", "garden", "independent"],
    rm: "Deepa S.",
  },
  {
    id: "p8",
    title: "Udyog Vihar Workhome",
    bhk: 2,
    type: "Apartment",
    listing: "Rent",
    area: 980,
    sector: "Udyog Vihar",
    locality: "Sector 18, Gurgaon",
    priceLakhs: 96,
    rentK: 46,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=82",
    vr: false,
    verified: true,
    sunlight: 7,
    commute: 10,
    school: "Blue Bells 15 min",
    metro: "IndusInd Bank Cyber City 7 min",
    amenities: ["office", "metro", "furnished", "security", "parking"],
    tags: ["office commute", "rental", "practical", "corporate"],
    rm: "Rahul M.",
  },
  {
    id: "p9",
    title: "Sector 49 Family Court",
    bhk: 3,
    type: "Apartment",
    listing: "Buy",
    area: 1740,
    sector: "Sector 49",
    locality: "South City 2, Gurgaon",
    priceLakhs: 128,
    rentK: 48,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=82",
    vr: true,
    verified: true,
    sunlight: 8,
    commute: 7,
    school: "DPS Primary 4 min",
    metro: "Huda City Centre 14 min",
    amenities: ["school", "park", "clubhouse", "security", "balcony"],
    tags: ["family", "school", "society", "peaceful"],
    rm: "Priya S.",
  },
  {
    id: "p10",
    title: "Sector 56 Metro View",
    bhk: 2,
    type: "Apartment",
    listing: "Buy",
    area: 1185,
    sector: "Sector 56",
    locality: "Rail Vihar, Gurgaon",
    priceLakhs: 72,
    rentK: 35,
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=82",
    vr: true,
    verified: true,
    sunlight: 7,
    commute: 9,
    school: "Alpine Convent 7 min",
    metro: "Sector 55-56 Metro 4 min",
    amenities: ["metro", "school", "balcony", "security", "park"],
    tags: ["budget", "metro", "family", "verified"],
    rm: "Amit K.",
  },
  {
    id: "p11",
    title: "DLF Phase 4 Courtyard",
    bhk: 3,
    type: "Builder Floor",
    listing: "Buy",
    area: 2100,
    sector: "DLF Phase 4",
    locality: "Near Galleria, Gurgaon",
    priceLakhs: 235,
    rentK: 92,
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=82",
    vr: true,
    verified: true,
    sunlight: 9,
    commute: 9,
    school: "Shri Ram School 11 min",
    metro: "Iffco Chowk Metro 8 min",
    amenities: ["market", "metro", "terrace", "premium", "sunlight"],
    tags: ["premium floor", "market", "central", "airy"],
    rm: "Sneha R.",
  },
  {
    id: "p12",
    title: "Sector 67A Smart Home",
    bhk: 3,
    type: "Apartment",
    listing: "Buy",
    area: 1905,
    sector: "Sector 67A",
    locality: "Golf Course Extension, Gurgaon",
    priceLakhs: 155,
    rentK: 62,
    image: "https://images.unsplash.com/photo-1600607688066-890987f18a86?auto=format&fit=crop&w=1200&q=82",
    vr: true,
    verified: true,
    sunlight: 8,
    commute: 6,
    school: "Heritage Xperiential 9 min",
    metro: "Rapid Metro 18 min",
    amenities: ["smart home", "clubhouse", "pool", "school", "security"],
    tags: ["new society", "smart home", "amenities", "family"],
    rm: "Vikram T.",
  },
  {
    id: "p13",
    title: "SPR Wellness Towers",
    bhk: 3,
    type: "Apartment",
    listing: "Buy",
    area: 2025,
    sector: "Sector 71",
    locality: "Southern Peripheral Road, Gurgaon",
    priceLakhs: 168,
    rentK: 66,
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=82",
    vr: true,
    verified: true,
    sunlight: 8,
    commute: 7,
    school: "St. Xavier's High 8 min",
    metro: "Rapid Metro 20 min",
    amenities: ["clubhouse", "pool", "gym", "school", "security"],
    tags: ["wellness", "new launch", "family", "amenities"],
    rm: "Neha G.",
    possession: "Ready in 6 months",
    inspection: "Fresh 360 scan",
  },
  {
    id: "p14",
    title: "Iffco Metro Residences",
    bhk: 2,
    type: "Apartment",
    listing: "Rent",
    area: 1120,
    sector: "Iffco Chowk",
    locality: "Sector 29, Gurgaon",
    priceLakhs: 132,
    rentK: 58,
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=82",
    vr: true,
    verified: true,
    sunlight: 7,
    commute: 10,
    school: "Pathways Early Years 9 min",
    metro: "Iffco Chowk Metro 2 min",
    amenities: ["metro", "furnished", "office", "security", "market"],
    tags: ["walk to metro", "corporate", "central", "rental"],
    rm: "Karan P.",
    possession: "Immediate",
    inspection: "RM verified yesterday",
  },
  {
    id: "p15",
    title: "Sector 43 Green Court",
    bhk: 3,
    type: "Builder Floor",
    listing: "Buy",
    area: 1760,
    sector: "Sector 43",
    locality: "Sushant Lok 1, Gurgaon",
    priceLakhs: 198,
    rentK: 74,
    image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=82",
    vr: false,
    verified: true,
    sunlight: 9,
    commute: 8,
    school: "Shri Ram Aravali 7 min",
    metro: "Huda City Centre 6 min",
    amenities: ["school", "metro", "park", "terrace", "parking"],
    tags: ["green pocket", "central", "family", "floor"],
    rm: "Deepa S.",
    possession: "Immediate",
    inspection: "Legal docs checked",
  },
  {
    id: "p16",
    title: "Dwarka Expressway Aura",
    bhk: 3,
    type: "Apartment",
    listing: "Buy",
    area: 1845,
    sector: "Sector 102",
    locality: "Dwarka Expressway, Gurgaon",
    priceLakhs: 121,
    rentK: 42,
    image: "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1200&q=82",
    vr: true,
    verified: true,
    sunlight: 8,
    commute: 6,
    school: "DPS Dwarka Expressway 6 min",
    metro: "Dwarka Sector 21 18 min",
    amenities: ["school", "clubhouse", "pool", "security", "balcony"],
    tags: ["expressway", "value", "future growth", "family"],
    rm: "Rahul M.",
    possession: "Ready to move",
    inspection: "Drone + 360 scan",
  },
  {
    id: "p17",
    title: "Ambience Island Signature",
    bhk: 4,
    type: "Apartment",
    listing: "Buy",
    area: 3100,
    sector: "Ambience Island",
    locality: "NH 48, Gurgaon",
    priceLakhs: 510,
    rentK: 185,
    image: "https://images.unsplash.com/photo-1600607688960-e095ff83135c?auto=format&fit=crop&w=1200&q=82",
    vr: true,
    verified: true,
    sunlight: 9,
    commute: 9,
    school: "GD Goenka Global 11 min",
    metro: "Moulsari Avenue 8 min",
    amenities: ["premium", "clubhouse", "pool", "garden", "security"],
    tags: ["luxury", "island living", "premium", "low density"],
    rm: "Priya S.",
    possession: "Immediate",
    inspection: "Premium RM audited",
  },
  {
    id: "p18",
    title: "Sector 70A First Home",
    bhk: 2,
    type: "Apartment",
    listing: "Buy",
    area: 1045,
    sector: "Sector 70A",
    locality: "Tulip Chowk, Gurgaon",
    priceLakhs: 64,
    rentK: 28,
    image: "https://images.unsplash.com/photo-1600566752229-250ed79470f8?auto=format&fit=crop&w=1200&q=82",
    vr: false,
    verified: true,
    sunlight: 7,
    commute: 6,
    school: "St. Angels Global 5 min",
    metro: "Rapid Metro 22 min",
    amenities: ["school", "security", "parking", "balcony", "park"],
    tags: ["budget", "first home", "family", "value"],
    rm: "Amit K.",
    possession: "Ready to move",
    inspection: "RM inspected",
  },
];

const catalogSeeds = [
  ["p19", "AIPL Joy Street Homes", 2, "Apartment", "Buy", 1240, "Sector 66", "Golf Course Extension, Gurgaon", 102, 41, true, 8, 7, "Heritage Xperiential 8 min", "Rapid Metro 16 min", ["school", "market", "clubhouse", "security", "balcony"], ["family", "market", "extension road", "value"], "Neha G."],
  ["p20", "M3M Urbana Suites", 1, "Studio", "Rent", 690, "Sector 67", "Golf Course Extension, Gurgaon", 78, 34, true, 7, 8, "St. Xavier's High 10 min", "Rapid Metro 17 min", ["furnished", "office", "market", "security", "parking"], ["single professional", "compact", "corporate"], "Karan P."],
  ["p21", "Vatika City Family Wing", 3, "Apartment", "Buy", 1785, "Sector 49", "Sohna Road, Gurgaon", 146, 56, true, 8, 7, "DPS Primary 5 min", "Huda City Centre 14 min", ["school", "clubhouse", "pool", "park", "security"], ["family", "society", "green", "verified"], "Priya S."],
  ["p22", "Emaar Palm Drive", 3, "Apartment", "Buy", 1950, "Sector 66", "Golf Course Extension, Gurgaon", 232, 88, true, 9, 8, "Heritage Xperiential 7 min", "Rapid Metro 15 min", ["premium", "clubhouse", "pool", "gym", "security"], ["premium", "family", "sunlight"], "Deepa S."],
  ["p23", "Bestech Park View Spa", 4, "Apartment", "Buy", 2670, "Sector 47", "Near Subhash Chowk, Gurgaon", 275, 105, true, 8, 7, "GD Goenka 7 min", "Huda City Centre 13 min", ["clubhouse", "pool", "garden", "school", "security"], ["large family", "premium", "amenities"], "Vikram T."],
  ["p24", "Central Park Flower Valley", 3, "Apartment", "Buy", 1995, "Sohna Road", "Sector 33 Sohna, Gurgaon", 118, 39, true, 9, 5, "GD Goenka World 9 min", "Huda City Centre 25 min", ["garden", "clubhouse", "pool", "school", "balcony"], ["green living", "value", "family"], "Rahul M."],
  ["p25", "Unitech Fresco", 2, "Apartment", "Rent", 1418, "Sector 50", "Nirvana Country, Gurgaon", 96, 42, false, 8, 7, "DPS International 6 min", "Sector 55-56 Metro 12 min", ["school", "park", "security", "balcony", "parking"], ["family", "sunlight", "quiet"], "Sneha R."],
  ["p26", "DLF Ridgewood Estate", 3, "Apartment", "Rent", 1376, "DLF Phase 4", "Near Galleria, Gurgaon", 185, 72, true, 7, 9, "Shri Ram School 9 min", "Iffco Chowk Metro 7 min", ["metro", "market", "security", "clubhouse", "parking"], ["central", "rental", "commute"], "Amit K."],
  ["p27", "Sushant Lok Builder Floor", 2, "Builder Floor", "Buy", 1150, "Sector 43", "Sushant Lok 1, Gurgaon", 132, 48, false, 9, 8, "Shri Ram Aravali 8 min", "Huda City Centre 6 min", ["school", "terrace", "parking", "metro", "park"], ["floor", "sunlight", "central"], "Deepa S."],
  ["p28", "The Close North", 4, "Apartment", "Buy", 2850, "Nirvana Country", "Sector 50, Gurgaon", 365, 135, true, 9, 7, "DPS International 5 min", "Sector 55-56 Metro 13 min", ["premium", "garden", "clubhouse", "pool", "security"], ["luxury", "low density", "family"], "Priya S."],
  ["p29", "Mapsko Mount Ville", 3, "Apartment", "Buy", 1490, "Sector 79", "New Gurgaon", 96, 31, true, 8, 5, "MatriKiran School 12 min", "Huda City Centre 27 min", ["school", "clubhouse", "pool", "security", "balcony"], ["budget", "new gurgaon", "value"], "Rahul M."],
  ["p30", "Godrej Air", 3, "Apartment", "Buy", 1844, "Sector 85", "New Gurgaon", 142, 45, true, 8, 6, "DPS Sector 84 8 min", "Dwarka Expressway 14 min", ["clubhouse", "pool", "gym", "security", "balcony"], ["new society", "air quality", "family"], "Neha G."],
  ["p31", "DLF Ultima", 4, "Apartment", "Buy", 3030, "Sector 81", "New Gurgaon", 325, 118, true, 9, 6, "MatriKiran School 10 min", "Dwarka Expressway 16 min", ["premium", "clubhouse", "pool", "garden", "security"], ["luxury", "large family", "green"], "Vikram T."],
  ["p32", "Spaze Privy", 2, "Apartment", "Buy", 1215, "Sector 72", "Southern Peripheral Road, Gurgaon", 82, 32, false, 7, 7, "St. Xavier's High 7 min", "Rapid Metro 18 min", ["school", "security", "balcony", "parking", "park"], ["first home", "budget", "family"], "Amit K."],
  ["p33", "Ansal Esencia Floors", 3, "Builder Floor", "Buy", 1540, "Sector 67", "Golf Course Extension, Gurgaon", 125, 44, false, 8, 7, "Alpine Convent 8 min", "Rapid Metro 18 min", ["school", "terrace", "parking", "security", "park"], ["floor", "value", "family"], "Sneha R."],
  ["p34", "BPTP Amstoria Villa", 4, "Villa", "Buy", 3560, "Sector 102", "Dwarka Expressway, Gurgaon", 395, 145, true, 9, 6, "DPS Dwarka Expressway 7 min", "Dwarka Sector 21 18 min", ["garden", "premium", "clubhouse", "parking", "security"], ["villa", "expressway", "luxury"], "Deepa S."],
  ["p35", "Sobha City", 3, "Apartment", "Buy", 1711, "Sector 108", "Dwarka Expressway, Gurgaon", 176, 62, true, 8, 6, "Euro International 8 min", "Dwarka Sector 21 20 min", ["clubhouse", "pool", "school", "security", "balcony"], ["expressway", "premium", "family"], "Neha G."],
  ["p36", "Tata La Vida", 2, "Apartment", "Buy", 1330, "Sector 113", "Dwarka Expressway, Gurgaon", 148, 52, true, 8, 7, "DPS Dwarka Expressway 10 min", "Dwarka Sector 21 12 min", ["clubhouse", "pool", "security", "balcony", "parking"], ["expressway", "airport access", "verified"], "Rahul M."],
  ["p37", "Ansal API Palam Vihar", 3, "Builder Floor", "Rent", 1500, "Palam Vihar", "Old Gurgaon", 110, 36, false, 7, 7, "DPSG Palam Vihar 6 min", "Dwarka Sector 21 16 min", ["school", "parking", "terrace", "security", "park"], ["rental", "old gurgaon", "family"], "Karan P."],
  ["p38", "Sector 14 Independent Floor", 2, "Builder Floor", "Rent", 980, "Sector 14", "Old Gurgaon", 86, 30, false, 8, 8, "DAV Public School 5 min", "MG Road Metro 11 min", ["school", "market", "parking", "terrace", "security"], ["budget rent", "market", "central"], "Amit K."],
  ["p39", "DLF Corporate Greens", 2, "Apartment", "Rent", 1110, "Sector 74A", "Southern Peripheral Road, Gurgaon", 102, 40, true, 7, 8, "St. Xavier's High 9 min", "Cyber City 18 min", ["office", "furnished", "security", "parking", "clubhouse"], ["corporate", "rental", "commute"], "Priya S."],
  ["p40", "Huda City Walkup", 1, "Studio", "Rent", 540, "Sector 44", "Near Huda City Centre, Gurgaon", 58, 26, false, 7, 10, "Amity International 8 min", "Huda City Centre 3 min", ["metro", "furnished", "market", "security", "office"], ["single professional", "walk to metro", "budget"], "Karan P."],
  ["p41", "Sector 30 Executive Homes", 2, "Apartment", "Rent", 1010, "Sector 30", "Near NH 48, Gurgaon", 92, 39, true, 8, 9, "Ryan International 7 min", "Huda City Centre 8 min", ["office", "metro", "furnished", "security", "parking"], ["executive", "central", "commute"], "Neha G."],
  ["p42", "DLF Magnolias Residence", 4, "Apartment", "Buy", 6400, "Golf Course Road", "DLF Phase 5, Gurgaon", 2400, 520, true, 10, 9, "Shiv Nadar School 8 min", "Rapid Metro 4 min", ["premium", "clubhouse", "pool", "garden", "security"], ["ultra luxury", "golf course", "private lift"], "Deepa S."],
  ["p43", "DLF Camellias Residence", 5, "Apartment", "Buy", 7350, "Golf Course Road", "DLF Phase 5, Gurgaon", 4200, 850, true, 10, 9, "Shiv Nadar School 9 min", "Rapid Metro 4 min", ["premium", "clubhouse", "pool", "garden", "security"], ["ultra luxury", "golf course", "large family"], "Priya S."],
  ["p44", "Sector 52 Value Homes", 2, "Apartment", "Buy", 1080, "Sector 52", "Ardee City, Gurgaon", 68, 29, false, 7, 8, "Ardee School 5 min", "Sector 55-56 Metro 9 min", ["school", "metro", "security", "parking", "market"], ["budget", "first home", "family"], "Amit K."],
  ["p45", "Sector 46 Sun Homes", 3, "Builder Floor", "Buy", 1620, "Sector 46", "Near Huda City Centre, Gurgaon", 156, 55, true, 9, 8, "Amity International 6 min", "Huda City Centre 8 min", ["school", "sunlight", "terrace", "parking", "security"], ["sunlight", "floor", "central"], "Sneha R."],
  ["p46", "Sector 31 Family Nest", 2, "Apartment", "Buy", 1165, "Sector 31", "NH 48, Gurgaon", 84, 34, true, 8, 8, "Ryan International 6 min", "Huda City Centre 10 min", ["school", "market", "security", "balcony", "parking"], ["family", "central", "value"], "Rahul M."],
  ["p47", "Sector 65 Premium Decks", 3, "Apartment", "Buy", 2220, "Sector 65", "Golf Course Extension, Gurgaon", 258, 96, true, 9, 8, "Heritage Xperiential 8 min", "Rapid Metro 14 min", ["premium", "clubhouse", "pool", "balcony", "security"], ["premium", "sunlight", "extension road"], "Vikram T."],
  ["p48", "Sector 63A Compact Homes", 2, "Apartment", "Buy", 980, "Sector 63A", "Golf Course Extension, Gurgaon", 74, 31, true, 7, 7, "Alpine Convent 9 min", "Rapid Metro 17 min", ["school", "security", "parking", "balcony", "park"], ["budget", "first home", "verified"], "Neha G."],
];

const generatedProperties = catalogSeeds.map(([id, title, bhk, type, listing, area, sector, locality, priceLakhs, rentK, vr, sunlight, commute, school, metro, amenities, tags, rm], index) => ({
  id,
  title,
  bhk,
  type,
  listing,
  area,
  sector,
  locality,
  priceLakhs,
  rentK,
  image: `https://images.unsplash.com/photo-${[
    "1600566753190-17f0baa2a6c3",
    "1600607687939-ce8a6c25118c",
    "1616046229478-9901c5536",
    "1600210492486-724fe5c67fb0",
    "1615873968403-89e068629265",
    "1600607688066-890987f18a86",
  ][index % 6]}?auto=format&fit=crop&w=1200&q=82`,
  vr,
  verified: true,
  sunlight,
  commute,
  school,
  metro,
  amenities,
  tags,
  rm,
  possession: index % 4 === 0 ? "Immediate" : index % 4 === 1 ? "Ready to move" : index % 4 === 2 ? "Ready in 3 months" : "Owner flexible",
  inspection: vr ? "Fresh 360 scan" : index % 3 === 0 ? "Legal docs checked" : "RM inspected",
}));

properties.push(...generatedProperties);

function Icon({ name, size = 18 }) {
  const iconRef = useRef(null);
  useEffect(() => {
    if (!iconRef.current || !window.lucide) return;
    iconRef.current.innerHTML = "";
    const icon = window.lucide.icons?.[name];
    if (!icon || !window.lucide.createElement) {
      iconRef.current.textContent = "•";
      return;
    }
    const node = window.lucide.createElement(icon);
    node.setAttribute("width", size);
    node.setAttribute("height", size);
    iconRef.current.appendChild(node);
  }, [name, size]);
  return <span ref={iconRef} aria-hidden="true" />;
}

function formatPrice(property) {
  if (property.listing === "Rent" && property.rentK) return `₹${property.rentK}k/mo`;
  if (property.priceLakhs >= 100) return `₹${(property.priceLakhs / 100).toFixed(property.priceLakhs % 100 ? 2 : 0)} Cr`;
  return `₹${property.priceLakhs} Lakhs`;
}

function normalize(text) {
  return String(text || "").toLowerCase();
}

function parseLocally(query, tab) {
  const q = normalize(query);
  const bhkMatch = q.match(/([1-5])\s*(bhk|bed|bedroom)/);
  const underMatch = q.match(/under\s*(₹|rs\.?|inr)?\s*([0-9.]+)\s*(cr|crore|lakh|lakhs|k|thousand)?/);
  const rentMatch = q.match(/([0-9.]+)\s*k/);
  const sectors = ["sector 14", "sector 30", "sector 31", "sector 43", "sector 44", "sector 46", "sector 47", "sector 48", "sector 49", "sector 50", "sector 52", "sector 56", "sector 57", "sector 63a", "sector 65", "sector 66", "sector 67", "sector 67a", "sector 70a", "sector 71", "sector 72", "sector 74a", "sector 79", "sector 81", "sector 85", "sector 102", "sector 108", "sector 113", "golf course road", "cyber city", "mg road", "iffco chowk", "ambience island", "dwarka expressway", "new gurgaon", "palam vihar", "nirvana country", "dlf phase 1", "dlf phase 2", "dlf phase 4", "dlf phase 5", "sohna road", "udyog vihar"];
  const location = sectors.find((item) => q.includes(item));
  const amenities = ["school", "metro", "pool", "clubhouse", "garden", "parking", "security", "furnished", "office", "balcony", "terrace", "park", "market", "gym"].filter((item) => q.includes(item));
  const preferences = ["sunlight", "natural light", "quiet", "luxury", "premium", "family", "commute", "vr", "verified", "smart home", "legal", "first home", "walk to metro", "expressway"].filter((item) => q.includes(item));

  let maxPriceLakhs = null;
  let maxRentK = null;
  if (underMatch) {
    const raw = Number(underMatch[2]);
    const unit = underMatch[3] || "";
    if (unit.startsWith("cr") || unit.startsWith("crore")) maxPriceLakhs = raw * 100;
    else if (unit === "k" || unit === "thousand") maxRentK = raw;
    else maxPriceLakhs = raw;
  }
  if (rentMatch && (q.includes("rent") || tab === "Rent")) maxRentK = Number(rentMatch[1]);

  return {
    intent: tab,
    location: location ? titleCase(location) : "",
    bhk: bhkMatch ? Number(bhkMatch[1]) : null,
    maxPriceLakhs,
    maxRentK,
    amenities,
    preferences,
    confidence: 0.72,
    followUpQuestion: location ? "" : "Do you prefer Golf Course Road, Sector 50, or Cyber City?",
  };
}

function titleCase(text) {
  return String(text)
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function stripJson(text) {
  const cleaned = text.replace(/```json|```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  return start >= 0 && end >= start ? cleaned.slice(start, end + 1) : cleaned;
}

async function openRouterChat({ apiKey, model, messages, temperature = 0.2 }) {
  const response = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": window.location.origin,
      "X-Title": "360Ghar AI Property Search Assistant",
    },
    body: JSON.stringify({ model, messages, temperature }),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `OpenRouter request failed (${response.status})`);
  }
  const data = await response.json();
  return data.choices?.[0]?.message?.content || "";
}

async function parseWithLLM({ query, tab, apiKey, model }) {
  const system = `You are the query parser for 360Ghar, an AI + VR real estate platform focused on verified Gurgaon/NCR property walkthroughs.
Return only valid JSON. Do not add prose.
Schema:
{
  "intent": "Buy" | "Rent" | "Sell",
  "location": "specific Gurgaon sector/locality or empty string",
  "bhk": number|null,
  "maxPriceLakhs": number|null,
  "maxRentK": number|null,
  "amenities": string[],
  "preferences": string[],
  "confidence": number,
  "followUpQuestion": string
}
Rules:
- Convert crore to lakhs. 1 crore = 100 lakhs.
- For rent budgets like 55k, use maxRentK.
- Extract soft preferences such as sunlight, commute, family, premium, verified, VR.
- Ask one short follow-up only if the location or budget is ambiguous.`;
  const content = await openRouterChat({
    apiKey,
    model,
    messages: [
      { role: "system", content: system },
      { role: "user", content: `Active tab: ${tab}\nUser query: ${query}` },
    ],
  });
  return JSON.parse(stripJson(content));
}

async function generateSummary({ apiKey, model, query, property, parsed }) {
  const system = `You write concise, useful 360Ghar property match summaries.
Write 2-3 lines, no markdown heading. Mention concrete reasons such as location, budget, sunlight, school, metro, VR, verified status or commute.`;
  return openRouterChat({
    apiKey,
    model,
    temperature: 0.35,
    messages: [
      { role: "system", content: system },
      {
        role: "user",
        content: JSON.stringify({
          originalQuery: query,
          parsedFilters: parsed,
          property,
        }),
      },
    ],
  });
}

function localSummary(query, property, reason) {
  const priceFit = property.listing === "Rent" ? `${formatPrice(property)} rent` : `${formatPrice(property)} budget`;
  return `${property.title} is a strong fit for "${query}" because it matches the ${property.bhk}BHK need in ${property.sector} with ${priceFit}. ${reason} The verified listing and ${property.vr ? "360° walkthrough" : "on-site inspection"} make it easier to shortlist before visiting.`;
}

function scoreProperty(property, parsed, tab) {
  let score = 44;
  const reasons = [];
  const intent = parsed.intent || tab;

  if (property.listing === intent) {
    score += 12;
    reasons.push(intent === "Rent" ? "available for rent" : "available to buy");
  }
  if (parsed.bhk && property.bhk === parsed.bhk) {
    score += 18;
    reasons.push(`${property.bhk}BHK match`);
  } else if (parsed.bhk && Math.abs(property.bhk - parsed.bhk) === 1) {
    score += 6;
  }

  if (parsed.location && normalize(property.sector + " " + property.locality).includes(normalize(parsed.location))) {
    score += 20;
    reasons.push(property.sector);
  }

  if (parsed.maxPriceLakhs && property.priceLakhs <= parsed.maxPriceLakhs) {
    score += 16;
    reasons.push("within budget");
  } else if (parsed.maxPriceLakhs && property.priceLakhs <= parsed.maxPriceLakhs * 1.12) {
    score += 7;
    reasons.push("slightly above budget");
  }

  if (parsed.maxRentK && property.rentK && property.rentK <= parsed.maxRentK) {
    score += 16;
    reasons.push("rent within range");
  }

  for (const item of parsed.amenities || []) {
    const haystack = normalize([...property.amenities, ...property.tags, property.school, property.metro].join(" "));
    if (haystack.includes(normalize(item))) {
      score += 6;
      reasons.push(item);
    }
  }

  for (const item of parsed.preferences || []) {
    const pref = normalize(item);
    if ((pref.includes("sun") || pref.includes("light")) && property.sunlight >= 8) {
      score += 8;
      reasons.push("great natural light");
    }
    if ((pref.includes("commute") || pref.includes("office")) && property.commute >= 8) {
      score += 8;
      reasons.push("easy commute");
    }
    if (pref.includes("vr") && property.vr) {
      score += 5;
      reasons.push("360° tour");
    }
    if (pref.includes("verified") && property.verified) {
      score += 5;
      reasons.push("verified");
    }
    if ((pref.includes("premium") || pref.includes("luxury")) && property.priceLakhs >= 150) {
      score += 7;
      reasons.push("premium inventory");
    }
    if (pref.includes("legal") && normalize(property.inspection).includes("legal")) {
      score += 7;
      reasons.push("legal docs checked");
    }
    if (pref.includes("first home") && property.priceLakhs <= 90) {
      score += 8;
      reasons.push("first-home budget");
    }
    if (pref.includes("walk to metro") && normalize(property.metro).includes("metro") && property.commute >= 8) {
      score += 8;
      reasons.push("walkable metro commute");
    }
    if (pref.includes("expressway") && normalize(property.locality + " " + property.sector).includes("expressway")) {
      score += 8;
      reasons.push("expressway growth corridor");
    }
  }

  if (property.verified) score += 3;
  if (property.vr) score += 3;

  const uniqueReasons = [...new Set(reasons)].slice(0, 3);
  const fallback = [property.sunlight >= 8 ? "Great natural light" : "Verified listing", property.school, property.vr ? "360° tour ready" : "RM inspected"].filter(Boolean);
  return {
    score: Math.max(38, Math.min(98, Math.round(score))),
    reason: (uniqueReasons.length ? uniqueReasons : fallback).join(" · "),
  };
}

function getRankedProperties(parsed, tab) {
  return properties
    .map((property) => ({ ...property, ...scoreProperty(property, parsed, tab) }))
    .filter((property) => {
      if (tab !== "Sell" && property.listing !== tab && property.score < 72) return false;
      if (parsed.bhk && Math.abs(property.bhk - parsed.bhk) > 1) return false;
      return true;
    })
    .sort((a, b) => b.score - a.score);
}

function sortProperties(items, sortMode) {
  const sorted = [...items];
  if (sortMode === "price-low") {
    return sorted.sort((a, b) => (a.listing === "Rent" ? a.rentK || 999 : a.priceLakhs) - (b.listing === "Rent" ? b.rentK || 999 : b.priceLakhs));
  }
  if (sortMode === "commute") return sorted.sort((a, b) => b.commute - a.commute || b.score - a.score);
  if (sortMode === "sunlight") return sorted.sort((a, b) => b.sunlight - a.sunlight || b.score - a.score);
  if (sortMode === "vr") return sorted.sort((a, b) => Number(b.vr) - Number(a.vr) || b.score - a.score);
  return sorted.sort((a, b) => b.score - a.score);
}

function buildMarketInsights(items, parsed, tab) {
  const visible = items.length ? items : properties.filter((item) => item.listing === tab);
  const prices = visible.map((item) => (item.listing === "Rent" ? item.rentK : item.priceLakhs)).filter(Boolean);
  const avg = prices.length ? Math.round(prices.reduce((sum, value) => sum + value, 0) / prices.length) : 0;
  const bestSector = visible.reduce((best, item) => (item.score > (best?.score || 0) ? item : best), null);
  const vrCount = visible.filter((item) => item.vr).length;
  const budgetFit = visible.filter((item) => parsed.maxPriceLakhs ? item.priceLakhs <= parsed.maxPriceLakhs : parsed.maxRentK ? item.rentK && item.rentK <= parsed.maxRentK : true).length;
  return {
    avgLabel: tab === "Rent" ? `Rs ${avg}k/mo avg` : `Rs ${avg}L avg`,
    bestSector: bestSector?.sector || "Gurgaon",
    vrCount,
    budgetFit,
    topReason: bestSector?.reason || "Verified inventory with strong location signals",
  };
}

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const [tab, setTab] = useState(urlParams.get("intent") || "Buy");
  const [query, setQuery] = useState(urlParams.get("q") || quickQueries[0]);
  const [apiKey, setApiKey] = useState(localStorage.getItem("openrouter_key") || "");
  const [model, setModel] = useState(localStorage.getItem("openrouter_model") || DEFAULT_MODEL);
  const [showApi, setShowApi] = useState(false);
  const [parsed, setParsed] = useState(parseLocally(urlParams.get("q") || quickQueries[0], tab));
  const [isParsing, setIsParsing] = useState(false);
  const [source, setSource] = useState("Local parser preview");
  const [selectedId, setSelectedId] = useState("p1");
  const [summary, setSummary] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [compareIds, setCompareIds] = useState([]);
  const [shortlistIds, setShortlistIds] = useState(() => JSON.parse(localStorage.getItem("shortlist_ids") || "[]"));
  const [sortMode, setSortMode] = useState("match");
  const [vrOnly, setVrOnly] = useState(false);
  const [toast, setToast] = useState("");
  const [listening, setListening] = useState(false);

  const ranked = useMemo(() => {
    const base = getRankedProperties(parsed, tab).filter((item) => !vrOnly || item.vr);
    return sortProperties(base, sortMode);
  }, [parsed, tab, sortMode, vrOnly]);
  const selected = properties.find((item) => item.id === selectedId) || ranked[0] || properties[0];
  const selectedRanked = ranked.find((item) => item.id === selected.id) || { ...selected, ...scoreProperty(selected, parsed, tab) };
  const similar = ranked.filter((item) => item.id !== selected.id && (item.bhk === selected.bhk || item.sector === selected.sector || item.listing === selected.listing)).slice(0, 3);
  const compareItems = compareIds.map((id) => properties.find((item) => item.id === id)).filter(Boolean);
  const shortlistItems = shortlistIds.map((id) => properties.find((item) => item.id === id)).filter(Boolean);
  const marketInsights = useMemo(() => buildMarketInsights(ranked, parsed, tab), [ranked, parsed, tab]);

  useEffect(() => {
    localStorage.setItem("openrouter_key", apiKey);
  }, [apiKey]);

  useEffect(() => {
    localStorage.setItem("openrouter_model", model);
  }, [model]);

  useEffect(() => {
    localStorage.setItem("shortlist_ids", JSON.stringify(shortlistIds));
  }, [shortlistIds]);

  useEffect(() => {
    if (toast) {
      const timer = window.setTimeout(() => setToast(""), 2600);
      return () => window.clearTimeout(timer);
    }
  }, [toast]);

  useEffect(() => {
    if (!ranked.some((item) => item.id === selectedId) && ranked[0]) {
      setSelectedId(ranked[0].id);
    }
  }, [ranked, selectedId]);

  const handleSearch = async () => {
    setIsParsing(true);
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set("q", query);
    nextUrl.searchParams.set("intent", tab);
    window.history.replaceState({}, "", nextUrl);

    try {
      if (apiKey.trim()) {
        const aiParsed = await parseWithLLM({ query, tab, apiKey, model });
        setParsed({ ...parseLocally(query, tab), ...aiParsed, intent: aiParsed.intent || tab });
        setSource("OpenRouter live parse");
      } else {
        setParsed(parseLocally(query, tab));
        setSource("Local parser preview");
      }
    } catch (error) {
      setParsed(parseLocally(query, tab));
      setSource("Local parser fallback");
      setToast("OpenRouter parse failed, using local fallback for the prototype.");
    } finally {
      setIsParsing(false);
    }
  };

  const handleSummary = async (property = selectedRanked) => {
    setSelectedId(property.id);
    setSummaryLoading(true);
    setSummary("");
    try {
      if (apiKey.trim()) {
        const text = await generateSummary({ apiKey, model, query, property, parsed });
        setSummary(text);
      } else {
        setSummary(localSummary(query, property, property.reason));
      }
    } catch (error) {
      setSummary(localSummary(query, property, property.reason));
      setToast("OpenRouter summary failed, showing fallback summary.");
    } finally {
      setSummaryLoading(false);
    }
  };

  const toggleCompare = (id) => {
    setCompareIds((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      if (current.length >= 2) {
        setToast("Compare mode supports two properties at a time.");
        return [current[1], id];
      }
      return [...current, id];
    });
  };

  const toggleShortlist = (id) => {
    setShortlistIds((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      setToast("Property saved to shortlist.");
      return [...current, id];
    });
  };

  const copyShareLink = async () => {
    const url = new URL(window.location.href);
    url.searchParams.set("q", query);
    url.searchParams.set("intent", tab);
    await navigator.clipboard?.writeText(url.toString());
    setToast("Shareable search link copied.");
  };

  const startVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setToast("Voice input is not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (event) => {
      const text = event.results?.[0]?.[0]?.transcript;
      if (text) setQuery(text);
    };
    recognition.start();
  };

  useEffect(() => {
    handleSummary(selectedRanked);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark"><Icon name="ScanSearch" size={20} /></div>
          <span>360Ghar AI</span>
        </div>
        <nav className="nav" aria-label="Primary">
          <span>Verified Properties</span>
          <span>360° Tours</span>
          <span>AI Matching</span>
          <span>Dedicated RM</span>
        </nav>
        <button className="secondary-button" onClick={() => setShowApi((value) => !value)}>
          <Icon name="KeyRound" /> API
        </button>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow"><Icon name="Sparkles" size={16} /> India's AI + VR Real Estate Platform</p>
          <h1>Describe your dream home. Let AI shortlist verified Gurgaon properties.</h1>
          <p>
            A polished intern-assignment prototype for natural language property search, ranked matches,
            360° tour signals, AI explanations, and buyer-friendly comparison.
          </p>
          <div className="hero-metrics">
            <div className="metric"><strong>{properties.length}</strong><span>realistic Gurgaon listings</span></div>
            <div className="metric"><strong>AI</strong><span>OpenRouter parsing + summary</span></div>
            <div className="metric"><strong>{properties.filter((item) => item.vr).length}</strong><span>VR-first shortlist options</span></div>
          </div>
        </div>
        <div className="hero-visual">
          <img src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=84" alt="Premium Gurgaon apartment interior" />
          <div className="tour-chip"><Icon name="BadgeCheck" /> Verified 360° walkthrough ready</div>
        </div>
      </section>

      <main className="main">
        <section className="search-panel" aria-label="AI property search">
          <div className="tabs">
            {["Rent", "Buy", "Sell"].map((item) => (
              <button key={item} className={`tab ${tab === item ? "active" : ""}`} onClick={() => setTab(item)}>
                <Icon name={item === "Rent" ? "Building2" : item === "Buy" ? "Home" : "Handshake"} size={16} /> {item}
              </button>
            ))}
          </div>
          <div className="search-row">
            <div className="query-box">
              <textarea
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="2BHK in Sector 50 under 80 lakhs, good sunlight, near school"
              />
              <button className={`icon-button mic-button ${listening ? "active" : ""}`} onClick={startVoice} title="Voice search">
                <Icon name={listening ? "AudioLines" : "Mic"} />
              </button>
            </div>
            <button className="primary-button" onClick={handleSearch} disabled={isParsing}>
              <Icon name={isParsing ? "LoaderCircle" : "Search"} /> {isParsing ? "Parsing..." : "Search"}
            </button>
            <button className="secondary-button" onClick={copyShareLink}>
              <Icon name="Link" /> Share
            </button>
          </div>
          <div className="quick-row">
            {quickQueries.map((item) => (
              <button key={item} className="chip" onClick={() => setQuery(item)}>
                <Icon name="WandSparkles" size={15} /> {item}
              </button>
            ))}
          </div>
          <div className="control-row">
            <label className="select-control">
              Sort by
              <select value={sortMode} onChange={(event) => setSortMode(event.target.value)}>
                <option value="match">Best AI match</option>
                <option value="price-low">Lowest price</option>
                <option value="commute">Best commute</option>
                <option value="sunlight">Best sunlight</option>
                <option value="vr">360 tour first</option>
              </select>
            </label>
            <button className={`toggle-pill ${vrOnly ? "active" : ""}`} onClick={() => setVrOnly((value) => !value)}>
              <Icon name="Rotate3D" size={15} /> 360 tour only
            </button>
            <span className="mini-chip">{ranked.length} matches</span>
            <span className="mini-chip good">{shortlistIds.length} saved</span>
          </div>
          {showApi && (
            <div className="api-drawer">
              <label>
                OpenRouter API key
                <input
                  type="password"
                  value={apiKey}
                  onChange={(event) => setApiKey(event.target.value)}
                  placeholder="sk-or-v1-..."
                />
              </label>
              <label>
                Free model
                <select value={model} onChange={(event) => setModel(event.target.value)}>
                  <option value="meta-llama/llama-3.3-70b-instruct:free">meta-llama/llama-3.3-70b-instruct:free</option>
                  <option value="google/gemma-3-27b-it:free">google/gemma-3-27b-it:free</option>
                  <option value="mistralai/mistral-7b-instruct:free">mistralai/mistral-7b-instruct:free</option>
                  <option value="meta-llama/llama-3-8b-instruct:free">meta-llama/llama-3-8b-instruct:free</option>
                </select>
              </label>
            </div>
          )}
        </section>

        <section className="status-strip">
          <div className="parsed-panel">
            <span className="mini-chip good"><Icon name="Brain" size={14} /> {source}</span>
            {parsed.bhk && <span className="mini-chip">{parsed.bhk}BHK</span>}
            {parsed.location && <span className="mini-chip">{parsed.location}</span>}
            {parsed.maxPriceLakhs && <span className="mini-chip">Under ₹{parsed.maxPriceLakhs}L</span>}
            {parsed.maxRentK && <span className="mini-chip">Under ₹{parsed.maxRentK}k rent</span>}
            {[...(parsed.amenities || []), ...(parsed.preferences || [])].slice(0, 6).map((item) => <span className="mini-chip blue" key={item}>{item}</span>)}
          </div>
          {parsed.followUpQuestion && <span className="mini-chip"><Icon name="MessageCircleQuestion" size={14} /> {parsed.followUpQuestion}</span>}
        </section>

        <section className="inventory-layout">
          <div>
            {ranked.length ? (
              <div className="cards-grid">
                {ranked.map((property) => (
                  <article key={property.id} className={`property-card ${compareIds.includes(property.id) ? "selected" : ""}`}>
                    <div className="thumb">
                      <img src={property.image} alt={`${property.title} property`} />
                      <div className="badge-row">
                        <span className="image-badge"><Icon name="BadgeCheck" size={14} /> Verified</span>
                        <span className="image-badge"><Icon name="Rotate3D" size={14} /> {property.vr ? "360° VR" : "RM Visit"}</span>
                      </div>
                      <div className="score-ring" style={{ "--score": `${property.score}%` }}><strong>{property.score}%</strong></div>
                    </div>
                    <div className="card-body">
                      <div className="card-title">
                        <h3>{property.bhk}BHK · {property.area.toLocaleString()} sq ft</h3>
                        <span className="price">{formatPrice(property)}</span>
                      </div>
                      <div className="location"><Icon name="MapPin" size={15} /> {property.sector} · {property.locality}</div>
                      <div className="details">
                        <div className="detail"><span>Type</span><strong>{property.type}</strong></div>
                        <div className="detail"><span>Commute</span><strong>{property.commute}/10</strong></div>
                        <div className="detail"><span>School</span><strong>{property.school.split(" ").slice(0, 2).join(" ")}</strong></div>
                        <div className="detail"><span>Sunlight</span><strong>{property.sunlight}/10</strong></div>
                        <div className="detail"><span>Move-in</span><strong>{property.possession || "Ready"}</strong></div>
                        <div className="detail"><span>RM</span><strong>{property.rm}</strong></div>
                      </div>
                      <div className="reason"><Icon name="Sparkle" size={15} /> {property.reason}</div>
                      <div className="card-actions">
                        <button className="primary-button" onClick={() => handleSummary(property)}><Icon name="FileText" /> Explain</button>
                        <button className="secondary-button" onClick={() => toggleCompare(property.id)}><Icon name="GitCompare" /> Compare</button>
                        <button className={`secondary-button ${shortlistIds.includes(property.id) ? "saved" : ""}`} onClick={() => toggleShortlist(property.id)}>
                          <Icon name={shortlistIds.includes(property.id) ? "BookmarkCheck" : "Bookmark"} /> Save
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty">No exact matches. Try relaxing the budget or choosing another Gurgaon sector.</div>
            )}
          </div>

          <aside className="side-panel">
            <section className="panel">
              <div className="panel-header">
                <h3>AI Market Lens</h3>
                <Icon name="Radar" />
              </div>
              <div className="panel-body">
                <div className="insight-grid">
                  <div className="insight"><span>Best pocket</span><strong>{marketInsights.bestSector}</strong></div>
                  <div className="insight"><span>Avg visible price</span><strong>{marketInsights.avgLabel}</strong></div>
                  <div className="insight"><span>Budget fit</span><strong>{marketInsights.budgetFit} homes</strong></div>
                  <div className="insight"><span>VR-ready</span><strong>{marketInsights.vrCount} homes</strong></div>
                </div>
                <div className="advisor-note">
                  <Icon name="Lightbulb" size={16} />
                  <span>{marketInsights.topReason}</span>
                </div>
              </div>
            </section>

            <section className="panel">
              <div className="panel-header">
                <h2>AI Match Summary</h2>
                <span className="mini-chip good">{selectedRanked.score}% match</span>
              </div>
              <div className="panel-body">
                <img className="selected-photo" src={selected.image} alt={`${selected.title} preview`} />
                <h3>{selected.title}</h3>
                <p className="location"><Icon name="MapPin" size={15} /> {selected.sector} · {formatPrice(selected)}</p>
                <div className="summary-box">
                  {summaryLoading ? (
                    <span className="summary-loading"><Icon name="LoaderCircle" /> Generating personalised summary...</span>
                  ) : (
                    summary || "Click Explain on any property to generate a personalised AI summary."
                  )}
                </div>
              </div>
            </section>

            <section className="panel">
              <div className="panel-header">
                <h3>Saved Shortlist</h3>
                <span className="mini-chip">{shortlistItems.length}</span>
              </div>
              <div className="panel-body similar-list">
                {shortlistItems.length ? shortlistItems.map((item) => (
                  <button key={item.id} className="similar-item" onClick={() => handleSummary({ ...item, ...scoreProperty(item, parsed, tab) })}>
                    <img src={item.image} alt="" />
                    <span><strong>{item.title}</strong><span>{item.sector} · {formatPrice(item)}</span></span>
                  </button>
                )) : <div className="empty">Save homes you like and use this as your Loom shortlist moment.</div>}
              </div>
            </section>

            <section className="panel">
              <div className="panel-header">
                <h3>Similar Verified Options</h3>
                <Icon name="Route" />
              </div>
              <div className="panel-body similar-list">
                {similar.map((item) => (
                  <button key={item.id} className="similar-item" onClick={() => handleSummary(item)}>
                    <img src={item.image} alt="" />
                    <span><strong>{item.bhk}BHK in {item.sector}</strong><span>{formatPrice(item)} · {item.score}% match</span></span>
                  </button>
                ))}
              </div>
            </section>

            <section className="panel">
              <div className="panel-header">
                <h3>Compare Shortlist</h3>
                <span className="mini-chip">{compareIds.length}/2</span>
              </div>
              <div className="panel-body">
                {compareItems.length < 2 ? (
                  <div className="compare-list">
                    {compareItems.map((item) => (
                      <div key={item.id} className="compare-item">
                        <Icon name="Home" />
                        <span><strong>{item.title}</strong><span>{item.sector}</span></span>
                      </div>
                    ))}
                    <div className="empty">Add two properties to unlock side-by-side comparison.</div>
                  </div>
                ) : (
                  <div className="compare-grid">
                    {["Price", "Area", "Commute", "School", "Tour"].map((label) => (
                      <React.Fragment key={label}>
                        {compareItems.map((item) => (
                          <div className="compare-cell" key={`${item.id}-${label}`}>
                            <span>{label} · {item.title}</span>
                            <strong>
                              {label === "Price" && formatPrice(item)}
                              {label === "Area" && `${item.area.toLocaleString()} sq ft`}
                              {label === "Commute" && `${item.commute}/10`}
                              {label === "School" && item.school}
                              {label === "Tour" && (item.vr ? "360° VR ready" : "RM inspected")}
                            </strong>
                          </div>
                        ))}
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </aside>
        </section>
      </main>

      <footer className="footer">
        Built as a standalone React prototype for the 360Ghar Software Developer Intern assignment. Uses mock data, OpenRouter-ready LLM calls, and a local fallback for demo reliability.
      </footer>
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
