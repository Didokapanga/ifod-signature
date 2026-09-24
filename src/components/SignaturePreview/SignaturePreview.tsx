import { useState } from "react";
import type {
  BannerData,
  SignatureData,
} from "../../types/signature.types";
import { signatureConfig } from "../../config/signature.config";
import { generateSignatureHtml } from "../../utils/signatureHtml";

interface SignaturePreviewProps {
  data: SignatureData;
  banner: BannerData | null;
}

function SignaturePreview({
  data,
  banner,
}: SignaturePreviewProps) {
  const [copied, setCopied] = useState(false);

  const fullName = [
    data.prenom,
    data.nom,
    data.postnom,
  ]
    .filter(Boolean)
    .join(" ");

  const handleCopy = async () => {
    const html = generateSignatureHtml(
        data,
        banner,
    );

    const plainText = [
        fullName,
        data.fonction,
        data.telephone,
        data.email,
        signatureConfig.institution.name,
        // signatureConfig.institution.fullName,
        signatureConfig.institution.address,
        signatureConfig.institution.website,
        signatureConfig.institution.slogan,
    ]
        .filter(Boolean)
        .join("\n");

    try {
        await navigator.clipboard.write([
        new ClipboardItem({
            "text/html": new Blob(
            [html],
            { type: "text/html" },
            ),
            "text/plain": new Blob(
            [plainText],
            { type: "text/plain" },
            ),
        }),
        ]);

        setCopied(true);

        setTimeout(() => {
        setCopied(false);
        }, 2000);
    } catch (error) {
        console.error(
        "Impossible de copier la signature :",
        error,
        );
    }
    };

  return (
    <div className="signature-preview">
      {/* Signature à copier */}
      <div
        id="signature-to-copy"
        className="signature-card"
      >
        {/* Identité */}
        <div className="signature-identity">
          <strong>
            {fullName}
          </strong>

          <span>
            {data.fonction}
          </span>

          {data.telephone && (
            <a href={`tel:${data.telephone}`}>
              {data.telephone}
            </a>
          )}

          {data.email && (
            <a href={`mailto:${data.email}`}>
              {data.email}
            </a>
          )}
        </div>

        {/* Séparateur */}
        <div className="signature-divider" />

        {/* Informations institutionnelles */}
        <div className="signature-institution">
          <strong>
            {signatureConfig.institution.name}
          </strong>

          {/* <span>
            {signatureConfig.institution.fullName}
          </span> */}

          <span>
            📍 {signatureConfig.institution.address}
          </span>

          <a
            href={signatureConfig.institution.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            🌐 www.ifodsa.cd
          </a>
        </div>

        {/* Réseaux sociaux */}
        <div className="signature-socials">
          <span>
            Suivez-nous :
          </span>

          <div className="social-icons">
            {signatureConfig.socialNetworks.map(
              (social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.name}
                >
                  <img
                    src={social.icon}
                    alt={social.name}
                  />
                </a>
              ),
            )}
          </div>
        </div>

        {/* Bannière */}
        {banner && (
          <div className="signature-banner">
            <img
              src={banner.previewUrl}
              alt="Bannière"
            />
          </div>
        )}

        {/* Slogan */}
        <div className="signature-slogan">
          {signatureConfig.institution.slogan}
        </div>
      </div>

      {/* Actions — hors de la signature */}
      <div className="signature-actions">
        <button
          type="button"
          className="copy-signature-button"
          onClick={handleCopy}
        >
          {copied
            ? "✓ Signature copiée"
            : "Copier la signature"}
        </button>
      </div>
    </div>
  );
}

export default SignaturePreview;