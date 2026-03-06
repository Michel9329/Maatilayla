// ── FAQ Data Layer ──────────────────────────────────────────────

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export interface FaqCategory {
  id: string
  title: string
  items: FaqItem[]
}

export const faqCategories: FaqCategory[] = [
  // ── 1. Cessione e Prenotazione ──────────────────────────────
  {
    id: 'cessione-prenotazione',
    title: 'Cessione e Prenotazione',
    items: [
      {
        id: 'cessione-tre-mesi',
        question:
          'Perché i cuccioli non vengono ceduti prima dei tre mesi, quando possono essere ceduti già a 60 giorni?',
        answer:
          'Nei primi tre mesi vengono acquisite importanti nozioni di vita, impartite <em>in primis</em> dalla mamma (ma anche dal papà, se presente). I cuccioli attraversano inoltre la fase della <strong>socializzazione</strong>, dove il contatto diretto con i fratellini, con cani adulti e con animali di altre specie è indispensabile affinché, crescendo, sappiano rapportarsi con tutti in modo equilibrato.',
      },
      {
        id: 'pedigree-enci',
        question: 'Quanto tempo ci vuole per ricevere il pedigree ENCI?',
        answer:
          "I tempi di rilascio del pedigree ENCI sono di circa <strong>7-8 mesi</strong> dalla registrazione della cucciolata. Si tratta di tempistiche che non dipendono dall'allevatore ma dall'ente stesso. Al momento della cessione, il cucciolo viene consegnato con la documentazione che certifica l'avvenuta richiesta del pedigree.",
      },
      {
        id: 'caparra-prenotazione',
        question: 'Come funziona la caparra e la prenotazione?',
        answer:
          "La caparra viene versata <strong>dopo un incontro di persona</strong> con l'allevatore e i cuccioli. Non accettiamo prenotazioni a distanza. La caparra è a garanzia dell'impegno reciproco e <strong>non è restituibile</strong> in caso di recesso da parte dell'acquirente.",
      },
      {
        id: 'spedizione-cuccioli',
        question: 'Spedite i cuccioli?',
        answer:
          '<strong>No, rifiutiamo la spedizione.</strong> Valutiamo personalmente ogni famiglia e la consegna avviene sempre di persona. Crediamo che il primo incontro tra il cucciolo e la sua nuova famiglia sia un momento importante, che merita attenzione e presenza.',
      },
      {
        id: 'kit-partenza',
        question: 'Cosa include il kit di partenza?',
        answer:
          'Ogni cucciolo viene consegnato con un kit completo: una confezione dello stesso <strong>mangime usato in allevamento</strong>, il <strong>libretto sanitario</strong> aggiornato, la documentazione per il <strong>pedigree ENCI</strong>, il <strong>contratto di cessione</strong> e una guida pratica per affrontare al meglio le prime settimane insieme.',
      },
      {
        id: 'scelta-cucciolo',
        question: 'Come avviene la scelta del cucciolo?',
        answer:
          "L'allevatore guida la scelta in base al <strong>carattere del cucciolo</strong>, alle esigenze della famiglia e al suo stile di vita. Non è solo una questione di colore o sesso: ogni cucciolo ha una personalità unica, e il nostro obiettivo è creare l'abbinamento migliore possibile.",
      },
    ],
  },

  // ── 2. Salute e Vaccinazioni ────────────────────────────────
  {
    id: 'salute-vaccinazioni',
    title: 'Salute e Vaccinazioni',
    items: [
      {
        id: 'uscire-subito',
        question: 'Si può portare il cucciolo fuori sin da subito?',
        answer:
          'I nostri cuccioli vengono ceduti completi di <strong>tre vaccinazioni</strong>, pertanto è possibile farlo uscire sin dal primo giorno di arrivo nella nuova casa.',
      },
      {
        id: 'test-genetici',
        question: 'Quali test genetici vengono effettuati?',
        answer:
          "Effettuiamo il test <strong>prcd-PRA</strong> per escludere l'atrofia retinica progressiva, la valutazione per la <strong>lussazione rotulea</strong> e un certificato veterinario completo sui genitori. Garantiamo <strong>trasparenza totale</strong> sulla salute della linea genetica.",
      },
      {
        id: 'garanzie-sanitarie',
        question: 'Quali garanzie sanitarie offrite?',
        answer:
          'Ogni cucciolo viene ceduto con un <strong>contratto che include garanzie sanitarie</strong>, certificato veterinario, copertura vaccinale completa con tre vaccinazioni e <strong>microchip già inserito</strong>.',
      },
    ],
  },

  // ── 3. Cura e Gestione ──────────────────────────────────────
  {
    id: 'cura-gestione',
    title: 'Cura e Gestione',
    items: [
      {
        id: 'gestione-bisogni',
        question: 'Come affrontare la gestione dei bisogni?',
        answer:
          "L'uso dei tappetini igienici è certamente comodo, soprattutto per chi non ha un giardino. È consigliabile, però, abituare il cucciolo sin dal primo giorno a fare i bisogni fuori, <strong>gratificandolo con coccole o un premietto</strong> quando si libera nel posto desiderato.<br><br>Portatelo fuori appena si sveglia, dopo i pasti e subito dopo il gioco: sono i momenti in cui avverte di più lo stimolo. In generale, nei primi tempi, più lo si porta fuori e meglio è.",
      },
      {
        id: 'cappottino-inverno',
        question: 'È indispensabile coprirlo in inverno?',
        answer:
          'Se la temperatura è molto bassa e si sta fuori a lungo, è meglio proteggere il barboncino con un <strong>cappottino</strong>. Ricordiamo che il barboncino, non avendo sottopelo, è più sensibile alle basse temperature e alle escursioni termiche.',
      },
      {
        id: 'lavaggio-spazzolatura',
        question: 'Ogni quanto va lavato e spazzolato?',
        answer:
          'Il pelo del barboncino ha una struttura molto simile a quella del capello umano: può essere lavato tranquillamente anche <strong>ogni settimana o 10 giorni</strong>, se necessario. Usate uno shampoo delicato e un buon balsamo per facilitare la toelettatura.<br><br>Una <strong>spazzolata settimanale</strong> con cardatore e pettine è sufficiente a evitare la formazione di nodi fastidiosi.',
      },
      {
        id: 'perdita-pelo',
        question: 'Il barboncino perde pelo?',
        answer:
          '<strong>No, il barboncino non ha sottopelo.</strong> Il suo pelo ha una struttura simile al capello umano: cresce continuamente senza cadere. Per questo è considerato una razza <strong>ipoallergenica</strong>, ideale per chi soffre di allergie.',
      },
    ],
  },

  // ── 4. Alimentazione ────────────────────────────────────────
  {
    id: 'alimentazione',
    title: 'Alimentazione',
    items: [
      {
        id: 'pasti-giornalieri',
        question: 'Quanti pasti bisogna somministrare al cucciolo?',
        answer:
          "A tre mesi, e almeno fino ai sei, è opportuno offrire <strong>tre pasti giornalieri</strong>. Dal sesto mese in poi si può passare a due pasti al giorno, da mantenere per tutta la vita. Un solo pasto quotidiano favorirebbe l'insorgenza di gastriti.",
      },
      {
        id: 'tipologia-cibo',
        question: 'Quale cibo somministrare al cucciolo?',
        answer:
          "Nello starter-kit è presente una confezione dello stesso mangime usato in allevamento: <strong>croccantini di qualità premium</strong> che forniscono tutti gli elementi nutritivi necessari per la fase di accrescimento.<br><br>Se decidete di cambiare marca o tipologia, fatelo <strong>gradualmente</strong> nell'arco di una settimana, aumentando poco per volta la dose del nuovo mangime. Se optate per il cibo casalingo, assicuratevi che contenga tutti i nutrienti necessari, bilanciando carboidrati, proteine e vitamine con gli appositi integratori.",
      },
    ],
  },

  // ── 5. Taglia, Biosensor e Socializzazione ─────────────────
  {
    id: 'taglia-biosensor-socializzazione',
    title: 'Taglia, Biosensor e Socializzazione',
    items: [
      {
        id: 'garanzia-taglia-toy',
        question: 'Potete garantire che il cucciolo rimarrà toy?',
        answer:
          "Nessun allevatore serio può dare una <strong>garanzia al 100% sulla taglia definitiva</strong>, perché la genetica comporta sempre un margine di variabilità. Nella nostra esperienza, ci è capitato una o due volte che all'interno della stessa cucciolata un cucciolo raggiungesse da adulto la taglia <strong>nana</strong>, mentre il fratellino risultasse leggermente al di sotto dell'altezza minima al garrese prevista dallo standard per un barboncino toy.<br><br>Sono eccezioni rare, ma proprio per onestà verso le famiglie preferiamo essere trasparenti: <strong>selezioniamo con cura le linee di sangue</strong> per mantenere la taglia toy, ma la natura ha sempre l'ultima parola.",
      },
      {
        id: 'taglia-adulta',
        question: 'Quanto cresce un barboncino toy?',
        answer:
          "Il barboncino toy adulto raggiunge un'altezza al garrese di <strong>24-28 cm</strong> e un peso tra <strong>2,5 e 4 kg</strong>. Le femmine tendono a essere leggermente più piccole. La taglia definitiva si raggiunge intorno ai <strong>10-12 mesi</strong> di età.",
      },
      {
        id: 'programma-biosensor',
        question: 'In cosa consiste il programma Biosensor?',
        answer:
          "Usato per la prima volta dall'esercito americano, il programma Biosensor consiste in una <strong>stimolazione sensoriale neonatale</strong>. Dal terzo al sedicesimo giorno di vita, i cuccioli vengono sottoposti a piccoli stress attraverso stimoli termici, tattili e di movimento, che attivano il sistema endocrino e le ghiandole surrenali.<br><br>Gli studi dimostrano che da adulti questi cuccioli risultano <strong>più resistenti al freddo e alle malattie</strong>, maturano più velocemente, risolvono meglio i problemi e hanno una maggiore tolleranza allo stress.",
      },
    ],
  },
]
