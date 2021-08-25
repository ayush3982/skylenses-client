import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div>
            <div className="return-container">
            <h2 className="mt-5" style = {{textAlign: 'center'}}>Privacy Policy</h2>
            <div style = {{margin: '20px', marginBottom: '220px'}}>
                (This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from skycosmeticlenses.com (the “Site”). PERSONAL INFORMATION WE COLLECT When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as “Device Information”.We collect Device Information using the following technologies:- “Cookies” are data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit http://www.allaboutcookies.org.- “Log files” track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps. - “Web beacons”, “tags”, and “pixels” are electronic files used to record information about how you browse the Site.Additionally when you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information (including credit card numbers), email address, and phone number. We refer to this information as "Order Information”. When we talk about “Personal Information” in this Privacy Policy, we are talking both about Device Information and Order Information. HOW DO WE USE YOUR PERSONAL INFORMATION? We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations). Additionally, we use this Order Information to: - Communicate with you; - Screen our orders for potential risk or fraud; and - When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services. We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site (for example, by generating analytics about how our customers browse and interact with the Site, and to assess the success of our marketing and advertising campaigns). BEHAVIOURAL ADVERTISING. As described above, we may in the future use your Personal Information to provide you with targeted advertisements or marketing communications we believe may be of interest to you.  DO NOT TRACK Please note that we do not alter our Site’s data collection and use practices when we see a Do Not Track signal from your browser. DATA RETENTION .When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information. CHANGES. We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons. CONTACT US.For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e mail at
                skycosmeticlenses@gmail.com
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

export default PrivacyPolicy