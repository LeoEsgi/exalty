import { PrismaClient, price_occurence } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();
async function main() {
  await prisma.role.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "user",
    },
  });

  await prisma.role.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "admin",
    },
  });

  await prisma.role.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: "moderator",
    },
  });
  await prisma.user.upsert({
    where: { id: 1 },
    update: {
      email: "admin@test.fr",
      password: await bcrypt.hash("admin", 10),
      pseudo: "admin",
      first_name: "admin",
      last_name: "admin",
      discord_tag: "admin",
      active: true,
      role_id: 2,
    },
    create: {
      email: "admin@test.fr",
      password: await bcrypt.hash("admin", 10),
      pseudo: "admin",
      first_name: "admin",
      last_name: "admin",
      discord_tag: "admin",
      active: true,
      role_id: 2,
    },
  });
  await prisma.recruitement_category.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Staff",
    },
  });

  await prisma.recruitement_sub_category.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Ressources Humaines",
      recruitement_categoryId: 1,
    },
  });

  await prisma.recruitement_sub_category.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "Graphisme",
      recruitement_categoryId: 1,
    },
  });

  await prisma.recruitement_sub_category.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: "Média",
      recruitement_categoryId: 1,
    },
  });

  await prisma.recruitment.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: "Charge de Recrutement",
      description:
        "En tant que Chargé de Recrutement chez Exalty, vous jouerez un rôle crucial dans l'identification et l'attraction des talents nécessaires pour dynamiser notre association. Vos responsabilités incluront la gestion du processus de recrutement de bout en bout : de la définition des besoins en collaboration avec les différents départements, à la diffusion des offres d'emploi, en passant par la sélection des candidats et la conduite des entretiens. Vous serez également en charge de développer des stratégies de recrutement innovantes et adaptées au monde de l'e-sport et du gaming, en veillant à promouvoir la diversité et l'inclusion au sein de notre équipe. Une excellente communication, une forte capacité d'organisation et une passion pour le secteur du gaming sont essentielles pour ce poste.",
      category_id: 1,
      recruitement_sub_categoryId: 1,
    },
  });

  await prisma.recruitment.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: "Graphiste",
      description:
        "En tant que Graphiste chez Exalty, vous serez chargé de concevoir et de réaliser des supports visuels qui communiquent l'identité et les messages de notre association avec impact et créativité. Votre travail couvrira une large gamme de médias, y compris le design numérique pour notre site web et nos réseaux sociaux, ainsi que le matériel imprimé pour nos événements et promotions. Vous travaillerez en étroite collaboration avec nos équipes de marketing, communication et événementiel pour créer des visuels captivants et cohérents avec notre marque. Une bonne connaissance des logiciels de design graphique (comme Adobe Photoshop, Illustrator) et une capacité à travailler dans un environnement dynamique et en constante évolution sont essentielles pour ce poste.",
      category_id: 1,
      recruitement_sub_categoryId: 2,
    },
  });

  await prisma.recruitment.upsert({
    where: { id: 3 },
    update: {},
    create: {
      title: "Videaste",
      description:
        "Nous recherchons un(e) Vidéaste créatif(ve) et passionné(e) pour rejoindre notre équipe. Votre mission principale sera de produire du contenu vidéo engageant qui reflète l'esprit et les valeurs de Exalty. Cela inclut le développement de concepts, le tournage, le montage, et la post-production de vidéos pour nos plateformes numériques, y compris les réseaux sociaux et le site web. Vous collaborerez étroitement avec notre équipe de marketing et de communication pour créer des vidéos qui captivent notre audience, qu'il s'agisse de couvrir des événements en direct, de réaliser des interviews, ou de produire des contenus promotionnels. Une maîtrise des logiciels de montage vidéo et une expérience dans la création de contenu pour le web sont requises.",
      category_id: 1,
      recruitement_sub_categoryId: 3,
    },
  });

  await prisma.recruitment.upsert({
    where: { id: 4 },
    update: {},
    create: {
      title: "Streamer",
      description:
        "Nous recherchons des Streamers dynamiques et charismatiques pour rejoindre l'équipe de Exalty. En tant que Streamer, vous serez le visage de notre association sur les plateformes de streaming comme Twitch, YouTube Gaming, etc. Votre rôle consistera à diffuser régulièrement du contenu engageant, allant de la gameplay de haut niveau à des discussions interactives avec la communauté. Vous devrez créer un environnement accueillant et divertissant, tout en mettant en avant les valeurs et les initiatives de notre association. Une excellente capacité à communiquer, un bon sens du divertissement, une connaissance approfondie des jeux populaires, et une expérience préalable en streaming sont essentiels pour ce poste.",
      category_id: 1,
      recruitement_sub_categoryId: 3,
    },
  });

  await prisma.recruitment.upsert({
    where: { id: 5 },
    update: {},
    create: {
      title: "Moderateur Discord/Twitch",
      description:
        "Nous sommes à la recherche de Modérateurs Discord/Twitch pour maintenir un environnement sûr et accueillant sur nos plateformes de communication et de streaming. En tant que Modérateur, vous serez responsable de surveiller les discussions en direct, de faire respecter les règles de la communauté, et de gérer les interactions entre les membres. Cela implique la modération des contenus inappropriés, la gestion des conflits et la participation à l'organisation d'événements en ligne. Vous agirez également en tant qu'intermédiaire entre la communauté et l'équipe de gestion de l'association, en fournissant des retours et en contribuant à améliorer l'expérience des utilisateurs. Des compétences en communication, une bonne connaissance des outils de modération sur Discord et Twitch, et une capacité à réagir rapidement et calmement dans diverses situations sont nécessaires pour ce rôle.",
      category_id: 1,
      recruitement_sub_categoryId: 3,
    },
  });

  await prisma.membership.upsert({
    where: { id: 1 },
    update: {
      name: "Cotisant",
      price: 4.99,
      occurence: price_occurence.MONTHLY,
    },
    create: {
      name: "Cotisant",
      price: 4.99,
      occurence: price_occurence.MONTHLY,
    },
  });

  await prisma.membership.upsert({
    where: { id: 2 },
    update: { name: "Adherant", price: 50, occurence: price_occurence.YEARLY },
    create: {
      name: "Adherant",
      price: 50,
      occurence: price_occurence.YEARLY,
    },
  });

  await prisma.membership.upsert({
    where: { id: 3 },
    update: {
      name: "Adherant Premium",
      price: 100,
      occurence: price_occurence.YEARLY,
    },
    create: {
      name: "Adherant Premium",
      price: 100,
      occurence: price_occurence.YEARLY,
    },
  });

  await prisma.matches.upsert({
    where: { id: 1 },
    update: {
      title: "France cup",
      instance: "Finale",
      link: "link",
      status: "NOT_STARTED",
      date: new Date("2024-05-15 20:00:00"),
      timezone: "PCT",
      format: "Bo5",
      opponent: "Karmine Corp",
      opponent_logo: "Karmine_Corp_logo.svg",
    },
    create: {
      title: "France cup",
      instance: "Finale",
      link: "link",
      status: "NOT_STARTED",
      date: new Date("2024-05-15 20:00:00"),
      timezone: "PCT",
      format: "Bo5",
      opponent: "Karmine Corp",
      opponent_logo: "Karmine_Corp_logo.svg",
    },
  });

  await prisma.matches.upsert({
    where: { id: 2 },
    update: {
      title: "France cup",
      instance: "Finale",
      link: "link",
      status: "NOT_STARTED",
      date: new Date("2024-05-18 20:00:00"),
      timezone: "PCT",
      format: "Bo5",
      opponent: "Gentle Mates",
      opponent_logo: "Gentle_Mates.jpg",
    },
    create: {
      title: "France cup",
      instance: "Finale",
      link: "link",
      status: "NOT_STARTED",
      date: new Date("2024-05-18 20:00:00"),
      timezone: "PCT",
      format: "Bo5",
      opponent: "Gentle Mates",
      opponent_logo: "Gentle_Mates.jpg",
    },
  });

  await prisma.matches.upsert({
    where: { id: 3 },
    update: {
      title: "France cup",
      instance: "Finale",
      link: "link",
      status: "NOT_STARTED",
      date: new Date("2024-05-27 20:00:00"),
      timezone: "PCT",
      format: "Bo5",
      opponent: "Mandatory",
      opponent_logo: "Mandatory.png",
    },
    create: {
      title: "France cup",
      instance: "Finale",
      link: "link",
      status: "NOT_STARTED",
      date: new Date("2024-05-27 20:00:00"),
      timezone: "PCT",
      format: "Bo5",
      opponent: "Mandatory",
      opponent_logo: "Mandatory.png",
    },
  });

  await prisma.matches.upsert({
    where: { id: 4 },
    update: {
      title: "France cup",
      instance: "Finale",
      link: "link",
      status: "FINISHED",
      date: new Date("2024-05-15 20:00:00"),
      timezone: "PCT",
      format: "Bo5",
      opponent: "Karmine Corp",
      opponent_logo: "Karmine_Corp_logo.svg",
      score_exa: 13,
      score_opponent: 7,
    },
    create: {
      title: "France cup",
      instance: "Finale",
      link: "link",
      status: "FINISHED",
      date: new Date("2024-05-15 20:00:00"),
      timezone: "PCT",
      format: "Bo5",
      opponent: "Karmine Corp",
      opponent_logo: "Karmine_Corp_logo.svg",
      score_exa: 13,
      score_opponent: 7,
    },
  });

  await prisma.matches.upsert({
    where: { id: 5 },
    update: {
      title: "France cup",
      instance: "Finale",
      link: "link",
      status: "FINISHED",
      date: new Date("2024-05-18 20:00:00"),
      timezone: "PCT",
      format: "Bo5",
      opponent: "Gentle Mates",
      opponent_logo: "Gentle_Mates.jpg",
      score_exa: 7,
      score_opponent: 13,
    },
    create: {
      title: "France cup",
      instance: "Finale",
      link: "link",
      status: "FINISHED",
      date: new Date("2024-05-18 20:00:00"),
      timezone: "PCT",
      format: "Bo5",
      opponent: "Gentle Mates",
      opponent_logo: "Gentle_Mates.jpg",
      score_exa: 7,
      score_opponent: 13,
    },
  });

  await prisma.matches.upsert({
    where: { id: 6 },
    update: {
      title: "France cup",
      instance: "Finale",
      link: "link",
      status: "FINISHED",
      date: new Date("2024-05-27 20:00:00"),
      timezone: "PCT",
      format: "Bo5",
      opponent: "Mandatory",
      opponent_logo: "Mandatory.png",
      score_exa: 13,
      score_opponent: 9,
    },
    create: {
      title: "France cup",
      instance: "Finale",
      link: "link",
      status: "FINISHED",
      date: new Date("2024-05-27 20:00:00"),
      timezone: "PCT",
      format: "Bo5",
      opponent: "Mandatory",
      opponent_logo: "Mandatory.png",
      score_exa: 13,
      score_opponent: 9,
    },
  });

  await prisma.matches.upsert({
    where: { id: 7 },
    update: {
      title: "France cup",
      instance: "Finale",
      link: "link",
      status: "IN_PROGRESS",
      date: new Date("2024-05-15 20:00:00"),
      timezone: "PCT",
      format: "Bo3",
      opponent: "Karmine Corp",
      opponent_logo: "Karmine_Corp_logo.svg",
    },
    create: {
      title: "France cup",
      instance: "Finale",
      link: "link",
      status: "IN_PROGRESS",
      date: new Date("2024-05-15 20:00:00"),
      timezone: "PCT",
      format: "Bo3",
      opponent: "Karmine Corp",
      opponent_logo: "Karmine_Corp_logo.svg",
    },
  });

  await prisma.matches.upsert({
    where: { id: 8 },
    update: {
      title: "France cup",
      instance: "Demi-Finale",
      link: "link",
      status: "IN_PROGRESS",
      date: new Date("2024-05-18 20:00:00"),
      timezone: "PCT",
      format: "Bo5",
      opponent: "Gentle Mates",
      opponent_logo: "Gentle_Mates.jpg",
    },
    create: {
      title: "France cup",
      instance: "Demi-Finale",
      link: "link",
      status: "IN_PROGRESS",
      date: new Date("2024-05-18 20:00:00"),
      timezone: "PCT",
      format: "Bo5",
      opponent: "Gentle Mates",
      opponent_logo: "Gentle_Mates.jpg",
    },
  });

  await prisma.matches.upsert({
    where: { id: 9 },
    update: {
      title: "France cup",
      instance: "Finale",
      link: "link",
      status: "IN_PROGRESS",
      date: new Date("2024-05-27 20:00:00"),
      timezone: "PCT",
      format: "Bo1",
      opponent: "Mandatory",
      opponent_logo: "Mandatory.png",
    },
    create: {
      title: "France cup",
      instance: "Finale",
      link: "link",
      status: "IN_PROGRESS",
      date: new Date("2024-05-27 20:00:00"),
      timezone: "PCT",
      format: "Bo1",
      opponent: "Mandatory",
      opponent_logo: "Mandatory.png",
    },
  });

  await prisma.game.upsert({
    where: { id: 1 },
    update: {
      name: "Valorant",
      title: "Sur valorant retrouvez les en VCT champions",
      desc: "Notre équipe Valorant représente l’essence même de la compétitivité et du travail d’équipe chez Exalty. Constituée de joueurs talentueux et dévoués, cette équipe allie habilement stratégie, rapidité et précision pour dominer dans l’arène de Valorant. Avec des performances remarquables dans divers tournois, notre équipe Valorant ne cesse de repousser les limites, démontrant leur compétence et leur passion pour le jeu. Leur esprit d’équipe et leur détermination font d’eux non seulement des compétiteurs redoutables, mais aussi des ambassadeurs inspirants de notre association.",
      img: "valorant.png",
    },
    create: {
      name: "Valorant",
      title: "Sur valorant retrouvez les en VCT champions",
      desc: "Notre équipe Valorant représente l’essence même de la compétitivité et du travail d’équipe chez Exalty. Constituée de joueurs talentueux et dévoués, cette équipe allie habilement stratégie, rapidité et précision pour dominer dans l’arène de Valorant. Avec des performances remarquables dans divers tournois, notre équipe Valorant ne cesse de repousser les limites, démontrant leur compétence et leur passion pour le jeu. Leur esprit d’équipe et leur détermination font d’eux non seulement des compétiteurs redoutables, mais aussi des ambassadeurs inspirants de notre association.",
      img: "valorant.png",
    },
  });

  await prisma.game.upsert({
    where: { id: 2 },
    update: {
      name: "League of Legends",
      title:
        "Sur League of Legends retrouvez les sur la faille de l'invocateur",
      desc: "L’équipe League of Legends (LoL) chez Exalty est un symbole de persévérance et d’innovation dans l’esport. Nos joueurs, sélectionnés pour leur habileté exceptionnelle et leur esprit stratégique, excellent sur Summoner’s Rift, apportant fierté et prestige à notre association. Un fait marquant pour notre équipe est le retour de notre coaching staff original de 2021, qui avait mené l’équipe à sa meilleure performance historique, terminant top 9 à l’OTF. Leur retour symbolise un renouvellement d’engagement et de passion, apportant une expérience précieuse et une vision éprouvée qui galvanisent l’équipe. Cette fusion d’anciennes réussites et de nouvelles aspirations place notre équipe LoL sur la voie du succès continu et de la reconnaissance dans la scène compétitive de League of Legends.",
      img: "lol.jpg",
    },
    create: {
      name: "League of Legends",
      title:
        "Sur League of Legends retrouvez les sur la faille de l'invocateur",
      desc: "L’équipe League of Legends (LoL) chez Exalty est un symbole de persévérance et d’innovation dans l’esport. Nos joueurs, sélectionnés pour leur habileté exceptionnelle et leur esprit stratégique, excellent sur Summoner’s Rift, apportant fierté et prestige à notre association. Un fait marquant pour notre équipe est le retour de notre coaching staff original de 2021, qui avait mené l’équipe à sa meilleure performance historique, terminant top 9 à l’OTF. Leur retour symbolise un renouvellement d’engagement et de passion, apportant une expérience précieuse et une vision éprouvée qui galvanisent l’équipe. Cette fusion d’anciennes réussites et de nouvelles aspirations place notre équipe LoL sur la voie du succès continu et de la reconnaissance dans la scène compétitive de League of Legends.",
      img: "lol.jpg",
    },
  });

  await prisma.player.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Nysha",
      role: "Smoker",
      img: "nysha.png",
      game: {
        connect: { id: 1 },
      },
    },
  });

  await prisma.player.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "CNS",
      role: "Sentinel",
      img: "cns.png",
      game: {
        connect: { id: 1 },
      },
    },
  });

  await prisma.player.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: "Pitou",
      role: "Duelist",
      img: "pitou.png",
      game: {
        connect: { id: 1 },
      },
    },
  });

  await prisma.player.upsert({
    where: { id: 4 },
    update: {},
    create: {
      name: "Ragnarok",
      role: "Initiateur",
      img: "ragnarok.png",
      game: {
        connect: { id: 1 },
      },
    },
  });

  await prisma.player.upsert({
    where: { id: 5 },
    update: {},
    create: {
      name: "Tommy",
      role: "Initiateur/Flex",
      img: "tommy.png",
      game: {
        connect: { id: 1 },
      },
    },
  });

  await prisma.player.upsert({
    where: { id: 6 },
    update: {},
    create: {
      name: "Dake",
      role: "Head Coach",
      img: "dake.png",
      game: {
        connect: { id: 1 },
      },
    },
  });

  await prisma.player.upsert({
    where: { id: 7 },
    update: {},
    create: {
      name: "Salva",
      role: "Coach",
      img: "salva.png",
      game: {
        connect: { id: 1 },
      },
    },
  });

  await prisma.player.upsert({
    where: { id: 8 },
    update: {},
    create: {
      name: "Balou",
      role: "Coach",
      img: "balou.png",
      game: {
        connect: { id: 1 },
      },
    },
  });

  await prisma.player.upsert({
    where: { id: 9 },
    update: {},
    create: {
      name: "Beautiful",
      role: "Manageuse",
      img: "beautiful.png",
      game: {
        connect: { id: 1 },
      },
    },
  });

  await prisma.player.upsert({
    where: { id: 10 },
    update: {},
    create: {
      name: "Phyraxx",
      role: "Toplaner",
      img: "phyraxx.png",
      game: {
        connect: { id: 2 },
      },
    },
  });

  await prisma.player.upsert({
    where: { id: 11 },
    update: {},
    create: {
      name: "Karken",
      role: "Jungler",
      img: "karken.png",
      game: {
        connect: { id: 2 },
      },
    },
  });

  await prisma.player.upsert({
    where: { id: 12 },
    update: {},
    create: {
      name: "Diverse",
      role: "Midlaner",
      img: "diverse.png",
      game: {
        connect: { id: 2 },
      },
    },
  });

  await prisma.player.upsert({
    where: { id: 13 },
    update: {},
    create: {
      name: "Aitlade",
      role: "ADC",
      img: "aitlade.png",
      game: {
        connect: { id: 2 },
      },
    },
  });

  await prisma.player.upsert({
    where: { id: 14 },
    update: {},
    create: {
      name: "Kwebz",
      role: "Supp",
      img: "kwebz.png",
      game: {
        connect: { id: 2 },
      },
    },
  });

  await prisma.player.upsert({
    where: { id: 15 },
    update: {},
    create: {
      name: "Boby Maltezer",
      role: "Head Coach",
      img: "boby_maltezer.png",
      game: {
        connect: { id: 2 },
      },
    },
  });

  await prisma.player.upsert({
    where: { id: 16 },
    update: {},
    create: {
      name: "Sollaw",
      role: "Assistant Coach",
      img: "sollaw.png",
      game: {
        connect: { id: 2 },
      },
    },
  });

  await prisma.player.upsert({
    where: { id: 17 },
    update: {},
    create: {
      name: "Tolgear",
      role: "Data Analyst",
      img: "tolgear.png",
      game: {
        connect: { id: 2 },
      },
    },
  });

  await prisma.player.upsert({
    where: { id: 18 },
    update: {},
    create: {
      name: "Sarkymm",
      role: "Manager",
      img: "sarkymm.png",
      game: {
        connect: { id: 2 },
      },
    },
  });

  await prisma.sponsor.upsert({
    where: { id: 1 },
    update: {
      name: "FlowUP",
      img: "FlowUP.png",
      description:
        "FlowUP est un acteur clé dans le monde du gaming et du e-sport. Leur plateforme innovante offre des solutions optimisées pour le streaming et la diffusion de contenu, renforçant ainsi la visibilité et l'engagement de notre communauté. Leur soutien technique et technologique est essentiel pour le développement et le succès de nos initiatives.",
      link: "https://www.flowup.shop/r/2f8",
    },
    create: {
      name: "FlowUP",
      img: "FlowUP.png",
      description:
        "FlowUP est un acteur clé dans le monde du gaming et du e-sport. Leur plateforme innovante offre des solutions optimisées pour le streaming et la diffusion de contenu, renforçant ainsi la visibilité et l'engagement de notre communauté. Leur soutien technique et technologique est essentiel pour le développement et le succès de nos initiatives.",
      link: "https://www.flowup.shop/r/2f8",
    },
  });

  await prisma.sponsor.upsert({
    where: { id: 2 },
    update: {
      name: "1337 Pharma",
      img: "1337-Pharma.png",
      description:
        "1337 Pharma, quant à lui, est un leader dans le secteur de la santé et du bien-être adapté aux gamers. Avec une gamme de produits conçus pour améliorer la concentration et la performance, 1337 Pharma joue un rôle crucial dans le soutien de nos athlètes et membres, en veillant à leur santé physique et mentale, un aspect fondamental dans le monde compétitif de l'e-sport.",
      link: "https://1337pharma.com/",
    },
    create: {
      name: "1337 Pharma",
      img: "1337-Pharma.png",
      description:
        "1337 Pharma, quant à lui, est un leader dans le secteur de la santé et du bien-être adapté aux gamers. Avec une gamme de produits conçus pour améliorer la concentration et la performance, 1337 Pharma joue un rôle crucial dans le soutien de nos athlètes et membres, en veillant à leur santé physique et mentale, un aspect fondamental dans le monde compétitif de l'e-sport.",
      link: "https://1337pharma.com/",
    },
  });

  await prisma.sponsor.upsert({
    where: { id: 3 },
    update: {
      name: "One X Wear",
      img: "OneXWear.png",
      description:
        "One X Wear est notre partenaire officiel pour tout ce qui concerne le merchandising. Spécialiste dans la création de vêtements et accessoires personnalisés pour les gamers, One X Wear propose une gamme de produits de haute qualité qui reflète l'esprit et le dynamisme de notre association. Leur expertise dans le domaine du merchandising gaming fait d'eux un partenaire incontournable pour Exalty, nous permettant d'offrir à nos membres et fans des produits exclusifs et tendance.",
      link: "https://onex.gg/",
    },
    create: {
      name: "One X Wear",
      img: "OneXWear.png",
      description:
        "One X Wear est notre partenaire officiel pour tout ce qui concerne le merchandising. Spécialiste dans la création de vêtements et accessoires personnalisés pour les gamers, One X Wear propose une gamme de produits de haute qualité qui reflète l'esprit et le dynamisme de notre association. Leur expertise dans le domaine du merchandising gaming fait d'eux un partenaire incontournable pour Exalty, nous permettant d'offrir à nos membres et fans des produits exclusifs et tendance.",
      link: "https://onex.gg/",
    },
  });
  await prisma.sponsor.upsert({
    where: { id: 4 },
    update: {
      name: "Eneba",
      img: "Eneba.svg",
      description:
        "Eneba est une marketplace incontournable pour tous les amateurs de jeux vidéo. Leur large sélection de jeux et leur système de paiement sécurisé en font un partenaire de choix pour Exalty. Leur engagement à fournir un accès abordable et facile aux derniers jeux aide notre communauté à rester à la pointe de l'innovation et du divertissement.",
      link: "https://www.eneba.com/fr/?af_id=ExaltyFR5",
    },
    create: {
      name: "Eneba",
      img: "Eneba.svg",
      description:
        "Eneba est une marketplace incontournable pour tous les amateurs de jeux vidéo. Leur large sélection de jeux et leur système de paiement sécurisé en font un partenaire de choix pour Exalty. Leur engagement à fournir un accès abordable et facile aux derniers jeux aide notre communauté à rester à la pointe de l'innovation et du divertissement.",
      link: "https://www.eneba.com/fr/?af_id=ExaltyFR5",
    },
  });

  await prisma.sponsor.upsert({
    where: { id: 5 },
    update: {
      name: "NordVPN",
      img: "NordVPN.svg",
      description:
        "NordVPN est un leader mondial dans le domaine de la sécurité internet. Leur service VPN de pointe assure une protection en ligne de premier ordre pour nos membres, protégeant leurs données personnelles et sécurisant leur connexion lors de tournois en ligne et de sessions de jeu. La confiance et la sécurité sont primordiales dans l'univers numérique, et grâce à NordVPN, nous pouvons garantir à notre communauté une expérience en ligne sûre et sans tracas.",
      link: "https://go.nordvpn.net/SH5zx",
    },
    create: {
      name: "NordVPN",
      img: "NordVPN.svg",
      description:
        "NordVPN est un leader mondial dans le domaine de la sécurité internet. Leur service VPN de pointe assure une protection en ligne de premier ordre pour nos membres, protégeant leurs données personnelles et sécurisant leur connexion lors de tournois en ligne et de sessions de jeu. La confiance et la sécurité sont primordiales dans l'univers numérique, et grâce à NordVPN, nous pouvons garantir à notre communauté une expérience en ligne sûre et sans tracas.",
      link: "https://go.nordvpn.net/SH5zx",
    },
  });

  await prisma.product.upsert({
    where: { id: 1 },
    update: {
      name: "Maillot Exalty",
      flockingable: true,
      basePrice: 59.9,
      sizable: true,
      img: "tshirt.png",
      img2: "tshirt2.png",
      description:
        "Le Maillot Exalty est un incontournable pour tous les fans de l'association. Conçu avec un tissu de haute qualité, ce t-shirt est à la fois confortable et stylé. Disponible dans une gamme de tailles et de couleurs, il est idéal pour afficher votre soutien à Exalty lors de vos streams, événements ou sorties entre amis.",
    },
    create: {
      name: "Maillot Exalty",
      flockingable: true,
      basePrice: 59.9,
      sizable: true,
      img: "tshirt.png",
      img2: "tshirt2.png",
      description:
        "Le Maillot Exalty est un incontournable pour tous les fans de l'association. Conçu avec un tissu de haute qualité, ce t-shirt est à la fois confortable et stylé. Disponible dans une gamme de tailles et de couleurs, il est idéal pour afficher votre soutien à Exalty lors de vos streams, événements ou sorties entre amis.",
    },
  });

  await prisma.stock.upsert({
    where: { id: 1 },
    update: {
      product_id: 1,
      amount: 50,
    },
    create: {
      product_id: 1,
      amount: 50,
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
