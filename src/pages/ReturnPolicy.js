import React from 'react';

const ReturnPolicy = () => {
    return (
        <div>
            <div className="return-container">
            <h2 className="mt-5" style = {{textAlign: 'center'}}>Return Policy</h2>
                <div style = {{margin: '20px', marginBottom: '220px'}}>
                    <p style = {{textAlign: 'center'}}><b>There is a non return policy on all the products purchased, however, if you have been sent an incorrect shade, you must get in touch with us via email within 24 hours of delivery of the product. Our email address is: skycosmeticlenses@gmail.com.</b></p> 

                    <p>WE CHECK  ALL THE LENSES TWICE BEFORE PACKING THE SHIPMENT, SO PLEASE CHECK LENSES FROM BOTTOM OF VIAL BEFORE OPENING THE SEAL OF A VIAL, IF YOU FIND ANY PROBLEM LIKE LENS IS TORN/CHIPPED PLEASE TAKE A PHOTOGRAPH OF IT, DO NOT OPEN THE SEAL OF THE VIAL AND MAIL THE PICTURES TO US AT skycosmeticlenses@gmail.com, AS SEAL OF THE VIAL ONCE OPENED LENS CAN’T BE REPLACED OR EXCHANGED OR REFUNDED.</p>

                    <p>PLEASE CHECK YOUR POWER WITH YOUR OPTICIAN BEFORE PLACING THE ORDER, AS SELECTION OF POWER WILL BE DONE BY USER AT THE TIME OF PLACING THE ORDER, IF YOU SELECT WRONG POWER AND GET BLURRY VISION WE ARE NOT LIABLE FOR IT. IN SUCH CASE LENSES CAN'T BE REPLACED OR EXCHANGED OR REFUNDED.</p>

                    <p>KINDLY CHECK WITH YOUR OPTOMETRIST BEFORE BUYING THE LENSES, AS SOME PEOPLE HAVE SENSITIVE EYES,  GENERALLY OUR LENSES CAN BE USED BY EVERYONE BUT IN RARE CASE IF YOU FACE ANY PROBLEM/ IRRITATION/ REDNESS USING THE LENSES, WE ARE NOT ACCOUNTABLE FOR IT. IN SUCH SITUATION LENSES CAN'T BE REPLACED OR EXCHANGED OR REFUNDED.</p>
                    
                    <p><b>PLEASE NOTE:</b> Lenses cannot be exchanged if you decide you have changed your mind, therefore, please make your decision carefully before placing an order.</p>
                    
                    <p><b>ORDER CANCELLATION:</b> If you decide to cancel your order, we will consider it however, this is not guaranteed. Our aim is to dispatch orders as quickly as possible and therefore cannot cancel orders once they have been dispatched.</p>

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
                <a className = "app-image-container" href="https://apps.apple.com/in/app/sky-cosmetic-lenses/id1537659278"><img className="image-real" src = "https://i.im.ge/2021/08/12/j57rF.png"/></a>
                    <a className = "app-image-container" href = "https://play.google.com/store/apps/details?id=com.skycosmeticlenses.lenses"><img className="image-real" src = "https://i.im.ge/2021/08/12/j5sV6.png"/></a>
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

export default ReturnPolicy