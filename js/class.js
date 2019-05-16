	function wniosek(numer, data) {
		this.numer = numer;
		this.data = data;
	}

	function kredyt(rodzaj_kredytu, kwota_kredytu, okres_kredytu, splaty_kredytu, cel_kredytu, oprocentowanie, rodzaj_oproc, maks_rata, maks_tws1, maks_tws2) {
		this.rodzaj_kredytu = rodzaj_kredytu;
		this.kwota_kredytu = kwota_kredytu;
		this.okres_kredytu = okres_kredytu;
		this.splaty_kredytu = splaty_kredytu;
		this.cel_kredytu = cel_kredytu;
		this.oprocentowanie = oprocentowanie;
		this.rodzaj_oproc = rodzaj_oproc;
		this.maks_rata = maks_rata;
		this.maks_tws1 = maks_tws1;
		this.maks_tws2 = maks_tws2;
	}

	function wnioskodawca(rodzaj_klienta, imie_nazwisko, pesel, ulica,kod_poczta, ocena_bik, kod_bik, kryteria_bik, dochody, zobowiazania, czy_z_dziecmi) {
		this.rodzaj_klienta = rodzaj_klienta;
		this.imie_nazwisko = imie_nazwisko;
		this.pesel = pesel;
		this.ulica = ulica;
		this.kod_poczta = kod_poczta;
		this.ocena_bik = ocena_bik;
		this.kod_bik = kod_bik;
		this.kryteria_bik = kryteria_bik;
		this.dochody = dochody;
		this.suma_dochodow = sum(dochody);
		this.zobowiazania = zobowiazania;
		this.suma_kosztow_kr = sumKoszt(zobowiazania, 'kr');
		this.suma_kosztow_pr = sumKoszt(zobowiazania, 'pr');
		this.czy_z_dziecmi = czy_z_dziecmi;
		this.ocena_wiarygodnosci = wk(ocena_bik, kod_bik, kryteria_bik);
		
		function sum(dane) {
			var temp = 0;
			$.each(dane, function(index, value){
				temp += parseFloat(value[1]);
			});
			return temp;
		};

		function sumKoszt(dane, prkr) {
			var temp = 0;
			if(prkr == 'kr') {
				$.each(dane, function(index, value) {
					if(value[0] == 'Łączne raty kredytów' || value[0] == 'Udzielone limity') {
						temp += parseFloat(value[1]);
					}
				});
			}
			if(prkr == 'pr') {
				$.each(dane, function(index, value) {
					if(value[0] == 'Udzialone poręczenia') {
						temp += parseFloat(value[1]);
					}
				});
			}
			return temp;
		}
	}
//klasa opisująca gospodarstwo
	function gospodarstwo(ilosc_osob, wydatki_stale, inn_wydatki_stale, koszt_utrzymania, wnioskodawca) {
		this.ilosc_osob = ilosc_osob;
		this.wydatki_stale = wydatki_stale;
		var wydatki_stale_metodyka = 0;
		this.inn_wydatki_stale = inn_wydatki_stale;
		this.koszt_utrzymania = koszt_utrzymania;
		this.wnioskodawca = wnioskodawca;
		this.suma_kosztow = parseFloat(wydatki_stale) + parseFloat(inn_wydatki_stale) + parseFloat(koszt_utrzymania);
		var suma_kosztow_metodyka = 0;
		this.suma_dochodow = sum(wnioskodawca);
		this.gs_rodzaj_kl = gs_pr(wnioskodawca);

		function sum(dane) {
			var temp = 0;
			$.each(dane, function(index, value) {
				temp += value.suma_dochodow;
			});
			return temp;
		}

		function gs_pr(dane) {
			var temp = "Wnioskodawca";
			$.each(dane, function(index, value) {
				if(value.rodzaj_klienta == 'Poręczyciel') {
					temp = 'Poręczyciel';
				}
			});
		return temp;
		}	
	}
//klasa opisujaca zdolnosc kredytowa
	function zdolnosc_kr(gospodarstwa, rata) {
		this.gospodarstwa = gospodarstwa;
		//this.wolne_sr = parseFloat(this.dochody_gs()) - parseFloat(this.koszty_gs()) - parseFloat(this.koszty_pr()) - parseFloat(this.koszty_kr());
		this.rata = rata;
		//this.roz_wol_sr = parseFloat(this.wolne_sr) - parseFloat(this.rata);	
	}
	//pole wyliczające zk
	zdolnosc_kr.prototype.zk = function() {
		var mDTI = maxDTI(this.dochody_gs());
			var temp = 0;

				if((parseFloat(this.dochody_gs()) - parseFloat(this.koszty_gs())) / parseFloat(this.dochody_gs()) <= parseFloat(mDTI)) {
					temp = (parseFloat(this.dochody_gs()) - parseFloat(this.koszty_gs()) - parseFloat(this.koszty_kr()) - parseFloat(this.koszty_pr()) - parseFloat(this.rata)) / parseFloat(this.dochody_gs());
				}
				else {
					temp = parseFloat(mDTI) - ((parseFloat(this.koszty_kr()) + parseFloat(this.koszty_pr()) + parseFloat(this.rata)) / parseFloat(this.dochody_gs()));
				}
			return temp;
	}
	//pole wyliczające wolne środki
	zdolnosc_kr.prototype.wolne_sr = function(rodzaj_kl) {
		var temp = parseFloat(this.dochody_gs(rodzaj_kl)) - parseFloat(this.koszty_gs(rodzaj_kl)) - parseFloat(this.koszty_pr(rodzaj_kl)) - parseFloat(this.koszty_kr(rodzaj_kl));
		return temp;
	}
	//pole wyliczające pozostałe środki do dyspozycji klienta
	zdolnosc_kr.prototype.roz_wol_sr = function(rodzaj_kl, rata) {
		
	}
	//pole wyliczające DTI
	zdolnosc_kr.prototype.dti = function(rodzaj_kl) {
		var temp = (parseFloat(this.koszty_kr(rodzaj_kl)) + parseFloat(this.koszty_pr(rodzaj_kl)) + parseFloat(this.rata))/parseFloat(this.dochody_gs(rodzaj_kl));
		return temp;
	}
	//pole sumujące dochody
	zdolnosc_kr.prototype.dochody_gs = function(rodzaj_kl) {
				var temp = 0;
				$.each(this.gospodarstwa, function(index, value) {
					if(rodzaj_kl == value.gs_rodzaj_kl) {
						temp += parseFloat(value.suma_dochodow);
					}
			});
				return temp;
		}
	//pole sumujące koszty
	zdolnosc_kr.prototype.koszty_gs = function(rodzaj_kl) {
				var temp = 0;
				$.each(this.gospodarstwa, function(index, gs) {
					if(gs.suma_kosztow < gs.suma_kosztow_metodyka) {
						if(rodzaj_kl == gs.gs_rodzaj_kl) {
							temp += gs.suma_kosztow_metodyka;
						}
					}
					else {
						if(rodzaj_kl == gs.gs_rodzaj_kl) {
							temp += gs.suma_kosztow;
						}
					}
				});
			return temp;
	}
	//pole sumujące koszty kredytowe
	zdolnosc_kr.prototype.koszty_kr = function (rodzaj_kl) {
			var temp = 0;
					$.each(this.gospodarstwa, function(index, gs) {
					$.each(gs.wnioskodawca, function(index2, ws) {
						if(rodzaj_kl == gs.gs_rodzaj_kl) {
							temp += ws.suma_kosztow_kr;
						}
					});
				});
			return temp;
	}
	//pole sumujące koszty poręczeń
	zdolnosc_kr.prototype.koszty_pr = function (rodzaj_kl) {
			var temp = 0;
					$.each(this.gospodarstwa, function(index, gs) {
					$.each(gs.wnioskodawca, function(index2, ws) {
						if(rodzaj_kl == gs.gs_rodzaj_kl) {
							temp += ws.suma_kosztow_pr;
						}
					});
				});
			return temp;
	}
	