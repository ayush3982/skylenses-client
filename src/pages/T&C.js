import React from 'react';

const Terms = () => {
    return (
        <div>
            <div className="return-container">
            <h2 className="mt-5" style = {{textAlign: 'center'}}>Terms & Conditions</h2>
            <div style = {{margin: '20px',  marginBottom: '240px'}}>
                <p><b>PLEASE NOTE:</b> You must read and agree to all our terms and conditions before placing an order. We will not be accountable for any infections or any problems to your eyes that are caused especially if you have misused the product. Lens infections can take place. If any infections or damages are caused, Sky cosmetic lenses will not be responsible for. It is important that you take full care of the lens as it is very important. You must be 18 or above to purchase lenses from us. If you have any questions you’d like to ask, don’t hesitate to contact us on our email id:
                    skycosmeticlenses@gmail.com
                </p>    

                <p>IMPORTANT</p>
                <p>- Please keep the lenses in solution ans replace after every use.</p>
                <p>- Lenses must be soaked overnight before first use.</p>
                <p>- Lenses may vary in appearence from person to person.</p>

            </div>
        </div>
        <div className="footer-container">
          <div className="footer-box row">
            <div className="footer-section col-md- 3">
              <div className="get-app-container">
                <div className="app-image">
                  <img className="image-real" src = "https://i.im.ge/2021/08/12/jjUpM.png"/>
                </div>
                  <div className="app-heading margin-top">
                    Marketed By
                  </div>
                  <p className = "branding-text">VYOMAN CLAIRE PVT LTD.</p>
                  <p className = "branding-text">GSTIN: 07AAHCV4657N1ZM</p>
              </div>
            </div>
            <div className="footer-section col-md- 3">
              <div className="get-app-container">
                <div className="app-heading">Get Our App</div>
                <div className="app-image">
                  <img className="image-real" src = "https://i.im.ge/2021/08/12/j57rF.png"/>
                  <img className="image-real" src = "https://i.im.ge/2021/08/12/j5sV6.png"/>
                </div>
              </div>
            </div>
            <div className="footer-section col-md- 3">
              <div className="get-app-container">
              <div className="app-heading">Shop Our Range</div>
                <a href = "/category/6-months" style = {{color: 'white'}}><p className = "branding-text mt-2">6 &nbsp; Months</p></a>
                <a href = "/category/3-months" style = {{color: 'white'}}><p className = "branding-text mt-2">3 &nbsp; Months</p></a>
                <a href = "/category/1-month" style = {{color: 'white'}}><p className = "branding-text mt-2">1 &nbsp; Month</p></a>
                <a href = "/category/1-day" style = {{color: 'white'}}><p className = "branding-text mt-2">1 &nbsp; Day</p></a>
              </div>
            </div>
            <div className="footer-section col-md- 3">
            <div className="get-app-container">
              <div className="app-heading">Our Policies</div>
                <a href = "/privacypolicy" style = {{color: 'white'}}><p className = "branding-text mt-2">Privacy and Policy</p></a>
                <a href = "/returnpolicy" style = {{color: 'white'}}><p className = "branding-text mt-2">Return Policy</p></a>
                <a href = "/tandc" style = {{color: 'white'}}><p className = "branding-text mt-2">Terms & Conditions</p></a>
              </div>
            </div>
            <p className = "copyright">© skycosmeticlenses.com All Rights Reserved.</p>
          </div>
        </div>
        </div>
    )
}

export default Terms