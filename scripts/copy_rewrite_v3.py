# Ronda 3 de textos (títulos genéricos y frases de relleno). python3 scripts/copy_rewrite_v3.py
import json
L=['pt','es','en','fr','de','it']
T={}
def s(k,*v): T[k]=dict(zip(L,v))
s('about.title','Brunch e gelados na Rua da Prata','Brunch y helados en la Rua da Prata','Brunch and gelato on Rua da Prata','Brunch et glaces sur la Rua da Prata','Brunch und Eis in der Rua da Prata','Brunch e gelato in Rua da Prata')
s('menu.title','Pratos da carta','Platos de la carta','From the menu','Quelques plats','Von der Karte','Dalla carta')
s('menu.subtitle','Tostas, panquecas e poke.','Tostadas, tortitas y poke.','Toasts, pancakes and poke.','Tartines, pancakes et poke.','Toasts, Pancakes und Poke.','Toast, pancake e poke.')
s('featuredDish.badge','Brunch','Brunch','Brunch','Brunch','Brunch','Brunch')
s('homeSeo.brunch.title','Panquecas, crepes e bowls na Baixa','Tortitas, crepes y bowls en la Baixa','Pancakes, crepes and bowls in the Baixa','Pancakes, crêpes et bowls dans la Baixa','Pancakes, Crêpes und Bowls in der Baixa','Pancake, crêpe e bowl nella Baixa')
s('homeSeo.brunch.p1',
 'Se anda a passear pelo centro histórico, a Rua da Prata fica a caminho. Servimos brunch doce e salgado ao longo do dia.',
 'Si estás paseando por el centro histórico, la Rua da Prata te pilla de camino. Servimos brunch dulce y salado durante todo el día.',
 'If you are walking around the historic centre, Rua da Prata is on your way. We serve sweet and savoury brunch throughout the day.',
 'Si vous vous promenez dans le centre historique, la Rua da Prata est sur votre chemin. Nous servons un brunch sucré et salé toute la journée.',
 'Wenn Sie durch die Altstadt spazieren, liegt die Rua da Prata auf dem Weg. Wir servieren süßen und herzhaften Brunch den ganzen Tag.',
 'Se stai passeggiando per il centro storico, Rua da Prata è di strada. Serviamo brunch dolce e salato per tutta la giornata.')
s('homeSeo.location.text','Na Baixa de Lisboa. Veja o menu e como chegar.','En la Baixa de Lisboa. Mira el menú y cómo llegar.','In Lisbon’s Baixa. See the menu and how to get here.','Dans la Baixa de Lisbonne. Voir le menu et l’itinéraire.','In Lissabons Baixa. Karte und Anfahrt.','Nella Baixa di Lisbona. Guarda il menu e come arrivare.')
s('contact.title','Contacto','Contacto','Contact','Contact','Kontakt','Contatti')
s('reservations.subtitle','Reserve online, ligue-nos ou escreva-nos.','Reserva online, llámanos o escríbenos.','Book online, call us or write to us.','Réservez en ligne, appelez-nous ou écrivez-nous.','Online reservieren, anrufen oder schreiben.','Prenota online, chiamaci o scrivici.')
s('reservations.faq.items.2.a','Sim. Para grupos de 8 ou mais pessoas, ligue-nos antes.','Sí. Para grupos de 8 o más personas, llámanos antes.','Yes. For groups of 8 or more, please call us first.','Oui. Pour les groupes de 8 personnes ou plus, appelez-nous avant.','Ja. Für Gruppen ab 8 Personen rufen Sie uns bitte vorher an.','Sì. Per gruppi di 8 o più persone, chiamaci prima.')
s('brunchLanding.products.title','O que há na carta','Qué hay en la carta','What’s on the menu','Ce qu’il y a à la carte','Was auf der Karte steht','Cosa c’è in carta')
s('brunchLanding.products.subtitle','Doce ou salgado, do pequeno-almoço à tarde.','Dulce o salado, del desayuno a la tarde.','Sweet or savoury, from breakfast to the afternoon.','Sucré ou salé, du petit-déjeuner à l’après-midi.','Süß oder herzhaft, vom Frühstück bis zum Nachmittag.','Dolce o salato, dalla colazione al pomeriggio.')
s('brunchLanding.visit.text','Na Baixa de Lisboa. O mapa mostra como chegar.','En la Baixa de Lisboa. El mapa te indica cómo llegar.','In Lisbon’s Baixa. The map shows how to get here.','Dans la Baixa de Lisbonne. La carte indique le chemin.','In Lissabons Baixa. Die Karte zeigt den Weg.','Nella Baixa di Lisbona. La mappa indica come arrivare.')
s('brunchLanding.menu.title','Ver o menu antes de vir','Mira el menú antes de venir','Check the menu before you come','Voir le menu avant de venir','Vorab die Karte ansehen','Guarda il menu prima di venire')
s('promotions.eyebrow','13:00 - 18:00','13:00 - 18:00','1:00 PM - 6:00 PM','13h00 - 18h00','13:00 - 18:00 Uhr','13:00 - 18:00')
s('reservations.quick_actions.title','Prefere ligar?','¿Prefieres llamar?','Prefer to call?','Vous préférez appeler ?','Lieber anrufen?','Preferisci chiamare?')
log=[]
for l in L:
    f=f'messages/{l}.json'; d=json.load(open(f))
    for k,v in T.items():
        o=d; ps=k.split('.')
        for p in ps[:-1]: o=o[p]
        log.append((l,k,o.get(ps[-1]),v[l])); o[ps[-1]]=v[l]
    json.dump(d,open(f,'w'),ensure_ascii=False,indent=2); open(f,'a').write('\n')
json.dump(log,open('scripts/copy_rewrite_v3_log.json','w'),ensure_ascii=False,indent=1)
print(len(log))
