import { Link } from "react-router-dom";
import { Building2, LayoutDashboard, MapPinHouse, Users } from "lucide-react";
import FloorPlan from "../assets/icons/FloorPlan";
export const menuItems = [
  {
    key: '/',
    icon: <LayoutDashboard size={16} strokeWidth={1.5} />,
    label: <Link to={'/'} >Dashboard</Link>,
  },
  {
    key: '/clients',
    icon: <Users size={16} strokeWidth={1.5} />,
    label: <Link to={'/clients'} >Mijozlar</Link>,
  },
  {
    key: '/buildings',
    icon: <Building2 size={16} strokeWidth={1.5} />,
    label: <Link to={'/buildings'} >Buildings</Link>,
  },
  {
    key: '/locations',
    icon: <MapPinHouse size={16} strokeWidth={1.5} />,
    label: <Link to={'/locations'} >Locations</Link>,
  },
  {
    key: '/floor',
    icon: <FloorPlan />,
    label: <Link to={'/floor'}>Floor</Link>
  }
]