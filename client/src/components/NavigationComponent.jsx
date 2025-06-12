import { Link } from "react-router-dom";

export default function NavigationComponent() {
  const leftBtn = (e) => {
    const leftBtn = e.target;
    const tabMenu = leftBtn.nextElementSibling;
    const btnRight = leftBtn.nextElementSibling.nextElementSibling;
    tabMenu.scrollLeft -= 150;
    iconVisibility(tabMenu, btnRight, leftBtn);
  }
  const rightBtn = (e) => {
    const rightBtn = e.target;
    const tabMenu = rightBtn.previousElementSibling;
    const btnLeft = rightBtn.previousElementSibling.previousElementSibling;
    tabMenu.scrollLeft += 150;
    iconVisibility(tabMenu, rightBtn, btnLeft);
  }

  const iconVisibility = (tabMenu, btn1, btn2) => {
    const scrollLeftValue = Math.ceil(tabMenu.scrollLeft);
    const scrollableWidth = tabMenu.scrollWidth - tabMenu.clientWidth
    btn2.style.display = scrollLeftValue > 0 ? 'block' : 'none'
    btn1.style.display = scrollableWidth > scrollLeftValue ? 'block' : 'none';
  }

  return (
    <section className='main-container'>
      <div className="tab-nav-bar">
        <div className="tab-navigation">
          <i onClick={leftBtn} className="uis uis-angle-left left-btn"></i>
          <ul className="tab-menu">
            <li className="tab-btn active"><Link to='/'>Talking Computer 2.0</Link></li>
            <li className="tab-btn"><Link to='/PasswordGenerator'>Password Generator</Link></li>
            <li className="tab-btn"><Link to='/QR-Code-Generator'>QR Code Generator</Link></li>
            <li className="tab-btn"><Link to='/New-Year-Countdown-Timer'>New Year Countdown Timer</Link></li>
            <li className="tab-btn"><Link to='/DigitalCalculator'>Digital Calculator Project</Link></li>
            {/* <li className="tab-btn"><Link to='/AgeCalculator'>Age Calculator</Link></li>
            <li className="tab-btn"><Link to='/CurrencyConverter'>Currency Converter</Link></li>
            <li className="tab-btn"><Link to='/ImageSearch'>Image Search Engine</Link></li> */}
          </ul>
          <i onClick={rightBtn} className="uis uis-angle-right right-btn"></i>
        </div>
      </div>
    </section>
  )
}