import { useState } from "react"
import Connex from '@vechain/connex'

import NavBar from '../components/NavBar'
import Footer from "../components/Footer"

import { NETWORK } from '../constants/'

import './AboutUs.css'

const AboutUs = () => {
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
      <section className="u-clearfix u-grey-80 about-u-section-1" id="carousel_c065" style={{ flexGrow: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="u-clearfix u-sheet u-valign-middle">
          <div className="u-clearfix u-expanded-width-sm u-expanded-width-xs u-layout-wrap u-layout-wrap-1">
            <div className="u-layout">
              <div className="u-layout-row">
                <div className="u-size-60">
                  <div className="u-layout-row">
                    <div className="u-container-style u-layout-cell u-size-60 u-layout-cell-1">
                      <div className="u-container-layout u-valign-top u-container-layout-1" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                        <h1 className="u-align-left u-text u-text-1">About us</h1>
                        <p className="u-align-justify u-large-text u-text u-text-variant u-text-2">We are two crypto
                          enthousiasts who got interested in the NFT space and wanted to implement NFTs in a video game. We
                          have been Vechain supporters for a while now so the choice of which blockchain we would use was an
                          easy one. By creating and launching the VeThugs and the video game we want to introduce play to
                          earn to the VeFam. That way we will also bring a lot of new traffic towards VeChain and hopefully
                          gain some members for the VeFam. On our way to launch and minting we also added a dev to our team.
                          check us out as thugs below !</p>
                        <img className="u-image u-image-contain u-image-round u-radius-50 u-image-1"
                          src="images/vethugsheart.png" alt="" data-image-width="1500" data-image-height="750" style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '100%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default AboutUs