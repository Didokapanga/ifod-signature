import { useState } from "react";

import SignatureForm from "./components/SignatureForm/SignatureForm";
import SignaturePreview from "./components/SignaturePreview/SignaturePreview";
import BannerPicker from "./components/BannerPicker/BannerPicker";

import type {
  BannerData,
  SignatureData,
} from "./types/signature.types";

import "./App.css";

function App() {
  const [signatureData, setSignatureData] =
    useState<SignatureData>({
      nom: "",
      postnom: "",
      prenom: "",
      fonction: "",
      telephone: "",
      email: "",
    });

  const [banner, setBanner] =
    useState<BannerData | null>(null);

  return (
    <main className="app-container">
      <header className="app-header">
        <h1>IFOD Signature</h1>

        <p>
          Créez votre signature professionnelle en
          quelques secondes.
        </p>
      </header>

      <div className="signature-workspace">
        {/* Formulaire */}
        <section className="signature-panel">
          <div className="signature-panel-header">
            <h2>Informations personnelles</h2>

            <p>
              Renseignez les informations qui
              apparaîtront dans votre signature.
            </p>
          </div>

          <div className="signature-panel-body">
            <SignatureForm
              data={signatureData}
              onChange={setSignatureData}
            />

            <BannerPicker
              banner={banner}
              onChange={setBanner}
            />
          </div>
        </section>

        {/* Aperçu */}
        <section className="signature-panel">
          <div className="signature-panel-header">
            <h2>Aperçu de la signature</h2>

            <p>
              La signature se met à jour
              automatiquement.
            </p>
          </div>

          <div className="signature-preview-container">
            <div className="signature-preview-stage">
              <SignaturePreview
                data={signatureData}
                 banner={banner}
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;