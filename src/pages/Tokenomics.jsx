import { useState } from "react"
import Connex from '@vechain/connex'

import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

import { NETWORK } from "../constants"

import './Tokenomics.css'

const Tokenomics = () => {
  const [walletAddress, setWallet] = useState(localStorage.getItem('wallet'));

  const logout = () => {
    setWallet('')
    localStorage.removeItem('wallet')
  }

  const connectWalletPressed = async () => { //TODO: implement
    let newvendor = new Connex.Vendor(NETWORK);
    newvendor
      .sign("cert", {
        purpose: "identification",
        payload: {
          type: "text",
          content: "Hello Thug.\n\nBy signing this contract.\n\nYou are not allowed to talk to the police ever again!\n\nSign here:"
        }
      })
      .request()
      .then(res => {
        localStorage.setItem('wallet', res.annex.signer)
        setWallet(res.annex.signer)
      })
  };

  return (
    <div className='u-body'>
      <NavBar walletAddress={walletAddress} connectWalletPressed={connectWalletPressed} logout={logout} />

      <section className="u-clearfix u-grey-80 tokenomics-u-section-1" id="sec-2b18">
        <div className="u-align-left u-clearfix u-sheet u-sheet-1">
          <img className="u-border-8 u-border-grey-90 u-image u-image-round u-radius-30 u-image-1" src="images/fdsxghdhnbxg.png" alt="" data-image-width="800" data-image-height="1600" />
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Tokenomics