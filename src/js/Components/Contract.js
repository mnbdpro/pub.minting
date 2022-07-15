
const mainnetContract = "0x540C22c468028429558e4A40D16A33DCa3391c6e";

const mainnetAbi = [
    {
        inputs:[],
        name: "mint",
        outputs:[],
        stateMutability: "payable",
        type: "function"
    }
];

 const cost = "200000000000000000";

 var Web3;
 var window;
 var wallet = null;

 async function getAccounts() {
    try {
      const acc = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      return acc;
    } catch (e) {
      return [];
    }
  }


 async function connectMetamask() {
   if (window.ethereum) {
     try {
       const result = await this.getAccounts();
       if (Array.isArray(result) && result.length > 0) {
         return result[0];
       } else {
         return false;
       }
     } catch (err) {
       return false;
     }
   } else {
     return false;
   }
 }


 async function mint() {
     var web3 = new Web3(Web3.givenProvider);
     window.contract = await new web3.eth.Contract(mainnetAbi, mainnetContract);
     const transactionParameters = {
         to: mainnetContract,
         from: wallet,
         value: bigInt(cost).toString(16),
         data: window.contract.methods.mint().encodeABI()
     };
     try {
         await window.ethereum.request({
             method: "eth_sendTransaction",
             params: [transactionParameters],
         });
     } catch (error) {
         console.log(error);
     }
 }

 document.addEventListener("DOMContentLoaded", function () {
     const mainBtn = document.getElementById('connectWallet');
     const btnMint = document.getElementById('btn-mint');
     btnMint.hidden = true;
     mainBtn.addEventListener('click', () => {
                 connectMetamask().then(r => {
                     wallet = r.toString();
                     //mainBtn.disabled = true;
                     mainBtn.hidden = true;
                     btnMint.hidden = false;
                     // Create the event
                     const event = new CustomEvent("name-of-event");


                     if (wallet != null) {
                         if (mainBtn.innerText.toLowerCase() !== "Connected") {
                                     btnMint.addEventListener('click', () => {
                                         console.log("event")
                                         mint();
                                     });
                                     btnMint.innerText = "Mint";
                                     mainBtn.innerText = "Connected";
                         } else {
                             document.dispatchEvent(event);
                         }
                     }
                 });
   });
 });



