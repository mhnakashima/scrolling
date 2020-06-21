// *
// * Adicionar multiplos marcadores
// * 2013 - www.marnoto.com
// *

// Váriáveis necessárias
var map;
var infoWindow;

// A variável markersData guarda a informação necessária a cada marcador
// Para utilizar este código basta alterar a informação contida nesta variável
var markersData = [
   {
      lat: -20.102169,
      lng: -44.973475,
      nome: "Ânima Pilates e Terapias",
      morada1:"- Confecção do PGRSS - Plano de Gerenciamento de Resíduos Sólidos da Saúde;",
      morada2:"- Assessoria para obtenção do Alvará de Sanitário Municipal.",
      codPostal: " "
   },
   {
      lat: -20.0388258,
      lng: -44.7325332,
      nome: "Hortifruti Ribeiro",
      morada1:"- Assessoria para obtenção do Alvará de Localização e Funcionamento Municipal;",
      morada2: "- Confecção das POPs - Procedimentos Operacionais Padrão - Vigilância Sanitária;",
      codPostal: "- Assessoria para obtenção do Alvará de Sanitário Municipal."
   },
   {
      lat: -20.1438735,
      lng: -44.8972117,
      nome: "Varejão Ribeiro",
      morada1:"- Confecção do Projeto do Sanitário para aprovação junto a Vigilância Sanitária;",
      morada2: "- Assessoria para obtenção do Alvará de Sanitário Municipal.",
      codPostal: " "
   },
   {
      lat: -20.1425171,
      lng: -44.8859939,
      nome: "Hotel Excellence",
      morada1:"- Confecção do Manual de Boas Práticas em Manipulação de Alimentos;",
      morada2: "- Treinamento em Boas Práticas em Manipulação de Alimentos;",
      codPostal: "- Assessoria para obtenção do Alvará de Localização e Funcionamento Municipal; - Assessoria para obtenção do Alvará de Sanitário Municipal."
   },
   {
      lat: -20.156363,
      lng: -44.904245,
      nome: "Ar Condicionado Xavier",
      morada1:"- Confecção do Projeto de Incêncio junto ao Corpo de Bombeiros.",
      morada2: " ",
      codPostal: " "
   },
   {
      lat: -20.1471036,
      lng: -44.9141006,
      nome: "Mercearia Borges da Costa",
      morada1:"- Confecção das POPs - Procedimentos Operacionais Padrão - Vigilância Sanitária;",
      morada2: " ",
      codPostal: " "
   },
   {
      lat: -20.1523087,
      lng: -44.9046341,
      nome: "Cerejeira",
      morada1:"- Assessoria para obtenção do Alvará de Sanitário Municipal;",
      morada2: "- Confecção das POPs - Procedimentos Operacionais Padrão - Vigilância Sanitária;",
      codPostal: "- Confecção do Projeto do Sanitário para aprovação junto a Vigilância Sanitária."
   },
   {
      lat: -20.1405646,
      lng: -44.8946055,
      nome: "Sua Pizza",
      morada1:"- Assessoria para obtenção do Alvará de Sanitário Municipal;",
      morada2: "- Assessoria para obtenção do Alvará de Localização e Funcionamento Municipal;",
      codPostal: "- Confecção do Projeto do Sanitário para aprovação junto a Vigilância Sanitária."
   }
];


function initialize() {
   var mapOptions = {
      center: new google.maps.LatLng(-20.1456333,-44.92355),
      zoom: 9,
      mapTypeId: 'roadmap',
   };

   map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

   // cria a nova Info Window com referência à variável infowindow
   // o conteúdo da Info Window será atribuído mais tarde
   infoWindow = new google.maps.InfoWindow();

   // evento que fecha a infoWindow com click no mapa
   google.maps.event.addListener(map, 'click', function() {
      infoWindow.close();
   });

   // Chamada para a função que vai percorrer a informação
   // contida na variável markersData e criar os marcadores a mostrar no mapa
   displayMarkers();
}
google.maps.event.addDomListener(window, 'load', initialize);

// Esta função vai percorrer a informação contida na variável markersData
// e cria os marcadores através da função createMarker
function displayMarkers(){

   // esta variável vai definir a área de mapa a abranger e o nível do zoom
   // de acordo com as posições dos marcadores
   var bounds = new google.maps.LatLngBounds();
   
   // Loop que vai estruturar a informação contida em markersData
   // para que a função createMarker possa criar os marcadores 

   for (var i = 0; i < markersData.length; i++){

      var latlng = new google.maps.LatLng(markersData[i].lat, markersData[i].lng);
      var nome = markersData[i].nome;
      var morada1 = markersData[i].morada1;
      var morada2 = markersData[i].morada2;
      var codPostal = markersData[i].codPostal;

      createMarker(latlng, nome, morada1, morada2, codPostal);

      // Os valores de latitude e longitude do marcador são adicionados à
      // variável bounds
      bounds.extend(latlng);  
   }

   // Depois de criados todos os marcadores
   // a API através da sua função fitBounds vai redefinir o nível do zoom
   // e consequentemente a área do mapa abrangida.
   map.fitBounds(bounds);
}

var image = './assets/img/icon-map.png';

// Função que cria os marcadores e define o conteúdo de cada Info Window.
function createMarker(latlng, nome, morada1, morada2, codPostal){
   var marker = new google.maps.Marker({
      map: map,
      position: latlng,
      title: nome,
      icon: image
   });

   // Evento que dá instrução à API para estar alerta ao click no marcador.
   // Define o conteúdo e abre a Info Window.
   google.maps.event.addListener(marker, 'click', function() {
      
      // Variável que define a estrutura do HTML a inserir na Info Window.
      var iwContent = '<div id="iw_container">' +
            '<div class="iw_title">' + nome + '</div>' +
         '<div class="iw_content">' + morada1 + '<br />' +
         morada2 + '<br />' +
         codPostal + '</div></div>';
      
      // O conteúdo da variável iwContent é inserido na Info Window.
      infoWindow.setContent(iwContent);

      // A Info Window é aberta.
      infoWindow.open(map, marker);
   });
}