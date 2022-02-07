import { RouteComponentProps, useLocation } from "react-router-dom";
import { Header } from "../../components";

interface WebViewSceneRouteParams {
    url: string
}


export const WebViewScene: React.FC<RouteComponentProps<WebViewSceneRouteParams>> = () => {
    let { state } = useLocation<WebViewSceneRouteParams>();
    return <>
        <Header
            title={''}
            canGoBack={true}
        />
        <iframe
            src={state.url}
            style={{ position: 'absolute', top: 72, width: '100%', height: '100%', overflowY: 'hidden' }}
        /> 

    </>

}




