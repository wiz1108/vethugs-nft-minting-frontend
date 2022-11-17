import { useState } from "react"
import Connex from '@vechain/connex'

import NavBar from '../components/NavBar'
import Footer from "../components/Footer"

import { NETWORK } from '../constants'

import './BlackMarket.css'

const BlackMarket = () => {
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
    <div className='u-body full-height' style={{ display: 'flex', flexDirection: 'column' }}>
      <NavBar walletAddress={walletAddress} connectWalletPressed={connectWalletPressed} logout={logout} />
      <section className="u-align-center u-clearfix u-grey-80" id="sec-18a2" style={{ flexGrow: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="u-align-center u-clearfix u-sheet u-valign-middle" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <h2 className="u-text u-text-default u-text-1">Black market will open here !!</h2>

        </div>
      </section>
      <Footer />
    </div>
  )
}

export default BlackMarket