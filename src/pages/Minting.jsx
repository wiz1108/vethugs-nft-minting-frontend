import { useEffect, useState, useRef, Fragment } from "react"
import Connex from '@vechain/connex'
import Loader from 'react-loader-spinner'
import { ToastContainer, toast, Slide } from 'react-toastify'
import Countdown from 'react-countdown'

import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { abi } from '../constants/contract-abi.js'
import { contractAddress, NETWORK, NODE } from "../constants"

import './Minting.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import 'react-toastify/dist/ReactToastify.css'

const ToastContent = ({ title }) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <h6 className='toast-title font-weight-bold' style={{ marginLeft: "10px" }}>{title}</h6>
      </div>
    </div>
  </Fragment>
)

const makePadding = num => `${num < 10 ? '0' : ''}${num}`

const Minting = () => {
  const [walletAddress, setWallet] = useState(localStorage.getItem('wallet'))
  const [amount, setAmount] = useState('1')
  const [vet, setVet] = useState(0)
  const [minted, setMinted] = useState('0')
  const [loading, setLoading] = useState(false)

  useEffect(() => { //changed useEffect(async () => {
    calcVet(1, '0')
    getTotalMinted()
  }, []);

  useInterval(
    () => {
      getTotalMinted()
    },
    5000
  )

  const getTotalMinted = async () => { //TODO: implement
    const connex = new Connex({
      node: NODE,
      network: NETWORK
    })
    const getTotalMintedABI = abi[35];
    const getTotalMintedMethod = connex.thor.account(contractAddress)
      .method(getTotalMintedABI)
    const mintedRes = await getTotalMintedMethod.call()
    setMinted(mintedRes.decoded[0])
    calcVet(parseInt(amount), mintedRes.decoded[0] || '0')
  };

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

  const getBalance = async () => {
    const connex = new Connex({
      node: NODE,
      network: NETWORK
    })

    const acc = connex.thor.account(walletAddress)
    const accInfo = await acc.get()
    return parseInt(accInfo.balance)
  }

  const logout = () => {
    setWallet('')
    localStorage.removeItem('wallet')
  }

  const onMintPressed = async () => { //TODO: implement
    if (!walletAddress) {
      await connectWalletPressed()
    }
    const connex = new Connex({
      node: NODE,
      network: NETWORK
    })

    // const balance = await getBalance()
    // if (balance < vet * 1000000000000000000 + 100000000000000000) {
    //   toast.error(
    //     <ToastContent title='Insufficient Fund' body='' />,
    //     { transition: Slide, hideProgressBar: true, autoClose: 2000 }
    //   )
    //   return;
    // }

    const mintABI = abi[7];
    const mintMethod = connex.thor.account(contractAddress)
      .method(mintABI)
      .value(vet + '000000000000000000')
      .caller(walletAddress)
      // .asClause(parseInt(amount))
      .gas(1000000)
      .gasPrice('1000000000000000')
    const mintCallRes = await mintMethod.call(parseInt(amount))
    if (mintCallRes.reverted) {
      toast.error(
        <ToastContent title={mintCallRes.revertReason || mintCallRes.vmError} body='' />,
        { transition: Slide, hideProgressBar: true, autoClose: 2000 }
      )
      return
    }
    mintMethod.call(parseInt(amount)).then(output => console.log('call result:', output))
    setLoading(true)
    connex.vendor.sign('tx', [mintMethod.asClause(parseInt(amount))]).request().then(res => {
      setLoading(false)
      if (!!res.vmError || !!res.revertReason) {
        toast.error(
          <ToastContent title={res.revertReason + res.vmError} body='' />,
          { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
      }
      else {
        toast.success(
          <ToastContent title='Minting Success' body='' />,
          { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
      }
    }).catch(err => {
      setLoading(false)
    })
  };

  const getMintPrice = (mntd) => {
    if (mntd >= 5000) {
      return 2000
    } else if (mntd >= 4000) {
      return 1950
    } else if (mntd >= 3000) {
      return 1560
    } else if (mntd >= 2000) {
      return 1170
    } else if (mntd >= 1000) {
      return 780
    } else {
      return 390
    }
  }

  const calcVet = (amnt, mintedStr) => {
    let v = 0
    const mntd = parseInt(mintedStr)
    for (let i = 0; i < amnt; ++i) {
      v += getMintPrice(mntd + i)
    }
    if (v !== vet) {
      setVet(v)
    }
  }

  return (
    <div className='u-body'>
      <ToastContainer />
      <NavBar walletAddress={walletAddress} connectWalletPressed={connectWalletPressed} logout={logout} />
      <section className="u-align-center u-clearfix u-grey-80 minting-u-section-1" id="sec-18a2">
        <div className="u-align-center u-clearfix u-sheet u-valign-middle u-sheet-1">
          <h2 className="u-text u-text-default u-text-1">Help break out your VeThug !</h2>
          <h5 className="u-text u-text-default u-text-2">Total VeThugs minted : {minted} / 10000<br />
            <br />Current price : {getMintPrice(minted)} VET
          </h5>
          <div className="u-carousel u-expanded-width-xs u-gallery u-gallery-slider u-layout-carousel u-lightbox u-no-transition u-show-text-on-hover u-gallery-1" id="carousel-f035" data-interval="5000" data-u-ride="carousel">
            <ol className="u-absolute-hcenter u-carousel-indicators u-carousel-indicators-1">
              <li data-u-target="#carousel-f035" data-u-slide-to="0" className="u-active u-grey-70 u-shape-circle" style={{ width: '10px', height: '10px' }}></li>
              <li data-u-target="#carousel-f035" data-u-slide-to="1" className="u-grey-70 u-shape-circle" style={{ width: '10px', height: '10px' }}></li>
              <li data-u-target="#carousel-f035" data-u-slide-to="2" className="u-grey-70 u-shape-circle" style={{ width: '10px', height: '10px' }}></li>
              <li data-u-target="#carousel-f035" data-u-slide-to="3" className="u-grey-70 u-shape-circle" style={{ width: '10px', height: '10px' }}></li>
              <li data-u-target="#carousel-f035" data-u-slide-to="4" className="u-grey-70 u-shape-circle" style={{ width: '10px', height: '10px' }}></li>
              <li data-u-target="#carousel-f035" data-u-slide-to="5" className="u-grey-70 u-shape-circle" style={{ width: '10px', height: '10px' }}></li>
              <li data-u-target="#carousel-f035" data-u-slide-to="6" className="u-grey-70 u-shape-circle" style={{ width: '10px', height: '10px' }}></li>
              <li data-u-target="#carousel-f035" data-u-slide-to="7" className="u-grey-70 u-shape-circle" style={{ width: '10px', height: '10px' }}></li>
              <li data-u-target="#carousel-f035" data-u-slide-to="8" className="u-grey-70 u-shape-circle" style={{ width: '10px', height: '10px' }}></li>
            </ol>
            <div className="u-carousel-inner u-gallery-inner" role="listbox">
              <div className="u-active u-carousel-item u-effect-fade u-gallery-item u-carousel-item-1">
                <div className="u-back-slide" data-image-width="500" data-image-height="500">
                  <img className="u-back-image u-expanded u-image-contain" src="images/23.png" alt='' />
                </div>
                <div className="u-align-center u-over-slide u-shading u-valign-bottom u-over-slide-1">
                  <h3 className="u-gallery-heading"> </h3>
                  <p className="u-gallery-text"> </p>
                </div>
              </div>
              <div className="u-carousel-item u-effect-fade u-gallery-item u-carousel-item-2">
                <div className="u-back-slide" data-image-width="500" data-image-height="500">
                  <img className="u-back-image u-expanded u-image-contain" src="images/24.png" alt='' />
                </div>
                <div className="u-align-center u-over-slide u-shading u-valign-bottom u-over-slide-2">
                  <h3 className="u-gallery-heading"> </h3>
                  <p className="u-gallery-text"> </p>
                </div>
              </div>
              <div className="u-carousel-item u-effect-fade u-gallery-item u-carousel-item-3" data-image-width="500" data-image-height="500">
                <div className="u-back-slide">
                  <img className="u-back-image u-expanded u-image-contain" src="images/21.png" alt='' />
                </div>
                <div className="u-align-center u-over-slide u-shading u-valign-bottom u-over-slide-3">
                  <h3 className="u-gallery-heading"> </h3>
                  <p className="u-gallery-text"> </p>
                </div>
                <style data-mode="XL"></style>
                <style data-mode="LG"></style>
                <style data-mode="MD"></style>
                <style data-mode="SM"></style>
                <style data-mode="XS"></style>
              </div>
              <div className="u-carousel-item u-effect-fade u-gallery-item u-carousel-item-4" data-image-width="500" data-image-height="500">
                <div className="u-back-slide">
                  <img className="u-back-image u-expanded u-image-contain" src="images/25.png" alt='' />
                </div>
                <div className="u-align-center u-over-slide u-shading u-valign-bottom u-over-slide-4">
                  <h3 className="u-gallery-heading"> </h3>
                  <p className="u-gallery-text"> </p>
                </div>
                <style data-mode="XL"></style>
                <style data-mode="LG"></style>
                <style data-mode="MD"></style>
                <style data-mode="SM"></style>
                <style data-mode="XS"></style>
              </div>
              <div className="u-carousel-item u-effect-fade u-gallery-item u-carousel-item-5" data-image-width="500" data-image-height="500">
                <div className="u-back-slide">
                  <img className="u-back-image u-expanded u-image-contain" src="images/20.png" alt='' />
                </div>
                <div className="u-align-center u-over-slide u-shading u-valign-bottom u-over-slide-5">
                  <h3 className="u-gallery-heading"> </h3>
                  <p className="u-gallery-text"> </p>
                </div>
                <style data-mode="XL"></style>
                <style data-mode="LG"></style>
                <style data-mode="MD"></style>
                <style data-mode="SM"></style>
                <style data-mode="XS"></style>
              </div>
              <div className="u-carousel-item u-effect-fade u-gallery-item u-carousel-item-6" data-image-width="500" data-image-height="500">
                <div className="u-back-slide">
                  <img className="u-back-image u-expanded u-image-contain" src="images/77.png" alt='' />
                </div>
                <div className="u-align-center u-over-slide u-shading u-valign-bottom u-over-slide-6">
                  <h3 className="u-gallery-heading"> </h3>
                  <p className="u-gallery-text"> </p>
                </div>
                <style data-mode="XL"></style>
                <style data-mode="LG"></style>
                <style data-mode="MD"></style>
                <style data-mode="SM"></style>
                <style data-mode="XS"></style>
              </div>
              <div className="u-carousel-item u-effect-fade u-gallery-item u-carousel-item-7" data-image-width="500" data-image-height="500">
                <div className="u-back-slide">
                  <img className="u-back-image u-expanded u-image-contain" src="images/73.png" alt='' />
                </div>
                <div className="u-align-center u-over-slide u-shading u-valign-bottom u-over-slide-7">
                  <h3 className="u-gallery-heading"> </h3>
                  <p className="u-gallery-text"> </p>
                </div>
                <style data-mode="XL"></style>
                <style data-mode="LG"></style>
                <style data-mode="MD"></style>
                <style data-mode="SM"></style>
                <style data-mode="XS"></style>
              </div>
              <div className="u-carousel-item u-effect-fade u-gallery-item u-carousel-item-8" data-image-width="500" data-image-height="500">
                <div className="u-back-slide">
                  <img className="u-back-image u-expanded u-image-contain" src="images/96.png" alt='' />
                </div>
                <div className="u-align-center u-over-slide u-shading u-valign-bottom u-over-slide-8">
                  <h3 className="u-gallery-heading"> </h3>
                  <p className="u-gallery-text"> </p>
                </div>
                <style data-mode="XL"></style>
                <style data-mode="LG"></style>
                <style data-mode="MD"></style>
                <style data-mode="SM"></style>
                <style data-mode="XS"></style>
              </div>
              <div className="u-carousel-item u-effect-fade u-gallery-item u-carousel-item-9" data-image-width="500" data-image-height="500">
                <div className="u-back-slide">
                  <img className="u-back-image u-expanded u-image-contain" src="images/93.png" alt='' />
                </div>
                <div className="u-align-center u-over-slide u-shading u-valign-bottom u-over-slide-9">
                  <h3 className="u-gallery-heading"> </h3>
                  <p className="u-gallery-text"> </p>
                </div>
                <style data-mode="XL"></style>
                <style data-mode="LG"></style>
                <style data-mode="MD"></style>
                <style data-mode="SM"></style>
                <style data-mode="XS"></style>
              </div>
            </div>
            <a className="u-absolute-vcenter u-carousel-control u-carousel-control-prev u-grey-70 u-hidden-sm u-hidden-xs u-icon-circle u-opacity u-opacity-70 u-spacing-10 u-text-white u-carousel-control-1" href="#carousel-f035" role="button" data-u-slide="prev">
              <span aria-hidden="true">
                <svg viewBox="0 0 451.847 451.847"><path d="M97.141,225.92c0-8.095,3.091-16.192,9.259-22.366L300.689,9.27c12.359-12.359,32.397-12.359,44.751,0
c12.354,12.354,12.354,32.388,0,44.748L173.525,225.92l171.903,171.909c12.354,12.354,12.354,32.391,0,44.744
c-12.354,12.365-32.386,12.365-44.745,0l-194.29-194.281C100.226,242.115,97.141,234.018,97.141,225.92z"></path></svg>
              </span>
              <span className="sr-only">
                <svg viewBox="0 0 451.847 451.847"><path d="M97.141,225.92c0-8.095,3.091-16.192,9.259-22.366L300.689,9.27c12.359-12.359,32.397-12.359,44.751,0
c12.354,12.354,12.354,32.388,0,44.748L173.525,225.92l171.903,171.909c12.354,12.354,12.354,32.391,0,44.744
c-12.354,12.365-32.386,12.365-44.745,0l-194.29-194.281C100.226,242.115,97.141,234.018,97.141,225.92z"></path></svg>
              </span>
            </a>
            <a className="u-absolute-vcenter u-carousel-control u-carousel-control-next u-grey-70 u-hidden-sm u-hidden-xs u-icon-circle u-opacity u-opacity-70 u-spacing-10 u-text-white u-carousel-control-2" href="#carousel-f035" role="button" data-u-slide="next">
              <span aria-hidden="true">
                <svg viewBox="0 0 451.846 451.847"><path d="M345.441,248.292L151.154,442.573c-12.359,12.365-32.397,12.365-44.75,0c-12.354-12.354-12.354-32.391,0-44.744
L278.318,225.92L106.409,54.017c-12.354-12.359-12.354-32.394,0-44.748c12.354-12.359,32.391-12.359,44.75,0l194.287,194.284
c6.177,6.18,9.262,14.271,9.262,22.366C354.708,234.018,351.617,242.115,345.441,248.292z"></path></svg>
              </span>
              <span className="sr-only">
                <svg viewBox="0 0 451.846 451.847"><path d="M345.441,248.292L151.154,442.573c-12.359,12.365-32.397,12.365-44.75,0c-12.354-12.354-12.354-32.391,0-44.744
L278.318,225.92L106.409,54.017c-12.354-12.359-12.354-32.394,0-44.748c12.354-12.359,32.391-12.359,44.75,0l194.287,194.284
c6.177,6.18,9.262,14.271,9.262,22.366C354.708,234.018,351.617,242.115,345.441,248.292z"></path></svg>
              </span>
            </a>
          </div>
          <input type="number" name="count" className="u-border-1 u-border-grey-30 u-input u-input-rectangle" style={{ width: '100px', marginTop: '55px', marginLeft: 'auto', marginRight: 'auto' }} value={parseInt(amount)} onChange={e => {
            if (amount !== `${e.target.value}`) {
              setAmount(`${e.target.value}`)
              calcVet(e.target.value, minted)
            }
          }} max={20} min={1} />
          <h5 className="u-text u-text-default" style={{ marginTop: '20px', marginLeft: 'auto', marginRight: 'auto' }}>
            <br />Total price : {vet} VET
          </h5>
          <table style={{ width: '400px', marginLeft: 'auto', marginRight: 'auto', maxWidth: '100%' }}>
            <thead>
              <tr>
                <td>Mint Count</td>
                <td>Price</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1~1000</td>
                <td>390 VET</td>
              </tr>
              <tr>
                <td>1001~2000</td>
                <td>780 VET</td>
              </tr>
              <tr>
                <td>2001~3000</td>
                <td>1170 VET</td>
              </tr>
              <tr>
                <td>3001~4000</td>
                <td>1560 VET</td>
              </tr>
              <tr>
                <td>4001~5000</td>
                <td>1950 VET</td>
              </tr>
              <tr>
                <td>5001~10000</td>
                <td>2000 VET</td>
              </tr>
            </tbody>
          </table>
          <div style={{ margin: '20px' }}>
            The presale will start on the 11th of December 2021 at 12:00 pm UTC +0<br />
            The public sale will start on the 12th of December 2021 at 12:00 pm UTC +0
          </div>

          <Countdown date={new Date(Date.UTC(2021, 11, 11, 12, 0, 0))} renderer={({ days, hours, minutes, seconds, completed }) => completed ? <button className="u-btn u-btn-round u-button-style u-gradient u-hover-palette-1-base u-none u-radius-50 u-text-body-alt-color u-text-hover-palette-3-base u-btn-1" style={{ marginTop: '10px', maxWidth: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '40px' }} onClick={e => onMintPressed()} disabled> Blow up the prison wall.</button> : <h2 style={{ marginBottom: '40px' }}>{makePadding(days)}:{makePadding(hours)}:{makePadding(minutes)}:{makePadding(seconds)}</h2>
          } />
        </div>
      </section>
      <Footer />
      {
        loading && <div style={{ position: 'absolute', top: '0px', left: '0px', width: '100%', height: '100%', backgroundColor: '#ffffff', opacity: '0.5', zIndex: '10000' }}>
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            style={{
              position: 'fixed',
              top: 'calc(50% - 50px)',
              left: 'calc(50% - 50px)'
            }}
          />
        </div>
      }
    </div>
  )
}

function useInterval(callback, delay) {
  const savedCallback = useRef()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

export default Minting