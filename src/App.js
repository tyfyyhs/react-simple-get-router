import './App.css';
import GetRouter, { GetRouterGoPage } from './GetRouter';
import A from './pages/A';
import B from './pages/B';
import C from './pages/C';

function App() {
    const cyrb53 = function(str,hash) {
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
}

export default App;
