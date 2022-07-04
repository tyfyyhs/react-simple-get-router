import React from 'react';
const queryString = require('query-string');

export default function GetRouter(props){
    const [pageLoad,setPageLoad] = React.useState(false);
    const [param,setParam] = React.useState({});
    const [pageName,setPageName] = React.useState('default');
    const getParamKey = props.pageKey ||"pageName";
    
    // 뒤로가기 이벤트 발생 시 get파라메터 변경
    const pagePop=React.useCallback(()=>{
        let param = queryString.parse(window.location.search);
        setPageLoad({pageLoad:false})
        setTimeout(() => {
            setPageLoad({pageLoad:true})
            setPageName(param[getParamKey])
        }, 5);
    },[getParamKey])

    /**
     * 파라메터를 업데이트한다.
     * @param {*} uri 보존하여야 하는 URL
     * @param {*} key 업데이트 할 GET 파라메터 키
     * @param {*} value 업데이트 할 GET 파라메터 값
     * @returns 
     */
    const Update=(uri, key, value)=>{
        var i = uri.indexOf('#');
        var hash = i === -1 ? ''  : uri.substr(i);
        uri = i === -1 ? uri : uri.substr(0, i);
        var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        var separator = uri.indexOf('?') !== -1 ? "&" : "?";
        if (!value) {
            uri = uri.replace(new RegExp("([?&]?)" + key + "=[^&]*", "i"), '');
            if (uri.slice(-1) === '?') {
                uri = uri.slice(0, -1);
            }
            if (uri.indexOf('?') === -1) uri = uri.replace(/&/, '?');
        } else if (uri.match(re)) {
            uri = uri.replace(re, '$1' + key + "=" + value + '$2');
        } else {
            uri = uri + separator + key + "=" + value;
        }
        return uri + hash;
    }

    React.useEffect(()=>{
        setPageLoad(false)
        let param = queryString.parse(window.location.search);
        setParam(param)
        if(param[getParamKey]!==undefined){
            setPageName(param[getParamKey])
        } else {
            setPageName('default')
        }
        setTimeout(() => {
            setPageLoad({pageLoad:true})
        }, 500);
        //뒤로가기 이벤트를 캐치하여 GET파라메터를 변경한다.
        window.onpopstate = pagePop.bind(this);
        // 윈도우 객체에 라우터를 저장한다.
        window.GetRouter=(e,param)=>{
            let pageName=e
            //페이지 이동 시 특정 GET 파라메터를 제거하여야 하는 경우 아래와 같이 이용
            if(param["disease"]!==undefined){
                window.history.pushState("","",Update(Update(window.location.href,"disease",param["disease"]),getParamKey,pageName))
            } else{
                window.history.pushState("","",Update(Update(window.location.href,"disease",null),getParamKey,pageName))
            }

            setPageLoad(false)
            setPageName(pageName)
            setTimeout(() => {
                setPageLoad({pageLoad:true})
            }, 300);
        };
    },[getParamKey,pagePop])


    return (
        <> 
            <style dangerouslySetInnerHTML={{__html:" @-webkit-keyframes GetRoutePageLoad {from {opacity:0} to {opacity:1}}  @keyframes GetRoutePageLoad {from {opacity:0}to {opacity:1}}  .GetRoutePageLoad{opacity:0;animation-duration: 400ms;animation-name: GetRoutePageLoad;animation-iteration-count: 1;animation-direction: alternate;animation-fill-mode: forwards;}.contentLoad{opacity:0;animation-duration: 400ms;animation-name: GetRoutePageLoad;animation-iteration-count: 1;animation-direction: alternate;animation-fill-mode: forwards;} .GetRoutecontentHide{opacity:0;}"}}/>
            <div className={pageLoad?"GetRoutePageLoad":"GetRoutecontentHide"}>
                {props[pageName] === undefined?
                    <>
                        {param[getParamKey]=== undefined?
                            props['default']
                            :
                            window.location.replace("404")
                        }
                    </>
                :
                props[pageName]()
                }
            </div>
        </>
    )
}
/**
 * 페이지 변경 함수. GET 파라메터를 변경하여 페이지를 변경한다.
 * @param {*} pageName 변경할 페이지 이름
 * @param {Object} param URL에 추가할 GET 파라메터
 */
export function GetRouterGoPage(pageName,param){
    param = param||""
    window.GetRouter(pageName,param)
    setTimeout(() => {
        document.querySelector("#verifyContent").scrollTo(0,0)
    }, 250);
}

