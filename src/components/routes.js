import Loadable from './Loadable';

const ColorPicker = Loadable({
    loader: () => import(/* webpackChunkName: "colorPicker" */ './ColorPicker'),
});

const routes = [
    {
        path: '/',
        component: ColorPicker,
        key: 'ColorPicker'
    }
];

export default routes;
