//wyliczenie maxDTI
function maxDTI(dochody_wn) {
	var dti = 0;

	
	if(parseFloat(dochody_wn) < parseFloat(s_doch_gus)) {
		dti = 0.50;
	}
	else {
		dti = 0.65;
	}
	return dti;
};

//określenie wiarygodności kredytowej
function wk(biksco, kod_bik, kryt_bik) {
	var wiar_kr = {};
	
	if(biksco < bik_sco) {
		wiar_kr['Ocena punktowa BIK'] = false;
	}
	else{
		wiar_kr['Ocena punktowa BIK'] = true;
	}

	wiar_kr['Kod wykluczenia'] = true;
		
		if(kod_bik == 'OU' || kod_bik == 'T1' || kod_bik == 'T8') {
			wiar_kr['Kod wykluczenia'] = false;
		}

	wiar_kr['Kryteria negatywne'] = true;
	if(kryt_bik.length > 0) {
		wiar_kr['Kryteria negatywne'] = false;
	}
	return wiar_kr;
};
//wyznaczenie wydatków stałych zgodnie z metodyką
function metodyka_wyd_stale(okres_kredytu, czy_z_dziecmi, rodzaj_kredytu, liczba_osob) {
	var temp = 0;
	if(okres_kredytu >= 60 && czy_z_dziecmi == false || rodzaj_kredytu == 'Kredyt hipoteczny') {
		temp = parseFloat(liczba_osob) * min_soc[0][0] + min_soc[0][1];
	}
	else if(czy_z_dziecmi == true) {
		temp = parseFloat(liczba_osob) * min_soc[2][0] + min_soc[2][1];
	}
	else {
		temp = parseFloat(liczba_osob) * min_soc[1][0] + min_soc[1][1];
	}
	return temp;
}

Number.prototype.format = function(n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));

    return ((c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ',')) + ' PLN');
};