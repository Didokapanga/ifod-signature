import type {
  BannerData,
  SignatureData,
} from "../types/signature.types";

import { signatureConfig } from "../config/signature.config";

const assetUrl = (path: string): string => {
  return new URL(path, window.location.origin).href;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttribute(value: string): string {
  return escapeHtml(value);
}

function getFullName(data: SignatureData): string {
  return [
    data.prenom,
    data.nom,
    data.postnom,
  ]
    .filter(Boolean)
    .join(" ");
}

export function generateSignatureHtml(
  data: SignatureData,
  banner: BannerData | null,
): string {
  const fullName = getFullName(data);

  const socialLinks =
    signatureConfig.socialNetworks
      .map(
        (social) => `
          <a
            href="${escapeAttribute(social.url)}"
            target="_blank"
            style="
              display:inline-block;
              text-decoration:none;
              margin-right:6px;
            "
          >
            <img
              src="${escapeAttribute(assetUrl(social.icon))}"
              alt="${escapeAttribute(social.name)}"
              width="18"
              height="18"
              style="
                display:block;
                width:18px;
                height:18px;
                border:0;
              "
            />
          </a>
        `,
      )
      .join("");

  const bannerHtml = banner
    ? `
      <tr>
        <td
          style="
            padding-top:14px;
          "
        >
          <img
            src="${escapeAttribute(banner.dataUrl)}"
            alt="Bannière"
            style="
              display:block;
              width:100%;
              max-width:560px;
              height:auto;
              border:0;
            "
          />
        </td>
      </tr>
    `
    : "";

  return `
<table
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="
    width:100%;
    max-width:620px;
    font-family:Arial,Helvetica,sans-serif;
    color:#172033;
    border-collapse:collapse;
  "
>
  <tr>
    <td
      style="
        padding:0 0 14px 0;
        vertical-align:top;
      "
    >

      <div
        style="
          margin:0;
          padding:0;
          font-size:18px;
          line-height:24px;
          font-weight:700;
          color:#172033;
        "
      >
        ${escapeHtml(fullName)}
      </div>

      <div
        style="
          margin:3px 0 0 0;
          padding:0;
          font-size:13px;
          line-height:19px;
          color:#667085;
        "
      >
        ${escapeHtml(data.fonction)}
      </div>

      ${
        data.telephone
          ? `
            <div
              style="
                margin:3px 0 0 0;
                padding:0;
                font-size:13px;
                line-height:19px;
              "
            >
              <a
                href="tel:${escapeAttribute(data.telephone)}"
                style="
                  color:#667085;
                  text-decoration:none;
                "
              >
                ${escapeHtml(data.telephone)}
              </a>
            </div>
          `
          : ""
      }

      ${
        data.email
          ? `
            <div
              style="
                margin:3px 0 0 0;
                padding:0;
                font-size:13px;
                line-height:19px;
              "
            >
              <a
                href="mailto:${escapeAttribute(data.email)}"
                style="
                  color:#667085;
                  text-decoration:none;
                "
              >
                ${escapeHtml(data.email)}
              </a>
            </div>
          `
          : ""
      }

    </td>
  </tr>

  <tr>
    <td
      style="
        border-top:1px solid #e4e8ee;
        padding-top:14px;
        vertical-align:top;
      "
    >

      <div
        style="
          margin:0;
          padding:0;
          font-size:15px;
          line-height:20px;
          font-weight:700;
          color:#2563eb;
        "
      >
        ${escapeHtml(signatureConfig.institution.name)}
      </div>

      <div
        style="
          margin:3px 0 0 0;
          padding:0;
          font-size:12px;
          line-height:18px;
          color:#667085;
        "
      >
        📍 ${escapeHtml(
          signatureConfig.institution.address,
        )}
      </div>

      <div
        style="
          margin:3px 0 0 0;
          padding:0;
          font-size:12px;
          line-height:18px;
        "
      >
        <a
          href="${escapeAttribute(
            signatureConfig.institution.website,
          )}"
          target="_blank"
          style="
            color:#2563eb;
            text-decoration:none;
          "
        >
          🌐 www.ifodsa.cd
        </a>
      </div>

    </td>
  </tr>

  <tr>
    <td
      style="
        padding-top:14px;
        vertical-align:middle;
      "
    >

      <span
        style="
          display:inline-block;
          margin-right:8px;
          font-size:12px;
          line-height:18px;
          font-weight:600;
          color:#667085;
          vertical-align:middle;
        "
      >
        Suivez-nous :
      </span>

      ${socialLinks}

    </td>
  </tr>

  ${bannerHtml}

  <tr>
    <td
      style="
        padding-top:12px;
        border-top:1px solid #eef0f3;
      "
    >
      <span
        style="
          font-size:12px;
          line-height:18px;
          font-weight:600;
          color:#344054;
        "
      >
        ${escapeHtml(
          signatureConfig.institution.slogan,
        )}
      </span>
    </td>
  </tr>
</table>
  `.trim();
}