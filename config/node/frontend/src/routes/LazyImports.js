import {lazy} from 'react';

export const Home = lazy(() => import('../pages/Home'));
export const About = lazy(() => import('../pages/About'));
export const Map = lazy(() => import('../components/MapComponent'));
export const Services = lazy(() => import('../pages/Services'));
export const ManageData = lazy(() => import('../pages/ManageData'));
export const ListOfPrzychodnie = lazy(() => import('../pages/ListOfPrzychodnie'));
export const NewPrzychodnia = lazy(() => import('../pages/NewPrzychodnia'));
export const NewLekarz = lazy(() => import('../pages/NewLekarz'));
export const NewPacjent = lazy(() => import('../pages/NewPacjent'));
export const ListOfPacjenci = lazy(() => import('../pages/ListOfPacjenci'));  // DODAJ
export const ListOfLekarze = lazy(() => import('../pages/ListOfLekarze'));    // DODAJ