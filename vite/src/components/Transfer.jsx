import { useState } from "react";
import { parseEther } from "ethers";

export default function Transfer({ contract, info }) {
  const [transferAddress, setTransferAddress] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const transfer = async () => {
    try {
      if (!transferAddress || !transferAmount) return;
      const response = await contract.transfer(
        transferAddress,
        parseEther(transferAmount, "wei")
      );
      console.log({ response });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex w-full items-start">
      <div className="flex flex-col gap-2 grow">
        <input
          className="input-style"
          type="text"
          placeholder="지갑 주소"
          value={transferAddress}
          onChange={(e) => setTransferAddress(e.target.value)}
        />
        <input
          className="input-style"
          type="text"
          placeholder="금액"
          value={transferAmount}
          onChange={(e) => setTransferAmount(e.target.value)}
        />
      </div>
      <button className="button-style ml-4" onClick={transfer}>
        {info.symbol} 전송
      </button>
    </div>
  );
}
