import { useEffect, useState } from "react";
import MetamaskButton from "./components/MetamaskButton";
import Erc20Connect from "./components/Erc20Connect";
import { Contract } from "ethers";
import abi from "./abi.json";
import Balance from "./components/Balance";
import Transfer from "./components/Transfer";

const App = () => {
  const [contract, setContract] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [signer, setSigner] = useState();
  const [info, setInfo] = useState({ name: "", symbol: "" });
  const [balance, setBalance] = useState();

  const onClickConnect = () => {
    if (!signer || !contractAddress) return;
    setContract(new Contract(contractAddress, abi, signer));
  };
  const getNameSymbol = async () => {
    try {
      const response = [await contract.name(), await contract.symbol()];
      setInfo({ name: response[0], symbol: response[1] });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (!contract) {
      return;
    }
    getNameSymbol();
  }, [contract]);

  return (
    <div className="min-h-screen flex flex-col justify-start items-center py-16">
      <MetamaskButton signer={signer} setSigner={setSigner} />
      {signer && (
        <div className="mt-16 flex flex-col gap-8 grow max-w-lg w-full">
          <Erc20Connect
            signer={signer}
            contract={contract}
            onClickConnect={onClickConnect}
            contractAddress={contractAddress}
            setContractAddress={setContractAddress}
            info={info}
          />
          {contract && (
            <Balance
              getNameSymbol={getNameSymbol}
              contract={contract}
              info={info}
              balance={balance}
              setBalance={setBalance}
            />
          )}
          {info.name && <Transfer contract={contract} info={info} />}
        </div>
      )}
    </div>
  );
};

export default App;
