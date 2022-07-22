import React, { FC, ReactNode, useMemo } from "react";
import idl from "./idl.json";
import Sidebar from "./components/Sidebar/Sidebar";
import Context from "./components/Context/Context";
import Feed from "./components/Feed/Feed";

console.log(idl);

require("./App.css");
require("@solana/wallet-adapter-react-ui/styles.css");

const App: FC = () => {
    return (
        <div>
            <Context>
                < div className="app" style={{display:"flex", justifyContent:"center"}}>
                    {/* <Sidebar /> */}
                    <Feed />

                </div>
            </Context>
        </div>
    );
};
export default App;