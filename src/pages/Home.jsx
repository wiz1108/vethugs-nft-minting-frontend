import { useState } from "react";
import Connex from '@vechain/connex'

import NavBar from "../components/NavBar"
import Footer from "../components/Footer"

import { NETWORK } from "../constants";

import './VeThugs.css'

const Home = () => {
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
      <section className="u-clearfix u-grey-80 u-section-1" id="sec-2e35">
        <div className="u-clearfix u-sheet">
          <div className="u-expanded-width u-image u-image-default u-image-1">
            <img src="images/banner.png" alt="" width="100%" />
          </div>
        </div>
      </section>
      <section className="u-align-center u-clearfix u-grey-60 u-section-2" id="sec-7fa3" style={{ minHeight: '0px' }}>
        <div className="u-clearfix u-sheet">
          <div className="u-clearfix u-gutter-0 u-layout-wrap u-layout-wrap-1" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            <div className="u-gutter-0 u-layout">
              <div className="u-layout-row" style={{ minHeight: '0px' }}>
                <div className="u-container-style u-layout-cell u-right-cell u-shape-rectangle u-size-60 u-layout-cell-1" style={{ minHeight: '0px' }}>
                  <div className="u-container-layout u-container-layout-1" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="u-social-icons u-spacing-10 u-social-icons-1" style={{ height: 'auto' }}>
                      <a className="u-social-url" title="twitter" target="_blank" rel="noreferrer" href="https://twitter.com/VeThugs"><span
                        className="u-icon u-social-icon u-social-twitter u-icon-1"><svg className="u-svg-link"
                          preserveAspectRatio="xMidYMin slice" viewBox="0 0 112.197 112.197">
                          <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#svg-037f"></use>
                        </svg><svg className="u-svg-content" viewBox="0 0 112.197 112.197" x="0px" y="0px" id="svg-037f"
                          style={{ enableBackground: 'new 0 0 112.197 112.197' }}>
                          <g>
                            <circle style={{ fill: '#55ACEE' }} cx="56.099" cy="56.098" r="56.098"></circle>
                            <g>
                              <path style={{ fill: '#F1F2F2' }}
                                d="M90.461,40.316c-2.404,1.066-4.99,1.787-7.702,2.109c2.769-1.659,4.894-4.284,5.897-7.417    c-2.591,1.537-5.462,2.652-8.515,3.253c-2.446-2.605-5.931-4.233-9.79-4.233c-7.404,0-13.409,6.005-13.409,13.409    c0,1.051,0.119,2.074,0.349,3.056c-11.144-0.559-21.025-5.897-27.639-14.012c-1.154,1.98-1.816,4.285-1.816,6.742    c0,4.651,2.369,8.757,5.965,11.161c-2.197-0.069-4.266-0.672-6.073-1.679c-0.001,0.057-0.001,0.114-0.001,0.17    c0,6.497,4.624,11.916,10.757,13.147c-1.124,0.308-2.311,0.471-3.532,0.471c-0.866,0-1.705-0.083-2.523-0.239    c1.706,5.326,6.657,9.203,12.526,9.312c-4.59,3.597-10.371,5.74-16.655,5.74c-1.08,0-2.15-0.063-3.197-0.188    c5.931,3.806,12.981,6.025,20.553,6.025c24.664,0,38.152-20.432,38.152-38.153c0-0.581-0.013-1.16-0.039-1.734    C86.391,45.366,88.664,43.005,90.461,40.316L90.461,40.316z">
                              </path>
                            </g>
                          </g>
                        </svg></span>
                      </a>
                      <a className="u-social-url" target="_blank" rel="noreferrer" title="Instagram" href="https://www.instagram.com/vethugsofficial/"><span
                        className="u-icon u-social-icon u-social-instagram u-icon-2"><svg className="u-svg-link"
                          preserveAspectRatio="xMidYMin slice" viewBox="0 0 112 112">
                          <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#svg-7eb4"></use>
                        </svg><svg className="u-svg-content" viewBox="0 0 112 112" x="0" y="0" id="svg-7eb4">
                          <circle fill="currentColor" cx="56.1" cy="56.1" r="55"></circle>
                          <path fill="#FFFFFF"
                            d="M55.9,38.2c-9.9,0-17.9,8-17.9,17.9C38,66,46,74,55.9,74c9.9,0,17.9-8,17.9-17.9C73.8,46.2,65.8,38.2,55.9,38.2
            z M55.9,66.4c-5.7,0-10.3-4.6-10.3-10.3c-0.1-5.7,4.6-10.3,10.3-10.3c5.7,0,10.3,4.6,10.3,10.3C66.2,61.8,61.6,66.4,55.9,66.4z">
                          </path>
                          <path fill="#FFFFFF"
                            d="M74.3,33.5c-2.3,0-4.2,1.9-4.2,4.2s1.9,4.2,4.2,4.2s4.2-1.9,4.2-4.2S76.6,33.5,74.3,33.5z">
                          </path>
                          <path fill="#FFFFFF" d="M73.1,21.3H38.6c-9.7,0-17.5,7.9-17.5,17.5v34.5c0,9.7,7.9,17.6,17.5,17.6h34.5c9.7,0,17.5-7.9,17.5-17.5V38.8
            C90.6,29.1,82.7,21.3,73.1,21.3z M83,73.3c0,5.5-4.5,9.9-9.9,9.9H38.6c-5.5,0-9.9-4.5-9.9-9.9V38.8c0-5.5,4.5-9.9,9.9-9.9h34.5
            c5.5,0,9.9,4.5,9.9,9.9V73.3z"></path>
                        </svg></span>
                      </a>
                      <a className="u-social-url" target="_blank" rel="noreferrer" title="Custom" href="https://discord.gg/7uATK3WU"><span
                        className="u-icon u-social-custom u-social-icon u-icon-3"><svg className="u-svg-link"
                          preserveAspectRatio="xMidYMin slice" viewBox="0 0 24 24">
                          <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#svg-d17a"></use>
                        </svg><svg className="u-svg-content" viewBox="0 0 24 24" id="svg-d17a">
                          <g fill="currentColor">
                            <path
                              d="m3.58 21.196h14.259l-.681-2.205c.101.088 5.842 5.009 5.842 5.009v-21.525c-.068-1.338-1.22-2.475-2.648-2.475l-16.767.003c-1.427 0-2.585 1.139-2.585 2.477v16.24c0 1.411 1.156 2.476 2.58 2.476zm10.548-15.513-.033.012.012-.012zm-7.631 1.269c1.833-1.334 3.532-1.27 3.532-1.27l.137.135c-2.243.535-3.26 1.537-3.26 1.537.104-.022 4.633-2.635 10.121.066 0 0-1.019-.937-3.124-1.537l.186-.183c.291.001 1.831.055 3.479 1.26 0 0 1.844 3.15 1.844 7.02-.061-.074-1.144 1.666-3.931 1.726 0 0-.472-.534-.808-1 1.63-.468 2.24-1.404 2.24-1.404-3.173 1.998-5.954 1.686-9.281.336-.031 0-.045-.014-.061-.03v-.006c-.016-.015-.03-.03-.061-.03h-.06c-.204-.134-.34-.2-.34-.2s.609.936 2.174 1.404c-.411.469-.818 1.002-.818 1.002-2.786-.066-3.802-1.806-3.802-1.806 0-3.876 1.833-7.02 1.833-7.02z">
                            </path>
                            <path
                              d="m14.308 12.771c.711 0 1.29-.6 1.29-1.34 0-.735-.576-1.335-1.29-1.335v.003c-.708 0-1.288.598-1.29 1.338 0 .734.579 1.334 1.29 1.334z">
                            </path>
                            <path
                              d="m9.69 12.771c.711 0 1.29-.6 1.29-1.34 0-.735-.575-1.335-1.286-1.335l-.004.003c-.711 0-1.29.598-1.29 1.338 0 .734.579 1.334 1.29 1.334z">
                            </path>
                          </g>
                        </svg></span>
                      </a>
                      <a className="u-social-url" target="_blank" rel="noreferrer" title="Telegram"
                        href="https://t.me/joinchat/GnmSn1My9b1mOTA8"><span
                          className="u-icon u-social-icon u-social-telegram u-icon-5"><svg className="u-svg-link"
                            preserveAspectRatio="xMidYMin slice" viewBox="0 0 112 112">
                            <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#svg-5adf"></use>
                          </svg><svg className="u-svg-content" viewBox="0 0 112 112" x="0" y="0" id="svg-5adf">
                            <circle fill="currentColor" cx="56.1" cy="56.1" r="55"></circle>
                            <path fill="#FFFFFF"
                              d="M18.4,53.2l64.7-24.9c3-1.1,5.6,0.7,4.7,5.3l0,0l-11,51.8c-0.8,3.7-3,4.6-6.1,2.8L53.9,75.8l-8.1,7.8
	c-0.9,0.9-1.7,1.6-3.4,1.6l1.2-17l31.1-28c1.4-1.2-0.3-1.9-2.1-0.7L34.2,63.7l-16.6-5.2C14,57.4,14,54.9,18.4,53.2L18.4,53.2z"></path>
                          </svg></span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="u-clearfix u-grey-80 u-section-3" id="carousel_fe46">
        <div
          className="u-clearfix u-expanded-width-md u-expanded-width-sm u-expanded-width-xs u-gutter-0 u-layout-wrap u-layout-wrap-1">
          <div className="u-layout">
            <div className="u-layout-row">
              <div className="u-container-style u-layout-cell u-left-cell u-size-28 u-layout-cell-1">
                <div className="u-container-layout u-container-layout-1">
                  <h5 className="u-text u-text-palette-2-base u-text-1">Breaking​ news !!</h5>
                  <h2 className="u-text u-text-2">
                    <span style={{ fontSize: '48px' }}>The VeThugs are coming.</span>
                  </h2>
                  <p className="u-text u-text-3"> VeThugs is a collection of 10.000 unique thugs with a maximum of 12 different
                    traits.<br />Each of this traits will have unique extras, ofcourse some are more rare to keep it
                    interesting.<br />Come and discover VeThugs to get a peak in the future of gamification
                  </p>
                  <a href="/tokenomics"
                    className="u-border-none u-btn u-button-style u-palette-2-base u-btn-1" title="robots">read more</a>
                </div>
              </div>
              <div className="u-container-style u-layout-cell u-right-cell u-size-32 u-layout-cell-2">
                <div className="u-container-layout">
                  <div className="u-image u-image-circle u-image-1" data-image-width="500" data-image-height="500"></div>
                  <img className="u-image u-image-default u-image-2" data-image-width="500" data-image-height="500"
                    src="images/01.png" alt='' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="u-clearfix u-grey-70 u-section-4" id="carousel_3dcc">
        <div className="u-clearfix u-sheet u-sheet-1">
          <div className="u-clearfix u-expanded-width u-gutter-30 u-layout-wrap u-layout-wrap-1">
            <div className="u-gutter-0 u-layout">
              <div className="u-layout-row">
                <div className="u-container-style u-layout-cell u-left-cell u-size-30 u-layout-cell-1">
                  <div className="u-container-layout">
                    <img className="u-image u-image-circle u-image-2" data-image-width="500" data-image-height="500" src="/images/88.png" alt='' />
                  </div>
                </div>
                <div className="u-align-left u-container-style u-layout-cell u-right-cell u-size-30 u-layout-cell-2">
                  <div className="u-container-layout u-container-layout-2">
                    <h1 className="u-text u-text-1">VeThugs metaverse</h1>
                    <p className="u-text u-text-2">In the pixelized universe where the Vethugs deal, steal and roll. There are
                      plenty off chances to enrich yourself and your Vethug. ​Owning a VeThug will be the only way to
                      participate in the VeThugs game. Your VeThug will be your unique in-game&nbsp;character. Participate
                      in various in game&nbsp;mini games and events to earn Unique real life &amp; virtual rewards.&nbsp;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img className="u-image u-image-round u-preserve-proportions u-radius-10 u-image-3" src="images/kip_ur.png" alt=""
            data-image-width="500" data-image-height="500" />
        </div>
      </section>
      <section className="u-align-center u-clearfix u-grey-80 u-section-5" id="sec-584d">
        <div className="u-clearfix u-sheet u-sheet-1">
          <h2 className="u-text u-text-default u-text-1">Meet the VeThugs family.</h2>
          <div className="u-expanded-width u-gallery u-layout-horizontal u-lightbox u-show-text-on-hover u-gallery-1"
            id="carousel-3c9e">
            <div className="u-gallery-inner u-gallery-inner-1" role="listbox">
              <div className="u-effect-fade u-gallery-item u-gallery-item-1">
                <div className="u-back-slide" data-image-width="500" data-image-height="500"><img className="u-back-image"
                  src="images/96.png" alt='' />
                </div>
              </div>
              <div className="u-effect-fade u-gallery-item u-gallery-item-2">
                <div className="u-back-slide" data-image-width="500" data-image-height="500"><img className="u-back-image"
                  src="images/145.png" alt='' />
                </div>
              </div>
              <div className="u-effect-fade u-gallery-item u-gallery-item-3">
                <div className="u-back-slide" data-image-width="500" data-image-height="500"><img className="u-back-image"
                  src="images/93.png" alt='' />
                </div>
              </div>
              <div className="u-effect-fade u-gallery-item u-gallery-item-4" data-image-width="500" data-image-height="500">
                <div className="u-back-slide"><img className="u-back-image" src="images/73.png" alt='' />
                </div>
              </div>
              <div className="u-effect-fade u-gallery-item u-gallery-item-5" data-image-width="500" data-image-height="500">
                <div className="u-back-slide"><img className="u-back-image" src="images/77.png" alt='' />
                </div>
              </div>
              <div className="u-effect-fade u-gallery-item u-gallery-item-6" data-image-width="500" data-image-height="500">
                <div className="u-back-slide"><img className="u-back-image" src="images/74.png" alt='' />
                </div>
              </div>
            </div>
            <span className="u-gallery-nav u-gallery-nav-prev u-grey-70 u-icon-circle u-opacity u-opacity-70 u-spacing-10 u-text-white u-gallery-nav-1">
              <span aria-hidden="true">
                <svg viewBox="0 0 451.847 451.847">
                  <path d="M97.141,225.92c0-8.095,3.091-16.192,9.259-22.366L300.689,9.27c12.359-12.359,32.397-12.359,44.751,0
c12.354,12.354,12.354,32.388,0,44.748L173.525,225.92l171.903,171.909c12.354,12.354,12.354,32.391,0,44.744
c-12.354,12.365-32.386,12.365-44.745,0l-194.29-194.281C100.226,242.115,97.141,234.018,97.141,225.92z"></path>
                </svg>
              </span>
              <span className="sr-only">
                <svg viewBox="0 0 451.847 451.847">
                  <path d="M97.141,225.92c0-8.095,3.091-16.192,9.259-22.366L300.689,9.27c12.359-12.359,32.397-12.359,44.751,0
c12.354,12.354,12.354,32.388,0,44.748L173.525,225.92l171.903,171.909c12.354,12.354,12.354,32.391,0,44.744
c-12.354,12.365-32.386,12.365-44.745,0l-194.29-194.281C100.226,242.115,97.141,234.018,97.141,225.92z"></path>
                </svg>
              </span>
            </span>
            <span className="u-absolute-vcenter u-gallery-nav u-gallery-nav-next u-grey-70 u-icon-circle u-opacity u-opacity-70 u-spacing-10 u-text-white u-gallery-nav-2"
              href="#" role="button">
              <span aria-hidden="true">
                <svg viewBox="0 0 451.846 451.847">
                  <path d="M345.441,248.292L151.154,442.573c-12.359,12.365-32.397,12.365-44.75,0c-12.354-12.354-12.354-32.391,0-44.744
L278.318,225.92L106.409,54.017c-12.354-12.359-12.354-32.394,0-44.748c12.354-12.359,32.391-12.359,44.75,0l194.287,194.284
c6.177,6.18,9.262,14.271,9.262,22.366C354.708,234.018,351.617,242.115,345.441,248.292z"></path>
                </svg>
              </span>
              <span className="sr-only">
                <svg viewBox="0 0 451.846 451.847">
                  <path d="M345.441,248.292L151.154,442.573c-12.359,12.365-32.397,12.365-44.75,0c-12.354-12.354-12.354-32.391,0-44.744
L278.318,225.92L106.409,54.017c-12.354-12.359-12.354-32.394,0-44.748c12.354-12.359,32.391-12.359,44.75,0l194.287,194.284
c6.177,6.18,9.262,14.271,9.262,22.366C354.708,234.018,351.617,242.115,345.441,248.292z"></path>
                </svg>
              </span>
            </span>
          </div>
        </div>
      </section>
      <section className="u-clearfix u-grey-75 u-section-6" id="carousel_0d20">
        <div className="u-clearfix u-gutter-30 u-layout-wrap u-layout-wrap-1">
          <div className="u-gutter-0 u-layout">
            <div className="u-layout-row">
              <div className="u-container-style u-layout-cell u-left-cell u-size-30 u-layout-cell-1">
                <div className="u-container-layout u-container-layout-1">
                  <h2 className="u-text u-text-1">VeThugs mechanics.</h2>
                  <p className="u-text u-text-2">The first buyable collectibles will be minted in a 10,000 NFT's strong set of
                    collectibles.<br />These NFT's will be minted using an artificial intelligence process that will randomly
                    bring VeThugs to life.There are 12 traits that can be generated.Will you get a regular VeThug&nbsp; or
                    a more rare zombie,&nbsp; alien,&nbsp; vampire or demon VeThug?&nbsp; <br />
                  </p>
                  <a href="/minting"
                    className="u-border-none u-btn u-button-style u-palette-4-dark-1 u-btn-1" title="robots">Minting</a>
                </div>
              </div>
              <div className="u-container-style u-layout-cell u-right-cell u-size-30 u-layout-cell-2">
                <div className="u-container-layout u-valign-middle">
                  <img className="u-image u-image-circle u-image-1" data-image-width="1000" data-image-height="1000" src="/images/vethug......png" alt='' />
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

export default Home