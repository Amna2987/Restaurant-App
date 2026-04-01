export default function Footer() {
  return (
    <footer className="bg-black text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
            FlavorFiesta
          </h2>
          <p className="mt-3 text-sm">
            Delicious food delivered to your doorstep. Fresh, fast & tasty.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/menu" className="hover:text-white">Menu</a></li>
            <li><a href="/cart" className="hover:text-white">Cart</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contact</h3>
          <p className="text-sm">📍 Lahore, Pakistan</p>
          <p className="text-sm mt-2">📞 +92 300 1234567</p>
          <p className="text-sm mt-2">✉️ support@foodieshub.com</p>
        </div>

        {/* Opening Hours */}
        <div>
          <h3 className="text-white font-semibold mb-3">Opening Hours</h3>
          <p className="text-sm">Mon - Fri: 10:00 AM - 11:00 PM</p>
          <p className="text-sm mt-2">Sat - Sun: 12:00 PM - 12:00 AM</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} Foodies Hub. All rights reserved.
      </div>
    </footer>
  );
}