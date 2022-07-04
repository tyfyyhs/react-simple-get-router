# react-simple-get-router
Get 파라메터를 이용하여 페이지를 변경하는 간단하고 단순한 리액트 라우터입니다.

페이지 변경 기능 이외에 다른 기능은 없습니다.

## 개발목적
브라우저를 지원하는 다양한 기기에서 특정 화면만을 요청하는 경우,또는 특정 홈페이지 안에서 다른 홈페이지를 iframe, embeded로 불러오는 경우를 위하여 개발하였습니다.

## 사용 방법
다음과 같이 이용합니다.

```javascript
    import './App.css';
    import GetRouter, { GetRouterGoPage } from './GetRouter';
    import A from './pages/A';
    import B from './pages/B';
    import C from './pages/C';

    function App() {
    return (
        <>  
            <button onClick={()=>{GetRouterGoPage("A")}}>A</button>
            <button onClick={()=>{GetRouterGoPage("B")}}>B</button>
            <button onClick={()=>{GetRouterGoPage("C")}}>C</button>
            <GetRouter pageKey="pages"
                default={()=>(<>위의 버튼을 클릭하여 페이지 전환</>)}
                A={()=>(<A></A>)}
                B={()=>(<B></B>)}
                C={()=>(<C></C>)}
            />
        </>
    );
    }
    export default App;
```
|props|설명|
|---|---|
|**props.pageKey**|라우터 지정에 사용될 파라메터의 키를 지정합니다. 만약 입력하지 않을 시 **pageName**키가 디폴트로 사용됩니다.|
|**props.default**|라우터의 첫 페이지입니다.|
|**이외 다른 props**|아래의 예시와 같이 **props.pageKey**의 값으로 사용됩니다.|

```
http://localhost:3000/?pageName=A
```

## 보안
아래 예시의 C는 매 접속시마다 페이지네임을 재설정하므로 외부에서 페이지를 요청할 수 없도록 하는 것이 가능합니다.

```javascript
    const cyrb53 = function(str) {
        let h1 = 0xdeadbeef ^ new Date().getTime(), h2 = 0x41c6ce57 ^ new Date().getTime();
        for (let i = 0, ch; i < str.length; i++) {
            ch = str.charCodeAt(i);
            h1 = Math.imul(h1 ^ ch, 2654435761);
            h2 = Math.imul(h2 ^ ch, 1597334677);
        }
        h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
        h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
        return (4294967296 * (2097151 & h2) + (h1>>>0)).toString(32);
        };
    const encryptC = cyrb53("C")
    const pages ={
            A:()=>(<A/>),
            B:()=>(<B/>),
        }
    pages[encryptC]=()=>(<C/>)
    return (
        <>  
            <button onClick={()=>{GetRouterGoPage("A")}}>A</button>
            <button onClick={()=>{GetRouterGoPage("B")}}>B</button>
            <button onClick={()=>{GetRouterGoPage(encryptC)}}>C</button>
            <GetRouter 
                pageKey="pages"
                default={()=>(<>위의 버튼을 클릭하여 페이지 전환</>)}
                {...pages}
            />
        </>
    );
```

## 이외
본 프로젝트는 유지관리하지 않습니다.

