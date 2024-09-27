import { Link } from "react-router-dom";
import { Cake, LayoutDashboard, MapPinHouse, Users } from "lucide-react";
export const menuItems = [
  {
    key: '/',
    icon: <LayoutDashboard size={16} strokeWidth={1.5} />,
    label: <Link to={'/'} >Dashboard</Link>,
  },
  {
    key: '/users',
    icon: <Users size={16} strokeWidth={1.5} />,
    label: <Link to={'/users'} >Users</Link>,
  },
  {
    key: '/cakes',
    icon: <Cake size={16} strokeWidth={1.5} />,
    label: <Link to={'/cakes'} >Cakes</Link>,
  },
  {
    key: '/collections',
    icon: <MapPinHouse size={16} strokeWidth={1.5} />,
    label: <Link to={'/collections'} >Collections</Link>,
  },
  {
    key: '/orders',
    icon: <MapPinHouse size={16} strokeWidth={1.5} />,
    label: <Link to={'/orders'} >orders</Link>,
  },

]