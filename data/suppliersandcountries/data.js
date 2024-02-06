const suppliersData = [
  { label: "AAB Sports", value: "AAB Sports" },
  {
    label: "Abbott, Stracke and O'Conner",
    value: "Abbott, Stracke and O'Conner",
  },
  { label: "Adnams & Broker", value: "Adnams & Broker" },
  { label: "Arakeen Sourcing Agents", value: "Arakeen Sourcing Agents" },
  { label: "Arctic Knits", value: "Arctic Knits" },
  { label: "Armadillo", value: "Armadillo" },
  { label: "Awake Fashions", value: "Awake Fashions" },
  { label: "Bahringer - Cartwright", value: "Bahringer - Cartwright" },
  { label: "Bailey LLC", value: "Bailey LLC" },
  { label: "Becker LLC", value: "Becker LLC" },
  { label: "Bergnaum - Kunde", value: "Bergnaum - Kunde" },
  { label: "Bergnaum - White", value: "Bergnaum - White" },
  { label: "Bits n Bobs Ltd", value: "Bits n Bobs Ltd" },
  {
    label: "Black & White Accessories Ltd",
    value: "Black & White Accessories Ltd",
  },
  { label: "Borer, D'Amore and Casper", value: "Borer, D'Amore and Casper" },
  { label: "Brakus LLC", value: "Brakus LLC" },
  { label: "Breeze Formals", value: "Breeze Formals" },
  { label: "Carter-Hansen", value: "Carter-Hansen" },
  { label: "Cartwright LLC", value: "Cartwright LLC" },
  { label: "Conway Co.", value: "Conway Co." },
  { label: "CSAT", value: "CSAT" },
  { label: "Cummings Group", value: "Cummings Group" },
  { label: "Daugherty-Kohler", value: "Daugherty-Kohler" },
  { label: "Dibbert Co HK", value: "Dibbert Co HK" },
  { label: "Doge & Co.", value: "Doge & Co." },
  { label: "Dooley - Witting", value: "Dooley - Witting" },
  { label: "Douglas, Mayer and Conn", value: "Douglas, Mayer and Conn" },
  { label: "EasterEgg Tops", value: "EasterEgg Tops" },
  { label: "EcoSwimwear Co", value: "EcoSwimwear Co" },
  { label: "Edgar & Chase Ltd", value: "Edgar & Chase Ltd" },
  { label: "Effertz Group", value: "Effertz Group" },
  { label: "Emmerich Group", value: "Emmerich Group" },
  { label: "Evergreen Fashions", value: "Evergreen Fashions" },
  { label: "Fashion Basics Hong Kong", value: "Fashion Basics Hong Kong" },
  { label: "Feil Inc", value: "Feil Inc" },
  { label: "Fisher & Glover", value: "Fisher & Glover" },
  { label: "Funghli SPA", value: "Funghli SPA" },
  { label: "Funky Fashions", value: "Funky Fashions" },
  { label: "Goyette", value: "Goyette" },
  { label: "Greenholt", value: "Greenholt" },
  { label: "Greenholt - Larson", value: "Greenholt - Larson" },
  { label: "Greenwich Nightwear", value: "Greenwich Nightwear" },
  { label: "Gymfish", value: "Gymfish" },
  { label: "Hamill & Jay", value: "Hamill & Jay" },
  { label: "Herman - Swift", value: "Herman - Swift" },
  { label: "Hills Boehm", value: "Hills Boehm" },
  { label: "Hudson, Block and Muller", value: "Hudson, Block and Muller" },
  { label: "Hyatt - Harris", value: "Hyatt - Harris" },
  { label: "Jones - Rogahn", value: "Jones - Rogahn" },
  { label: "Jones-Grimes", value: "Jones-Grimes" },
  { label: "Just Right Fit Co. Ltd", value: "Just Right Fit Co. Ltd" },
  { label: "Just Socks Ltd", value: "Just Socks Ltd" },
  { label: "Keebler, Hoppe and Hickle", value: "Keebler, Hoppe and Hickle" },
  { label: "Keeling Fashions Co.", value: "Keeling Fashions Co." },
  { label: "Kerluke - Wuckert", value: "Kerluke - Wuckert" },
  { label: "Kessler - Wolf", value: "Kessler - Wolf" },
  { label: "Kessler and Sons", value: "Kessler and Sons" },
  { label: "King Fey Co. Ltd", value: "King Fey Co. Ltd" },
  { label: "Klauss & Villenueve", value: "Klauss & Villenueve" },
  { label: "Kohler Inc", value: "Kohler Inc" },
  { label: "Kunze LLC", value: "Kunze LLC" },
  { label: "Kunze Ltd", value: "Kunze Ltd" },
  { label: "Langosh and Sons", value: "Langosh and Sons" },
  {
    label: "Larsonn Small Leather Goods & Accessories",
    value: "Larsonn Small Leather Goods & Accessories",
  },
  {
    label: "Legros, Corkery and Swaniawski",
    value: "Legros, Corkery and Swaniawski",
  },
  { label: "Lessvelo", value: "Lessvelo" },
  { label: "Littel-Schaefer", value: "Littel-Schaefer" },
  {
    label: "MacGyver, Beatty and Hermiston",
    value: "MacGyver, Beatty and Hermiston",
  },
  { label: "Maggio - McGlynn", value: "Maggio - McGlynn" },
  { label: "Marvin - Veum", value: "Marvin - Veum" },
  { label: "Maxwell Ltd", value: "Maxwell Ltd" },
  { label: "McDermott Hilll", value: "McDermott Hilll" },
  { label: "Meridian Lingerie", value: "Meridian Lingerie" },
  { label: "Milan Denim Fashions SPA", value: "Milan Denim Fashions SPA" },
  { label: "Miller & Frank Ltd", value: "Miller & Frank Ltd" },
  { label: "Miller Scott Ltd", value: "Miller Scott Ltd" },
  { label: "Mohr & Olsen Ltd", value: "Mohr & Olsen Ltd" },
  {
    label: "Moriath Lingerie & Underwear",
    value: "Moriath Lingerie & Underwear",
  },
  { label: "Morissette Group", value: "Morissette Group" },
  { label: "Nader LLC", value: "Nader LLC" },
  { label: "Neverwinter Fashions", value: "Neverwinter Fashions" },
  { label: "Nienow Inc", value: "Nienow Inc" },
  { label: "NYC Top Star Socks", value: "NYC Top Star Socks" },
  { label: "O'Connell LLC", value: "O'Connell LLC" },
  { label: "Octavarium LLC", value: "Octavarium LLC" },
  { label: "Ondricka and Sons", value: "Ondricka and Sons" },
  { label: "Orn - Pollich", value: "Orn - Pollich" },
  { label: "Parker, Barton and Boyle", value: "Parker, Barton and Boyle" },
  { label: "Parsons Green Gifts", value: "Parsons Green Gifts" },
  { label: "Party People", value: "Party People" },
  { label: "Pfeffer Sportswear", value: "Pfeffer Sportswear" },
  { label: "Poolside Apparel Co", value: "Poolside Apparel Co" },
  { label: "Pouros Group", value: "Pouros Group" },
  { label: "Ralpha", value: "Ralpha" },
  { label: "Redhit & Davis Ltd", value: "Redhit & Davis Ltd" },
  { label: "Reynolds, Beatty and Bayer", value: "Reynolds, Beatty and Bayer" },
  { label: "Rogain Fashions", value: "Rogain Fashions" },
  { label: "Rogan Ltd", value: "Rogan Ltd" },
  { label: "Rolfson-Toy", value: "Rolfson-Toy" },
  { label: "Roob - Marvin", value: "Roob - Marvin" },
  { label: "Russel LLC", value: "Russel LLC" },
  { label: "Rutherford - Koch", value: "Rutherford - Koch" },
  { label: "Rutherford Group", value: "Rutherford Group" },
  { label: "Saur Formalwear", value: "Saur Formalwear" },
  {
    label: "Schimmel, Sipes and Hettinger",
    value: "Schimmel, Sipes and Hettinger",
  },
  { label: "Schneider LLC", value: "Schneider LLC" },
  { label: "Smith Morissette Ltd", value: "Smith Morissette Ltd" },
  {
    label: "Socks, Socks & More Socks Co.",
    value: "Socks, Socks & More Socks Co.",
  },
  { label: "Stark Winters", value: "Stark Winters" },
  { label: "Strosin and Sons", value: "Strosin and Sons" },
  { label: "Sun & Sea Ltd", value: "Sun & Sea Ltd" },
  { label: "Swim Sun & Sea Ltd", value: "Swim Sun & Sea Ltd" },
  { label: "Tau Blanda", value: "Tau Blanda" },
  { label: "Terry-Tillman Ltd", value: "Terry-Tillman Ltd" },
  { label: "The Good Cashmere Company", value: "The Good Cashmere Company" },
  { label: "Thompson & Sons", value: "Thompson & Sons" },
  { label: "Thompson Inc", value: "Thompson Inc" },
  { label: "Top Star Denim Ltd", value: "Top Star Denim Ltd" },
  { label: "Top Star Fashion London", value: "Top Star Fashion London" },
  { label: "Toy Durgan", value: "Toy Durgan" },
  { label: "Tropic Wovens", value: "Tropic Wovens" },
  { label: "T-Shirts R Us", value: "T-Shirts R Us" },
  { label: "Walsh Weimann", value: "Walsh Weimann" },
  { label: "Ward, Schuster and Stehr", value: "Ward, Schuster and Stehr" },
  { label: "Waterdeep Hong Kong", value: "Waterdeep Hong Kong" },
  { label: "West - Dare", value: "West - Dare" },
  { label: "William Corona", value: "William Corona" },
  { label: "Winstar Top Fashion Co.", value: "Winstar Top Fashion Co." },
  { label: "Worldwide Denim Hong Kong", value: "Worldwide Denim Hong Kong" },
  { label: "Yundt - Spinka", value: "Yundt - Spinka" },
  { label: "Yundt Group", value: "Yundt Group" },
  { label: "Yundt Sportswear", value: "Yundt Sportswear" },
];

const countriesData = [
  { label: "United Kingdom", value: "United Kingdom" },
  { label: "India", value: "India" },
  { label: "China", value: "China" },
  { label: "Bangladesh", value: "Bangladesh" },
  { label: "United States of America", value: "United States of America" },
  { label: "Germany", value: "Germany" },
  { label: "Turkey", value: "Turkey" },
  { label: "Hong Kong", value: "Hong Kong" },
  { label: "Italy", value: "Italy" },
  { label: "Vietnam", value: "Vietnam" },
  { label: "Myanmar", value: "Myanmar" },
  { label: "Thailand", value: "Thailand" },
  { label: "Poland", value: "Poland" },
  { label: "Mauritius", value: "Mauritius" },
  { label: "Israel", value: "Israel" },
  { label: "Pakistan", value: "Pakistan" },
  { label: "Japan", value: "Japan" },
];
const deparmentsData = [
  {
    value: "Accessories",
    label: "Accessories",
  },
  {
    value: "Casual Shirts & Blouses",
    label: "Casual Shirts & Blouses",
  },
  {
    value: "Casual Trousers",
    label: "Casual Trousers",
  },
  {
    value: "Coats & Jackets",
    label: "Coats & Jackets",
  },
  {
    value: "Denim",
    label: "Denim",
  },
  {
    value: "Footwear",
    label: "Footwear",
  },
  {
    value: "Formal Shirts & Blouses",
    label: "Formal Shirts & Blouses",
  },
  {
    value: "Formalwear",
    label: "Formalwear",
  },
  {
    value: "Hoodies & Jersey",
    label: "Hoodies & Jersey",
  },
  {
    value: "Indoor Footwear",
    label: "Indoor Footwear",
  },
  {
    value: "Knitwear",
    label: "Knitwear",
  },
  {
    value: "Non-Denim Bottoms",
    label: "Non-Denim Bottoms",
  },
  {
    value: "Novelty & Gifting",
    label: "Novelty & Gifting",
  },
  {
    value: "Pyjamas",
    label: "Pyjamas",
  },
  {
    value: "Shorts & Skirts",
    label: "Shorts & Skirts",
  },
  {
    value: "Signature I",
    label: "Signature I",
  },
  {
    value: "Signature II",
    label: "Signature II",
  },
  {
    value: "Socks",
    label: "Socks",
  },
  {
    value: "Special Orders",
    label: "Special Orders",
  },
  {
    value: "Sports Bottoms",
    label: "Sports Bottoms",
  },
  {
    value: "Sports Sets",
    label: "Sports Sets",
  },
  {
    value: "Sports Tops",
    label: "Sports Tops",
  },
  {
    value: "Swimwear",
    label: "Swimwear",
  },
  {
    value: "T-Shirts",
    label: "T-Shirts",
  },
  {
    value: "Underwear & Lingerie",
    label: "Underwear & Lingerie",
  },
  {
    value: "Workwear",
    label: "Workwear",
  },
];

const materialsArray = [
  { label: "Acetate", value: "Acetate" },
  { label: "Acrylic", value: "Acrylic" },
  { label: "Conventional Cashmere", value: "Conventional Cashmere" },
  { label: "Conventional Cotton", value: "Conventional Cotton" },
  { label: "Conventional Nylon", value: "Conventional Nylon" },
  { label: "Conventional Polyester", value: "Conventional Polyester" },
  {
    label: "Conventional Rayon & Viscose",
    value: "Conventional Rayon & Viscose",
  },
  { label: "Conventional Wool", value: "Conventional Wool" },
  { label: "Down", value: "Down" },
  { label: "Elastane, Spandex & Lycra", value: "Elastane, Spandex & Lycra" },
  { label: "Leather & Suede", value: "Leather & Suede" },
  { label: "Linen", value: "Linen" },
  { label: "Neoprene", value: "Neoprene" },
  { label: "Other", value: "Other" },
  { label: "Polyurethane", value: "Polyurethane" },
  { label: "PVC", value: "PVC" },
  { label: "Silk", value: "Silk" },
  { label: "Thermoplastics", value: "Thermoplastics" },
  { label: "Better Cotton", value: "Better Cotton" },
  { label: "Downpass Down", value: "Downpass Down" },
  { label: "EcoVero Viscose", value: "EcoVero Viscose" },
  { label: "Good Cashmere", value: "Good Cashmere" },
  {
    label: "LWG Bronze Certified Leather",
    value: "LWG Bronze Certified Leather",
  },
  { label: "LWG Gold Certified Leather", value: "LWG Gold Certified Leather" },
  {
    label: "LWG Silver Certified Leather",
    value: "LWG Silver Certified Leather",
  },
  { label: "Naia™ Viscose", value: "Naia™ Viscose" },
  { label: "Organic Cotton", value: "Organic Cotton" },
  { label: "Organic Wool", value: "Organic Wool" },
  { label: "RDS Down", value: "RDS Down" },
  { label: "Recycled Cashmere", value: "Recycled Cashmere" },
  { label: "Recycled Cotton", value: "Recycled Cotton" },
  { label: "Recycled Nylon", value: "Recycled Nylon" },
  { label: "Recycled Polyester", value: "Recycled Polyester" },
  { label: "Recycled Wool", value: "Recycled Wool" },
  { label: "RWS Wool", value: "RWS Wool" },
  { label: "TENCEL™ Lyocell", value: "TENCEL™ Lyocell" },
  { label: "TENCEL™ Lyocell Filament", value: "TENCEL™ Lyocell Filament" },
  { label: "TENCEL™ Modal", value: "TENCEL™ Modal" },
];
let sortedMaterialArray = materialsArray.sort((a, b) =>
  a.value > b.value ? 1 : -1
);
let sortedDeparmentsData = deparmentsData.sort((a, b) =>
  a.value > b.value ? 1 : -1
);
let sortedCountriesData = countriesData.sort((a, b) =>
  a.value > b.value ? 1 : -1
);
let sortedSuppliersData = suppliersData.sort((a, b) =>
  a.value > b.value ? 1 : -1
);
export {
  sortedSuppliersData,
  sortedMaterialArray,
  sortedCountriesData,
  sortedDeparmentsData,
};