const tableGroups = {
    // https://data.statistics.sk/api/index.php
    om: "Demografia a sociálne štatistiky - Obyvateľstvo",
    pr: "Demografia a sociálne štatistiky - Práca",
    np: "Demografia a sociálne štatistiky - Náklady práce",
    sv: "Demografia a sociálne štatistiky - Vzdelávanie",
    zd: "Demografia a sociálne štatistiky - Zdravie",
    ps: "Demografia a sociálne štatistiky - Príjmy a spotreba",
    so: "Demografia a sociálne štatistiky - Sociálna ochrana",
    sk: "Demografia a sociálne štatistiky - Spravodlivosť a kriminalita",
    ku: "Demografia a sociálne štatistiky - Kultúra",
    bv: "Demografia a sociálne štatistiky - Bývanie",
    nu: "Makroekonomické štatistiky - Národné účty",
    zo: "Makroekonomické štatistiky - Zahraničný obchod",
    sp:
        "Makroekonomické štatistiky - Spotrebiteľské ceny a ceny produkčných štatistík",
    kp:
        "Makroekonomické štatistiky - Konjunkturálne prieskumy a spotrebiteľské názory",
    og: "Podnikové štatistiky - Organizačná štatistika",
    pl: "Odvetvové štatistiky - Poľnohospodárstvo, lesníctvo a rybárstvo",
    pm: "Odvetvové štatistiky - Priemysel",
    st: "Odvetvové štatistiky - Stavebníctvo",
    do: "Odvetvové štatistiky - Doprava a poštové služby",
    cr: "Odvetvové štatistiky - Cestovný ruch",
    ob: "Odvetvové štatistiky - Obchod a stravovacie služby",
    ik: "Odvetvové štatistiky - Informácie a komunikácia",
    ts: "Odvetvové štatistiky - Vybrané trhové služby",
    zp: "Životné prostredie",
    ra: "Indikátory - Indikátory rodovej rovnosti",
    kz: "Indikátory - Indikátor kvality života",
    en: "Viacstranné štatistiky - Energetika",
    vh: "Viacstranné štatistiky - Vodné hospodárstvo",
    vt: "Viacstranné štatistiky - Veda, technika a inovácie",
};

// todo better solution?
export function getDatasetId(href: string): string {
    return href.split("/")[6];
}

// todo better solution?
export function getTableGroup(href: string): string {
    const groupId: string = getDatasetId(href).substr(0, 2);
    const name: string = tableGroups[groupId];
    return !!name ? name : groupId;
}
