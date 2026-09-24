import type { ChangeEvent } from "react";
import type { SignatureData } from "../../types/signature.types";

interface SignatureFormProps {
  data: SignatureData;
  onChange: (data: SignatureData) => void;
}

function SignatureForm({
  data,
  onChange,
}: SignatureFormProps) {
  const handleChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    onChange({
      ...data,
      [name]: value,
    });
  };

  return (
    <section className="signature-form">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="nom">Nom</label>
          <input
            id="nom"
            name="nom"
            type="text"
            value={data.nom}
            onChange={handleChange}
            placeholder="Votre nom"
          />
        </div>

        <div className="form-group">
          <label htmlFor="postnom">Postnom</label>
          <input
            id="postnom"
            name="postnom"
            type="text"
            value={data.postnom}
            onChange={handleChange}
            placeholder="Votre postnom"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="prenom">Prénom</label>
          <input
            id="prenom"
            name="prenom"
            type="text"
            value={data.prenom}
            onChange={handleChange}
            placeholder="Votre prénom"
          />
        </div>

        <div className="form-group">
          <label htmlFor="fonction">Fonction</label>
          <input
            id="fonction"
            name="fonction"
            type="text"
            value={data.fonction}
            onChange={handleChange}
            placeholder="Votre fonction"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="telephone">Téléphone</label>
          <input
            id="telephone"
            name="telephone"
            type="tel"
            value={data.telephone}
            onChange={handleChange}
            placeholder="+243 ..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={data.email}
            onChange={handleChange}
            placeholder="prenom.nom@ifodsa.com"
          />
        </div>
      </div>
    </section>
  );
}

export default SignatureForm;