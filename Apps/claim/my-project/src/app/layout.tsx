import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Avalanche, AvalancheTestnet } from '@particle-network/chains';
import { AuthCoreContextProvider } from '@particle-network/auth-core-modal';
import { PARTICLE_APP_ID, PARTICLE_CLIENT_KEY, PARTICLE_PROJECT_ID } from "@/constants";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Claim your handle",
  description: "Claim your  channel handle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     <AuthCoreContextProvider
      options={{
        projectId: "5d8ff4b5-9f56-42b9-94a9-3e571dd76971",
        clientKey: "coEAg8IqDkfoJRvQEs7E77VQo2TMEoXaCmwAYBGw",
        appId: "2425631a-545c-46b6-8e9f-d57303ce9d68",
        erc4337: {
          name: 'SIMPLE',
          version: '1.0.0',
        },
        wallet: {
          visible: true,
          customStyle: {
              supportChains: [AvalancheTestnet ],
          }
        }
      }}
    >
      <body className={inter.className}>{children}</body>
      </AuthCoreContextProvider>
    </html>
  );
}
