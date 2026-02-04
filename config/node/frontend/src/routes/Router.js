import {createHashRouter} from "react-router-dom";
import {
    Home,
    About,
    Map,
    Services,
    ManageData,
    ListOfPrzychodnie,
    NewPrzychodnia,
    NewLekarz,
    NewPacjent,
    ListOfPacjenci,
    ListOfLekarze
} from "./LazyImports";

const routes = createHashRouter([
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/about',
        element: <About/>
    },
    {
        path: '/map',
        element: <Map/>
    },
    {
        path: '/services',
        element: <Services/>
    },
    {
        path: '/manage',
        element: <ManageData/>
    },
    {
        path: '/przychodnie',
        element: <ListOfPrzychodnie/>
    },
    {
        path: '/newprzychodnia',
        element: <NewPrzychodnia/>
    },
    {
        path: '/lekarze',
        element: <ListOfLekarze/>
    },
    {
        path: '/newlekarz',
        element: <NewLekarz/>
    },
    {
        path: '/pacjenci',
        element: <ListOfPacjenci/>
    },
    {
        path: '/newpacjent',
        element: <NewPacjent/>
    },
    {
        path: '*',
        element: <div>404</div>
    }
]);

export default routes;