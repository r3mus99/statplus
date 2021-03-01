const tableGroups = {
    // todo https://data.statistics.sk/api/index.php
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
};

export function getTableId(href: string): string {
    return href.split("/")[6];
}

export function getTableGroup(href: string): string {
    const groupId: string = getTableId(href).substr(0, 2);
    const name: string = tableGroups[groupId];
    return !!name ? name : groupId;
}
