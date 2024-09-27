
//Buildings
export const buildingsList = '/buildings/admin_ceo'
export const buildingsPost = '/buildings/create/admin_ceo';
export const buildingsPut = (id) => `/buildings/${id}/update/admin_ceo`;
export const buildingsDelete = (id) => `/buildings/${id}/delete/admin_ceo`;

//Cakes
export const cakeList = `/cakes`;
export const cakePost = `/postcakes`;
export const cakeDelete = (id) => `/cakedelete/${id}`;


export const clientsList = `/clients/admin_ceo`;
export const clientsGet = (item) => `/clients/${item.username}`;
export const clientsPost = (item) => `/clients/create/${item.username}`;
export const clientsPatch = (item) => `/clients/${item.id}/update/${item.username}`;
export const clientsDelete = (item) => `/clients/${item.id}/delete/${item.username}`;

//Floor  
export const floorList = `/floor/admin_ceo`;
export const floorPost = `/floor/create/admin_ceo`;
export const floorPatch = (item) => `/floor/${item.id}/update/${item.username}`;
export const floorDelete = (item) => `/floor/${item.id}/delete/${item.username}`;

// Home 
export const homeList = `/home/admin_ceo`;
export const homePost = `/home/create/admin_ceo`;
export const homePut = (id) => `/home/${id}/update/admin_ceo`;
export const homeDelete = (id) => `/home/${id}/delete/admin_ceo`;


//Users
export const usersList = '/auth/user'


//Filter
export const filter = (item) => `/filter/${item}`;

//Month-minus
export const monthMinus = (id) => `/month-minus/${id}`

//Contract-generate
export const contractGenerate = (id) => `/contract-generate/${id}`
















//Buildings
// export const buildingsList = '/buildings'
// export const buildingsPost = '/buildings';
// export const buildingsPut = (id) => `/buildings/${id}`;
// export const buildingsPatch = (id) => `/buildings/${id}`;
// export const buildingsDelete = (id) => `/buildings/${id}`;

//Clients
// export const clientsList = '/clients';
// export const clientsPost = '/clients';
// export const clientsPut = (id) => `/clients/${id}`;
// export const clientsPatch = (id) => `/clients/${id}`;
// export const clientsDelete = (id) => `/clients/${id}`;

//Floor  
// export const floorList = `/floor`;
// export const floorPost =  '/floor';
// export const floorPut = (id) => `/floor/${id}`;
// export const floorPatch = (id) => `/floor/${id}`;
// export const floorDelete = (id) => `/floor/${id}`;

// Home 
// export const homeList = '/home';
// export const homePost = '/home';
// export const homePut = (id) => `/home/${id}`;
// export const homePatch = (id) => `/home/${id}`;
// export const homeDelete = (id) => `/home/${id}`;

// Locations
// export const locationsList = '/locations';
// export const locationsPost = `/locations`;
// export const locationsPut = (id) => `/locations/${id}`;
// export const locationsPatch = (id) => `/locations/${id}`;
// export const locationsDelete = (id) => `/locations/${id}`;

//Filter
// export const filter = (id) => `/filter/${id}`;

//Month-minus
// export const monthMinus = (id) => `/month-minus/${id}`

//Contract-generate
// export const contractGenerate = (id) => `/contract-generate/${id}`


const client = {
  advance_term: 210000000,
  building: 4,
  building_name: "1 - Bino",
  count_month: "216",
  created: "2024-08-16T05:24:24.169483Z",
  fish: "Azizbek Egamovv",
  floor: 4,
  floor_name: "126 - qavat",
  home: 2,
  home_name: "125 - uy",
  id: 2,
  location: 3,
  location_name: "Xiva shahri",
  oylik_tolov: "393518.52",
  passport: "AA 11111111",
  price_home: "295000000",
  residual: "85000000",
  status: "2",
  status_display: "Sotib oldi",
  telefon: 998972023011,
  term: 18,
  term_display: "18 yil",
}