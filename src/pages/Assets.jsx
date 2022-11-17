import React, { useState, useEffect, Fragment } from "react"
import { useHistory } from 'react-router-dom'
import Connex from '@vechain/connex'
import Loader from 'react-loader-spinner'
import { ToastContainer, toast, Slide } from 'react-toastify'
import axios from 'axios'

import NavBar from '../components/NavBar'
import Footer from "../components/Footer"

import { abi } from '../constants/contract-abi.js'
import { contractAddress, NODE, NETWORK } from "../constants"

import './Myassets.css'

const ToastContent = ({ title }) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <h6 className='toast-title font-weight-bold' style={{ marginLeft: "10px" }}>{title}</h6>
      </div>
    </div>
  </Fragment>
)

const Pagination = ({ count, current, onPageChanged }) => {
  return <div className="u-absolute-hcenter u-carousel-indicators u-carousel-indicators-1" style={{ bottom: '-40px' }}>
    {
      current >= 2 && <div style={{ backgroundColor: '#4d4d4d', color: '#888888', marginLeft: '5px', marginRight: '5px', width: '26px', height: '26px', borderRadius: '13px' }} onClick={e => onPageChanged(0)}>1</div>
    }
    {
      current >= 3 && <div style={{ color: '#888888', marginLeft: '5px', marginRight: '5px', width: '26px', height: '26px', borderRadius: '13px', alignItems: 'center', marginTop: '-3px' }}>...</div>
    }
    {
      current >= 1 && <div style={{ backgroundColor: '#4d4d4d', color: '#888888', marginLeft: '5px', marginRight: '5px', width: '26px', height: '26px', borderRadius: '13px' }} onClick={e => onPageChanged(current - 1)}>{current}</div>
    }
    <div style={{ backgroundColor: '#4d4d4d', color: 'white', marginLeft: '5px', marginRight: '5px', width: '26px', height: '26px', borderRadius: '13px' }}>{current + 1}</div>
    {
      current <= count - 2 && <div style={{ backgroundColor: '#4d4d4d', color: '#888888', marginLeft: '5px', marginRight: '5px', width: '26px', height: '26px', borderRadius: '13px' }} onClick={e => onPageChanged(current + 1)}>{current + 2}</div>
    }
    {
      current <= count - 4 && <div style={{ color: '#888888', marginLeft: '5px', marginRight: '5px', width: '26px', height: '26px', borderRadius: '13px', alignItems: 'center', marginTop: '-3px' }}><span>...</span></div>
    }
    {
      current <= count - 3 && <div style={{ backgroundColor: '#4d4d4d', color: '#888888', marginLeft: '5px', marginRight: '5px', width: '26px', height: '26px', borderRadius: '13px' }} onClick={e => onPageChanged(count - 1)}>{count}</div>
    }
  </div>
}

const Assets = () => {
  const [walletAddress, setWallet] = useState(localStorage.getItem('wallet'));
  const [balance, setBalance] = useState(0)
  const [current, setCurrent] = useState(0)
  const [tokens, setTokens] = useState([])
  const [recipient, setRecipient] = useState('')
  const [loading, setLoading] = useState(false)
  const [touchStart, setTouchStart] = React.useState(0);
  const [touchEnd, setTouchEnd] = React.useState(0);
  const history = useHistory()

  useEffect(async () => {
    getTokens()
  }, []);

  const logout = () => {
    setWallet('')
    localStorage.removeItem('wallet')
    history.push('/')
  }

  const getTokens = async () => {
    setLoading(true)
    let tkns = []
    const metadata = (await axios.get('/metadata.json')).data
    const connex = new Connex({
      node: NODE,
      network: NETWORK
    })
    const balanceOfABI = abi[18];
    console.log('wallet:', walletAddress)
    const balanceOfMethod = connex.thor.account(contractAddress)
      .method(balanceOfABI)
    const balanceOfRes = await balanceOfMethod.call(walletAddress)
    console.log('balanceof res:', balanceOfRes)
    const blnc = parseInt(balanceOfRes.decoded[0])
    setBalance(blnc)
    const tokenOfOwnerByIndexABI = abi[33]
    const tokenOfOwnerByIndexMethod = connex.thor.account(contractAddress)
      .method(tokenOfOwnerByIndexABI)

    const tokenURIABI = abi[34]
    const tokenURIMethod = connex.thor.account(contractAddress).method(tokenURIABI)

    for (let i = 0; i < blnc; ++i) {
      const tokenOfOwnerByIndexRes = await tokenOfOwnerByIndexMethod.call(walletAddress, i)
      const tokenId = parseInt(tokenOfOwnerByIndexRes.decoded[0])
      const tokenURIRes = await tokenURIMethod.call(tokenId)
      const tokenURI = tokenURIRes.decoded[0]
      tkns.push({ ...(metadata[tokenId - 1]), img: tokenURI + '.png' })
    }
    setTokens([...tkns])
    setLoading(false)
  }

  const transfer = async () => {
    if (!recipient) {
      toast.error(
        <ToastContent title='Input Recipient Address' body='' />,
        { transition: Slide, hideProgressBar: true, autoClose: 2000 }
      )
      return
    }

    const connex = new Connex({
      node: NODE,
      network: NETWORK
    })

    const balanceOfABI = abi[18];
    const balanceOfMethod = connex.thor.account(contractAddress)
      .method(balanceOfABI)
    balanceOfMethod.call(recipient).then(callres => console.log('callres:', callres)).catch(err => console.log('call error:', err))

    const transferFromABI = abi[14];
    const transferFromMethod = connex.thor.account(contractAddress)
      .method(transferFromABI)
      .caller(walletAddress)
      .gas(1000000)
      .gasPrice('1000000000000000')
    transferFromMethod.call(walletAddress, recipient, tokens[current].edition).then(mintCallRes => {
      if (!!mintCallRes.vmError) {
        toast.error(
          <ToastContent title={mintCallRes.revertReason} body='' />,
          { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
        return
      }
    }).catch(err => {
      console.log('mint call res error:', err)
    })
    setLoading(true)
    connex.vendor.sign('tx', [transferFromMethod.asClause(walletAddress, recipient, tokens[current].edition)]).request().then(res => {
      setLoading(false)
      if (!!res.vmError || !!res.revertReason) {
        toast.error(
          <ToastContent title={res.revertReason + res.vmError} body='' />,
          { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
      }
      else {
        toast.success(
          <ToastContent title='Transfer Success' body='' />,
          { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
        setCurrent(current < balance - 1 ? current : balance - 1)
        setBalance(balance - 1)
        let newtokens = [...tokens]
        newtokens.splice(current, 1)
        setTokens([...newtokens])
      }
    }).catch(err => {
      setLoading(false)
    })
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
        setWallet(res.annex.signer).then(() => getTokens())
        // getTokens()
      })
  }

  const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

  return (
    <div className='u-body full-height' style={{ display: 'flex', flexDirection: 'column' }}>
      <ToastContainer />
      <NavBar walletAddress={walletAddress} connectWalletPressed={connectWalletPressed} logout={logout} />
      <section className="u-align-center u-clearfix u-grey-80 u-section-1" id="sec-18a2" style={{ flexGrow: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {
          balance > 0 ? <div className="u-align-center u-clearfix u-sheet u-valign-middle u-sheet-1" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <h2 className="u-text u-text-default u-text-1">Your assets</h2>
            <h5 className="u-text u-text-default u-text-2">My VeThugs minted : {balance}<br /></h5>
            <div className="u-carousel u-expanded-width-xs u-gallery u-gallery-slider u-layout-carousel u-lightbox u-no-transition u-show-text-on-hover u-gallery-1" id="carousel-f036" data-interval="100000000">
              <Pagination count={balance} current={current} onPageChanged={num => setCurrent(num)} />
              <div className="u-carousel-inner u-gallery-inner" role="listbox">
                {
                  tokens.map((token, index) => <div className={"u-carousel-item u-effect-fade u-gallery-item u-carousel-item-1" + (index === current ? ' u-active' : '')} key={index}>
                    <div className="u-back-slide" data-image-width="500" data-image-height="500">
                      <img className="u-back-image u-expanded u-image-contain" src={token.img} alt='' />
                    </div>
                  </div>)
                }
              </div>
            </div>
            <table style={{ marginTop: '55px', width: '400px' }}>
              <thead style={{ backgroundColor: '#222222' }}>
                <tr>
                  <th style={{ width: '200px' }}>Attribute</th>
                  <th style={{ width: '200px' }}>Value</th>
                </tr>
              </thead>
              <tbody>
                {
                  !!tokens[current] && tokens[current].attributes.map((attr, index) => <tr key={index}>
                    <td>{capitalize(attr.trait_type)}</td>
                    <td>{capitalize(attr.value)}</td>
                  </tr>)
                }
              </tbody>
            </table>
            <h3 style={{ marginTop: '30px' }}>Transfer your VeThugs</h3>
            <p>Insert the wallet address where you want to send the NFT here</p>
            <input type="text" name="address" className="u-border-1 u-border-grey-30 u-input u-input-rectangle" required="" style={{ width: '400px', marginLeft: 'auto', marginRight: 'auto' }} value={recipient} onChange={e => setRecipient(e.target.value)} />
            <button className="u-btn u-btn-round u-button-style u-gradient u-hover-palette-1-base u-none u-radius-50 u-text-body-alt-color u-text-hover-palette-3-base u-btn-1" onClick={e => transfer()}>
              Transfer</button>
          </div> : <h2>You haven't got VeThugs</h2>
        }
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

export default Assets
