$(document).ready(function () {
	//dodanie grupy paneli
	$('#bodyDoc').append(n_grupa_paneli('glowne'));
	
	//dodanie panela Wniosek
	$('#glowne').append(
		n_panel(
			n_naglowek_panela('wniosek', 'glowne', 'Dane Dotyczące Wniosku'),
			n_cialo_panela('wniosek', 1)
			));
	//dodanie pól do panelu Wniosek
	$('#wniosek .container').append(n_pole('wnnr', 'Numer w rejestrze wniosków', 'Numer_wniosku', 'Numer wniosku'));
	$('#wniosek .container').append(n_pole('wndt', 'Data złożenia wniosku', 'Data_wniosku', 'Data złożenia wniosku'));
	
	//dodanie panela Kredyt
	$('#glowne').append(
		n_panel(
			n_naglowek_panela('kredyt', 'glowne', 'Dane Dotyczące Kredytu'),
			n_cialo_panela('kredyt', 0)
			));
	//dodanie pól do panelu Kredyt
	$('#kredyt .container').append(n_pole_multi('krro', 'Rodzaj wnioskowanego kredytu', 'rodzaj_kredytu', rodzaj_kredytu));
	$('#kredyt .container').append(n_pole('krkw', 'Kwota wnioskowanego kredytu', 'kwota_kredytu', 'Kwota wnioskowanego kredytu'));
	$('#kredyt .container').append(n_pole('krok', 'Okres kredytowania', 'kredyt_okres', 'Okres kredytowania w miesiącach'));
	$('#kredyt .container').append(n_pole_multi('krcz', 'Częstotliwość spłat', 'czest_splat', czestotliwosc_splat));
	$('#kredyt .container').append(n_pole('krcl', 'Cel transakcji finansowej', 'kredyt_cel', 'Cel kredytu'));
	$('#kredyt .container').append(n_pole('krop', 'Oprocentowanie kredytu', 'kredyt_oproc', 'Oprocentowanie kredytu'));
	$('#kredyt .container').append(n_pole_multi('krpr', 'Rodzaj oprocentowania', 'crodzaj_oproc', oprocentowanie));
	$('#kredyt .container').append(n_pole('krrt', 'Maksymalna rata wnioskowanego kredytu', 'rata_maks', 'Maksymalna rata kredytu'));
	$('#kredyt .container').append(n_pole('krtws1', 'Maksymalna rata wnioskowanego kredytu przy wzroście oprocentowania o 200pp', 'rata_tws1', 'Maksymalna rata kredytu'));

	//dodanie panela dotyczącego gospodarstw domowych
	$('#glowne').append(
		n_panel(
			n_naglowek_panela('gospodarstwo', 'glowne', 'Dane Dotyczące Gospodarstw Domowych'),
			n_cialo_panela('gospodarstwo', 0)
			));
	//dodanie zakładki gospodarstwa domowego
	$('#gospodarstwo .panel-body .container').append(
			n_zakladki_init('zakladki'));

	$(n_zakladka('Gospodarstwo domowe nr ', 1)).insertBefore('#button_dodaj_gs');
	$('#gospodarstwo .panel-body .container div').append(
			n_cialo_zakladki(1));
	$('.selectpicker').selectpicker('refresh');

	$('#footerDoc').append('<button type="button" class="btn btn-primary btn-block" id="przelicz_wniosek"><strong>Oblicz zdolność kredytową</strong></button>');


	//zdażenia
		//dodanie gospodarstwa domowego
	$(document).on('click', '.dodaj_gs', function() {
		if(licz_gs_wn.length < maks_gs) {
			$(n_zakladka('Gospodarstwo domowe nr ', 0)).insertBefore('#button_dodaj_gs');
			$('#karty').append(n_cialo_zakladki(0));
			$('.selectpicker').selectpicker('refresh');
			$(this).parent().parent().prev().find('button').remove();
			$(this).parent().parent().prev().find('a').append('<button type= "button" class="btn from-control usun_gs"><span class="glyphicon glyphicon-minus"></span></button>');
			przelicz_wn();
		}
		else {
			alert("Zgodnie z metodyką można dodać mksymalnie " + maks_gs + " gospodarstwa domowe");
		}
	});
	//usunięsie zakładki gs
	$(document).on('click', '.usun_gs', function() {
		var gs = (parseInt($(this).parent().attr('href').substr(3,2))-1);
		var temp = $(this).parent().parent();
		licz_gs_wn.splice(gs, 1);
		$('#gs' + (gs+1)).remove();
		$(this).parent().parent().remove();
		
		przelicz_gs(gs);
		$('.active').attr('class', 'tab-pane');
		$('.tab-pane').attr('class', 'tab-pane');
		$('#zakladka1').attr('class', 'tab-pane active');
		$('#gs1').attr('class', 'tab-pane active');
		$('#zakladka2').attr('class', 'tab-pane active');
		$('#wn1').attr('class', 'tab-pane active');
	});
	//dodanie zakładki i pola wnioskodawcy

	$(document).on('click', '.dodaj_wn', function() {
		
		var gs = (parseInt($(this).parent().parent().parent().parent().attr('id').substr(2,1)))-1;
		var temp = '#' + $(this).parent().parent().parent().parent().attr('id');
		var temp2 = n_zakladka_wn('Wnioskodawca ', gs, 0);
		$(temp2).find('button').remove();
		$(temp2).find('a').append('<button type= "button" class="btn from-control usun_wn"><span class="glyphicon glyphicon-minus"></span></button>');
		$(temp2).insertBefore($(temp).find('#button_dodaj'));
		$(temp).find('#karty_wn' + (gs+1)).append(n_cialo_zakladki_wn(0));
		$('.selectpicker').selectpicker('refresh');
		przelicz_wn(gs);


	});
		//usunięcie zakładki i pola wnioskodawcy
	$(document).on('click', '.usun_wn', function() {
		var gs_numer = (parseInt($(this).parent().parent().parent().parent().attr('id').substr(2,1)))-1;
		var id_wn = ($(this).parent().attr('href'));
		var nr_ind = 0;
				//usunięcie wartości z tablicy
		$.each(licz_gs_wn[gs_numer], function(index, value){
				if(id_wn.substr(1,4) == value) {
				licz_gs_wn[gs_numer].splice(index, 1);
				}
			});
				//usunięcie zakładki i karty
		$(id_wn).remove();
		$(this).parent().parent().remove();
				//przeliczenie tytułów zakładek
		przelicz_wn();
	});
		//dodanie pól dochodów lub kosztów
	$(document).on('click', '.dodaj_doch_koszt', function() {
    	var temp = '#' + $(this).parent().parent().attr('id');
    	var temp2 = $(this).parent();
    	if(temp.substr(4,4) == 'doch') {
    		$(this).parent().parent().append(n_doch_koszt('dochody', rodzaj_dochodu));
    	}
    	else {
    		$(this).parent().parent().append(n_doch_koszt('zobowiazania', rodzaj_zobowiazania));
    	}
    	
    	$(this).remove();
    	$(temp2).append('<button type= "button" class="btn from-control usun_doch_koszt"><span class="glyphicon glyphicon-minus"></span></button>')


	});
		//usunięcie pól dochodów lub kosztów
	$(document).on('click', '.usun_doch_koszt', function() {
    	$(this).parent().remove();
	});
	//dodanie pola określającego czy wnioskodawca zamieszkuje z dziećmi
	$(document).on('change', ".dochody", function() {
		var temp = $(this).parent();
		if(typeof $(temp).parent().find('.zam_z_dziecmi').html() == 'undefined' && ($(this).val() == "Emerytura" || $(this).val() == "Emerytura" || $(this).val() == "Renta inwalidzka" ||  
			$(this).val() == "Renta socjalna" || $(this).val() == "Renta rodzinna" || $(this).val() == "Renta strukturalna" || $(this).val() == "Świadczenie przedemerytalne")) {
			
			$('<div class="input-group"><span class="input-group-addon"><input class="zam_z_dziecmi" type="checkbox" aria-label="..."></span>\
      						<label class="form-control" aria-label="..."> Wnioskodawca zamieszkuje z dziećmi</label>\
    						</div>').insertBefore($(temp).find(".dodaj_doch_koszt"));
		}
		else {
			if(($(this).val() != "Emerytura" && $(this).val() != "Emerytura" && $(this).val() != "Renta inwalidzka" &&  
				$(this).val() != "Renta socjalna" && $(this).val() != "Renta rodzinna" && $(this).val() != "Renta strukturalna" && $(this).val() != "Świadczenie przedemerytalne")) {
					$(temp).find('div').remove();
				}
		}
	});
	//usunięcie lub dodanie pola raty dla tws1
	$(document).on('change', "#crodzaj_oproc", function() { 
		if($('#crodzaj_oproc').val() == 'zmienne' && $('#rodzaj_kredytu').val() != 'Kredyt hipoteczny' && $('#krtws1').length == 0) {
			
			$('#kredyt .container').append(n_pole('krtws1', 'Maksymalna rata wnioskowanego kredytu przy wzroście oprocentowania o 200pp', 'rata_tws1', 'Maksymalna rata kredytu'));
		}
		else if ($('#crodzaj_oproc').val() == 'zmienne' && $('#rodzaj_kredytu').val() == 'Kredyt hipoteczny' && $('#krtws1').length == 0 && $('#krtws1').length == 0){
			$('#kredyt .container').append(n_pole('krtws1', 'Maksymalna rata wnioskowanego kredytu przy wzroście oprocentowania o 200pp', 'rata_tws1', 'Maksymalna rata kredytu'));
			$('#kredyt .container').append(n_pole('krtws2', 'Maksymalna rata wnioskowanego kredytu przy wzroście oprocentowania o 400pp', 'rata_tws2', 'Maksymalna rata kredytu'));
			
		}
		else if ($('#crodzaj_oproc').val() == 'zmienne' && $('#rodzaj_kredytu').val() != 'Kredyt hipoteczny') {
			
			$('#krtws2').parent().remove();
		}
		else if($('#crodzaj_oproc').val() == 'stałe') {
			$('#krtws1').parent().remove();
			$('#krtws2').parent().remove();
		}

	});
	$(document).on('change', "#rodzaj_kredytu", function() { 
		if($('#crodzaj_oproc').val() == 'zmienne' && $('#rodzaj_kredytu').val() == 'Kredyt hipoteczny') {
			$('#kredyt .container').append(n_pole('krtws2', 'Maksymalna rata wnioskowanego kredytu przy wzroście oprocentowania o 400pp', 'rata_tws2', 'Maksymalna rata kredytu'));
		}
		else {
			$('#krtws2').parent().remove();
		}
	});

	/********************************************************
	*********************************************************
	*********************************************************
	Przypisanie danych do właściwych pól klas
	*********************************************************
	*********************************************************/
	
	$(document).on('click', '#przelicz_wniosek', function() {
	//pobranie danych wniosku
    	var n_wniosek = new wniosek(
    			$('#Numer_wniosku').val(),
    			$('#Data_wniosku').val());
    //pobranie danych kredytu
    	var n_kredyt = new kredyt(
    			$('#rodzaj_kredytu').val(),
    			$('#kwota_kredytu').val().replace(',', '.'),
    			$('#kredyt_okres').val(),
    			$('#czest_splat').val(),
    			$('#kredyt_cel').val(),
    			$('#kredyt_oproc').val().replace(',', '.'),
    			$('#crodzaj_oproc').val(),
    			$('#rata_maks').val().replace(',', '.'),
    			$('#rata_tws1').val(),
    			$('#rata_tws2').val());
    	//pobranie doanych gospodarstw domowych
    	var gospodarstwa = [];
    	$.each(licz_gs_wn, function(index, value) {
    		var wnioskodawcy = [];
    		var i = index+1;
    		$.each(value, function(index2, value2){
    			var j = parseInt(String(value2).substr(2,2));
   				var n_wnioskodawca = new wnioskodawca(
   					$('#rodzaj_klient' + j).val(),
   					$('#wn_imie_naz' + j).val(),
   					$('#wn_pesel' + j).val(),
   					$('#wn_adres' + j).val(),
   					$('#wn_kod' + j).val(),
   					$('#wn_bik_sco' + j).val(),
   					$('#wn_bik_kod' + j).val(),
   					pobierz_selectpicker('#wn_bik_kryt' + j),
   					pobierz_doch_zob('#wn' + j + ' .dochody', '#wn' + j + ' .dochody_kwota'),
   					pobierz_doch_zob('#wn' + j + ' .zobowiazania', '#wn' + j + ' .zobowiazania_kwota'),
   					czy_z_dziecmi('#wn' + j + ' .zam_z_dziecmi'));
   				wnioskodawcy.push(n_wnioskodawca);
    		});
    		var n_gospodarstwo = new gospodarstwo(
    			$('#gs_liczba_osob' + i).val(),
    			$('#gs_wyd_st' + i).val().replace(',', '.'),
    			$('#gs_inwyd_st' + i).val().replace(',', '.'),
    			$('#gs_ksz_ut' + i).val().replace(',', '.'),
    			wnioskodawcy);
    		gospodarstwa.push(n_gospodarstwo);
    	});

    	$.each(gospodarstwa, function(index, value) {
    		var czyzdz = false;
    		$.each(value.wnioskodawca, function(index3, value3) {
    			if(value3.czy_z_dziecmi) {
    				czyzdz = true;
    			}
    		});
    		$.each(value.wnioskodawca, function(index2, value2) {
    			value.wydatki_stale_metodyka = metodyka_wyd_stale(n_kredyt.okres_kredytu, czyzdz, n_kredyt.rodzaj_kredytu, value.ilosc_osob);
    			value.suma_kosztow_metodyka = parseFloat(value.wydatki_stale_metodyka) + parseFloat(value.inn_wydatki_stale) + parseFloat(value.koszt_utrzymania);
    		});
    	});
    	var n_zdolnosc = new zdolnosc_kr(gospodarstwa, n_kredyt.maks_rata);
    	
    	if($('#krtws1').length > 0) {
    		var n_zdolnoscTWS1 = new zdolnosc_kr(gospodarstwa, n_kredyt.maks_tws1);
    	}

    	if($('#krtws2').length > 0) {
    		n_kredyt.maks_tws2.replace(',', '.');
    		var n_zdolnoscTWS2 = new zdolnosc_kr(gospodarstwa, n_kredyt.maks_tws2);
    	}
    	
    	//alert(n_zdolnosc.dochody_gs() + ' ' + n_zdolnosc.koszty_gs() + ' ' + n_zdolnosc.wolne_sr.toFixed(2) + ' ' + n_zdolnosc.koszty_kr()  + ' ' + n_zdolnosc.koszty_pr()  + ' ' + n_zdolnosc.zk().toFixed(2)  + ' ' + n_zdolnosc.dti());
		//ukrycie strony do wprowadzania danych
		$('#headDoc').hide();
		$('#bodyDoc').hide();
		$('#footerDoc').hide();
	
		//wygenerowanie raportu
		wyp_rap(n_wniosek, n_kredyt, n_zdolnosc);
		rap_tws1();
		rap_tws2();
		//pokazanie raportu
		$('#headReport').show();
		$('#bodyReport').show();
		$('#footerReport').show();
	});
});
//przycisk do powrotu na stronę
$(document).on('click', '#Wroc', function() {
	$('#headReport').hide();
	$('#bodyReport').hide();
	$('#footerReport').hide();
	$('#headReport div').remove();
	$('#bodyReport div').remove();
	$('#footerReport div').remove();
	$('#headDoc').show();
	$('#bodyDoc').show();
	$('#footerDoc').show();
});

$(document).on('click', '#Drukuj', function() {
	
	$('#raport_body').clone().prepend('<div class="page-header container"><h5 class="text-center"><strong>Raport z oceny zdolności kredytowej dla osób fizycznych</strong></h5>\
					 </div>').print();
	
});