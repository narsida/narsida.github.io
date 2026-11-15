/* Närsida: inställningar.
   FORMULÄRET: sätt formEndpoint till adressen från en formulärtjänst (till exempel Formspree eller Web3Forms)
   så skickas varje förfrågan till din inkorg. Utan adress skickas ingenting, och formuläret säger det öppet.
   Kontaktuppgifter: byt ut platshållarna nedan mot riktiga uppgifter innan lansering. */
window.NARSIDA = {
  formEndpoint: "https://api.web3forms.com/submit", formAccessKey: "38c08e5a-46d6-4453-9899-2a75be0fa48a",
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
