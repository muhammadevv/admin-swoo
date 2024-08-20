

export const categoriesList = '/categorys'
export const categoriesPost = '/categorys'
export const categoriesPatch = (id) => `/categorys/${id}`
export const categoriesDelete = (id) => `/categorys/${id}`


// Brands    
export const brandsList = '/brands'
export const brandsPost = '/brands'
export const brandsPatch = (id) => `/brands/${id}`
export const brandsDelete = (id) => `/brands/${id}`


// Products
export const productsList = '/products'
export const productsPost = '/products'
export const productsPatch = (id) => `/products/${id}`
export const productsDelete = (id) => `/products/${id}`

//Banner
export const bannerList = '/banner'
export const bannerPost = '/banner'
export const bannerPatch = (id) => `/banner/${id}`
export const bannerDelete = (id) => `/banner/${id}`

















//Buildings
export const buildingsList = '/buildings/admin_ceo'
export const buildingsGet = (item) => `/buildings/admin_ceo/${item.username}`;
export const buildingsPost = (item) => `/buildings/admin_ceo/create/${item.username}`;
export const buildingsPatch = (item) => `/buildings/admin_ceo/${item.id}/update/${item.username}`;
export const buildingsDelete = (item) => `/buildings/admin_ceo/${item.id}/delete/${item.username}`;

//Clients
export const clientsList = `/clients/admin_ceo`;
export const clientsGet = (item) => `/clients/${item.username}`;
export const clientsPost = (item) => `/clients/create/${item.username}`;
export const clientsPatch = (item) => `/clients/${item.id}/update/${item.username}`;
export const clientsDelete = (item) => `/clients/${item.id}/delete/${item.username}`;

//Floor  
export const floorList = `/floor/admin_ceo`;
export const floorGet = (item) => `/floor/${item.username}`;
export const floorPost = (item) => `/floor/create/${item.username}`;
export const floorPatch = (item) => `/floor/${item.id}/update/${item.username}`;
export const floorDelete = (item) => `/floor/${item.id}/delete/${item.username}`;

// Home 
export const homeList = `/home/admin_ceo`;
export const homeGet = (item) => `/home/${item.username}`;
export const homePost = (item) => `/home/create/${item.username}`;
export const homePatch = (item) => `/home/${item.id}/update/${item.username}`;
export const homeDelete = (item) => `/home/${item.id}/delete/${item.username}`;

// Locations
export const locationsList = '/locations/admin_ceo';
export const locationsGet = (item) => `/locations/`;
export const locationsPost = (item) => `/locations/create/${item.username}`;
export const locationsPatch = (item) => `/locations/${item.id}/update/${item.username}`;
export const locationsDelete = (item) => `/locations/${item.id}/delete/${item.username}`;

//Filter
export const filter = (item) => `/filter/${item}`;

//Month-minus
export const monthMinus = (id) => `/month-minus/${id}`

//Contract-generate
export const contractGenerate = (id) => `/contract-generate/${id}`