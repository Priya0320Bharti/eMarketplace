// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { CartProvider } from '@/context/CartContext';
import { VoiceProvider } from "@/context/VoiceContext";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "eMarketplace - Your Shopping Destination",
  description: "Shop the latest products at great prices",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <VoiceProvider>
          <CartProvider>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 2000,
                style: {
                  background: '#333',
                  color: '#fff',
                },
                success: {
                  duration: 2000,
                  iconTheme: {
                    primary: '#22c55e',
                    secondary: '#fff',
                  },
                },
              }}
            />
            {children}
          </CartProvider>
        </VoiceProvider>
      </body>
    </html>
  );
}
