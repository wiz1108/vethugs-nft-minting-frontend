import { useState } from "react"
import Connex from '@vechain/connex'

import NavBar from '../components/NavBar'
import Footer from "../components/Footer"

import { NETWORK } from "../constants"

import './Contact.css'

const Contact = () => {
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
      <section className="u-align-center u-clearfix u-grey-80 u-section-2" id="sec-b9c6" style={{ flexGrow: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="u-clearfix u-sheet u-valign-middle" style={{ flexGrow: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h1 className="u-text u-text-1">Contact us.</h1>
          <div className="u-form u-grey-90 u-form-1" style={{ maxWidth: '100%' }}>
            <form action="scripts/form-b9c6.php" method="POST" className="u-clearfix u-form-spacing-15 u-form-vertical u-inner-form" style={{ padding: '15px' }} source="customphp" name="Contact us">
              <div className="u-form-group u-form-name u-form-group-1">
                <label htmlFor="name-6797" className="u-form-control-hidden u-label">Name</label>
                <input type="text" placeholder="Name" id="name-6797" name="name" className="u-border-1 u-border-grey-30 u-input u-input-rectangle" required="" />
              </div>
              <div className="u-form-email u-form-group u-form-group-2">
                <label htmlFor="email-6797" className="u-form-control-hidden u-label">Email</label>
                <input type="email" placeholder="Email" id="email-6797" name="email" className="u-border-1 u-border-grey-30 u-input u-input-rectangle" required="" />
              </div>
              <div className="u-form-group u-form-message u-form-group-3">
                <label htmlFor="message-6797" className="u-form-control-hidden u-label">Address</label>
                <textarea placeholder="Your Question." rows="4" cols="50" id="message-6797" name="message" className="u-border-1 u-border-grey-30 u-input u-input-rectangle" required=""></textarea>
              </div>
              <div className="u-align-left u-form-group u-form-submit u-form-group-4">
                <button className="u-btn u-btn-submit u-button-style">Submit</button>
                <input type="submit" value="submit" className="u-form-control-hidden" />
              </div>
              <div className="u-form-send-message u-form-send-success">Thank you! Your message has been sent.</div>
              <div className="u-form-send-error u-form-send-message">Unable to send your message. Please fix errors then try again.</div>
              <input type="hidden" value="" name="recaptchaResponse" />
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Contact