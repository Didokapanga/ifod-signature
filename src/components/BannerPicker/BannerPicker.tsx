import type { ChangeEvent } from "react";
import type { BannerData } from "../../types/signature.types";

interface BannerPickerProps {
  banner: BannerData | null;
  onChange: (banner: BannerData | null) => void;
}

function BannerPicker({
  banner,
  onChange,
}: BannerPickerProps) {
  
  const handleChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    const reader = new FileReader();

    reader.onload = () => {
      const dataUrl = reader.result;

      if (typeof dataUrl !== "string") {
        return;
      }

      onChange({
        file,
        previewUrl,
        dataUrl,
      });
    };

    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    if (banner) {
      URL.revokeObjectURL(banner.previewUrl);
    }

    onChange(null);
  };

  return (
    <div className="banner-picker">
      <div className="banner-picker-header">
        <div>
          <label htmlFor="banner">
            Bannière
          </label>

          <span>
            Optionnel — sélectionnez une image depuis
            votre ordinateur.
          </span>
        </div>

        {banner && (
          <button
            type="button"
            onClick={handleRemove}
            className="banner-remove"
          >
            Supprimer
          </button>
        )}
      </div>

      <label
        htmlFor="banner"
        className={`banner-dropzone ${
          banner ? "has-banner" : ""
        }`}
      >
        {banner ? (
          <img
            src={banner.previewUrl}
            alt="Aperçu de la bannière"
          />
        ) : (
          <div className="banner-placeholder">
            <span className="banner-icon">
              ↑
            </span>

            <strong>
              Choisir une bannière
            </strong>

            <span>
              PNG, JPG, JPEG ou WEBP
            </span>
          </div>
        )}
      </label>

      <input
        id="banner"
        name="banner"
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleChange}
        hidden
      />
    </div>
  );
}

export default BannerPicker;