import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";

import components from "./components/index";
import pages from "./pages/index";

import "@rainbow-me/rainbowkit/styles.css";
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli, localhost } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { StateContextProvider } from "./context/index";

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { useState } from "react";

// import.meta.env.ALCHEMY_API_KEY giving undefined
const AlchemyApiKey = "JSjmeHbz9YFP4Lq7nvKXTvwejLiJirLA";

// console.log(import.meta.env);

const { chains, provider } = configureChains(
  [goerli],
  [alchemyProvider({ apiKey: AlchemyApiKey }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Lazyminting",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://api.studio.thegraph.com/query/37907/nft-marketplace-fcc/v0.0.1",
});

function App() {
  const [profileProps, setProfileProps] = useState({});

  return (
    <div className="App">
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          chains={chains}
          coolMode
          theme={darkTheme({
            accentColor: "#2196f3",
            accentColorForeground: "white",
          })}
        >
          <Router>
            <ApolloProvider client={client}>
              <StateContextProvider>
                <components.Navbar />
                <Routes>
                  <Route path="/" element={<pages.Home />} />
                  <Route path="/create" element={<pages.Create />} />
                  <Route
                    path="/profile"
                    element={
                      <pages.Profile setProfileProps={setProfileProps} />
                    }
                  >
                    <Route
                      path="collected"
                      element={<components.NftGallery items={profileProps} />}
                    />
                    <Route
                      path="created"
                      element={<components.NftGallery items={profileProps} />}
                    />
                  </Route>
                  <Route path="/sell" element={<pages.Sell />} />
                  <Route path="/explore" element={<pages.Explore />} />
                  <Route
                    path="nft-details/:id/:id"
                    element={<pages.NftDescription />}
                  />
                </Routes>
                <components.Footer />
              </StateContextProvider>
            </ApolloProvider>
          </Router>
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
}

export default App;
