/* Närsida: inställningar.
   FORMULÄRET: sätt formEndpoint till adressen från en formulärtjänst (till exempel Formspree eller Web3Forms)
   så skickas varje förfrågan till din inkorg. Utan adress skickas ingenting, och formuläret säger det öppet.
   Kontaktuppgifter: byt ut platshållarna nedan mot riktiga uppgifter innan lansering. */
window.NARSIDA = {
  formEndpoint: "",
  fallbackEmail: "",
  contact: {
    email: "support@närsida.se"
  },
  /* Sociala medier: klistra in adressen till respektive konto. Tomma länkar gör ingenting. */
  social: { instagram: "", tiktok: "", youtube: "" },
  company: {
    legalName: "Närsida",
    orgNo: "[ORGANISATIONSNUMMER]",
    address: "[ADRESS]"
  }
};
