import {HashRouter} from 'react-router-dom';
import {Home, About, Map, Services, ListOfItems} from './LazyImports';


const routes = HashRouter(
    [
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
            path: '/list',
            element: <ListOfItems/>
        },



        {
            path: '*',
            element: <div>404</div>
        }
    ]
)

export default routes;