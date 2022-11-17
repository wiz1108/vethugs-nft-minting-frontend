const NavBar = ({ walletAddress, connectWalletPressed, logout }) => {
  return <header className="u-black u-clearfix u-header u-header" id="sec-e74e">
    <div className="u-clearfix u-sheet u-sheet-1">
      <a href="/" className="u-image u-logo u-image-1" data-image-width="700" data-image-height="170"
        title="Home">
        <img src="images/logo.png" className="u-logo-image u-logo-image-1" alt="" />
      </a>
      <nav className="u-menu u-menu-dropdown u-offcanvas u-menu-1 u-enable-responsive" style={{ marginRight: '15px' }}>
        <div className="menu-collapse menu-collapse-font">
          <span className="u-button-style u-custom-left-right-menu-spacing u-custom-padding-bottom u-custom-top-bottom-menu-spacing u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base">
            <svg>
              <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#menu-hamburger"></use>
            </svg>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
              <defs>
                <symbol id="menu-hamburger" viewBox="0 0 16 16" className="menu-hamburger-size">
                  <rect y="1" width="16" height="2" fill="white"></rect>
                  <rect y="7" width="16" height="2" fill="white"></rect>
                  <rect y="13" width="16" height="2" fill="white"></rect>
                </symbol>
              </defs>
            </svg>
          </span>
        </div>
        {/* <div className="u-custom-menu u-nav-container">
          <ul className="u-nav u-unstyled u-nav-1">
            <li className="u-nav-item"><a
              className="u-button-style u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base"
              href="/">Home</a>
            </li>
            <li className="u-nav-item"><a
              className="u-button-style u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base"
              href="/roadmap">Roadmap</a>
            </li>
            <li className="u-nav-item"><a
              className="u-button-style u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base"
              href="/tokenomics">Tokenomics</a>
            </li>
            <li className="u-nav-item"><a
              className="u-button-style u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base"
              href="/minting">Minting</a>
            </li>
            <li className="u-nav-item"><a
              className="u-button-style u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base"
              href="/marketplace">Black market</a>
            </li>
            {
              !!walletAddress && <li className="u-nav-item"><a className="u-button-style u-nav-link" href="/assets"
              >My Assets</a></li>
            }
            <li className="u-nav-item"><a
              className="u-button-style u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base"
              href="/aboutUs">About us</a>
            </li>
            <li className="u-nav-item"><a
              className="u-button-style u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base"
              href="/contact">Contact</a>
            </li>
            {
              !!walletAddress ? <div className="dropdown u-nav-item">
                <button className="dropbtn">{walletAddress.substr(0, 6)}...{walletAddress.substr(walletAddress.length - 4, 4)}
                </button>
                <div className="dropdown-content">
                  <button onClick={e => logout()}>Log out</button>
                </div>
              </div> : <li className="u-nav-item"><button className="u-button-style u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base" onClick={e => connectWalletPressed()}>Connect your wallet</button></li>
            }
          </ul>
        </div> */}
        <div className="u-custom-menu u-nav-container-collapse">
          <div className="u-black u-container-style u-inner-container-layout u-opacity u-opacity-95 u-sidenav">
            <div className="u-inner-container-layout u-sidenav-overflow">
              <div className="u-menu-close"></div>
              <ul className="u-align-center u-nav u-popupmenu-items u-unstyled u-nav-2">
                <li className="u-nav-item"><a className="u-button-style u-nav-link" href="/"
                >Home</a>
                </li>
                <li className="u-nav-item"><a className="u-button-style u-nav-link" href="/roadmap"
                >Roadmap</a>
                </li>
                <li className="u-nav-item"><a className="u-button-style u-nav-link" href="/tokenomics"
                >Tokenomics</a>
                </li>
                <li className="u-nav-item"><a className="u-button-style u-nav-link" href="/minting"
                >Minting</a>
                </li>
                <li className="u-nav-item"><a className="u-button-style u-nav-link" target="blank" href="https://blackvemarket.com/"
                >BlackVeMarket</a>
                </li>
                {
                  !!walletAddress && <li className="u-nav-item"><a className="u-button-style u-nav-link" href="/assets"
                  >My Assets</a></li>
                }
                <li className="u-nav-item"><a className="u-button-style u-nav-link" href="/aboutUs"
                >About us</a>
                </li>
                <li className="u-nav-item"><a className="u-button-style u-nav-link" href="/contact"
                >Contact</a>
                </li>
                {
                  !!walletAddress ? <div className="dropdown u-nav-item">
                    <button className="dropbtn">{walletAddress.substr(0, 6)}...{walletAddress.substr(walletAddress.length - 4, 4)}
                    </button>
                    <div className="dropdown-content">
                      <button onClick={e => logout()}>Log out</button>
                    </div>
                  </div> : <li className="u-nav-item"><button className="u-button-style u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base" onClick={e => connectWalletPressed()}>Connect your wallet</button></li>
                }
              </ul>
            </div>
          </div>
          <div className="u-black u-menu-overlay u-opacity u-opacity-70"></div>
        </div>
      </nav>
    </div>
  </header>
}

export default NavBar