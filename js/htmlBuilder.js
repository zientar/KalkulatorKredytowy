/*****************************
ZMIENNE
*****************************/

//zmienna przechowująca html grupy paneli
var grupa_paneli = $('<div class="panel-group"></div>');

//zmienna przechowujaca naglowek panela
var naglowek_panela = $('<div class="panel-heading">\
						 <a data-toggle="collapse">\
							<h4></h4>\
						 </a>\
						</div>');

//zmienna przechowująca ciało panela
var cialo_panela = $('<div id="Wniosek" class="panel-collapse collapse" aria-expanded="false">\
					   <div class="panel-body"><div class="container"></div></div>\
					  </div>');

//zmienna przechowujaca panel
var panel = $('<div class="panel panel-default"></div>');

//zmienna przechowująca opis i pole tekstowe
var pole_text = $('<div class="input-group form-group">\
				<span class="input-group-addon"></span>\
				<input type="text" class="form-control"></input>\
			  </div>');

//zmienna przechowująca opis i pole z wyborem
var pole_multi = $('<div class="input-group form-group">\
						<span class="input-group-addon"></span>\
						<select class="form-control"></select>\
					</div>');

//zmienna przechowująca opis i pole z wielokrotnym wyborem
var pole_multi_select = $('<div class="input-group form-group">\
						<span class="input-group-addon"></span>\
						<select class="form-control selectpicker" multiple data-actions-box="true"></select>\
					</div>');

//zmienna przechowująca ilość gospodarstw domowych i id wnioskodawców w gospodarstwie
var licz_gs_wn = [];

//zmienna przechowująca liczbę gospodarstw domowych
var licz_gs = 1;
//zmienna przechowująca liczbę wnioskodawców ogółem
var licz_wn = 1;
//zmienna przehowująca liczbę dodanych zakładek
var licz_zakladek = 1;
//zmienna przechowująca zakładki gospodarstwa domowego
var zakladki__init = $('<ul class="nav nav-tabs" role="tablist">\
						<li id="button_dodaj_gs"><a><button class="btn dodaj_gs"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button></a></li>\
						</ul>\
						<div class="tab-content" id = "karty"></div>');

//zmienna przechowująca nagłówek zakładki gs
var zak_gs = $('<li><a role="tab" data-toggle="tab"><button type= "button" class="btn from-control disabled"><span class="glyphicon glyphicon-ok"></span></button></a></li>');

//zmienna przechowująca ciało zakładki gospodarstwa domowego
var cialo_gs = $('<div class="tab-pane fade"></div>');

//zmienna przechowująca zakładki wnioskodawców
var zakladki__init_wn = $('<ul class="nav nav-tabs" role="tablist" id="wnios">\
						<li id="button_dodaj"><a><button class="btn dodaj_wn"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button></a><li>\
						</ul>\
						<div class="tab-content" id="karty_wn"></div>');

//zmienna przechowująca nagłówek zakładki wnioskodawców
var zak_wn = $('<li class = "tab-pane"><a role="tab" data-toggle="tab"><button type= "button" class="btn from-control disabled"><span class="glyphicon glyphicon-ok"></span></button></a></li>');

//zmienna przechowująca ciało zakładki wnioskodawców
var cialo_wn = $('<div class="tab-pane fade"></div>');

//zmienna przechowująca pole wyboru i tekst
var doch_kosz = $('<form class="form-inline">\
					<select class ="form-control"></select>\
					<input type="text" class = "form-control" placeholder="Kwota"></input>\
					<button type= "button" class="btn from-control dodaj_doch_koszt"><span class="glyphicon glyphicon-plus"></span></button>\
					</form>');

/*****************************
FUNKCJE
*****************************/

//funkcja generująca inicjalizująca zakładki
function n_zakladki_init(id_zakladki) {
	var temp1 = zakladki__init.clone();
	$(temp1).find('ul').attr('id', id_zakladki);
	
	return temp1;
};

//funkcja generująca nową zakładkę
function n_zakladka(tytul_zakladki, czy_otwarta) {
	var temp = zak_gs.clone();
	$(temp).attr('id', 'zakladka' + licz_zakladek);
	$(temp).find('a').attr('href', '#gs' + licz_gs).prepend(tytul_zakladki + licz_gs + ' ');
	licz_zakladek++;
	if(czy_otwarta==1) {
		$(temp).attr('class', 'tab-pane active');
	};	
	return temp;
};

//funkcja generująca ciało zakładki
function n_cialo_zakladki(czy_otwarta) {
	var temp = cialo_gs.clone();
	$(temp).attr('id', 'gs' + licz_gs);
	
	$(temp).append(n_pole('gslos' + licz_gs, 'Ilość osób w gospodarstwie domowym', 'gs_liczba_osob' + licz_gs, 'Liczba osób'));
	$(temp).append(n_pole('gswyd' + licz_gs, 'Wydatki stałe', 'gs_wyd_st' + licz_gs, 'Kwota wydatków stałych'));
	$(temp).append(n_pole('gsinnwyd' + licz_gs, 'Inne wydatki o charakterze stałym', 'gs_inwyd_st' + licz_gs, 'Kwota pozostałych wydatków'));
	$(temp).append(n_pole('gsksz' + licz_gs, 'Miesięczne koszty utrzymania', 'gs_ksz_ut' + licz_gs, 'Deklarowala kwota miesięcznych kosztów utrzymania'));
	$(temp).append(n_zakladki_init_wn('wnioskodawcy'));
	//$(temp).find('ul').append(n_zakladka_wn('Wnioskodawca ', 0, czy_otwarta));
	
	$(n_zakladka_wn('Wnioskodawca ', licz_gs-1, czy_otwarta)).insertBefore($(temp).find('#button_dodaj'));
	$(temp).find('#karty_wn').attr('id', 'karty_wn' + licz_gs);
	$(temp).find('#wnios').attr('id', 'wnios' + licz_gs);
	$(temp).find('#karty_wn' + licz_gs).append(n_cialo_zakladki_wn(czy_otwarta));


	if(czy_otwarta==1) {
		$(temp).attr('class', 'tab-pane active');
	};

	licz_gs++;
	return temp;
};

//funkcja generująca inicjalizująca zakładki wnioskodawców
function n_zakladki_init_wn(id_zakladki) {
	var temp1 = zakladki__init_wn.clone();
	//$(temp1).attr('class', 'nav nav-tabs wnios' + licz_gs);
	//$(temp1).attr('id', id_zakladki);
	//temp1.add('');
	
	return temp1;
};

//funkcja generująca nową zakładkę wnioskodawcy
function n_zakladka_wn(tytul_zakladki, numer_gs, czy_otwarta) {
	var temp = zak_wn.clone();
	$(temp).attr('id', 'zakladka' + licz_zakladek);
	if(typeof licz_gs_wn[numer_gs] == 'undefined'){
		licz_gs_wn.push(['wn' + licz_wn]);
	}
	else {
		licz_gs_wn[numer_gs].push(['wn'+ licz_wn]);
	};
	$(temp).find('a').attr('href', '#wn' + licz_wn).prepend(tytul_zakladki + licz_gs_wn[(numer_gs)].length + ' ');
	licz_zakladek++;
	if(czy_otwarta==1) {
		$(temp).attr('class', 'tab-pane active');
	};
	przelicz_wn(numer_gs);	
	return temp;

};

//funkcja generująca ciało zakładki wnioskodawcy
function n_cialo_zakladki_wn(czy_otwarta) {
	var temp = cialo_wn.clone();
	$(temp).attr('id', 'wn' + licz_wn);
					
					//dodanie paneli do wnioskodawcy
	$(temp).append(n_grupa_paneli('Wn' + licz_wn));
					
					//dodanie panela podstawowych informacji wraz z polami
	$(temp).find('#Wn' + licz_wn).append(n_panel(
		n_naglowek_panela('pod_info' + licz_wn, 'Wn' + licz_wn, 'Podstawowe informacje'),
		n_cialo_panela('pod_info' + licz_wn, 0)
			));
	$(temp).find('#pod_info' + licz_wn).append(n_pole_multi('kl_rodzaj' + licz_wn, 'Rodzaj klienta', 'rodzaj_klient' + licz_wn, klient_rodzaj));
	$(temp).find('#pod_info' + licz_wn).append(n_pole('wnim' + licz_wn, 'Imię i nazwisko', 'wn_imie_naz' + licz_wn, 'Imię i nazwisko'));
	$(temp).find('#pod_info' + licz_wn).append(n_pole('wnpe' + licz_wn, 'PESEL', 'wn_pesel' + licz_wn, 'PESEL'));
	$(temp).find('#pod_info' + licz_wn).append(n_pole('wnul' + licz_wn, 'Ulica i numer domu', 'wn_adres' + licz_wn, 'Adres zameldowania'));
	$(temp).find('#pod_info' + licz_wn).append(n_pole('wnkd' + licz_wn, 'Kod pocztowy i poczta', 'wn_kod' + licz_wn, 'Adres zameldowania'));
					//dodanie panela z danymi do BIK wraz z polami
	$(temp).find('#Wn' + licz_wn).append(n_panel(
		n_naglowek_panela('wn_bik' + licz_wn, 'Wn' + licz_wn, 'Dane BIK'),
		n_cialo_panela('wn_bik' + licz_wn, 0)
			));
	$(temp).find('#wn_bik' + licz_wn).append(n_pole('wnbik' + licz_wn, 'Ocena punktowa BIKSco CreditRisk', 'wn_bik_sco' + licz_wn, 'Ocena punktowa'));
	$(temp).find('#wn_bik' + licz_wn).append(n_pole_multi('wnbik_kod' + licz_wn, 'Kod klasyfikacji uzupełniającej', 'wn_bik_kod' + licz_wn, kod_uzup, 1));
	/////////tu skończyłem (dodać selecta z multiwyborem)
	$(temp).find('#wn_bik' + licz_wn).append(n_pole_multi_select('wnbik_kryt' + licz_wn, 'Kryteria negatywne wg. §30 ust.5 metodyki', 'wn_bik_kryt' + licz_wn, kryt_negatywne));
					//dodanie dochodów
	$(temp).find('#Wn' + licz_wn).append(n_panel(
		n_naglowek_panela('wn_doch' + licz_wn, 'Wn' + licz_wn, 'Dochody'),
		n_cialo_panela('wn_doch' + licz_wn, 0)
			));
	$(temp).find('#wn_doch' + licz_wn).append(n_doch_koszt('dochody', rodzaj_dochodu));
					//dodanie kosztów
	$(temp).find('#Wn' + licz_wn).append(n_panel(
		n_naglowek_panela('wn_zob' + licz_wn, 'Wn' + licz_wn, 'Zobowiązania'),
		n_cialo_panela('wn_zob' + licz_wn, 0)
			));
	$(temp).find('#wn_zob' + licz_wn).append(n_doch_koszt('zobowiazania', rodzaj_zobowiazania));
	
	if(czy_otwarta==1) {
		$(temp).attr('class', 'tab-pane fade active in');
	};
	licz_wn++;
	//licz_gs_wn[0].push(['wn1']);
	return temp;
};
//funkcja generująca nagłówek panela
function n_naglowek_panela(id_ciala_panela, id_grupy_paneli, tekst_naglowka) {
	var temp = naglowek_panela.clone();
	$(temp).find('a').attr({href: ('#' + id_ciala_panela),
							'data-parent': ('#' + id_grupy_paneli)});
	$(temp).find('h4').append(tekst_naglowka);
	return temp;
};

//funcka generująca ciało panela
function n_cialo_panela(id_ciala_panela, czy_otwarty) {
	var temp = cialo_panela.clone();
	$(temp).attr('id', id_ciala_panela);

	if(czy_otwarty == 1) {
	$(temp).attr({class: 'panel-collapse collapse in',
				  'aria-expanded': 'true'});
	};
	return temp;
};

//funkcja generująca grupę paneli
function n_grupa_paneli(id) {
	temp = grupa_paneli.clone();
	temp.attr('id', id);
	return temp;
};

//funkcja generująca panel
function n_panel(naglowek, cialo) {
	var temp = panel.clone();
	temp.append(naglowek);
	temp.append(cialo);
	return temp;
};

//funkcja generujące opis i pole tekstowe
function n_pole(id_opisu, tekst_opisu, id_pola_tekstowego, opis_pola_tekstowego) {
	var temp = pole_text.clone();
	$(temp).find('span').attr('id', id_opisu).append(tekst_opisu);
	$(temp).find('input').attr({id: id_pola_tekstowego,
								'aria-desctibedby': ('#' + id_opisu),
								'placeholder': (opis_pola_tekstowego)});
	return temp;
};

//funkcja generująca opis i pole z wyborem
function n_pole_multi(id_opisu, tekst_opisu, id_pola_multi, zmienna_z_danymi, czy_po_kluczu) {
	var temp = pole_multi.clone();
	$(temp).find('span').attr('id', id_opisu).append(tekst_opisu);
	$(temp).find('select').attr({id: id_pola_multi,
								'aria-desctibedby': ('#' + id_opisu)});
	if(czy_po_kluczu == 1) {
		$.each(zmienna_z_danymi, function(index, value){
			$(temp).find('select').append('<option>' + index + '</option>')});
	}
	else {
		$.each(zmienna_z_danymi, function(index, value){
			$(temp).find('select').append('<option>' + value + '</option>')});
	}
	return temp;
};

//funkcja generująca opis i pole z wielokrotnym wyborem
function n_pole_multi_select(id_opisu, tekst_opisu, id_pola_multi, zmienna_z_danymi) {
	var temp = pole_multi_select.clone();
	$(temp).find('span').attr('id', id_opisu).append(tekst_opisu);
	$(temp).find('select').attr({id: id_pola_multi,
								'aria-desctibedby': ('#' + id_opisu)});
	$.each(zmienna_z_danymi, function(index, value){
			$(temp).find('select').append('<option>' + index + '</option>')});
	return temp;
};

function n_doch_koszt(rodzaj_pola, zmienna_z_danymi) {
	var temp = doch_kosz.clone();
	$(temp).find('select').attr('class', 'form-control ' + rodzaj_pola);
	$(temp).find('input').attr('class', 'form-control ' + rodzaj_pola + '_kwota');
	
	$.each(zmienna_z_danymi, function(index, value){
			$(temp).find('select').append('<option>' + value + '</option>')});
	return temp;
};


function przelicz_wn(numer_gs) {
	//przeliczenie tytułów zakładek
		var zak = [];
		$('#wnios' + numer_gs).find('li').each(function(){zak.push(this.id); });
			
			for(i  = 1; i<zak.length-2; i++) {
			$('#' + zak[i]).find('a').text('Wnioskodawca ' + (i+1) + ' ').append('<button type= "button" class="btn from-control usun_wn"><span class="glyphicon glyphicon-minus"></span></button>');
			}
};

function przelicz_gs(numer_gs) {
		var temp_kart_gs = $('#gospodarstwo .container ul li a');
		var temp_karty = $('#karty div').first();
		var temp_gs = [];
		var temp_k = [];
		$(temp_kart_gs).each(function(){temp_gs.push(this); });

		temp_k.push($(temp_karty).attr('id'));
		for(i = 0; i<licz_gs_wn.length; i++) {
			
			temp_karty = $(temp_karty).next();
		
			temp_k.push($(temp_karty).attr('id'));
		};
		
		licz_gs = temp_k.length;
	
		for(i = 1; i < licz_gs_wn.length; i++) {
			$(temp_gs[i]).attr('href', '#gs' + (i+1));
			$(temp_gs[i]).text('Gospodarstwo domowe nr ' + (i+1) + ' ').append('<button type= "button" class="btn from-control usun_gs"><span class="glyphicon glyphicon-minus"></span></button>');
	};
		for(i = 1; i < licz_gs_wn.length; i++) {
			
			var licz = parseInt(temp_k[i].substr(2,2));
			if((licz-1) == i) {
				continue;
			}
			else {
				$('#gslos' + licz).attr('id','gslos' + (i+1));
				$('#gs_liczba_osob' + licz).attr({id: 'gs_liczba_osob' + (i+1),
								'aria-desctibedby': ('#gslos' + (i+1))});
				$('#gswyd' + licz).attr('id','gswyd' + (i+1));
				$('#gs_wyd_st' + licz).attr({id: 'gs_wyd_st' + (i+1),
								'aria-desctibedby': ('#gs_wyd' + (i+1))});
				$('#gsinnwyd' + licz).attr('id','gsinnwy' + (i+1));
				$('#gs_inwyd_st' + licz).attr({id: 'gs_inwyd_st' + (i+1),
								'aria-desctibedby': ('#gsinnwy' + (i+1))});
				$('#gsksz' + licz).attr('id','gsksz' + (i+1));
				$('#gs_ksz_ut' + licz).attr({id: 'gs_ksz_ut' + (i+1),
								'aria-desctibedby': ('#gsksz' + (i+1))});
				$('#wnios' + licz).attr('id', 'wnios' + (i+1));
				$('#karty_wn' + licz).attr('id', 'wnios' + (i+1));
				$('#' + temp_k[i]).attr('id', 'gs' + (i+1));
			}

		};


};

function pobierz_doch_zob(adres_klucz, adres_wartosc) {
	var temp = $.makeArray($(adres_klucz));
	var temp2 = $.makeArray($(adres_wartosc));
	var temp3 = [];
	for( i = 0; i<temp.length; i++) {
		temp3.push([$(temp[i]).val(), $(temp2[i]).val().replace(',', '.')]);
	};
	return temp3;
};

function pobierz_selectpicker(adres) {
	var temp = $.makeArray($(adres).find('option:selected'));
	var temp2 = [];
	$.each(temp, function(index, value) {
	temp2.push($(value).val()); });
	return temp2;
};

function czy_z_dziecmi(selektor) {
	temp = false;

	if($(selektor).prop('checked') == true) {
		temp = true;
	}
	else {
		temp = false;
	}
	return temp;
};