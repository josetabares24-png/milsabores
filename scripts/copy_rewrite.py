# Reescritura de textos (propuesta Captador). Ejecutar una vez: python3 scripts/copy_rewrite.py
import json
L=['pt','es','en','fr','de','it']
T={}
def s(key, pt, es, en, fr, de, it): T[key]=dict(zip(L,[pt,es,en,fr,de,it]))

# --- Lista del compañero (18) ---
s('gelados.cta.subtitle',
 'Visite-nos na Rua da Prata 152 e prove os gelados artesanais.',
 'Ven a Rua da Prata 152 y prueba los helados artesanales.',
 'Come to Rua da Prata 152 and try our artisanal gelato.',
 'Passez au 152 Rua da Prata goûter nos glaces artisanales.',
 'Kommen Sie in die Rua da Prata 152 und probieren Sie unser hausgemachtes Eis.',
 'Passa in Rua da Prata 152 e assaggia il nostro gelato artigianale.')
s('about.feature1_title','Ingredientes frescos','Ingredientes frescos','Fresh ingredients','Ingrédients frais','Frische Zutaten','Ingredienti freschi')
s('about.feature1_desc','Preparados na hora, com ingredientes frescos','Preparados al momento, con ingredientes frescos','Made to order with fresh ingredients','Préparés à la commande, avec des ingrédients frais','Frisch zubereitet, mit frischen Zutaten','Preparati al momento, con ingredienti freschi')
s('about.feature3_title','Na Baixa','En la Baixa','In the Baixa','Dans la Baixa','In der Baixa','Nella Baixa')
s('about.feature3_desc','Uma pausa no meio da Baixa','Una pausa en plena Baixa','A break in the middle of the Baixa','Une pause en plein cœur de la Baixa','Eine Pause mitten in der Baixa','Una pausa in mezzo alla Baixa')
T['about.feature3_desc']['fr']='Une pause au milieu de la Baixa'
s('about.para3',
 'Fica a dois passos do centro histórico, para uma pausa entre visitas.',
 'Está a dos pasos del centro histórico, para hacer una pausa entre visitas.',
 'It is a short walk from the historic centre, handy for a break between sights.',
 'Le centre historique est à deux pas : idéal pour une pause entre deux visites.',
 'Die Altstadt ist nur ein paar Schritte entfernt, ideal für eine Pause zwischendurch.',
 'Il centro storico è a due passi: comodo per una pausa tra una visita e l’altra.')
s('about.subtitle',
 'Brunch e gelados artesanais na Rua da Prata, na Baixa.',
 'Brunch y helados artesanales en la Rua da Prata, en la Baixa.',
 'Brunch and artisanal gelato on Rua da Prata, in the Baixa.',
 'Brunch et glaces artisanales sur la Rua da Prata, dans la Baixa.',
 'Brunch und hausgemachtes Eis in der Rua da Prata, in der Baixa.',
 'Brunch e gelato artigianale in Rua da Prata, nella Baixa.')
s('gallery.title','Galeria','Galería','Gallery','Galerie','Galerie','Galleria')
s('gallery.subtitle','Pratos e gelados do Mil Sabores','Platos y helados de Mil Sabores','Dishes and gelato at Mil Sabores','Plats et glaces du Mil Sabores','Gerichte und Eis im Mil Sabores','Piatti e gelati del Mil Sabores')
s('instagram.subtitle','Marque-nos na sua foto:','Etiquétanos en tu foto:','Tag us in your photo:','Identifiez-nous sur votre photo :','Markieren Sie uns auf Ihrem Foto:','Taggaci nella tua foto:')
s('instagram.cta','Se nos marcar, podemos partilhar a sua foto.','Si nos etiquetas, podemos compartir tu foto.','Tag us and we may share your photo.','Identifiez-nous et nous pourrons partager votre photo.','Markieren Sie uns, dann teilen wir Ihr Foto vielleicht.','Taggaci e potremmo condividere la tua foto.')
s('gallery.share_cta','Marque @milsaboreslx na sua foto e podemos partilhá-la','Etiqueta a @milsaboreslx en tu foto y podemos compartirla','Tag @milsaboreslx in your photo and we may share it','Identifiez @milsaboreslx sur votre photo et nous pourrons la partager','Markieren Sie @milsaboreslx auf Ihrem Foto, dann teilen wir es vielleicht','Tagga @milsaboreslx nella tua foto e potremmo condividerla')
s('visit.title','Rua da Prata 152, Baixa','Rua da Prata 152, Baixa','Rua da Prata 152, Baixa','Rua da Prata 152, Baixa','Rua da Prata 152, Baixa','Rua da Prata 152, Baixa')
s('footer.description',
 'Brunch, café e gelados artesanais na Rua da Prata, Baixa de Lisboa.',
 'Brunch, café y helados artesanales en la Rua da Prata, Baixa de Lisboa.',
 'Brunch, coffee and artisanal gelato on Rua da Prata, Lisbon’s Baixa.',
 'Brunch, café et glaces artisanales sur la Rua da Prata, Baixa de Lisbonne.',
 'Brunch, Kaffee und hausgemachtes Eis in der Rua da Prata, Baixa von Lissabon.',
 'Brunch, caffè e gelato artigianale in Rua da Prata, Baixa di Lisbona.')
s('fullMenu.intro',
 'Opções doces e salgadas, do pequeno-almoço ao lanche.',
 'Opciones dulces y saladas, del desayuno a la merienda.',
 'Sweet and savoury dishes, from breakfast to an afternoon snack.',
 'Du sucré et du salé, du petit-déjeuner au goûter.',
 'Süßes und Herzhaftes, vom Frühstück bis zum Nachmittag.',
 'Piatti dolci e salati, dalla colazione alla merenda.')
s('promotions.offers.brunch_duo.description','Para partilhar a dois','Para compartir entre dos','To share between two','À partager à deux','Für zwei zum Teilen','Da condividere in due')
s('promotions.offers.cocktails.details',
 'Os nossos cocktails clássicos a preço especial: Aperol Spritz, Cuba Libre e Gin Tónico.',
 'Nuestros cócteles clásicos a precio especial: Aperol Spritz, Cuba Libre y Gin Tonic.',
 'Our classic cocktails at a special price: Aperol Spritz, Cuba Libre and Gin & Tonic.',
 'Nos cocktails classiques à prix spécial : Aperol Spritz, Cuba Libre et Gin Tonic.',
 'Unsere klassischen Cocktails zum Sonderpreis: Aperol Spritz, Cuba Libre und Gin Tonic.',
 'I nostri cocktail classici a prezzo speciale: Aperol Spritz, Cuba Libre e Gin Tonic.')
s('promotions.offers.beer_promo.details',
 'Cerveja de pressão a preço especial.',
 'Cerveza de barril a precio especial.',
 'Draught beer at a special price.',
 'Bière pression à prix spécial.',
 'Bier vom Fass zum Sonderpreis.',
 'Birra alla spina a prezzo speciale.')
s('homeSeo.brunch.p2',
 'Na carta há panquecas, crepes, waffles, bowls, tostas, café e gelados artesanais. Tem o menu online e fica fácil de encontrar na Baixa.',
 'En la carta hay tortitas, crepes, gofres, bowls, tostadas, café y helados artesanales. El menú está online y el local es fácil de encontrar en la Baixa.',
 'The menu has pancakes, crepes, waffles, bowls, toasts, coffee and artisanal gelato. It is online, and we are easy to find in the Baixa.',
 'À la carte : pancakes, crêpes, gaufres, bowls, tartines, café et glaces artisanales. Le menu est en ligne et nous sommes faciles à trouver dans la Baixa.',
 'Auf der Karte stehen Pancakes, Crêpes, Waffeln, Bowls, Toasts, Kaffee und hausgemachtes Eis. Die Karte ist online, und Sie finden uns leicht in der Baixa.',
 'In carta ci sono pancake, crêpe, waffle, bowl, toast, caffè e gelato artigianale. Il menu è online e ci trovi facilmente nella Baixa.')
s('brunchLanding.hero.subtitle',
 'Panquecas, ovos, café e gelados artesanais na Rua da Prata 152.',
 'Tortitas, huevos, café y helados artesanales en la Rua da Prata 152.',
 'Pancakes, eggs, coffee and artisanal gelato at Rua da Prata 152.',
 'Pancakes, œufs, café et glaces artisanales au 152 Rua da Prata.',
 'Pancakes, Eier, Kaffee und hausgemachtes Eis in der Rua da Prata 152.',
 'Pancake, uova, caffè e gelato artigianale in Rua da Prata 152.')
s('brunchLanding.story.p2',
 'Na carta há panquecas, crepes, waffles, bowls, tostas, café e gelados artesanais, doces ou salgados.',
 'En la carta hay tortitas, crepes, gofres, bowls, tostadas, café y helados artesanales, en versión dulce o salada.',
 'The menu has pancakes, crepes, waffles, bowls, toasts, coffee and artisanal gelato, sweet or savoury.',
 'À la carte : pancakes, crêpes, gaufres, bowls, tartines, café et glaces artisanales, en sucré ou en salé.',
 'Auf der Karte: Pancakes, Crêpes, Waffeln, Bowls, Toasts, Kaffee und hausgemachtes Eis, süß oder herzhaft.',
 'In carta: pancake, crêpe, waffle, bowl, toast, caffè e gelato artigianale, dolci o salati.')
s('brunchLanding.products.items.3.text',
 'Café e bebidas para acompanhar o brunch.',
 'Café y bebidas para acompañar el brunch.',
 'Coffee and drinks to go with your brunch.',
 'Café et boissons pour accompagner le brunch.',
 'Kaffee und Getränke zum Brunch.',
 'Caffè e bevande per accompagnare il brunch.')
# "coração/heart" fuera
s('about.para1','Estamos na Rua da Prata, na Baixa de Lisboa, e servimos','Estamos en la Rua da Prata, en la Baixa de Lisboa, y servimos','We are on Rua da Prata, in Lisbon’s Baixa, and serve','Nous sommes sur la Rua da Prata, dans la Baixa de Lisbonne, et nous servons du','Wir sind in der Rua da Prata in Lissabons Baixa und servieren','Siamo in Rua da Prata, nella Baixa di Lisbona, e serviamo')
s('brunchLanding.story.p1',
 'O Mil Sabores fica na Rua da Prata 152, na Baixa. Dá jeito para quem passeia pelo centro ou quer fazer uma pausa antes de continuar o dia.',
 'Mil Sabores está en la Rua da Prata 152, en la Baixa. Te pilla de paso si estás paseando por el centro o quieres parar un rato antes de seguir.',
 'Mil Sabores is at Rua da Prata 152, in the Baixa. It is on the way if you are walking around the centre or want a break before carrying on.',
 'Le Mil Sabores se trouve au 152 Rua da Prata, dans la Baixa. Pratique si vous vous promenez dans le centre ou si vous voulez faire une pause.',
 'Das Mil Sabores liegt in der Rua da Prata 152 in der Baixa. Praktisch, wenn Sie im Zentrum unterwegs sind oder eine Pause brauchen.',
 'Mil Sabores è in Rua da Prata 152, nella Baixa. Comodo se stai girando per il centro o vuoi fare una pausa prima di ripartire.')
s('hero.title','Brunch artesanal na Baixa de Lisboa','Brunch artesanal en la Baixa de Lisboa','Artisanal brunch in Lisbon’s Baixa','Brunch artisanal dans la Baixa de Lisbonne','Hausgemachter Brunch in Lissabons Baixa','Brunch artigianale nella Baixa di Lisbona')
# Párrafos about en fr/de/it estaban en inglés
for k,vals in {
 'about.para1_bold1':{'fr':'brunch à Lisbonne','de':'Brunch in Lissabon','it':'brunch a Lisbona'},
 'about.para1_mid':{'fr':'avec pancakes, crêpes, gaufres, bowls, tartines, café et','de':'mit Pancakes, Crêpes, Waffeln, Bowls, Toasts, Kaffee und','it':'con pancake, crêpe, waffle, bowl, toast, caffè e'},
 'about.para1_bold2':{'fr':'glaces artisanales','de':'hausgemachtem Eis','it':'gelato artigianale'},
 'about.para2':{'fr':'La carte convient à ceux qui cherchent un','de':'Die Karte passt für alle auf der Suche nach','it':'La carta va bene per chi cerca'},
 'about.para2_bold':{'fr':'petit-déjeuner ou brunch dans la Baixa','de':'Frühstück oder Brunch in der Baixa','it':'colazione o brunch nella Baixa'},
 'about.para2_mid':{'fr':'avec du sucré et du salé à toute heure.','de':'mit süßen und herzhaften Gerichten über den Tag.','it':'con piatti dolci e salati per ogni momento della giornata.'},
}.items():
    T.setdefault(k,{}).update(vals)

# --- Extra: frases de relleno detectadas ---
s('menu.subtitle','Alguns pratos da carta','Algunos platos de la carta','A few dishes from the menu','Quelques plats de la carte','Ein paar Gerichte von der Karte','Alcuni piatti della carta')
s('fullMenu.subtitle',
 'Brunch, hambúrgueres, café e gelados, com preços.',
 'Brunch, desayunos, hamburguesas, café y helados, con precios.',
 'Brunch, breakfast, burgers, coffee and gelato, with prices.',
 'Brunch, petit-déjeuner, burgers, café et glaces, avec les prix.',
 'Brunch, Frühstück, Burger, Kaffee und Eis, mit Preisen.',
 'Brunch, colazione, hamburger, caffè e gelato, con i prezzi.')
s('homeSeo.brunch.p3',
 'Veja o menu antes de vir. Para chegar, use o mapa ou ligue-nos.',
 'Mira el menú antes de venir. Para llegar, usa el mapa o llámanos.',
 'Check the menu before you come. Use the map for directions or give us a call.',
 'Consultez le menu avant de venir. Pour nous trouver, utilisez la carte ou appelez-nous.',
 'Schauen Sie vorab in die Karte. Den Weg zeigt die Karte, oder rufen Sie uns an.',
 'Guarda il menu prima di venire. Per arrivare usa la mappa o chiamaci.')
s('homeSeo.faq.items.3.a','Sim, com preços, na página Menu.','Sí, con precios, en la página Menú.','Yes, with prices, on the Menu page.','Oui, avec les prix, sur la page Menu.','Ja, mit Preisen, auf der Seite Speisekarte.','Sì, con i prezzi, nella pagina Menu.')
s('homeSeo.faq.items.4.a','Todos os dias, das 7:00 às 19:00.','Todos los días, de 7:00 a 19:00.','Every day, 7:00 to 19:00.','Tous les jours, de 7h00 à 19h00.','Täglich von 7:00 bis 19:00 Uhr.','Tutti i giorni, dalle 7:00 alle 19:00.')
s('homeSeo.faq.items.5.a','Pode reservar online na página de reservas ou ligar para o restaurante.','Puedes reservar online en la página de reservas o llamar al restaurante.','You can book online on the reservations page or call the restaurant.','Vous pouvez réserver en ligne sur la page réservations ou appeler le restaurant.','Sie können online auf der Reservierungsseite buchen oder das Restaurant anrufen.','Puoi prenotare online nella pagina prenotazioni o chiamare il ristorante.')
s('homeSeo.ctas.brunch','Brunch na Baixa: o que temos','Brunch en la Baixa: lo que tenemos','Brunch in the Baixa: what we serve','Brunch dans la Baixa : ce que nous servons','Brunch in der Baixa: was wir anbieten','Brunch nella Baixa: cosa serviamo')
s('brunchLanding.story.p3',
 'Há opções doces e salgadas, e várias vegetarianas e vegan.',
 'Hay opciones dulces y saladas, y varias vegetarianas y veganas.',
 'There are sweet and savoury options, and several vegetarian and vegan ones.',
 'Il y a du sucré et du salé, et plusieurs options végétariennes et vegan.',
 'Es gibt Süßes und Herzhaftes, dazu mehrere vegetarische und vegane Gerichte.',
 'Ci sono opzioni dolci e salate, e diverse vegetariane e vegane.')
s('brunchLanding.story.p4',
 'No menu online vê a carta completa por categorias. Alguns pratos têm indicação de dieta, mas confirme alergias ou restrições com a equipa.',
 'En el menú online tienes la carta completa por categorías. Algunos platos indican la dieta, pero confirma alergias o restricciones con el equipo.',
 'The online menu has the full list by category. Some dishes are marked by diet, but please check allergies or restrictions with our team.',
 'Le menu en ligne présente toute la carte par catégorie. Certains plats indiquent le régime, mais signalez allergies et restrictions à l’équipe.',
 'Die Online-Karte zeigt alles nach Kategorien. Einige Gerichte sind nach Ernährungsform markiert. Allergien bitte mit dem Team abklären.',
 'Il menu online mostra tutta la carta per categorie. Alcuni piatti indicano la dieta, ma conferma allergie o restrizioni con lo staff.')
s('brunchLanding.story.p5',
 'Para chegar, use o mapa. Também pode ligar, mandar email ou reservar online.',
 'Para llegar, usa el mapa. También puedes llamar, escribir un email o reservar online.',
 'Use the map for directions. You can also call, email or book online.',
 'Pour venir, utilisez la carte. Vous pouvez aussi appeler, écrire un email ou réserver en ligne.',
 'Den Weg finden Sie über die Karte. Sie können auch anrufen, mailen oder online reservieren.',
 'Per arrivare usa la mappa. Puoi anche chiamare, scrivere un’email o prenotare online.')
s('brunchLanding.story.p6',
 'Abrimos todos os dias, das 7:00 às 19:00.',
 'Abrimos todos los días, de 7:00 a 19:00.',
 'We are open every day, 7:00 to 19:00.',
 'Nous sommes ouverts tous les jours, de 7h00 à 19h00.',
 'Wir haben täglich von 7:00 bis 19:00 Uhr geöffnet.',
 'Siamo aperti tutti i giorni, dalle 7:00 alle 19:00.')
s('brunchLanding.products.items.1.text',
 'As versões doces incluem gelado artesanal à escolha.',
 'Las versiones dulces llevan helado artesanal a elegir.',
 'The sweet ones come with a scoop of artisanal gelato of your choice.',
 'Les versions sucrées sont servies avec une glace artisanale au choix.',
 'Die süßen Varianten kommen mit hausgemachtem Eis nach Wahl.',
 'Le versioni dolci includono un gelato artigianale a scelta.')
s('brunchLanding.products.items.2.text',
 'Para quem prefere salgado: tostas, bagels, bowls e poke.',
 'Para quien prefiere salado: tostadas, bagels, bowls y poke.',
 'For savoury: toasts, bagels, bowls and poke.',
 'Côté salé : tartines, bagels, bowls et poke.',
 'Für Herzhaftes: Toasts, Bagels, Bowls und Poke.',
 'Per chi preferisce il salato: toast, bagel, bowl e poke.')
s('brunchLanding.products.items.4.text',
 'Em copo de 1 a 3 bolas, em affogato ou com as panquecas.',
 'En vaso de 1 a 3 bolas, en affogato o con las tortitas.',
 'In a cup of 1 to 3 scoops, as an affogato or with the pancakes.',
 'En pot de 1 à 3 boules, en affogato ou avec les pancakes.',
 'Im Becher mit 1 bis 3 Kugeln, als Affogato oder zu den Pancakes.',
 'In coppetta da 1 a 3 palline, in affogato o con i pancake.')
s('brunchLanding.menu.text',
 'O menu mostra a carta por categorias, com preços: brunch, doces, bowls, café, bebidas e gelados.',
 'El menú muestra la carta por categorías, con precios: brunch, dulces, bowls, café, bebidas y helados.',
 'The menu lists everything by category, with prices: brunch, sweets, bowls, coffee, drinks and gelato.',
 'Le menu présente la carte par catégorie, avec les prix : brunch, sucré, bowls, café, boissons et glaces.',
 'Die Karte zeigt alles nach Kategorien, mit Preisen: Brunch, Süßes, Bowls, Kaffee, Getränke und Eis.',
 'Il menu mostra la carta per categorie, con i prezzi: brunch, dolci, bowl, caffè, bevande e gelati.')
s('brunchLanding.faq.items.2.a',
 'Sim. Abrimos às 7:00, com opções doces e salgadas, café e gelados artesanais.',
 'Sí. Abrimos a las 7:00, con opciones dulces y saladas, café y helados artesanales.',
 'Yes. We open at 7:00 with sweet and savoury dishes, coffee and artisanal gelato.',
 'Oui. Nous ouvrons à 7h00, avec du sucré, du salé, du café et des glaces artisanales.',
 'Ja. Wir öffnen um 7:00 Uhr, mit süßen und herzhaften Gerichten, Kaffee und hausgemachtem Eis.',
 'Sì. Apriamo alle 7:00, con piatti dolci e salati, caffè e gelato artigianale.')
s('brunchLanding.faq.items.3.a','Sim, na página Menu, com preços.','Sí, en la página Menú, con precios.','Yes, on the Menu page, with prices.','Oui, sur la page Menu, avec les prix.','Ja, auf der Seite Speisekarte, mit Preisen.','Sì, nella pagina Menu, con i prezzi.')
s('gelados.subtitle',
 'Gelado artesanal feito diariamente no nosso espaço, sem conservantes nem corantes artificiais.',
 'Helado artesanal elaborado a diario en nuestro local, sin conservantes ni colorantes artificiales.',
 'Artisanal gelato made daily on site, with no preservatives or artificial colours.',
 'Glace artisanale faite chaque jour sur place, sans conservateurs ni colorants artificiels.',
 'Hausgemachtes Eis, täglich vor Ort hergestellt, ohne Konservierungsstoffe und künstliche Farbstoffe.',
 'Gelato artigianale fatto ogni giorno nel nostro locale, senza conservanti né coloranti artificiali.')
s('gelados.badges.unique_flavors','8 sabores','8 sabores','8 flavours','8 parfums','8 Sorten','8 gusti')
s('promotions.subtitle',
 'Preços especiais todos os dias, das 13:00 às 18:00',
 'Precios especiales todos los días, de 13:00 a 18:00',
 'Special prices every day, 1:00 PM to 6:00 PM',
 'Prix spéciaux tous les jours, de 13h00 à 18h00',
 'Sonderpreise täglich von 13:00 bis 18:00 Uhr',
 'Prezzi speciali tutti i giorni, dalle 13:00 alle 18:00')
s('promotions.offers.beer_promo.description','Imperial a preço especial','Caña a precio especial','Draught beer, special price','Pression à prix spécial','Fassbier zum Sonderpreis','Birra alla spina a prezzo speciale')
s('reservations.quick_actions.subtitle','Ligue-nos ou escreva por WhatsApp','Llámanos o escríbenos por WhatsApp','Call us or message us on WhatsApp','Appelez-nous ou écrivez-nous sur WhatsApp','Rufen Sie an oder schreiben Sie per WhatsApp','Chiamaci o scrivici su WhatsApp')
s('reservations.info.punctuality.text',
 'Pedimos que todo o grupo chegue à hora marcada. A mesa fica reservada durante 15 minutos.',
 'Te pedimos que todo el grupo llegue a la hora reservada. La mesa se guarda 15 minutos.',
 'Please arrive together at the booked time. We hold the table for 15 minutes.',
 'Merci d’arriver tous à l’heure réservée. La table est gardée 15 minutes.',
 'Bitte kommen Sie gemeinsam zur reservierten Zeit. Wir halten den Tisch 15 Minuten frei.',
 'Vi chiediamo di arrivare tutti all’orario prenotato. Teniamo il tavolo per 15 minuti.')
s('contact.subtitle','Envie-nos uma mensagem e respondemos por email.','Envíanos un mensaje y te respondemos por email.','Send us a message and we will reply by email.','Envoyez-nous un message, nous répondons par email.','Schreiben Sie uns, wir antworten per E-Mail.','Mandaci un messaggio e ti rispondiamo via email.')
s('cookieConsent.text','Este site usa cookies. Ao continuar a navegar, aceita a nossa','Esta web usa cookies. Si sigues navegando, aceptas nuestra','This site uses cookies. By continuing to browse, you accept our','Ce site utilise des cookies. En poursuivant la navigation, vous acceptez notre','Diese Website verwendet Cookies. Wenn Sie weitersurfen, akzeptieren Sie unsere','Questo sito usa i cookie. Continuando a navigare accetti la nostra')

# Prefijos que se recortan (resto del texto intacto)
PREFIX={
 'featuredDish.description':dict(pt='Pequeno-almoço americano',es='Desayuno americano',en='American breakfast',fr='Petit-déjeuner américain',de='Amerikanisches Frühstück',it='Colazione americana'),
 'fullMenu.brunch.americano.desc':dict(pt='Pequeno-almoço americano',es='Desayuno americano',en='American breakfast',fr='Petit-déjeuner américain',de='Amerikanisches Frühstück',it='Colazione americana'),
 'fullMenu.brunch.para_dos.desc':dict(pt='Para partilhar a dois',es='Para compartir entre dos',en='To share between two',fr='À partager à deux',de='Für zwei zum Teilen',it='Da condividere in due'),
}

def get(d,k):
    for p in k.split('.'): d=d[p]
    return d
def put(d,k,v):
    ps=k.split('.')
    for p in ps[:-1]: d=d.setdefault(p,{})
    d[ps[-1]]=v

log=[]
for l in L:
    f=f'messages/{l}.json'; d=json.load(open(f))
    for k,vals in T.items():
        if l in vals:
            try: old=get(d,k)
            except KeyError: old=None
            put(d,k,vals[l]); log.append((l,k,old,vals[l]))
    for k,vals in PREFIX.items():
        old=get(d,k); i=old.index(':') if ':' in old else -1
        rest=old[i+1:].lstrip()
        sep=' : ' if l=='fr' else ': '
        new=vals[l]+sep+rest; put(d,k,new); log.append((l,k,old,new))
    json.dump(d,open(f,'w'),ensure_ascii=False,indent=2); open(f,'a').write('\n')
json.dump(log,open('scripts/copy_rewrite_log.json','w'),ensure_ascii=False,indent=1)
print(len(log),'cambios')
