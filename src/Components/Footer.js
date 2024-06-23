import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white mt-10">
      {/* Top Section */}
      <div className="container mx-auto py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left border-b border-gray-200">
        <div className="px-4 mx-3" style={{borderRight:"1px solid #e2e2e2"}}>
          <img src="/lock.jpeg" alt="Secure Payments" className="mx-auto md:mx-0" />
          <h3 className="text-lg font-semibold mt-2">100% SECURE PAYMENTS</h3>
          <p className="text-sm">Moving your card details to a much more secured place</p>
        </div>
        <div className="px-4" style={{borderRight:"1px solid #e2e2e2"}}>
          <img src="/secure.jpeg" alt="TrustPay" className="mx-auto md:mx-0" />
          <h3 className="text-lg font-semibold mt-2">TRUSTPAY</h3>
          <p className="text-sm">100% Payment Protection. Easy Return Policy</p>
        </div>
        <div className="px-4"  style={{borderRight:"1px solid #e2e2e2"}}>
          <img src="/support.jpeg" alt="Help Center" className="mx-auto md:mx-0" />
          <h3 className="text-lg font-semibold mt-2">HELP CENTER</h3>
          <p className="text-sm">Got a question? Look no further. Browse our FAQs or submit your query here.</p>
        </div>
        <div className="px-4"  style={{borderRight:"1px solid #e2e2e2"}}>
          <img src="/conatct.jpeg" alt="Shop on the Go" className="mx-auto md:mx-0" />
          <h3 className="text-lg font-semibold mt-2">SHOP ON THE GO</h3>
          <p className="text-sm">Download the app and get exciting app only offers at your fingertips</p>
        </div>
      </div>

      {/* Links Section */}
      <div className="bg-white py-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 px-4">
          <div>
            <h3 className="font-semibold mb-2">POLICY INFO</h3>
            <ul>
              <li><a href="/" className="text-sm hover:underline">Privacy Policy</a></li>
              <li><a href="/" className="text-sm hover:underline">Terms of Sale</a></li>
              <li><a href="/" className="text-sm hover:underline">Terms of Use</a></li>
              <li><a href="/" className="text-sm hover:underline">Report Abuse & Takedown Policy</a></li>
              <li><a href="/" className="text-sm hover:underline">Know Your BIS Standard</a></li>
              <li><a href="/" className="text-sm hover:underline">Products Under Compulsory BIS Certification</a></li>
              <li><a href="/" className="text-sm hover:underline">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">COMPANY</h3>
            <ul>
              <li><a href="/" className="text-sm hover:underline">Impact@Snapdeal</a></li>
              <li><a href="/" className="text-sm hover:underline">Careers</a></li>
              <li><a href="/" className="text-sm hover:underline">Blog</a></li>
              <li><a href="/" className="text-sm hover:underline">Sitemap</a></li>
              <li><a href="/" className="text-sm hover:underline">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">SNAPDEAL BUSINESS</h3>
            <ul>
              <li><a href="/" className="text-sm hover:underline">Shopping App</a></li>
              <li><a href="/" className="text-sm hover:underline">Sell on Snapdeal</a></li>
              <li><a href="/" className="text-sm hover:underline">Media Enquiries</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">POPULAR LINKS</h3>
            <ul>
              <li><a href="/" className="text-sm hover:underline">Lehenga</a></li>
              <li><a href="/" className="text-sm hover:underline">Kid's Clothing</a></li>
              <li><a href="/" className="text-sm hover:underline">Sarees</a></li>
              <li><a href="/" className="text-sm hover:underline">Winter Wear</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">SUBSCRIBE</h3>
            <form>
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 border border-gray-300 rounded mb-2"
              />
              <button className="w-full px-4 py-2 bg-gray-800 text-white rounded">SUBSCRIBE</button>
            </form>
            <p className="text-sm mt-2">Register now to get updates on promotions and coupons. <a href="/" className="text-blue-600 hover:underline">Or Download App</a></p>
          </div>
        </div>
      </div>

      {/* Payment and Social Media Section */}
      
    </footer>
  );
};

export default Footer;
