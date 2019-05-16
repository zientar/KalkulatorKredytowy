//słownik rodzajów kredytów
var rodzaj_kredytu = ["Kredyt gotówkowy", "Kredyt okolicznościowy", "Kredyt w ROR", "Kredyt mieszkaniowy", "Kredyt hipoteczny",
    "Kredyt samochodowy", "Kredyt ratalny", "Kredyt inny konsumpcyjny"];

//słownik częstotliwości spłat kredytów
var czestotliwosc_splat = ["Miesięcznie", "Kwartalnie", "Półrocznie", "Rocznie"];

//słownik typów oprocentowania
var oprocentowanie = ["zmienne", "stałe"];

//słownik typów klientów
var klient_rodzaj = ["Wnioskodawca", "Poręczyciel"];

//kody klasyfikacji uzupełniającej BIK
var kod_uzup = {
    BRAK: "",
    OQ: "Brak w bazie BIK informacji o rachunkach klienta. W bazie BIK mogą być informacje o zapytaniach o klienta.",
    OU: "Klient ogłosił upadłość konsumencką.",
    T1: "Klient posiada jako główny kredytobiorca, współkredytobiorca, przystępujący do długu co najmniej jeden czynny 'zły' rachunek tj. opóźniony o ponad 90 dni z saldem należności wymagalnych większym niż 400 PLN lub opóźniony o ponad 180 dni  z saldem należności wymagalnych większym niż 200 PLN albo rachunek jest w statusie windykacja('0W'), egzekucja('0E'). Dodatkowo klient może posiadać dowolny rachunek i klient nie ogłosił upadłości konsumenckiej",
    T2: "Klient – wg ostatniej dostępnej informacji - posiada jako poręczyciel co najmniej jeden czynny „zły” rachunek tj. opóźniony o ponad 180 dni z saldem należności wymagalnych większym niż 200 PLN albo rachunek jest w statusie windykacja (‘0W’), egzekucja (‘0E’). Dodatkowo klient może posiadać dowolny rachunek, który nie spełnia warunków uzyskania kodu T1 i klient nie ogłosił upadłości konsumenckiej.",
    T3: "Klient posiada jako główny kredytobiorca, współkredytobiorca, przystępujący do długu czynny limit kredytowy z wartością limitu równą 0 i nie posiada rachunków podlegających ocenie. Dodatkowo klient może posiadać dowolny rachunek, który nie spełnia warunków uzyskania kodu T1 lub T2 i klient nie ogłosił upadłości konsumenckiej.",
    T4: "Klient posiada jako główny kredytobiorca, współkredytobiorca, przystępujący do długu czynny bezumowny debet (typ transakcji '44') i nie posiada rachunków podlegających ocenie. Dodatkowo klient może posiadać dowolny rachunek, który nie spełnia warunków uzyskania kodu T1 lub T2 lub T3 i klient nie ogłosił upadłości konsumenckiej.",
    T5: "Klient posiada jako główny kredytobiorca, współkredytobiorca, przystępujący do długu czynny rachunek otwarty w ostatnich 6 miesiącach i zaktualizowany co najmniej raz w ostatnich 3 miesiącach i nie posiada rachunków podlegających ocenie. Dodatkowo klient może posiadać dowolny rachunek, który nie spełnia warunków uzyskania kodu T1 lub T2 lub T3 lub T4 i klient nie ogłosił upadłości konsumenckiej.",
    T6: "Klient posiada jako główny kredytobiorca, współkredytobiorca, przystępujący do długu czynny rachunek nie zaktualizowany ani razu w ostatnich 3 miesiącach i nie posiada rachunków podlegających ocenie. Dodatkowo klient może posiadać dowolny rachunek, który nie spełnia warunków uzyskania kodu T1 lub T2 lub T3 lub T4 lub T5 i klient nie ogłosił upadłości konsumenckiej.",
    T7: "Klient posiada czynny rachunek jako poręczyciel i nie posiada rachunków podlegających ocenie. Dodatkowo klient może posiadać dowolny rachunek, który nie spełnia warunków uzyskania kodu T1 lub T2 lub T3 lub T4 lub T5 lub T6 i klient nie ogłosił upadłości konsumenckiej.",
    T8: "Klient posiada jako główny kredytobiorca, współkredytobiorca, przystępujący do długu zamknięty rachunek w statusie umorzony (‘0U’) lub odzyskany (‘0O’) i nie posiada rachunków podlegających ocenie. Dodatkowo klient może posiadać dowolny rachunek, który nie spełnia warunków uzyskania kodu T1 lub T2 lub T3 lub T4 lub T5 lub T6 lub T7 i klient nie ogłosił upadłości konsumenckiej.",
    T9: "Klient posiada czynny rachunek w relacji innej niż główny kredytobiorca, współkredytobiorca, przystępujący do długu, poręczyciel lub posiada w relacji główny kredytobiorca, współkredytobiorca, przystępujący do długu rachunek zamknięty w statusie innym niż umorzony (‘0U’) lub odzyskany (‘0O’) lub posiada jako poręczyciel rachunek zamknięty i nie posiada rachunków podlegających ocenie i klient nie ogłosił upadłości konsumenckiej."
};

//kryteria negatywne wg. BIK
var kryt_negatywne = {
    pkt1: "W okresie do 3 lat poprzedzających dzień złożenia zapytania do bazy SI BIK – Klient Indywidualny, w historii statusów płatności występowały wartości „windykacja” lub „egzekucja”, w wysokości co najmniej 200 zł;",
    pkt2: "W okresie do 2 lat poprzedzających dzień złożenia zapytania do bazy SI BIK – Klient Indywidualny, w historii statusów płatności występowały wartości ”zaległość powyżej 180 dni”, w wysokości co najmniej 200 zł;",
    pkt3: "W okresie ostatnich 2 lat poprzedzających dzień złożenia zapytania do bazy SI BIK – Klient Indywidualny nastąpiło umorzenie lub odzyskanie należności wymagalnych w wysokości co najmniej 200 zł;",
    pkt4: "W okresie do 1 roku poprzedzającego dzień złożenia zapytania do bazy SI BIK – Klient Indywidualny nastąpiło dla danej transakcji kredytowej więcej niż jedno opóźnienie w spłacie w wysokości co najmniej 200 zł i liczba dni opóźnienia wyniosła 31 – 60 dni (dotyczy statusu „zaległość 31 – 90 dni”);",
    pkt5: "W okresie do 1 roku poprzedzającego dzień złożenia zapytania do bazy SI BIK – Klient Indywidualny występowały należności w statusie „zaległość 91 - 180 dni”, lub „zaległość 31 – 90 dni” z liczbą dni opóźnienia przekraczającą 60 dni, w kwocie co najmniej 200 zł;",
    pkt6: "Bieżąca aktualizacja wskazuje, że łączna kwota aktualnych należności wymagalnych wynosi co najmniej 200 zł, chyba, że Klient udokumentuje uregulowanie zaległości w sposób dla Banku wiarygodny; ",
    pkt7: "W bieżącej aktualizacji rachunek występuje w statusie „windykacja” lub „egzekucja”;",
    pkt8: "Uzyskano z InfoMonitora Biura Informacji Gospodarczej S.A. informacje negatywne udostępniane przez przedsiębiorców na podstawie ustawy z dnia 9 kwietnia  2010 r. o udostępnianiu informacji gospodarczych i wymianie danych gospodarczych (Dz.U. Nr 81, poz. 530 z późn. zm.), dotyczących wiarygodności płatniczej Klientów, w szczególności danych o zwłoce w wykonywaniu zobowiązań pieniężnych."
};

//rodzaje dochodów
var rodzaj_dochodu = ["Umowa o pracę", "Emerytura",
    "Renta inwalidzka", "Renta socjalna", "Renta rodzinna", "Renta strukturalna",
    "Świadczenie przedemerytalne", "Wolne zawody", "Działalność gospodarcza",
    "Gospodarstwo rolne", "Umowa cywilnoprawna", "Umowa najmu", "Aktywa finansowe"];

//rodzaje zobowiązań
var rodzaj_zobowiazania = ["BRAK", "Łączne raty kredytów", "Udzialone poręczenia", "Udzielone limity"];

//maksymalna liczba gospodarstw domowych
var maks_gs = 2;

//maksymalna liczba wnioskodawców ogółem
var maks_wn = 4;

//średnie wynagrodzenie w gospodarce wg GUS
var s_doch_gus = 4530.47;

//minimum socjalne /hipoteka / standard / emeryt, rencista zamieszkujący z dziećmi
var min_soc = [[791, 278], [725, 140], [500, 0]];

//minimalnu prób oceny w BIK
var bik_sco = 451;

//maksymalny okres kredytowania
var max_kred = 180;