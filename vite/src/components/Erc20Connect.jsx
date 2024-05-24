import { useEffect, useState } from "react";

export default function Erc20Connect({
  contract,
  onClickConnect,
  contractAddress,
  setContractAddress,
  info,
}) {
  return (
    <div className="flex w-full items-start">
      <div className="flex flex-col grow gap-2">
        <div className="ml-1 text-lg font-bold  mb-2">
          ERC20 연결{" "}
          {info.name && (
            <span>
              {info.name}({info.symbol})
            </span>
          )}
        </div>
        <div className="flex items-start">
          <input
            type="text"
            className="input-style"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            placeholder="컨트랙트 주소"
          />
          <button className="button-style ml-4" onClick={onClickConnect}>
            {info.name ? "교체" : "연결"}
          </button>
        </div>
      </div>
    </div>
  );
}
