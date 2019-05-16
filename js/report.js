
//dodanie zakładek w zależności czy tws1 i tws2 istnieją
function rap_tws1 () {
			if($('#krtws1').length > 0 && $('#raport_tws1').length == 0) {
    				$('#grupa_raportow ul').append('<li id="raport_zk_tws1"><a role="tab" data-toggle="tab" href="#raport_tws1"><strong>Raport dla TWS przy 200pp</strong></a></li>');
    				$('#karty_raport').append('<div id="raport_tws1" class="tab-pane"></div>');

    	}
 }

 function rap_tws2 () {
			if($('#krtws2').length > 0 && $('#raport_tws2').length == 0) {
    				$('#grupa_raportow ul').append('<li id="raport_zk_tws2"><a role="tab" data-toggle="tab" href="#raport_tws2"><strong>Raport dla TWS przy 400pp</strong></a></li>');
    				$('#karty_raport').append('<div id="raport_tws2" class="tab-pane"></div>');
    	}
 }

//generowanie raportu
 function wyp_rap(wniosek, kredyt, zdolnosc) {
 	//dodanie przycisków do stopki raportu
	$('#footerReport').append('<div class="col-md-4 col-lg-4"><button type="button pull-left" class="btn btn-primary btn-block" id="Wroc"><strong>Wróć</strong></button></div>\
						<div class="col-md-4 col-lg-4"><button type="button pull-left" class="btn btn-primary btn-block" id="Drukuj"><strong>Drukuj bieżącą stronę</strong></button></div>\
						<div class="col-md-4 col-lg-4"><button type="button pull-left" class="btn btn-primary btn-block" id="Drukuj2"><strong>Drukuj wszystko</strong></button></div>');
	//dodanie zakładki dla raportu
	$('#bodyReport').append('<div class="page-header container"><h5 class="text-center"><strong>Raport z oceny zdolności kredytowej dla osób fizycznych</strong></h5>\
					 </div><div class="container" id="grupa_raportow"><ul class="nav nav-tabs" role="tablist">\
					 <li id="raport_zk" class="tab-pane active"><a role="tab" data-toggle="tab" href="#raport_body"><strong>Raport zdolności kredytowej</strong></a></li></ul>\
					 <div id="karty_raport" class="tab-content">\
					 <div id="raport_body" class="tab-pane active"></div></div></div>');
 	//dodanie informacji o wniosku
 	$('#raport_body').append('<table class="table table-bordered" id="wniosek"><tbody>\
 			<tr><th scope ="row"><strong>Numer w rejestrze wniosków</strong></th>\
 			<td class="text-center">' + wniosek.numer + '</td></tr>\
 			<tr><th scope ="row"><strong>Data wpływu</strong></th>\
 			<td class="text-center">' + wniosek.data + '</td></tr>\
 		</tbody></table>');

 	//dodanie informacji o kredycie
 	$('#raport_body').append('<table class="table table-bordered" id="kredyt"><tbody>\
 			<tr><th scope ="row">Rodzaj wnioskowanego kredytu</th>\
 			<td class="text-center">' + kredyt.rodzaj_kredytu + '</td></tr>\
 			<tr><th scope ="row">Kwota wnioskowanego kredytu</th>\
 			<td class="text-center">' + Number(kredyt.kwota_kredytu).format(2, 3, ' ', ',') + '</td></tr>\
 			<tr><th scope ="row">Okres kredytowania w miesiącach</th>\
 			<td class="text-center">' + kredyt.okres_kredytu + '</td></tr>\
 			<tr><th scope ="row">Cel transakcji finansowej</th>\
 			<td class="text-center">' + kredyt.cel_kredytu + '</td></tr>\
 			<tr><th scope ="row">Oprocentowanie</th>\
 			<td class="text-center">' + kredyt.oprocentowanie + '% ' + kredyt.rodzaj_oproc + '</td></tr>\
 			<tr><th scope ="row">Częstotliwość spłat</th>\
 			<td class="text-center">' + kredyt.splaty_kredytu + '</td></tr>\
 			<tr><th scope ="row">Maksymalna rata wnioskowanego kredytu</th>\
 			<td class="text-center">' + Number(kredyt.maks_rata).format(2, 3, ' ', ',') + '</td></tr>\
 		</tbody></table>');

	//dodanie informacji o wnioskodawcach
 	$('#raport_body').append('<table class="table table-bordered"><thead><tr id="dane_wnioskodawcow">\
      <th scope="col">Dane wnioskodawców</th></tr></thead>\
 		<tbody>\
 			<tr id="wn_i_n"><th scope ="row">Imię i nazwisko</th></tr>\
 			<tr id="wn_pesel"><th scope ="row">PESEL</th></tr>\
 			<tr id="wn_ulica"><th scope ="row">Ulica i numer domu</th></tr>\
 			<tr id="wn_kodpocz"><th scope ="row">Kod pocztowy i poczta</th></tr>\
 			<tr id="wn_emeryt"><th scope ="row">Klient jest emerytem lub rencisą zamieszujący z dziećmi</th></tr>\
 			<tr id="wn_nrgs"><th scope ="row">Gospodarstwo domowe</th></tr>\
 		</tbody></table>');
 	var l_wn = 1;
 	$.each(zdolnosc.gospodarstwa, function(index, value) {

 		$.each(value.wnioskodawca, function(index2, value2) {
 			if(value2.rodzaj_klienta == "Wnioskodawca") {
 				$('#dane_wnioskodawcow').append('<th scope="col" class="text-center">Wnioskodawca ' + l_wn + '</th>');
 				l_wn++;
 				$('#wn_i_n').append('<td class="text-center">' + value2.imie_nazwisko + '</td>');
 				$('#wn_pesel').append('<td class="text-center">' + value2.pesel + '</td>');
 				$('#wn_ulica').append('<td class="text-center">' + value2.ulica + '</td>');
 				$('#wn_kodpocz').append('<td class="text-center">' + value2.kod_poczta + '</td>');
 				$('#wn_nrgs').append('<td class="text-center">nr ' + (index+1) + '</td>');
 				if(value2.czy_z_dziecmi) {
 					$('#wn_emeryt').append('<td class="text-center">TAK</td>');
 				}
 				else {
 					$('#wn_emeryt').append('<td class="text-center">NIE</td>');
 				}
 			}
 		});
 	});
 	//dodanie informacji o dochodach
 	var doch_temp = {};
 	var czy_dod = false;
 	var temp2 = [];
 	$.each(rodzaj_dochodu, function(index, value){
 		//poprawnie dochodów z obiektu
 		$.each(zdolnosc.gospodarstwa, function(index2, value2) {
 			$.each(value2.wnioskodawca, function(index3, value3) {
 				if(value3.rodzaj_klienta == "Wnioskodawca") {
 					var temp = 0;
 				
 				
 					for(i=0; i<value3.dochody.length; i++) {
 						if(value == value3.dochody[i][0]){
 							temp += parseFloat(value3.dochody[i][1]);
 							czy_dod = true;
 						}
 					}
 					if(temp == 0) {
 						temp = '-----';
 					}
 					if(parseFloat(temp) != 0) {
 							temp2.push(temp);
 					}
 				}
 			});
 		});
 		doch_temp[value] = [temp2];
 		temp2 = [];
 		if(czy_dod == false) {
 			delete doch_temp[value];
 		}
 		else {
 			czy_dod = false;
 		}
 	});

 	$('#raport_body').append('<table class="table table-bordered"><thead><tr id="dochody">\
      <th scope="col">Uzyskiwane dochody netto</th></tr></thead>\
 		<tbody id="dochody_row">\
 		</tbody></table>');

 	var l_doch = 1;
 	var l_wn2 = 1;
 	for(i = 0; i<($('#dane_wnioskodawcow th').length-1); i++){
 			$('#dochody').append('<th scope="col" class="text-center">Wnioskodawca ' + l_wn2 + '</th>');
 			l_wn2++;
 		};
 	$.each(doch_temp, function(index, value) {
 		
 		$('#dochody_row').append('<tr id="wndoch' + l_doch +'"><th scope = "row">' + index + '</th></tr>');
 		$.each(value, function(index2, value2) {
 			$.each(value2, function(index3, value3) {
 				if(Number(value3)) {
 					$('#wndoch' + l_doch).append('<td class="text-center">' + Number(value3).format(2, 3, ' ', ',') + '</td>');
 				}
 				else {
 					$('#wndoch' + l_doch).append('<td class="text-center">------------</td>');
 				}
 			});
 		});
 		l_doch++;
 	});

 	//dodanie informacji o kosztach wnioskodawców
 	var koszt_temp = {};
 	var czy_dod = false;
 	var temp2 = [];
 	$.each(rodzaj_zobowiazania, function(index, value){
 		//poprawnie dochodów z obiektu
 		$.each(zdolnosc.gospodarstwa, function(index2, value2) {
 			$.each(value2.wnioskodawca, function(index3, value3) {
 				var temp = 0;
 				
 				if(value3.rodzaj_klienta == "Wnioskodawca") {
 					for(i=0; i<value3.zobowiazania.length; i++) {
 						if(value == value3.zobowiazania[i][0]){
 							temp += parseFloat(value3.zobowiazania[i][1]);
 							czy_dod = true;
 						}
 					}
 					if(temp == 0) {
 						temp = '-----';
 					}
 					if(parseFloat(temp) != 0) {
 							temp2.push(temp);
 					}
 				}
 			});
 		});
 		koszt_temp[value] = [temp2];
 		temp2 = [];
 		if(czy_dod == false) {
 			delete koszt_temp[value];
 		}
 		else {
 			czy_dod = false;
 		}
 	});

 	$('#raport_body').append('<table class="table table-bordered"><thead><tr id="zobowiazania">\
      <th scope="col">Udzielone poręczenia i inne zobowiązania</th></tr></thead>\
 		<tbody id="zobowiazania_row">\
 		</tbody></table>');

 	var l_zob = 1;
 	var l_wn2 = 1;
 	for(i = 0; i<($('#dane_wnioskodawcow th').length-1); i++){
 			$('#zobowiazania').append('<th scope="col" class="text-center">Wnioskodawca ' + l_wn2 + '</th>');
 			l_wn2++;
 		};
 	$.each(koszt_temp, function(index, value) {
 		if(index != "BRAK") {
 			$('#zobowiazania_row').append('<tr id="wnzob' + l_zob +'"><th scope = "row">' + index + '</th></tr>');
 		}
 		
 		$.each(value, function(index2, value2) {
 			$.each(value2, function(index3, value3) {
 				if(index != "BRAK") {
 					if(Number(value3)) {
 						$('#wnzob' + l_zob).append('<td class="text-center">' + Number(value3).format(2, 3, ' ', ',') + '</td>');
 					}
 					else {
 						$('#wnzob' + l_zob).append('<td class="text-center">------------</td>');
 					}
 				}
 			});
 		});
 		l_zob++;
 	});
	//dodanie infromacji o ocenie wiarygodności kredytowej
	var przyczyny_n_kr = "";
	var ocena_zdolnosci = "POZYTYWNA";
	var l_wn3 = 1;
	$('#raport_body').append('<table class="table table-bordered"><thead><tr id="ocena_wiarygodności">\
      <th scope="col">Ocena wiarygodności kredytowej</th></tr></thead>\
 		<tbody>\
 			<tr id="wnbiksco"><th scope ="row">Ocena punktowa BIKSco CreditRisk</th></tr>\
 			<tr id="wnkodbik"><th scope ="row">Kod Klasyfikacji Uzupełniającej</th></tr>\
 			<tr id="wnkryt"><th scope ="row">Kryteria negatywne - §30 ust.5</th></tr>\
 			<tr id="wnocena"><th scope ="row">Ocena wiarygodności kredytowej</th></tr>\
 		</tbody></table>');

	$.each(zdolnosc.gospodarstwa, function(index, value) {

 		$.each(value.wnioskodawca, function(index2, value2) {
 			ocena_zdolnosci = "POZYTYWNA";
 			if(value2.rodzaj_klienta == "Wnioskodawca") {
 				$('#ocena_wiarygodności').append('<th scope="col" class="text-center">Wnioskodawca ' + l_wn3 + '</th>');
 				l_wn3++;
 				$('#wnbiksco').append('<td class="text-center">' + value2.ocena_bik + '</td>');
 				$('#wnkodbik').append('<td class="text-center">' + value2.kod_bik + '</td>');
 				$('#wnkryt').append('<td class="text-center">' + value2.kryteria_bik + '</td>');
 				
 				if(value2.ocena_wiarygodnosci['Ocena punktowa BIK'] == false && value2.kod_bik == 'BRAK' || value2.ocena_wiarygodnosci['Kod wykluczenia'] == false || value2.ocena_wiarygodnosci['Kryteria negatywne'] == false) {	
 					przyczyny_n_kr += "Klient " +  value2.imie_nazwisko + "\n";
 					if(value2.ocena_wiarygodnosci['Ocena punktowa BIK'] == false && value2.kod_bik == 'BRAK') {
 						przyczyny_n_kr += " 		- posiada zbyt niską ocenę BIKSco CreditRisk\n";
 						ocena_zdolnosci = 'NEGATYWNA';
 					}
 					if(value2.kod_bik == 'OU' || value2.kod_bik == 'T1' || value2.kod_bik == 'T8') {
						przyczyny_n_kr += "		- " + kod_uzup[value2.kod_bik] + "\n";
 						ocena_zdolnosci = 'NEGATYWNA';
					}
					if(value2.ocena_wiarygodnosci['Kryteria negatywne'] == false) {
						$.each(value2.kryteria_bik, function(index3, value3) {
							przyczyny_n_kr += "		- " + kryt_negatywne[value3] + "\n";
						});
						ocena_zdolnosci = 'NEGATYWNA';
					}
					przyczyny_n_kr += "\n";
				}
				$('#wnocena').append('<td class="text-center">' + ocena_zdolnosci + '</td>');
 			}
 					
 		});
 	});

	if(przyczyny_n_kr.length > 0) {
 		$('#raport_body').append('<table class="table table-bordered break_page"><thead><tr id="ocena_wiarygodności_po">\
     	 <th scope="col">Przyczyny negatywnej oceny wiarygotności kredytowej</th></tr></thead>\
 		<tbody>\
 			<tr><td scope ="row"><div class="form-group"><textarea id="textarea" class="form-control" style="background-color: #fff" rows="'+parseInt(przyczyny_n_kr.split(/\r\n|\r|\n/).length+3)+'">' +przyczyny_n_kr+ '</textarea></div></td></tr>\
 		</tbody></table>');
	}

	//dodanie informacji o gospodarstwach
	$('#raport_body').append('<table class="table table-bordered"><thead><tr id="dane_gospodarstw">\
      <th scope="col">Wydatki gospodarstwa domowego</th></tr></thead>\
 		<tbody>\
 			<tr id="gs_osoby"><th scope ="row">Ilość osób w gospodarstwie domowym</th></tr>\
 			<tr id="gs_wyd_st"><th scope ="row">Wydatki stałe</th></tr>\
 			<tr id="gs_wyd_st_m"><th scope ="row">Wydatki stałe zgodne z metodyką</th></tr>\
 			<tr id="gs_wyd_inn"><th scope ="row">Inne zobowiązania o charakterze stałym</th></tr>\
 			<tr id="gs_ms_kosz"><th scope ="row">Miesięczne koszty utrzymania</th></tr>\
 			<tr id="gs_ms_kosz_sum"><th scope ="row">Suma m-cznych kosztów</th></tr>\
 			<tr id="gs_ms_kosz_sum_m"><th scope ="row">Suma m-cznych kosztów zgodnie z metodyką</th></tr>\
 		</tbody></table>');
	if(przyczyny_n_kr.length == 0) {
		$("#raport_body #dane_gospodarstw").parent().parent().attr('class', "table table-bordered break_page");
	}
 	var l_gs = 1;
 	$.each(zdolnosc.gospodarstwa, function(index, value) {
 		var czy_inn = false;
 		$.each(value.wnioskodawca, function(index2, value2) {
 			if(value2.rodzaj_klienta == "Wnioskodawca") {
 				czy_inn = false;
 			}
 			else {
 				czy_inn = true;
 			}
 		});
 		if(czy_inn == false){

 				$('#dane_gospodarstw').append('<th scope="col" class="text-center">Gospodarstwo nr ' + l_gs + '</th>');
 				l_gs++;
 				$('#gs_osoby').append('<td class="text-center">' + value.ilosc_osob + '</td>');
 				$('#gs_wyd_st').append('<td class="text-center">' + Number(value.wydatki_stale).format(2, 3, ' ', ',') + '</td>');
 				$('#gs_wyd_st_m').append('<td class="text-center">' + Number(value.wydatki_stale_metodyka).format(2, 3, ' ', ',') + '</td>');
 				$('#gs_wyd_inn').append('<td class="text-center">' + Number(value.inn_wydatki_stale).format(2, 3, ' ', ',') + '</td>');
 				$('#gs_ms_kosz').append('<td class="text-center">' + Number(value.koszt_utrzymania).format(2, 3, ' ', ',') + '</td>');
 				$('#gs_ms_kosz_sum').append('<td class="text-center">' + Number(value.suma_kosztow).format(2, 3, ' ', ',') + '</td>');
 				$('#gs_ms_kosz_sum_m').append('<td class="text-center">' + Number(value.suma_kosztow_metodyka).format(2, 3, ' ', ',') + '</td>');
 		}
 	});
 	//ocena możliwości finansowych
 	$('#raport_body').append('<table class="table table-bordered"><thead><tr id="ocena_zdl">\
      <th scope="col">Ocena możliwości finansowych</th></tr></thead>\
 		<tbody>\
 			<tr id="oc_doch"><th scope ="row">Suma dochodów netto</th></tr>\
 			<tr id="oc_koszt"><th scope ="row">Koszty utrzymania gospodarstwa domowego</th></tr>\
 			<tr id="oc_kr"><th scope ="row">Koszty obsługi zadłużenia</th></tr>\
 			<tr id="oc_pr"><th scope ="row">Koszty udzielonych poręczeń</th></tr>\
 			<tr id="oc_wlsr"><th scope ="row">Wolne środki</th></tr>\
 			<tr id="oc_rata"><th scope ="row">Rata wnioskowanego kredytu</th></tr>\
 			<tr id="oc_nad"><th scope ="row">Nadwyżka lub niedobór</th></tr>\
 			<tr id="oc_dti"><th scope ="row">Wskaźnik zadłużenia</th></tr>\
 		</tbody></table>');
 				$('#oc_doch').append('<td class="text-center">' + Number(zdolnosc.dochody_gs('Wnioskodawca')).format(2, 3, ' ', ',') + '</td>');
 				$('#oc_koszt').append('<td class="text-center">' + Number(zdolnosc.koszty_gs('Wnioskodawca')).format(2, 3, ' ', ',') + '</td>');
 				$('#oc_kr').append('<td class="text-center">' + Number(zdolnosc.koszty_kr('Wnioskodawca')).format(2, 3, ' ', ',') + '</td>');
 				$('#oc_pr').append('<td class="text-center">' + Number(zdolnosc.koszty_pr('Wnioskodawca')).format(2, 3, ' ', ',') + '</td>');
 				$('#oc_wlsr').append('<td class="text-center">' + Number(zdolnosc.wolne_sr('Wnioskodawca')).format(2, 3, ' ', ',') + '</td>');
 				$('#oc_rata').append('<td class="text-center">' + Number(zdolnosc.rata).format(2, 3, ' ', ',') + '</td>');
 				$('#oc_nad').append('<td class="text-center">' + Number(zdolnosc.wolne_sr('Wnioskodawca') - zdolnosc.rata).format(2, 3, ' ', ',') + '</td>');
 				$('#oc_dti').append('<td class="text-center">' + (zdolnosc.dti('Wnioskodawca')*100).toFixed(2).replace('.', ',')+ '%' + '</td>');

 	$('#raport_body').append('<table class="table table-bordered"><thead><tr id="podsumowanie">\
     	 <th scope="col">Podsumowanie oceny zdolności kredytowej</th></tr></thead>\
 		<tbody>\
 			<tr><td scope ="row"><div class="form-group"><textarea class="form-control" style="background-color: #fff"></textarea></div></td></tr>\
 		</tbody></table>');
 	
 }