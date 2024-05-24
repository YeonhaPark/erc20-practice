import { ethers } from "ethers";
import { useState } from "react";
const App = () => {
  const [signer, setSigner] = useState();
  const onClickMetamask = async () => {
    try {
      if (!window.ethereum) return;

      const provider = new ethers.BrowserProvider(window.ethereum);
      setSigner(await provider.getSigner());
      console.log(provider);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickLogout = () => {
    setSigner(null);
  };
  return (
    <div className="min-h-screen flex flex-col justify-start items-center py-16">
      {signer ? (
        <div className="flex gap-8">
          <div className="box-style">{`${signer.address.slice(
            0,
            7
          )}...${signer.address.slice(signer.address.length - 5)}`}</div>
          <button
            onClick={onClickLogout}
            className="button-style border-red-200 hover:border-red-300"
          >
            로그아웃
          </button>
        </div>
      ) : (
        <button className="button-style" onClick={onClickMetamask}>
          🦊 메타마스크 로그인
        </button>
      )}
    </div>
  );
};

export default App;
