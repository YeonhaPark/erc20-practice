import { IoRefresh } from "react-icons/io5";
import { formatEther } from "ethers";
import { useState } from "react";

export default function Balance({ info, contract, balance, setBalance }) {
  const [balanceAddress, setBalanceAddress] = useState();

  const onClickBalance = async () => {
    if (!balanceAddress) return;
    const response = await contract.balanceOf(balanceAddress);
    setBalance(response);
  };

  return (
    <div className="flex w-full items-start">
      <div className="flex flex-col gap-2 grow">
        <div className="ml-1 text-lg font-bold">
          {info.name} <span className="font-normal">({info.symbol})</span>
          &nbsp;토큰 확인
        </div>
        {balance ? (
          <div className="box-style">{`${formatEther(balance)} ${
            info.symbol
          }`}</div>
        ) : (
          <input
            className="input-style"
            type="text"
            placeholder="지갑 주소"
            value={balanceAddress}
            onChange={(e) => setBalanceAddress(e.target.value)}
          />
        )}
      </div>
      {balance !== 0 && !balance ? (
        <button className="button-style ml-4 mt-9" onClick={onClickBalance}>
          확인
        </button>
      ) : (
        <button
          className="button-style ml-4 mt-9"
          onClick={() => setBalance(null)}
        >
          <IoRefresh />
        </button>
      )}
    </div>
  );
}
